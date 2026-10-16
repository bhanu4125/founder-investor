"use client";

import { useState } from "react";
import MagneticCursor from "@/components/MagneticCursor";
import BackgroundGrid from "@/components/BackgroundGrid";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IdeaStreamMarquee from "@/components/IdeaStreamMarquee";
import HowItWorksSection from "@/components/HowItWorksSection";
import PersonaSwitcher from "@/components/PersonaSwitcher";
import ManifestoSection from "@/components/ManifestoSection";
import LaunchpadFooter from "@/components/LaunchpadFooter";
import PitchModal from "@/components/PitchModal";
import InvestorModal from "@/components/InvestorModal";
import { FounderIdea, InvestorProfile } from "@/lib/data";

export default function Home() {
  const [activePersona, setActivePersona] = useState<"founder" | "investor">("founder");
  const [pitchModalOpen, setPitchModalOpen] = useState(false);
  const [investorModalOpen, setInvestorModalOpen] = useState(false);

  // When an idea or investor is clicked in the marquee
  const handleSelectIdea = (idea: FounderIdea) => {
    setPitchModalOpen(true);
  };

  const handleSelectInvestor = (investor: InvestorProfile) => {
    setInvestorModalOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-[#FAF8F5] text-[#111110] selection:bg-[#FF5A36]/15 selection:text-[#111110]">
      {/* Custom Magnetic Cursor */}
      <MagneticCursor />

      {/* Interactive Radial-Illuminating SVG Background Grid & Ambient Glows */}
      <BackgroundGrid activePersona={activePersona} />

      {/* Floating Glassmorphic Navbar */}
      <Navbar
        onOpenPitchModal={() => setPitchModalOpen(true)}
        onOpenInvestorModal={() => setInvestorModalOpen(true)}
        activePersona={activePersona}
        setActivePersona={(p) => setActivePersona(p === "all" ? "founder" : p)}
      />

      {/* SECTION 1 & 2: Hero - The Synapse Ignition */}
      <HeroSection
        onOpenPitchModal={() => setPitchModalOpen(true)}
        onOpenInvestorModal={() => setInvestorModalOpen(true)}
      />

      {/* SECTION 3: Live Idea & Capital Stream Marquee (3D Tilt Bento Cards) */}
      <IdeaStreamMarquee
        onSelectIdea={handleSelectIdea}
        onSelectInvestor={handleSelectInvestor}
      />

      {/* SECTION 4: Scroll-Linked Storytelling - How Collaboration Happens */}
      <HowItWorksSection />

      {/* SECTION 5: Interactive Persona Switcher (Founder vs Investor) */}
      <PersonaSwitcher
        activePersona={activePersona}
        setActivePersona={setActivePersona}
        onOpenPitchModal={() => setPitchModalOpen(true)}
        onOpenInvestorModal={() => setInvestorModalOpen(true)}
      />

      {/* SECTION 6: Manifesto & Layered Parallax Showcase */}
      <ManifestoSection />

      {/* SECTION 7: The Launchpad Footer CTA */}
      <LaunchpadFooter
        onOpenPitchModal={() => setPitchModalOpen(true)}
        onOpenInvestorModal={() => setInvestorModalOpen(true)}
      />

      {/* Interactive Modals */}
      <PitchModal
        isOpen={pitchModalOpen}
        onClose={() => setPitchModalOpen(false)}
      />

      <InvestorModal
        isOpen={investorModalOpen}
        onClose={() => setInvestorModalOpen(false)}
      />
    </main>
  );
}
