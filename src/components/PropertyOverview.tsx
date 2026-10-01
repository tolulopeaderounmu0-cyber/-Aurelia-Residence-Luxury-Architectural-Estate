import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { PROPERTY_INFO } from '../lib/propertyData';
import { scrollToTarget } from '../lib/animationConfig';
import { orchestrateSectionReveals } from '../lib/animations';

export function PropertyOverview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = orchestrateSectionReveals(sectionRef.current, {
      triggerOffset: 'top 80%',
      stagger: 0.08,
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="overview"
      className="relative w-full py-24 sm:py-32 bg-[#0c0d0e] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="reveal-header flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-3">
              <span>Section 01</span>
              <span aria-hidden="true">·</span>
              <span>Monograph & Synthesis</span>
            </div>
            <h2 className="reveal-header text-3xl sm:text-5xl font-serif text-[#f4f2ee] font-light tracking-tight max-w-xl">
              An Architectural Presence on the Pacific Rim
            </h2>
          </div>

          <div className="max-w-md">
            <p className="reveal-header text-sm sm:text-base text-stone-400 font-light leading-relaxed">
              {PROPERTY_INFO.description.architectural}
            </p>
          </div>
        </div>

        {/* Large Property Image Showcase with Editorial Accents */}
        <div className="reveal-item relative mb-20 group overflow-hidden">
          <div className="aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-[#151618]">
            <img
              src={PROPERTY_INFO.overviewImage}
              alt="Aurelia Residence Architectural Perspective"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
          </div>

          {/* Editorial Image Overlay Caption */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 font-light border-b border-white/10 pb-4">
            <div>
              <span className="text-stone-300 font-medium">Plate 01:</span> West Elevation at 18:40 PST — Monolithic Travertine Cantilever & Seawater Horizon
            </div>
            <div className="text-[11px] tracking-widest uppercase text-stone-400 mt-1 sm:mt-0">
              Natural Light Study · Studio VANDENBERG
            </div>
          </div>
        </div>

        {/* Property Statistics Generated Strictly from Structured Data */}
        <div>
          <div className="reveal-header flex items-center justify-between mb-8 border-b border-white/10 pb-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#c5a880]">Estate Metrics</span>
            <span className="text-xs text-stone-500 tracking-wider">Metric / Imperial Standards</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {PROPERTY_INFO.stats.map((stat) => (
              <div
                key={stat.label}
                className="reveal-item flex flex-col justify-between p-5 bg-[#121316] border border-white/5 hover:border-[#c5a880]/30 transition-all duration-300 group"
              >
                <div>
                  <div className="text-xs uppercase tracking-wider text-stone-400 font-light mb-2">
                    {stat.label}
                  </div>
                  <div className="flex items-baseline gap-1 text-3xl sm:text-4xl font-serif text-[#f4f2ee] font-normal group-hover:text-[#c5a880] transition-colors">
                    <span>{stat.value}</span>
                    {stat.unit && (
                      <span className="text-xs font-sans text-stone-400 uppercase tracking-widest">
                        {stat.unit}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 text-[11px] text-stone-500 leading-normal">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transition Link to 3D Experience */}
        <div className="reveal-item mt-16 text-center">
          <button
            onClick={() => scrollToTarget('#property-3d')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-[#c5a880] transition-colors cursor-pointer group"
          >
            <span>Examine Spatial Volumes in 3D</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
