import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Compass } from 'lucide-react';
import { PROPERTY_INFO } from '../lib/propertyData';
import { scrollToTarget } from '../lib/animationConfig';
import { animateHeroEntrance } from '../lib/animations';

interface HeroProps {
  onOpenViewing: () => void;
}

export function Hero({ onOpenViewing }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = animateHeroEntrance(heroRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#0c0d0e]"
    >
      {/* Background Architectural Canvas / Visual Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={PROPERTY_INFO.heroImage}
          alt="Aurelia Residence — Cliffside Architecture"
          className="hero-bg-image w-full h-full object-cover object-center scale-105"
        />
        {/* Subtle cinematic editorial gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-[#0c0d0e]/40 to-[#0c0d0e]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0c0d0e_90%)] opacity-70" />
      </div>

      {/* Top spacer for navbar */}
      <div className="pt-28 sm:pt-36" />

      {/* Hero Central Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full my-auto py-12">
        <div className="max-w-4xl space-y-6 sm:space-y-8">
          {/* Subtle Location & Architecture Kicker */}
          <div className="hero-kicker flex items-center space-x-3 text-xs tracking-[0.28em] uppercase text-[#c5a880]">
            <Compass className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>{PROPERTY_INFO.location.estate}</span>
            <span aria-hidden="true" className="text-stone-500">·</span>
            <span>{PROPERTY_INFO.location.city}, {PROPERTY_INFO.location.region}</span>
          </div>

          {/* Large Architectural Headline */}
          <h1 className="hero-headline text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#f4f2ee] font-light leading-[1.05] tracking-tight">
            Sanctuary of <br />
            <span className="italic font-light text-stone-200">Stone & Horizon</span>
          </h1>

          {/* Short Supporting Editorial Description */}
          <p className="hero-desc text-base sm:text-lg md:text-xl text-stone-300 font-light max-w-2xl leading-relaxed">
            {PROPERTY_INFO.description.lead}
          </p>

          {/* CTA Group */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onOpenViewing}
              className="hero-cta px-8 py-4 bg-[#c5a880] text-[#0c0d0e] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#dfcaa7] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-black/40"
            >
              <span>Book a Private Viewing</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToTarget('#overview')}
              className="hero-cta px-8 py-4 border border-white/20 text-[#f4f2ee] text-xs uppercase tracking-[0.2em] font-light hover:border-[#c5a880] hover:text-[#c5a880] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer bg-black/20 backdrop-blur-sm"
            >
              <span>Explore Property</span>
              <ArrowDown className="w-4 h-4 text-stone-400 group-hover:text-[#c5a880]" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar / Scroll Indicator */}
      <div className="hero-bottom-bar relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full pb-8 sm:pb-12">
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center space-x-6 text-[11px] tracking-[0.2em] uppercase">
            <div>
              <span className="text-stone-500">Architect:</span>{' '}
              <span className="text-stone-300 font-medium">{PROPERTY_INFO.architect}</span>
            </div>
            <span aria-hidden="true" className="text-stone-600">/</span>
            <div>
              <span className="text-stone-500">Completion:</span>{' '}
              <span className="text-stone-300 font-medium">{PROPERTY_INFO.completionYear}</span>
            </div>
          </div>

          {/* Interactive Scroll Indicator */}
          <button
            onClick={() => scrollToTarget('#overview')}
            className="flex items-center space-x-3 text-stone-400 hover:text-[#c5a880] transition-colors cursor-pointer group"
          >
            <span className="text-[10px] uppercase tracking-[0.25em]">Scroll to Discover</span>
            <div className="w-5 h-8 border border-stone-500/60 rounded-full flex items-start justify-center p-1 group-hover:border-[#c5a880] transition-colors">
              <div className="w-1 h-2 bg-[#c5a880] rounded-full animate-bounce mt-0.5" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
