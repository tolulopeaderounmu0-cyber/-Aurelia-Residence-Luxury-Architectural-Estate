import { useState } from 'react';
import { X, Calendar, Clock, ShieldCheck, CheckCircle2, User, Mail, Phone } from 'lucide-react';
import { PROPERTY_INFO } from '../../lib/propertyData';

interface PrivateViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivateViewingModal({ isOpen, onClose }: PrivateViewingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '11:00 AM — Morning Horizon',
    partySize: '2',
    ndAgreement: true,
    specialRequests: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity"
    >
      <div className="relative w-full max-w-xl bg-[#141518] border border-[#2b2c31] text-[#edeae3] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#c5a880]/10 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880]">Private Dossier Confirmed</span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white">Viewing Request Received</h3>
              <p className="text-sm text-stone-400 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.fullName || 'esteemed guest'}. Our private estate director will contact you directly within four hours to finalize concierge arrangements and arrival protocol.
              </p>
            </div>

            <div className="pt-4 border-t border-[#2b2c31] text-xs text-stone-400 space-y-1">
              <p><span className="text-stone-300">Property:</span> {PROPERTY_INFO.name} — {PROPERTY_INFO.subtitle}</p>
              <p><span className="text-stone-300">Preferred Slot:</span> {formData.date || 'Upcoming Weekend'} ({formData.timeSlot})</p>
              <p><span className="text-stone-300">Confirmation Reference:</span> #AUR-{Math.floor(100000 + Math.random() * 900000)}</p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-[#c5a880] text-[#0c0d0e] text-xs uppercase tracking-widest font-medium hover:bg-[#dfcaa7] transition-colors"
              >
                Return to Presentation
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b border-[#2b2c31] pb-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c5a880]">
                <span>{PROPERTY_INFO.name}</span>
                <span aria-hidden="true">·</span>
                <span>Private Viewing Invitation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white mt-1">Schedule an On-Site Tour</h2>
              <p className="text-xs text-stone-400 mt-1">
                Accompanied exclusively by the lead project architect & managing director.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#c5a880]" /> Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Lord Alexander Wright"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#0c0d0e] border border-[#2b2c31] px-3.5 py-2.5 text-sm text-stone-200 focus:outline-none focus:border-[#c5a880] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#c5a880]" /> Direct Email
                </label>
                <input
                  required
                  type="email"
                  placeholder="e.g. alexander@wrightcapital.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0c0d0e] border border-[#2b2c31] px-3.5 py-2.5 text-sm text-stone-200 focus:outline-none focus:border-[#c5a880] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#c5a880]" /> Confidential Telephone
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+1 (310) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#0c0d0e] border border-[#2b2c31] px-3.5 py-2.5 text-sm text-stone-200 focus:outline-none focus:border-[#c5a880] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#c5a880]" /> Preferred Date
                </label>
                <input
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-[#0c0d0e] border border-[#2b2c31] px-3.5 py-2 text-sm text-stone-200 focus:outline-none focus:border-[#c5a880] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#c5a880]" /> Preferred Window
                </label>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full bg-[#0c0d0e] border border-[#2b2c31] px-3.5 py-2.5 text-sm text-stone-200 focus:outline-none focus:border-[#c5a880] transition-colors"
                >
                  <option value="10:00 AM — Morning Light">10:00 AM — Morning Light</option>
                  <option value="02:00 PM — Ocean Solarium">02:00 PM — Ocean Solarium</option>
                  <option value="05:30 PM — Golden Hour & Sunset">05:30 PM — Golden Hour & Sunset</option>
                  <option value="07:30 PM — Twilight Architecture">07:30 PM — Twilight Architecture</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                  Party Size
                </label>
                <select
                  value={formData.partySize}
                  onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
                  className="w-full bg-[#0c0d0e] border border-[#2b2c31] px-3.5 py-2.5 text-sm text-stone-200 focus:outline-none focus:border-[#c5a880] transition-colors"
                >
                  <option value="1">Principal Guest Only</option>
                  <option value="2">Principal & Partner (2)</option>
                  <option value="4">Family Delegation (Up to 4)</option>
                  <option value="Advisor">Accompanied by Family Office Advisor</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                Special Logistics / Arrival Notes
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Private aircraft arrival via Van Nuys, confidentiality requirements, architectural interest focus..."
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="w-full bg-[#0c0d0e] border border-[#2b2c31] px-3.5 py-2 text-sm text-stone-200 focus:outline-none focus:border-[#c5a880] transition-colors resize-none"
              />
            </div>

            <div className="flex items-start gap-2.5 p-3 bg-[#0c0d0e] border border-[#232427]">
              <ShieldCheck className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
              <div className="text-xs text-stone-400">
                <span className="text-stone-300 font-medium">Mutual Confidentiality Protocol:</span> All visits are governed under non-disclosure. Identity and registration details are stored under encrypted protocols.
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 border border-[#2b2c31] text-xs uppercase tracking-wider text-stone-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-[#c5a880] text-[#0c0d0e] text-xs uppercase tracking-widest font-semibold hover:bg-[#dfcaa7] transition-colors"
              >
                Confirm Private Viewing Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
