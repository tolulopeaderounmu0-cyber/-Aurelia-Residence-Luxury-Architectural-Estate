import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { PROPERTY_INFO } from '../lib/propertyData';
import { orchestrateSectionReveals } from '../lib/animations';

export function Lifestyle() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = orchestrateSectionReveals(sectionRef.current, {
      triggerOffset: 'top 80%',
      stagger: 0.1,
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="lifestyle"
      className="relative w-full py-24 sm:py-32 bg-[#0c0d0e] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="reveal-header flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-3">
              <span>Section 04</span>
              <span aria-hidden="true">·</span>
              <span>Coastal Enclave</span>
            </div>
            <h2 className="reveal-header text-3xl sm:text-5xl font-serif text-[#f4f2ee] font-light tracking-tight max-w-xl">
              Lifestyle & Surrounds
            </h2>
          </div>

          <div className="max-w-md">
            <p className="reveal-header text-sm sm:text-base text-stone-400 font-light leading-relaxed">
              {PROPERTY_INFO.lifestyle.lead}
            </p>
          </div>
        </div>

        {/* 4-Panel Cinematic Lifestyle Imagery Grid (Garden, Pool, Dining, Evening) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {PROPERTY_INFO.lifestyle.aspects.map((aspect, idx) => (
            <div
              key={aspect.title}
              className="reveal-item group relative flex flex-col bg-[#121316] border border-white/5 overflow-hidden hover:border-[#c5a880]/30 transition-all duration-300"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={aspect.image}
                  alt={aspect.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-[#c5a880] bg-black/60 backdrop-blur-xs px-2.5 py-1 border border-white/10">
                  Plate 0{idx + 1}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#c5a880] mb-1 font-sans">
                    {aspect.subtitle}
                  </div>
                  <h3 className="font-serif text-xl text-white font-normal mb-2">
                    {aspect.title}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-light">
                    {aspect.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Location & Enclave Highlights (Structured Data) */}
        <div className="pt-16 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <div className="reveal-header flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c5a880] mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Regional Geography</span>
              </div>
              <h3 className="reveal-header text-2xl sm:text-3xl font-serif text-white">
                Strategic Proximity & Enclave Access
              </h3>
            </div>
            <div className="reveal-header text-xs text-stone-500 font-mono">
              Coordinates: {PROPERTY_INFO.location.coordinates}
            </div>
          </div>

          {/* Structured location highlights: Downtown, Airport, Restaurants, Shopping, Schools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROPERTY_INFO.lifestyle.locations.map((loc) => (
              <div
                key={loc.name}
                className="reveal-item p-6 bg-[#121316] border border-white/5 hover:border-white/20 transition-all group"
              >
                <div className="flex items-center justify-between text-xs text-stone-500 uppercase tracking-widest mb-3">
                  <span className="text-[#c5a880]">{loc.category}</span>
                  <span className="text-[10px] border border-white/10 px-2 py-0.5 text-stone-400">
                    {loc.type}
                  </span>
                </div>

                <div className="font-serif text-lg text-stone-100 group-hover:text-[#c5a880] transition-colors mb-1">
                  {loc.name}
                </div>

                <div className="text-xs text-stone-400 font-light">
                  {loc.note}
                </div>
              </div>
            ))}
          </div>

          <div className="reveal-item mt-6 text-center text-xs text-stone-500 font-light">
            Exact transport arrival routes and helicopter landing zones verified upon private dossier registration.
          </div>
        </div>
      </div>
    </section>
  );
}
