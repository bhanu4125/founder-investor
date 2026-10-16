"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  ShieldCheck,
  Zap,
  TrendingUp,
  ArrowUpRight,
  Flame,
  CheckCircle2,
} from "lucide-react";
import confetti from "canvas-confetti";

interface HeroSectionProps {
  onOpenPitchModal: () => void;
  onOpenInvestorModal: () => void;
}

export default function HeroSection({
  onOpenPitchModal,
  onOpenInvestorModal,
}: HeroSectionProps) {
  const [isIgnited, setIsIgnited] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  const handleTriggerIgnition = (e: React.MouseEvent) => {
    setIsIgnited(true);
    setPulseKey((prev) => prev + 1);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 55,
      spread: 70,
      origin: { x, y },
      colors: ["#FF5A36", "#10B981", "#111110", "#FB923C"],
      ticks: 180,
    });

    setTimeout(() => setIsIgnited(false), 3800);
  };

  const words = [
    { text: "Where", type: "plain" },
    { text: "Visionary", type: "plain" },
    { text: "Ideas", type: "founder" },
    { text: "Meet", type: "plain" },
    { text: "Relentless", type: "plain" },
    { text: "Capital.", type: "investor" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-20 px-4 md:px-8 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Central Iridescent Ambient Blur behind collision */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#FF5A36]/10 via-[#8B5CF6]/8 to-[#10B981]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Editorial Pill Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3F1EC] border border-[#E2DFD7] mb-8 cursor-pointer hover:border-[#111110]/30 transition-colors shadow-sm"
        onClick={handleTriggerIgnition}
        data-magnetic="true"
        data-cursor-text="Synapse"
      >
        <span className="flex h-1.5 w-1.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5A36] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF5A36]"></span>
        </span>
        <span className="text-xs font-medium text-[#686763]">
          Next-Gen Founder &bull; Investor Synapse Engine
        </span>
        <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white text-[#111110] border border-[#E2DFD7]">
          v2.4 Live
        </span>
      </motion.div>

      {/* Kinetic Typography Entrance Headline in Razor-Sharp Deep Obsidian */}
      <div className="max-w-5xl mx-auto text-center perspective-1000 mb-5">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.03em] text-[#111110] leading-[1.08] flex flex-wrap justify-center gap-x-3 gap-y-2">
          {words.map((word, wordIdx) => {
            return (
              <span key={wordIdx} className="inline-flex overflow-hidden">
                {word.text.split("").map((char, charIdx) => {
                  const globalIdx = wordIdx * 10 + charIdx;
                  return (
                    <motion.span
                      key={charIdx}
                      initial={{
                        opacity: 0,
                        y: 35,
                        rotateX: -70,
                        filter: "blur(8px)",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        filter: "blur(0px)",
                      }}
                      transition={{
                        duration: 0.8,
                        delay: globalIdx * 0.025,
                        ease: [0.215, 0.61, 0.355, 1],
                      }}
                      className={
                        word.type === "founder"
                          ? "text-founder-gradient font-extrabold inline-block"
                          : word.type === "investor"
                          ? "text-investor-gradient font-extrabold inline-block"
                          : "text-[#111110] inline-block"
                      }
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            );
          })}
        </h1>
      </div>

      {/* Hero Subtitle in Warm Stone Grey */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="max-w-2xl text-center text-base sm:text-lg text-[#686763] mb-10 leading-relaxed font-normal"
      >
        The decentralized ignition chamber where ambitious founders publish verified technical theses and elite syndicates deploy high-conviction capital in under 72 hours.
      </motion.p>

      {/* Dual Magnetic CTAs: Solid Obsidian Ink + Crisp White Pill */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="flex flex-wrap items-center justify-center gap-3.5 mb-16 z-10"
      >
        {/* Founder CTA: Solid Obsidian Ink with Terracotta Pulse Dot */}
        <button
          onClick={onOpenPitchModal}
          className="relative px-7 py-3.5 rounded-full bg-[#111110] hover:bg-[#252523] text-[#FAF8F5] transition-all duration-300 flex items-center gap-2.5 text-sm font-semibold shadow-[0_4px_16px_rgba(17,17,16,0.15)] group"
          data-magnetic="true"
          data-cursor-text="Pitch"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5A36] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5A36]"></span>
          </span>
          <span>Pitch an Idea</span>
          <ArrowUpRight className="w-4 h-4 text-[#FAF8F5]/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>

        {/* Investor CTA: Crisp White Pill with Butter Shadow */}
        <button
          onClick={onOpenInvestorModal}
          className="px-7 py-3.5 rounded-full bg-white hover:bg-[#F3F1EC] text-[#111110] border border-[#E6E4DD] hover:border-[#111110]/30 transition-all duration-300 flex items-center gap-2.5 text-sm font-semibold shadow-[0_2px_4px_rgba(17,17,16,0.02),0_8px_16px_-4px_rgba(17,17,16,0.04)] group"
          data-magnetic="true"
          data-cursor-text="Deals"
        >
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span>Explore Deals</span>
          <ArrowUpRight className="w-4 h-4 text-[#111110]/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>

        {/* Ignition Trigger Button */}
        <button
          onClick={handleTriggerIgnition}
          className="px-4 py-3.5 rounded-full bg-[#F3F1EC] hover:bg-white border border-[#E2DFD7] text-[#111110] transition-all text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          data-magnetic="true"
          data-cursor-text="Ignite"
        >
          <Flame className="w-3.5 h-3.5 text-[#FF5A36]" />
          <span>Simulate Ignition</span>
        </button>
      </motion.div>

      {/* CENTERPIECE: The "Collision" Graphic & Circuit Bridge */}
      <div className="relative w-full max-w-6xl mx-auto mt-2 px-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
          {/* LEFT: 3D-Tilted Founder Idea Card (Pure White Pearl Surface) */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: 12 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.9, delay: 0.4, type: "spring", stiffness: 120, damping: 14 }}
            whileHover={{ y: -5, rotateY: -2, scale: 1.015 }}
            className="lg:col-span-4 relative rounded-2xl bg-white/95 border border-[#E6E4DD] p-6 shadow-[0_1px_0_0_#FFFFFF_inset,0_12px_32px_-8px_rgba(17,17,16,0.06)] hover:border-[#FF5A36]/40 transition-all duration-300 group"
          >
            {/* Top Founder Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E6E4DD] flex items-center justify-center text-[#FF5A36]">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#111110] block">NeuroFlow AI</span>
                  <span className="text-[10px] text-[#686763] block">AI Supply Chain Synapse</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#F3F1EC] border border-[#E2DFD7] text-[#FF5A36] text-[10px] font-mono font-semibold">
                Pre-Seed &bull; Vetted
              </span>
            </div>

            {/* Pitch Snippet */}
            <p className="text-xs text-[#686763] leading-relaxed mb-4">
              &ldquo;Self-healing logistics graph neural network predicting global customs bottlenecks 72 hours prior.&rdquo;
            </p>

            {/* Metrics Grid with Monospace Pills */}
            <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-[#FAF8F5] border border-[#E6E4DD] mb-4">
              <div>
                <span className="text-[9px] text-[#9A9891] uppercase font-mono font-semibold block">Target Raise</span>
                <span className="text-sm font-bold text-[#111110] font-mono">$1.4M</span>
              </div>
              <div>
                <span className="text-[9px] text-[#9A9891] uppercase font-mono font-semibold block">Equity Offered</span>
                <span className="text-sm font-bold text-[#FF5A36] font-mono">7.5% SAFE</span>
              </div>
            </div>

            {/* Founder Avatar & Status */}
            <div className="flex items-center justify-between pt-2 border-t border-[#E6E4DD]">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Founder Elena"
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-[#E6E4DD]"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#10B981] ring-1 ring-white" />
                </div>
                <div className="text-left">
                  <span className="text-[11px] font-bold text-[#111110] block">Elena Rostova</span>
                  <span className="text-[9px] text-[#9A9891] block">Ex-DeepMind Lead</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-[#FF5A36] font-mono font-bold">
                <span>TX: READY</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36] animate-ping" />
              </div>
            </div>

            {/* Card badge */}
            <div className="absolute -top-3 -left-2 px-2.5 py-0.5 rounded-full bg-[#111110] text-[9px] font-mono uppercase tracking-wider text-[#FAF8F5] shadow-sm">
              The Spark
            </div>
          </motion.div>

          {/* CENTER: Intricate Animated SVG Connection Bridge */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative py-4 lg:py-0">
            <div className="w-full h-36 relative flex items-center justify-center">
              <svg
                viewBox="0 0 360 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full overflow-visible"
              >
                <defs>
                  {/* Terracotta Packet (Founder to Center) */}
                  <linearGradient id="founder-packet" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E6E4DD" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#FB923C" />
                    <stop offset="100%" stopColor="#FF5A36" />
                  </linearGradient>

                  {/* Emerald Packet (Investor to Center) */}
                  <linearGradient id="investor-packet" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#E6E4DD" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#0D9488" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>

                  {/* Central Core Glow */}
                  <radialGradient id="ignition-burst" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="40%" stopColor="#FB923C" stopOpacity="0.4" />
                    <stop offset="80%" stopColor="#10B981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#111110" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Base passive wire routes: Crisp 1.5px dashed #E6E4DD */}
                <path
                  d="M 10 60 C 90 60, 110 35, 180 60 C 250 85, 270 60, 350 60"
                  stroke="#E6E4DD"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 20 40 C 80 40, 120 70, 180 60 C 240 50, 280 80, 340 80"
                  stroke="#E6E4DD"
                  strokeWidth="1.5"
                />
                <path
                  d="M 20 80 C 80 80, 120 50, 180 60 C 240 70, 280 40, 340 40"
                  stroke="#E6E4DD"
                  strokeWidth="1.5"
                />

                {/* Animated Terracotta Packet (Left to Center) */}
                <motion.path
                  d="M 10 60 C 90 60, 110 35, 180 60"
                  stroke="url(#founder-packet)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, pathOffset: 0 }}
                  animate={{
                    pathLength: [0.2, 0.45, 0.2],
                    pathOffset: [0, 1],
                  }}
                  transition={{
                    duration: isIgnited ? 0.9 : 2.2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Animated Emerald Packet (Right to Center) */}
                <motion.path
                  d="M 350 60 C 270 60, 250 85, 180 60"
                  stroke="url(#investor-packet)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, pathOffset: 0 }}
                  animate={{
                    pathLength: [0.2, 0.45, 0.2],
                    pathOffset: [0, 1],
                  }}
                  transition={{
                    duration: isIgnited ? 0.9 : 2.2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Central Collision Core */}
                <motion.circle
                  cx="180"
                  cy="60"
                  r={isIgnited ? 24 : 16}
                  fill="url(#ignition-burst)"
                  animate={{
                    scale: isIgnited ? [1, 1.35, 1] : [1, 1.12, 1],
                    opacity: isIgnited ? [0.95, 1, 0.95] : [0.75, 0.95, 0.75],
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                />

                <circle cx="180" cy="60" r="4.5" fill="#111110" />
              </svg>
            </div>

            {/* Central Glass Badge: Crisp Obsidian Ink */}
            <motion.div
              key={pulseKey}
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [0, -3, 0],
              }}
              transition={{
                scale: { duration: 0.4 },
                opacity: { duration: 0.4 },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
              className="mt-1 px-4 py-1.5 rounded-full bg-[#111110] text-[#FAF8F5] shadow-[0_4px_16px_rgba(17,17,16,0.18)] flex items-center gap-2 cursor-pointer group"
              onClick={handleTriggerIgnition}
              data-magnetic="true"
              data-cursor-text="Match!"
            >
              <Zap className="w-3.5 h-3.5 text-[#FF5A36] fill-[#FF5A36]" />
              <span className="text-[11px] font-semibold tracking-tight text-[#FAF8F5]">
                ⚡ Collaboration Initiated &mdash; Term Sheet Unlocked!
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
            </motion.div>
          </div>

          {/* RIGHT: 3D-Tilted Investor Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -12 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.9, delay: 0.4, type: "spring", stiffness: 120, damping: 14 }}
            whileHover={{ y: -5, rotateY: 2, scale: 1.015 }}
            className="lg:col-span-4 relative rounded-2xl bg-white/95 border border-[#E6E4DD] p-6 shadow-[0_1px_0_0_#FFFFFF_inset,0_12px_32px_-8px_rgba(17,17,16,0.06)] hover:border-[#10B981]/40 transition-all duration-300 group"
          >
            {/* Top Investor Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E6E4DD] flex items-center justify-center text-[#10B981]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#111110] block">Apex Horizon Syndicate</span>
                  <span className="text-[10px] text-[#686763] block">General Partner Lead</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#F3F1EC] border border-[#E2DFD7] text-[#10B981] text-[10px] font-mono font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                Active
              </span>
            </div>

            {/* Check Ready Callout */}
            <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E6E4DD] mb-4 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-[#9A9891] uppercase font-mono font-semibold block">
                  Liquidity Status
                </span>
                <span className="text-sm font-extrabold text-[#10B981] font-mono">
                  $350K Ready to Deploy
                </span>
              </div>
              <span className="text-[9px] font-mono font-semibold text-[#111110] bg-white px-2 py-1 rounded-md border border-[#E6E4DD]">
                Escrow Verified
              </span>
            </div>

            {/* Sector Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {["AI Infra", "Robotics", "DeepTech"].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-[#F3F1EC] border border-[#E2DFD7] text-[10px] font-medium text-[#686763]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Investor Avatar & Bio */}
            <div className="flex items-center justify-between pt-2 border-t border-[#E6E4DD]">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                    alt="Investor Aria"
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-[#E6E4DD]"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#10B981] ring-1 ring-white" />
                </div>
                <div className="text-left">
                  <span className="text-[11px] font-bold text-[#111110] block">Aria Sterling</span>
                  <span className="text-[9px] text-[#9A9891] block">32 Seed Exits</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-[#10B981] font-mono font-bold">
                <span>RX: LISTENING</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              </div>
            </div>

            {/* Card badge */}
            <div className="absolute -top-3 -right-2 px-2.5 py-0.5 rounded-full bg-[#111110] text-[9px] font-mono uppercase tracking-wider text-[#FAF8F5] shadow-sm">
              The Fuel
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Trust Metric Bar with Butter Shadows */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65 }}
        className="mt-16 w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 text-center"
      >
        <div className="p-4 rounded-xl bg-white border border-[#E6E4DD] shadow-[0_1px_3px_rgba(17,17,16,0.03),0_8px_16px_-4px_rgba(17,17,16,0.03)]">
          <div className="text-xl sm:text-2xl font-bold text-[#111110] font-mono tracking-tight">$184.2M</div>
          <div className="text-[11px] text-[#686763] font-medium mt-0.5">Capital Deployed</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#E6E4DD] shadow-[0_1px_3px_rgba(17,17,16,0.03),0_8px_16px_-4px_rgba(17,17,16,0.03)]">
          <div className="text-xl sm:text-2xl font-bold text-[#FF5A36] font-mono tracking-tight">5,420+</div>
          <div className="text-[11px] text-[#686763] font-medium mt-0.5">Ideas Audited</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#E6E4DD] shadow-[0_1px_3px_rgba(17,17,16,0.03),0_8px_16px_-4px_rgba(17,17,16,0.03)]">
          <div className="text-xl sm:text-2xl font-bold text-[#10B981] font-mono tracking-tight">890+</div>
          <div className="text-[11px] text-[#686763] font-medium mt-0.5">Active Syndicates</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#E6E4DD] shadow-[0_1px_3px_rgba(17,17,16,0.03),0_8px_16px_-4px_rgba(17,17,16,0.03)]">
          <div className="text-xl sm:text-2xl font-bold text-[#111110] font-mono tracking-tight">68 Hrs</div>
          <div className="text-[11px] text-[#686763] font-medium mt-0.5">Avg Term Sheet</div>
        </div>
      </motion.div>
    </section>
  );
}
