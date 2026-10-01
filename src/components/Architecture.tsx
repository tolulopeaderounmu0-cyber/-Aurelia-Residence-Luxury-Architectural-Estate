import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Layers } from 'lucide-react';
import { PROPERTY_INFO } from '../lib/propertyData';
import { orchestrateSectionReveals } from '../lib/animations';

export function Architecture() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSpaceIndex, setActiveSpaceIndex] = useState(0);
  const activeSpace = PROPERTY_INFO.spaces[activeSpaceIndex];

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = orchestrateSectionReveals(sectionRef.current, {
      triggerOffset: 'top 80%',
      stagger: 0.08,
    });
    return () => ctx.revert();
  }, []);

  const handleNext = () => {
    setActiveSpaceIndex((prev) => (prev + 1) % PROPERTY_INFO.spaces.length);
  };

  const handlePrev = () => {
    setActiveSpaceIndex((prev) => (prev - 1 + PROPERTY_INFO.spaces.length) % PROPERTY_INFO.spaces.length);
  };

  return (
    <section
      ref={sectionRef}
      id="architecture"
      className="relative w-full py-24 sm:py-32 bg-[#0c0d0e] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="reveal-header flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-3">
              <span>Section 03</span>
              <span aria-hidden="true">·</span>
              <span>Spatial Volumes</span>
            </div>
            <h2 className="reveal-header text-3xl sm:text-5xl font-serif text-[#f4f2ee] font-light tracking-tight">
              Architecture & Interiors
            </h2>
          </div>

          <div className="reveal-header flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-stone-500 mr-2">
              0{activeSpaceIndex + 1} / 0{PROPERTY_INFO.spaces.length}
            </span>
            <button
              onClick={handlePrev}
              className="p-3 border border-white/10 hover:border-[#c5a880] text-stone-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous Architectural Volume"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 border border-white/10 hover:border-[#c5a880] text-stone-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Next Architectural Volume"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Space Navigation Tabs */}
        <div className="reveal-item flex items-center space-x-2 sm:space-x-4 overflow-x-auto pb-4 mb-12 scrollbar-none border-b border-white/10">
          {PROPERTY_INFO.spaces.map((space, idx) => (
            <button
              key={space.id}
              onClick={() => setActiveSpaceIndex(idx)}
              className={`px-4 py-2.5 text-xs uppercase tracking-[0.16em] whitespace-nowrap transition-all cursor-pointer font-medium ${
                idx === activeSpaceIndex
                  ? 'border-b-2 border-[#c5a880] text-white -mb-[1px]'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <span>{space.title}</span>
            </button>
          ))}
        </div>

        {/* Main Editorial Space Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Large Architectural Photography Area */}
          <div className="reveal-item lg:col-span-8 group relative overflow-hidden bg-[#151618]">
            <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
              <img
                src={activeSpace.image}
                alt={activeSpace.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Materiality Tag in Bottom Left */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#0c0d0e]/90 backdrop-blur-md px-4 py-2.5 border border-white/10 text-xs text-stone-300">
              <span className="text-[10px] uppercase tracking-widest text-[#c5a880] block mb-0.5">
                Material Palette
              </span>
              <span className="font-light">{activeSpace.materiality}</span>
            </div>
          </div>

          {/* Editorial Space Details */}
          <div className="reveal-item lg:col-span-4 space-y-6">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-[#c5a880] font-sans mb-1">
                {activeSpace.category}
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#f4f2ee] font-normal leading-tight">
                {activeSpace.title}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
              {activeSpace.description}
            </p>

            {/* Architectural Specifications List */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="text-[11px] uppercase tracking-widest text-stone-400">
                Design Specifications
              </div>
              <ul className="space-y-2">
                {activeSpace.specs.map((spec, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-stone-300">
                    <span className="w-1 h-1 rounded-full bg-[#c5a880]" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Volume Index indicator */}
            <div className="pt-4 text-[11px] text-stone-500 uppercase tracking-widest flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Volume 0{activeSpaceIndex + 1} of 0{PROPERTY_INFO.spaces.length}</span>
            </div>
          </div>
        </div>

        {/* Gallery Grid Miniatures */}
        <div className="reveal-item mt-16 grid grid-cols-2 sm:grid-cols-5 gap-3 pt-12 border-t border-white/10">
          {PROPERTY_INFO.spaces.map((sp, idx) => (
            <button
              key={sp.id}
              onClick={() => setActiveSpaceIndex(idx)}
              className={`text-left group cursor-pointer p-2 border transition-all ${
                idx === activeSpaceIndex
                  ? 'border-[#c5a880] bg-[#1a1b1f]'
                  : 'border-white/5 bg-[#121316] hover:border-white/20'
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden mb-2">
                <img
                  src={sp.image}
                  alt={sp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-[11px] font-medium text-stone-200 truncate">{sp.title}</div>
              <div className="text-[10px] text-stone-400 uppercase tracking-wider">{sp.category}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
