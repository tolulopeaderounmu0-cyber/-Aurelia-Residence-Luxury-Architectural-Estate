import { useState, useEffect, useRef } from 'react';
import { Download, ShieldCheck, ChevronRight } from 'lucide-react';
import { PROPERTY_INFO, FloorPlanLevel } from '../lib/propertyData';
import { orchestrateSectionReveals } from '../lib/animations';

interface PropertyDetailsProps {
  onOpenBrochure: () => void;
  onOpenViewing: () => void;
}

export function PropertyDetails({ onOpenBrochure, onOpenViewing }: PropertyDetailsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFloorId, setActiveFloorId] = useState<string>('ground');
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = orchestrateSectionReveals(sectionRef.current, {
      triggerOffset: 'top 80%',
      stagger: 0.08,
    });
    return () => ctx.revert();
  }, []);

  const activeFloor: FloorPlanLevel =
    PROPERTY_INFO.floorPlans.find((fp) => fp.id === activeFloorId) || PROPERTY_INFO.floorPlans[0];

  return (
    <section
      ref={sectionRef}
      id="details"
      className="relative w-full py-24 sm:py-32 bg-[#0c0d0e] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="reveal-header flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-3">
              <span>Section 05</span>
              <span aria-hidden="true">·</span>
              <span>Architectural Specifications</span>
            </div>
            <h2 className="reveal-header text-3xl sm:text-5xl font-serif text-[#f4f2ee] font-light tracking-tight">
              Details & Floor Plans
            </h2>
          </div>

          <div className="reveal-header flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={onOpenBrochure}
              className="px-6 py-3 border border-[#c5a880] text-[#c5a880] hover:bg-[#c5a880] hover:text-[#0c0d0e] text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 cursor-pointer font-medium"
            >
              <Download className="w-4 h-4" />
              <span>Download Brochure</span>
            </button>
          </div>
        </div>

        {/* Pricing & Exclusive Offering Banner */}
        <div className="reveal-item p-8 sm:p-10 bg-[#121316] border border-white/10 mb-20 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c5a880]">
              <ShieldCheck className="w-4 h-4" />
              <span>Offering Status: Exclusive Off-Market Representation</span>
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-serif text-white">
              {PROPERTY_INFO.price.display}
            </div>
            <div className="text-xs text-stone-400 font-light">
              {PROPERTY_INFO.price.terms}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onOpenViewing}
              className="px-8 py-3.5 bg-[#c5a880] text-[#0c0d0e] text-xs uppercase tracking-widest font-semibold hover:bg-[#dfcaa7] transition-colors cursor-pointer text-center"
            >
              Request Private Tour
            </button>
            <button
              onClick={onOpenBrochure}
              className="px-6 py-3.5 border border-white/20 text-stone-300 hover:text-white hover:border-white text-xs uppercase tracking-widest transition-colors cursor-pointer text-center"
            >
              Acquisition Dossier
            </button>
          </div>
        </div>

        {/* INTERACTIVE FLOOR PLAN SELECTOR */}
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
            <div>
              <span className="reveal-header text-xs uppercase tracking-[0.2em] text-[#c5a880]">Architectural Drawings</span>
              <h3 className="reveal-header text-2xl sm:text-3xl font-serif text-white mt-1">Spatial Schematics</h3>
            </div>

            {/* Floor Selector Buttons */}
            <div className="reveal-item flex items-center gap-2 bg-[#121316] p-1 border border-white/10">
              {PROPERTY_INFO.floorPlans.map((fp) => (
                <button
                  key={fp.id}
                  onClick={() => setActiveFloorId(fp.id)}
                  className={`px-4 sm:px-5 py-2 text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    activeFloorId === fp.id
                      ? 'bg-[#c5a880] text-[#0c0d0e] font-semibold shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {fp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Floor Plan Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* SVG Architectural Blueprint Visual */}
            <div className="reveal-item lg:col-span-7 bg-[#121316] border border-white/10 p-6 sm:p-8 relative">
              <div className="flex items-center justify-between mb-4 text-xs text-stone-500 font-mono">
                <span className="uppercase tracking-widest text-stone-400">{activeFloor.level}</span>
                <span>Scale: 1:100 Metric</span>
              </div>

              {/* Blueprint Visual Rendering */}
              <div className="relative aspect-[16/11] w-full border border-dashed border-white/15 bg-[#0a0b0d] p-4 flex items-center justify-center overflow-hidden">
                {/* Subtle blueprint grid */}
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, #c5a880 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Vector Architectural Floor Plan */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-stone-400 relative z-10 select-none"
                >
                  {/* Outer structural envelope */}
                  <rect
                    x="5"
                    y="10"
                    width="90"
                    height="80"
                    fill="none"
                    stroke="#3b3d44"
                    strokeWidth="1.2"
                  />
                  <rect
                    x="7"
                    y="12"
                    width="86"
                    height="76"
                    fill="none"
                    stroke="#222328"
                    strokeWidth="0.6"
                    strokeDasharray="2 2"
                  />

                  {/* Floor Specific Zones */}
                  {activeFloor.zones.map((zone, idx) => {
                    const isHovered = hoveredZone === zone.name;
                    return (
                      <g
                        key={zone.name}
                        onMouseEnter={() => setHoveredZone(zone.name)}
                        onMouseLeave={() => setHoveredZone(null)}
                        className="cursor-pointer transition-all duration-300"
                      >
                        <path
                          d={zone.coordinates}
                          fill={isHovered ? 'rgba(197, 168, 128, 0.25)' : 'rgba(255, 255, 255, 0.04)'}
                          stroke={isHovered ? '#c5a880' : '#4a4d57'}
                          strokeWidth={isHovered ? '1.2' : '0.8'}
                        />
                        <text
                          x={idx * 16 + 20}
                          y={idx * 10 + 38}
                          fill={isHovered ? '#c5a880' : '#8c8e96'}
                          fontSize="3.2"
                          fontFamily="sans-serif"
                          letterSpacing="0.05em"
                        >
                          {zone.name}
                        </text>
                        <text
                          x={idx * 16 + 20}
                          y={idx * 10 + 42}
                          fill="#5a5d66"
                          fontSize="2.4"
                          fontFamily="monospace"
                        >
                          {zone.dimensions}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Floor Level Stamp */}
                <div className="absolute bottom-3 left-3 bg-[#0c0d0e]/90 px-3 py-1.5 border border-white/10 text-[10px] uppercase tracking-widest text-[#c5a880] font-mono">
                  {activeFloor.area}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-stone-500 font-light">
                <span>Hover zones to highlight architectural envelope</span>
                <span>Studio VANDENBERG CAD Archive Rev 4.2</span>
              </div>
            </div>

            {/* Floor Detail Panel */}
            <div className="reveal-item lg:col-span-5 space-y-6">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] mb-1 font-sans">
                  {activeFloor.level}
                </div>
                <h4 className="text-2xl font-serif text-white font-normal">
                  {activeFloor.label} Overview
                </h4>
                <div className="text-xs text-stone-400 mt-1">
                  Gross Area: <span className="text-stone-200">{activeFloor.area}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                {activeFloor.description}
              </p>

              {/* Key Spaces in this Floor */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="text-xs uppercase tracking-wider text-stone-400">
                  Key Spaces & Amenities
                </div>
                <div className="space-y-2">
                  {activeFloor.keySpaces.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-stone-300 p-2 bg-[#0c0d0e] border border-white/5"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ESTATE TECHNICAL SPECIFICATIONS GRID */}
        <div>
          <div className="border-b border-white/10 pb-4 mb-8">
            <span className="reveal-header text-xs uppercase tracking-[0.2em] text-[#c5a880]">Technical Systems</span>
            <h3 className="reveal-header text-2xl sm:text-3xl font-serif text-white mt-1">Structural & Engineering Dossier</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROPERTY_INFO.specifications.map((spec) => (
              <div
                key={spec.title}
                className="reveal-item p-5 bg-[#121316] border border-white/5 hover:border-white/20 transition-colors"
              >
                <div className="text-xs uppercase tracking-wider text-[#c5a880] mb-2 font-medium">
                  {spec.title}
                </div>
                <div className="text-xs text-stone-300 leading-relaxed font-light">
                  {spec.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
