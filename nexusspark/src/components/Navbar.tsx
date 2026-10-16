"use client";

import { useState, useEffect } from "react";
import { Zap, ArrowRight, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenPitchModal: () => void;
  onOpenInvestorModal: () => void;
  activePersona: "all" | "founder" | "investor";
  setActivePersona: (p: "all" | "founder" | "investor") => void;
}

export default function Navbar({
  onOpenPitchModal,
  onOpenInvestorModal,
  activePersona,
  setActivePersona,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 md:px-8 py-3.5 ${
        scrolled
          ? "bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-[#E6E4DD] shadow-[0_2px_16px_rgba(17,17,16,0.03)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          data-magnetic="true"
          data-cursor-text="Nexus"
        >
          <div className="relative w-8 h-8 rounded-lg bg-[#111110] p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-sm flex items-center justify-center">
            <Zap className="w-4 h-4 text-[#FAF8F5] fill-[#FAF8F5]" />
            {/* Terracotta Spark indicator */}
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5A36] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5A36]"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1 font-bold tracking-[-0.03em] text-base text-[#111110]">
              <span>Nexus</span>
              <span className="text-[#686763] font-normal">Spark</span>
            </div>
            <span className="text-[9px] font-mono font-medium text-[#9A9891] tracking-wider uppercase -mt-0.5">
              Founder &bull; Investor Synapse
            </span>
          </div>
        </a>

        {/* Center Navigation Links (Editorial Minimalist Pill) */}
        <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F3F1EC] border border-[#E2DFD7] shadow-[0_1px_2px_rgba(17,17,16,0.02)]">
          <a
            href="#hero"
            className="text-xs font-medium text-[#686763] hover:text-[#111110] px-3 py-1 rounded-full transition-colors hover:bg-white"
            data-magnetic="true"
          >
            The Synapse
          </a>
          <a
            href="#live-stream"
            className="text-xs font-medium text-[#686763] hover:text-[#111110] px-3 py-1 rounded-full transition-colors hover:bg-white"
            data-magnetic="true"
          >
            Idea Stream
          </a>
          <a
            href="#how-it-works"
            className="text-xs font-medium text-[#686763] hover:text-[#111110] px-3 py-1 rounded-full transition-colors hover:bg-white"
            data-magnetic="true"
          >
            How It Works
          </a>
          <a
            href="#persona-matrix"
            className="text-xs font-medium text-[#686763] hover:text-[#111110] px-3 py-1 rounded-full transition-colors hover:bg-white"
            data-magnetic="true"
          >
            Dual Persona
          </a>
          <a
            href="#launchpad"
            className="text-xs font-medium text-[#686763] hover:text-[#111110] px-3 py-1 rounded-full transition-colors hover:bg-white"
            data-magnetic="true"
          >
            Launchpad
          </a>
        </nav>

        {/* Live Ticker & Dual CTAs */}
        <div className="flex items-center gap-2.5">
          {/* Live indicator pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F1EC] border border-[#E2DFD7] text-[#111110] text-xs font-mono">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10B981]"></span>
            </span>
            <span className="tabular-nums font-semibold">640 Syndicates</span>
          </div>

          {/* Quick Pitch Action Button */}
          <button
            onClick={onOpenPitchModal}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#111110] bg-[#F3F1EC] hover:bg-[#EAE7DF] border border-[#E2DFD7] transition-all shadow-[0_1px_2px_rgba(17,17,16,0.03)] flex items-center gap-1.5"
            data-magnetic="true"
            data-cursor-text="Pitch"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A36]" />
            <span>Pitch Idea</span>
          </button>

          {/* Investor Discovery Button (Solid Deep Obsidian Ink Pill) */}
          <button
            onClick={onOpenInvestorModal}
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-[#FAF8F5] bg-[#111110] hover:bg-[#252523] shadow-[0_2px_8px_rgba(17,17,16,0.15)] transition-all flex items-center gap-1.5"
            data-magnetic="true"
            data-cursor-text="Deals"
          >
            <span>Explore Deals</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FAF8F5]/80 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
