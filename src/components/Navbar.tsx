import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { scrollToTarget } from '../lib/animationConfig';
import { PROPERTY_INFO } from '../lib/propertyData';

interface NavbarProps {
  onOpenViewing: () => void;
  onOpenBrochure: () => void;
}

export function Navbar({ onOpenViewing, onOpenBrochure }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', target: '#overview' },
    { label: '3D Spatial', target: '#property-3d' },
    { label: 'Architecture', target: '#architecture' },
    { label: 'Lifestyle', target: '#lifestyle' },
    { label: 'Details', target: '#details' },
  ];

  const handleNavClick = (target: string) => {
    setMobileMenuOpen(false);
    scrollToTarget(target);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0c0d0e]/90 backdrop-blur-md border-b border-white/5 py-4'
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo & Editorial Monogram */}
          <button
            onClick={() => scrollToTarget('#hero')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <div className="font-serif text-xl sm:text-2xl tracking-[0.25em] text-[#f4f2ee] font-medium group-hover:text-[#c5a880] transition-colors">
              {PROPERTY_INFO.name.toUpperCase()}
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-stone-400">
              {PROPERTY_INFO.location.city} · {PROPERTY_INFO.location.estate}
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs tracking-[0.16em] uppercase text-stone-300">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.target)}
                className="hover:text-[#c5a880] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c5a880] hover:after:w-full after:transition-all cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Button & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenViewing}
              className="hidden sm:inline-flex items-center space-x-2 text-xs uppercase tracking-[0.18em] px-5 py-2.5 border border-[#c5a880]/60 text-[#c5a880] hover:bg-[#c5a880] hover:text-[#0c0d0e] transition-all duration-300 font-medium cursor-pointer"
            >
              <span>Book Viewing</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#0c0d0e]/98 backdrop-blur-xl md:hidden pt-28 px-8 flex flex-col justify-between pb-12">
          <div className="space-y-6">
            <div className="text-xs uppercase tracking-[0.2em] text-[#c5a880] mb-6">
              Navigation
            </div>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.target)}
                className="block text-2xl font-serif text-[#f4f2ee] hover:text-[#c5a880] transition-colors text-left w-full"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="space-y-4 pt-8 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenViewing();
              }}
              className="w-full py-3.5 bg-[#c5a880] text-[#0c0d0e] text-xs uppercase tracking-widest font-semibold"
            >
              Book a Private Viewing
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBrochure();
              }}
              className="w-full py-3 border border-white/20 text-stone-300 text-xs uppercase tracking-widest hover:text-white"
            >
              Request Dossier
            </button>
          </div>
        </div>
      )}
    </>
  );
}
