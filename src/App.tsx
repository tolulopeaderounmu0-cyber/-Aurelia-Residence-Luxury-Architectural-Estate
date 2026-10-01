import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertyOverview } from './components/PropertyOverview';
import { Property3D } from './components/Property3D';
import { Architecture } from './components/Architecture';
import { Lifestyle } from './components/Lifestyle';
import { PropertyDetails } from './components/PropertyDetails';
import { FinalCTA } from './components/FinalCTA';
import { PrivateViewingModal } from './components/modals/PrivateViewingModal';
import { BrochureModal } from './components/modals/BrochureModal';
import { initSmoothScroll } from './lib/animationConfig';

export default function App() {
  const [isViewingModalOpen, setIsViewingModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  // Initialize Lenis smooth scroll and connect with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = initSmoothScroll();

    return () => {
      lenis?.destroy();
    };
  }, []);

  const handleOpenViewing = () => setIsViewingModalOpen(true);
  const handleCloseViewing = () => setIsViewingModalOpen(false);

  const handleOpenBrochure = () => setIsBrochureModalOpen(true);
  const handleCloseBrochure = () => setIsBrochureModalOpen(false);

  return (
    <div className="relative min-h-screen bg-[#0c0d0e] text-[#edeae3] selection:bg-[#c5a880]/30 selection:text-[#f4f2ee]">
      {/* Persistent Minimalist Luxury Header */}
      <Navbar
        onOpenViewing={handleOpenViewing}
        onOpenBrochure={handleOpenBrochure}
      />

      <main>
        {/* Section 1: Cinematic Hero */}
        <Hero onOpenViewing={handleOpenViewing} />

        {/* Section 2: Property Overview */}
        <PropertyOverview />

        {/* Section 3: Interactive 3D Property (Three.js / React Three Fiber) */}
        <Property3D />

        {/* Section 4: Architecture & Interiors */}
        <Architecture />

        {/* Section 5: Lifestyle & Location */}
        <Lifestyle />

        {/* Section 6: Property Details & Availability */}
        <PropertyDetails
          onOpenBrochure={handleOpenBrochure}
          onOpenViewing={handleOpenViewing}
        />

        {/* Section 7: Final CTA */}
        <FinalCTA
          onOpenViewing={handleOpenViewing}
          onOpenBrochure={handleOpenBrochure}
        />
      </main>

      {/* Interactive Booking & Dossier Modal Dialogs */}
      <PrivateViewingModal
        isOpen={isViewingModalOpen}
        onClose={handleCloseViewing}
      />

      <BrochureModal
        isOpen={isBrochureModalOpen}
        onClose={handleCloseBrochure}
      />
    </div>
  );
}
