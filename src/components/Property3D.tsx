import { useState, useCallback, useEffect, useRef } from 'react';
import { RotateCw, Compass, Eye, Move3d, Sparkles, ChevronRight } from 'lucide-react';
import { PropertyScene } from './three/PropertyScene';
import { PROPERTY_INFO, CameraPosition } from '../lib/propertyData';
import { gsap, ScrollTrigger } from '../lib/animationConfig';

const WAYPOINTS = [
  { id: 'exterior', step: '01', label: 'Exterior', subtitle: 'Monolithic Cantilever' },
  { id: 'living', step: '02', label: 'Great Room', subtitle: '14ft Structural Glazing' },
  { id: 'kitchen', step: '03', label: 'Kitchen', subtitle: 'Calacatta Marble Island' },
  { id: 'bedroom', step: '04', label: 'Master Suite', subtitle: 'Private Terrace Horizon' },
  { id: 'pool', step: '05', label: 'Infinity Pool', subtitle: '82ft Seawater Basin' },
];

export function Property3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTrackRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<'scroll' | 'orbit'>('scroll');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSpaceId, setActiveSpaceId] = useState<string>('exterior');
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [cameraCoords, setCameraCoords] = useState<{ x: number; y: number; z: number }>({
    x: 14,
    y: 8,
    z: 16,
  });

  const activeSpaceConfig =
    PROPERTY_INFO.cameraPositions.find((c) => c.id === activeSpaceId) ||
    PROPERTY_INFO.cameraPositions[0];

  const matchingSpaceInfo = PROPERTY_INFO.spaces.find((s) => s.id === activeSpaceId);

  // Set up GSAP ScrollTrigger for pinned cinematic camera choreography
  useEffect(() => {
    if (!containerRef.current || !pinTrackRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=250%',
        pin: pinTrackRef.current,
        pinSpacing: true,
        scrub: 0.8,
        onUpdate: (self) => {
          if (mode === 'scroll') {
            setScrollProgress(self.progress);
          }
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [mode]);

  const handleCameraUpdate = useCallback((coords: { x: number; y: number; z: number }) => {
    setCameraCoords(coords);
  }, []);

  const handleActiveSpaceChange = useCallback((spaceId: string) => {
    setActiveSpaceId(spaceId);
  }, []);

  // Jump to specific waypoint
  const handleSelectWaypoint = (id: string, index: number) => {
    setActiveSpaceId(id);
    if (mode === 'scroll') {
      const targetP = index / (WAYPOINTS.length - 1);
      setScrollProgress(targetP);
    }
  };

  return (
    <section
      ref={containerRef}
      id="property-3d"
      className="relative w-full bg-[#0c0d0e] border-t border-white/5"
    >
      {/* Pinned Stage Container (Holds the 3D Canvas & HUD during scroll scrub) */}
      <div ref={pinTrackRef} className="relative w-full h-screen overflow-hidden flex flex-col justify-between">
        {/* Three.js Canvas (Background & Foreground 3D Spatial Environment) */}
        <div className="absolute inset-0 z-0">
          <PropertyScene
            mode={mode}
            scrollProgress={scrollProgress}
            activeViewpointId={activeSpaceId}
            autoRotate={autoRotate}
            onCameraUpdate={handleCameraUpdate}
            onActiveSpaceChange={handleActiveSpaceChange}
          />
        </div>

        {/* ============================================================ */}
        {/* TOP HUD BAR: SECTION MONOGRAM, MODE SWITCH & VANTAGE TITLE   */}
        {/* ============================================================ */}
        <header className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 w-full pt-6 sm:pt-8 pointer-events-none">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 bg-[#0c0d0e]/75 backdrop-blur-md p-4 sm:p-5 border border-white/10 pointer-events-auto">
            {/* Active Space Information */}
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#c5a880] mb-1">
                <span>Section 02</span>
                <span aria-hidden="true">·</span>
                <span>Camera Choreography</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-400">Step 0{WAYPOINTS.findIndex((w) => w.id === activeSpaceId) + 1} of 05</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#f4f2ee] font-normal leading-tight">
                {activeSpaceConfig.label}
              </h2>
              <p className="text-xs text-stone-400 font-light mt-0.5">
                {activeSpaceConfig.subtitle}
              </p>
            </div>

            {/* Mode Controls & Orbit Toggles */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {/* Tour Mode Toggle: Scroll Choreography vs Free Orbit */}
              <div className="flex items-center bg-[#151618] p-1 border border-white/10 text-xs">
                <button
                  onClick={() => setMode('scroll')}
                  className={`px-3 py-1.5 uppercase tracking-wider text-[11px] transition-colors cursor-pointer ${
                    mode === 'scroll'
                      ? 'bg-[#c5a880] text-[#0c0d0e] font-semibold'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Scroll Tour
                </button>
                <button
                  onClick={() => setMode('orbit')}
                  className={`px-3 py-1.5 uppercase tracking-wider text-[11px] transition-colors cursor-pointer flex items-center gap-1.5 ${
                    mode === 'orbit'
                      ? 'bg-[#c5a880] text-[#0c0d0e] font-semibold'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Move3d className="w-3 h-3" />
                  <span>Free Orbit</span>
                </button>
              </div>

              {/* Orbit Auto-Rotate (When in Orbit Mode) */}
              {mode === 'orbit' && (
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`px-3 py-2 text-xs border transition-colors cursor-pointer flex items-center gap-1.5 ${
                    autoRotate
                      ? 'border-[#c5a880] bg-[#c5a880]/10 text-[#c5a880]'
                      : 'border-white/10 bg-[#151618] text-stone-400 hover:text-white'
                  }`}
                  title="Toggle Auto Orbit"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Auto Rotate</span>
                </button>
              )}

              {/* Reset to Exterior */}
              <button
                onClick={() => handleSelectWaypoint('exterior', 0)}
                className="px-3.5 py-2 text-xs uppercase tracking-wider border border-white/10 bg-[#151618] text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        </header>

        {/* ============================================================ */}
        {/* CENTER-LEFT FLOATING EDITORIAL CARD                          */}
        {/* ============================================================ */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 w-full my-auto pointer-events-none">
          {matchingSpaceInfo && (
            <div className="max-w-sm bg-[#0c0d0e]/85 backdrop-blur-md p-5 border border-white/10 space-y-3 pointer-events-auto hidden md:block">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#c5a880]">
                <span>{matchingSpaceInfo.category}</span>
                <span className="text-stone-500 font-mono">
                  {Math.round(scrollProgress * 100)}% Journey
                </span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                {matchingSpaceInfo.description}
              </p>
              <div className="pt-2 border-t border-white/10 text-[11px] text-stone-400">
                <span className="text-stone-300 font-medium">Materiality:</span>{' '}
                {matchingSpaceInfo.materiality}
              </div>
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* BOTTOM HUD: WAYPOINT TIMELINE & SCROLL SCRUB PROGRESS        */}
        {/* ============================================================ */}
        <footer className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 w-full pb-6 sm:pb-8 pointer-events-none">
          <div className="bg-[#0c0d0e]/80 backdrop-blur-md border border-white/10 p-4 sm:p-5 space-y-3 pointer-events-auto">
            {/* Scroll Progress Bar */}
            {mode === 'scroll' && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-stone-400">
                  <span className="text-[#c5a880]">Cinematic Scroll Choreography</span>
                  <span>{Math.round(scrollProgress * 100)}% Progress</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#c5a880] to-[#dfcaa7] transition-all duration-150 ease-out"
                    style={{ width: `${Math.max(4, scrollProgress * 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Waypoint Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
              {WAYPOINTS.map((wp, idx) => {
                const isActive = wp.id === activeSpaceId;
                return (
                  <button
                    key={wp.id}
                    onClick={() => handleSelectWaypoint(wp.id, idx)}
                    className={`p-2.5 sm:p-3 text-left border transition-all cursor-pointer ${
                      isActive
                        ? 'border-[#c5a880] bg-[#1a1b1f] text-white'
                        : 'border-white/5 bg-[#121316] text-stone-400 hover:border-white/20 hover:text-stone-200'
                    }`}
                  >
                    <div className="text-[9px] uppercase tracking-widest text-[#c5a880] font-sans">
                      {wp.step}
                    </div>
                    <div className="font-serif text-xs sm:text-sm text-stone-100 font-medium truncate">
                      {wp.label}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footnote HUD Details */}
            <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-stone-400 font-light">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-mono text-[10px] text-stone-400">
                  <Compass className="w-3 h-3 text-[#c5a880]" />
                  XYZ: {cameraCoords.x.toFixed(1)} / {cameraCoords.y.toFixed(1)} / {cameraCoords.z.toFixed(1)}
                </span>
                <span className="hidden sm:inline text-stone-600">·</span>
                <span className="text-[11px] text-stone-400">
                  {mode === 'scroll'
                    ? 'Scroll down/up to navigate the spatial journey'
                    : 'Left-drag to orbit · Scroll to zoom'}
                </span>
              </div>

              <div className="text-[10px] text-stone-400 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-pulse" />
                <span>PBR Realistic Render Engine</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
