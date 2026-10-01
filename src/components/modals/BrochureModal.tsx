import { useState } from 'react';
import { X, Download, FileText, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import { PROPERTY_INFO } from '../../lib/propertyData';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BrochureModal({ isOpen, onClose }: BrochureModalProps) {
  const [downloaded, setDownloaded] = useState(false);
  const [email, setEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [edition, setEdition] = useState('full');

  if (!isOpen) return null;

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate real architectural specification file for download
    const brochureText = `
================================================================================
AURELIA — THE CREST RESIDENCE
Point Dume Promontory, Malibu, California
Architect: ${PROPERTY_INFO.architect} (${PROPERTY_INFO.completionYear})
Acquisition Price: ${PROPERTY_INFO.price.display}
================================================================================

EXECUTIVE ARCHITECTURAL SUMMARY:
${PROPERTY_INFO.description.lead}

${PROPERTY_INFO.description.architectural}

--------------------------------------------------------------------------------
KEY SPECIFICATIONS:
--------------------------------------------------------------------------------
${PROPERTY_INFO.stats.map((s) => `• ${s.label}: ${s.value} ${s.unit || ''} — ${s.detail}`).join('\n')}

--------------------------------------------------------------------------------
STRUCTURAL & TECHNICAL ATTRIBUTES:
--------------------------------------------------------------------------------
${PROPERTY_INFO.specifications.map((sp) => `• ${sp.title.padEnd(20)}: ${sp.detail}`).join('\n')}

--------------------------------------------------------------------------------
LEVEL BREAKDOWN:
--------------------------------------------------------------------------------
${PROPERTY_INFO.floorPlans
  .map(
    (fp) => `[${fp.label.toUpperCase()}]
${fp.level}
Area: ${fp.area}
Overview: ${fp.description}
Key Spaces:
${fp.keySpaces.map((k) => `  - ${k}`).join('\n')}
`
  )
  .join('\n')}

--------------------------------------------------------------------------------
PRIVATE ENCLAVE HIGHLIGHTS:
--------------------------------------------------------------------------------
${PROPERTY_INFO.lifestyle.locations.map((loc) => `• ${loc.category}: ${loc.name} (${loc.note})`).join('\n')}

================================================================================
Confidential Offering Document. Prepared for: ${recipientName || 'Private Client'}
Direct Representative Contact: inquiry@aurelia-estate.com
================================================================================
    `.trim();

    const blob = new Blob([brochureText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Aurelia-Residence-Architectural-Dossier-${edition.toUpperCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
  };

  const handleReset = () => {
    setDownloaded(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
    >
      <div className="relative w-full max-w-lg bg-[#141518] border border-[#2b2c31] text-[#edeae3] shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {downloaded ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#c5a880]/10 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880]">Dossier Dispatched</span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white">Brochure Generated</h3>
              <p className="text-sm text-stone-400 max-w-sm mx-auto leading-relaxed">
                The comprehensive architectural dossier has begun downloading to your device. A copy has also been logged for {email}.
              </p>
            </div>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-[#c5a880] text-[#0c0d0e] text-xs uppercase tracking-widest font-medium hover:bg-[#dfcaa7] transition-colors"
              >
                Close & Continue Exploring
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleDownload} className="space-y-6">
            <div className="border-b border-[#2b2c31] pb-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c5a880]">
                <span>Architectural Monographs</span>
                <span aria-hidden="true">·</span>
                <span>Aurelia Malibu</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white mt-1">Request Private Dossier</h2>
              <p className="text-xs text-stone-400 mt-1">
                Access full architectural drawings, material monographs, site surveys, and acquisition terms.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                  Recipient Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Katherine Sterling"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full bg-[#0c0d0e] border border-[#2b2c31] px-3.5 py-2.5 text-sm text-stone-200 focus:outline-none focus:border-[#c5a880] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                  Email Address for Verification
                </label>
                <input
                  required
                  type="email"
                  placeholder="e.g. k.sterling@sterlingtrust.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0c0d0e] border border-[#2b2c31] px-3.5 py-2.5 text-sm text-stone-200 focus:outline-none focus:border-[#c5a880] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                  Edition Select
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setEdition('full')}
                    className={`p-3 text-left border transition-colors ${
                      edition === 'full'
                        ? 'border-[#c5a880] bg-[#c5a880]/10 text-white'
                        : 'border-[#2b2c31] bg-[#0c0d0e] text-stone-400 hover:text-white'
                    }`}
                  >
                    <div className="font-semibold text-stone-200">Complete Monograph</div>
                    <div className="text-[11px] text-stone-400 mt-0.5">Floor plans, engineering & full photography</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEdition('investor')}
                    className={`p-3 text-left border transition-colors ${
                      edition === 'investor'
                        ? 'border-[#c5a880] bg-[#c5a880]/10 text-white'
                        : 'border-[#2b2c31] bg-[#0c0d0e] text-stone-400 hover:text-white'
                    }`}
                  >
                    <div className="font-semibold text-stone-200">Executive Brief</div>
                    <div className="text-[11px] text-stone-400 mt-0.5">Acquisition synopsis & yield analysis</div>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-400 bg-[#0c0d0e] p-3 border border-[#232427]">
              <Shield className="w-4 h-4 text-[#c5a880] shrink-0" />
              <span>Complimentary official document directly authenticated by Studio VANDENBERG.</span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 border border-[#2b2c31] text-xs uppercase tracking-wider text-stone-400 hover:text-white transition-colors"
              >
                Close
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 bg-[#c5a880] text-[#0c0d0e] text-xs uppercase tracking-widest font-semibold hover:bg-[#dfcaa7] transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Official Dossier
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
