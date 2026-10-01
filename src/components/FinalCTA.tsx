import { useEffect, useRef } from 'react';
import { ArrowUp, ArrowUpRight, Download, Mail, Phone } from 'lucide-react';
import { PROPERTY_INFO } from '../lib/propertyData';
import { scrollToTarget } from '../lib/animationConfig';
import { orchestrateSectionReveals } from '../lib/animations';

interface FinalCTAProps {
  onOpenViewing: () => void;
  onOpenBrochure: () => void;
}

export function FinalCTA({ onOpenViewing, onOpenBrochure }: FinalCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = orchestrateSectionReveals(sectionRef.current, {
      triggerOffset: 'top 80%',
      stagger: 0.12,
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-between bg-[#0c0d0e] border-t border-white/10 overflow-hidden"
    >
      {/* Background Cinematic Visual */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={PROPERTY_INFO.ctaImage}
          alt="Aurelia Residence Twilight View"
          className="w-full h-full object-cover object-center scale-105 opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-[#0c0d0e]/70 to-[#0c0d0e]" />
      </div>

      <div className="pt-24 sm:pt-32" />

      {/* Main Closing Editorial Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full text-center my-auto py-16">
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          <div className="reveal-header flex items-center justify-center gap-2 text-xs uppercase tracking-[0.28em] text-[#c5a880]">
            <span>{PROPERTY_INFO.name}</span>
            <span aria-hidden="true">·</span>
            <span>Point Dume, Malibu</span>
          </div>

          <h2 className="reveal-header text-4xl sm:text-6xl md:text-7xl font-serif text-[#f4f2ee] font-light tracking-tight leading-[1.1]">
            Your next address starts here.
          </h2>

          <p className="reveal-header text-base sm:text-lg text-stone-400 font-light max-w-xl mx-auto leading-relaxed">
            Experience the confluence of brutalist stone architecture and the Pacific horizon. Private consultations and confidential viewings are available by appointment.
          </p>

          {/* Primary Action Buttons */}
          <div className="reveal-item pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={onOpenViewing}
              className="w-full sm:w-auto px-8 py-4 bg-[#c5a880] text-[#0c0d0e] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#dfcaa7] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-black/50"
            >
              <span>Book a Private Viewing</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenBrochure}
              className="w-full sm:w-auto px-8 py-4 border border-white/20 text-[#f4f2ee] text-xs uppercase tracking-[0.2em] font-light hover:border-[#c5a880] hover:text-[#c5a880] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer bg-black/40 backdrop-blur-xs"
            >
              <Download className="w-4 h-4" />
              <span>Request Brochure</span>
            </button>
          </div>
        </div>
      </div>

      {/* Minimalist Editorial Footer */}
      <footer className="reveal-item relative z-10 border-t border-white/10 py-10 bg-[#0a0a0c]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/5">
            <div>
              <div className="font-serif text-xl tracking-[0.2em] text-[#f4f2ee]">
                {PROPERTY_INFO.name.toUpperCase()}
              </div>
              <div className="text-xs text-stone-500 font-light mt-1">
                Represented Exclusively by Studio VANDENBERG Private Client Advisory
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Private Desk: +1 (310) 892-4100</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>concierge@aurelia-estate.com</span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
            <div>
              © {new Date().getFullYear()} {PROPERTY_INFO.name} Estate. All architectural renderings & photography copyright protected.
            </div>

            <button
              onClick={() => scrollToTarget('#hero')}
              className="flex items-center gap-2 text-stone-400 hover:text-[#c5a880] transition-colors cursor-pointer group"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </footer>
    </section>
  );
}
