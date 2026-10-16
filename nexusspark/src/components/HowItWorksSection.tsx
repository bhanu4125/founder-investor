"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Radar,
  Sliders,
  CheckCircle,
  Zap,
} from "lucide-react";
import { useSynergyRoomRealtime } from "@/hooks/useSynergyRoomRealtime";

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const timelinePathLength = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);

  // Step 1: Self-Typing Simulation State
  const [typedIdea, setTypedIdea] = useState("");
  const fullText = "Autonomous quantum-safe treasury rails with sub-second cross-border liquidation...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedIdea(fullText.slice(0, index));
      index++;
      if (index > fullText.length + 10) {
        index = 0;
      }
    }, 65);
    return () => clearInterval(interval);
  }, []);

  // Step 3: Supabase Realtime Broadcast & Postgres-Synced Cap Table
  const { capTable, updateCapTable, isSyncing, peersCount } = useSynergyRoomRealtime();

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="py-28 relative px-4 md:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3F1EC] border border-[#E2DFD7] text-xs font-mono font-medium text-[#111110] mb-3">
          <Zap className="w-3.5 h-3.5 text-[#FF5A36]" />
          <span className="uppercase tracking-wider">The Velocity Protocol</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-semibold text-[#111110] tracking-[-0.03em]">
          How <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A36] to-[#FB923C]">The Spark</span> Meets{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D9488] to-[#10B981]">The Fuel</span>
        </h2>
        <p className="text-[#686763] text-sm sm:text-base mt-3">
          A friction-free, cryptographically audited pipeline engineered to compress 3-month funding cycles into 72 hours.
        </p>
      </div>

      <div className="relative">
        {/* Central Glowing Scroll-Linked SVG Timeline Spine */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-8 pointer-events-none z-10">
          <svg className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="timeline-ink-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#111110" />
                <stop offset="90%" stopColor="#111110" />
                <stop offset="100%" stopColor="#FF5A36" />
              </linearGradient>
            </defs>

            {/* Inactive hairline track */}
            <line
              x1="16"
              y1="40"
              x2="16"
              y2="95%"
              stroke="#E6E4DD"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Active Drawing Line */}
            <motion.line
              x1="16"
              y1="40"
              x2="16"
              y2="95%"
              stroke="url(#timeline-ink-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                pathLength: timelinePathLength,
              }}
            />
          </svg>
        </div>

        {/* STEP 1: Post the Spark (Founder) */}
        <div className="relative mb-28 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Narrative description */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F1EC] border border-[#E2DFD7] text-[#FF5A36] text-xs font-mono font-medium mb-3">
              <span>STEP 01</span>
              <span>&bull;</span>
              <span>FOUNDER INITIATION</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#111110] tracking-[-0.02em] mb-3">
              Post the Spark in the Idea Canvas
            </h3>
            <p className="text-[#686763] text-sm leading-relaxed mb-6">
              Skip 40-page slide decks. Enter your core thesis, technical architecture, and milestones. Our AI benchmark engine automatically extracts traction vectors, tags domain verticals, and produces a live interactive term sheet canvas.
            </p>
            <div className="flex flex-col gap-2.5 text-xs text-[#111110] font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#FF5A36] shrink-0" />
                <span className="text-[#686763]">Multi-agent valuation benchmarking against 1,200+ private rounds</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#FF5A36] shrink-0" />
                <span className="text-[#686763]">One-click SAFE note configuration with automated milestone triggers</span>
              </div>
            </div>
          </motion.div>

          {/* Spacer for center line */}
          <div className="hidden lg:flex lg:col-span-2 justify-center">
            <div className="w-9 h-9 rounded-full bg-white border border-[#E6E4DD] shadow-[0_2px_8px_rgba(17,17,16,0.06)] flex items-center justify-center font-mono text-xs font-semibold text-[#FF5A36]">
              01
            </div>
          </div>

          {/* Interactive Mockup: Self-typing Idea Canvas */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl p-6 border border-[#E6E4DD] bg-white/90 backdrop-blur-xl shadow-[0_1px_0_0_#FFFFFF_inset,0_12px_32px_-8px_rgba(17,17,16,0.06)]">
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E6E4DD] mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E6E4DD]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E6E4DD]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E6E4DD]" />
                  <span className="text-xs font-mono text-[#9A9891] ml-2">idea-canvas.nexus</span>
                </div>
                <span className="text-[10px] font-mono text-[#FF5A36] bg-[#FF5A36]/10 px-2.5 py-0.5 rounded border border-[#FF5A36]/20 font-semibold">
                  AI Synthesizing...
                </span>
              </div>

              {/* Title & Stage */}
              <div className="mb-4">
                <label className="text-[10px] uppercase font-mono text-[#9A9891] block mb-1 font-semibold">
                  Project Name
                </label>
                <div className="text-sm font-semibold text-[#111110] flex items-center gap-2">
                  <span>QuantumLedger OS</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#F3F1EC] text-[#111110] border border-[#E2DFD7] font-mono font-medium">
                    Pre-Seed
                  </span>
                </div>
              </div>

              {/* Self-Typing Thesis Input */}
              <div className="mb-4">
                <label className="text-[10px] uppercase font-mono text-[#9A9891] block mb-1 font-semibold">
                  Core Technical Thesis
                </label>
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E6E4DD] min-h-[76px] text-xs font-mono text-[#111110] leading-relaxed">
                  {typedIdea}
                  <span className="inline-block w-2 h-3.5 bg-[#FF5A36] ml-1 animate-pulse align-middle" />
                </div>
              </div>

              {/* Auto Pop-in Tags with Spring Physics */}
              <div>
                <label className="text-[10px] uppercase font-mono text-[#9A9891] block mb-1.5 font-semibold">
                  Extracted Vectors &amp; Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Post-Quantum", "Shor Resistance", "Treasury Rails", "SAFE $2.0M"].map(
                    (tag, i) => (
                      <motion.span
                        key={tag}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: i * 0.15 + 0.3,
                          type: "spring",
                          stiffness: 200,
                          damping: 12,
                        }}
                        className="text-[11px] font-medium font-mono px-2.5 py-1 rounded-lg bg-[#F3F1EC] border border-[#E2DFD7] text-[#111110] flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36]" />
                        {tag}
                      </motion.span>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* STEP 2: Smart Discovery & Vector Radar (Investor) */}
        <div className="relative mb-28 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Radar Mockup on Left */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="rounded-2xl p-6 border border-[#E6E4DD] bg-white/90 backdrop-blur-xl shadow-[0_1px_0_0_#FFFFFF_inset,0_12px_32px_-8px_rgba(17,17,16,0.06)]">
              {/* Radar Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E6E4DD] mb-4">
                <div className="flex items-center gap-2">
                  <Radar className="w-4 h-4 text-[#10B981] animate-spin" />
                  <span className="text-xs font-mono font-semibold text-[#111110]">
                    Neural Vector Radar
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/10 px-2.5 py-0.5 rounded border border-[#10B981]/20 font-semibold">
                  Scanning 4,800+ Deals
                </span>
              </div>

              {/* Radar Screen with sweeping SVG line */}
              <div className="relative w-full h-44 rounded-xl bg-[#FAF8F5] border border-[#E6E4DD] overflow-hidden flex items-center justify-center mb-4">
                {/* Concentric rings in subtle hairline */}
                <div className="absolute w-36 h-36 rounded-full border border-[#E6E4DD]" />
                <div className="absolute w-24 h-24 rounded-full border border-[#E6E4DD]" />
                <div className="absolute w-12 h-12 rounded-full border border-[#E6E4DD]" />

                {/* Rotating Radar Sweep Line */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-1/2 h-[1.5px] bg-gradient-to-r from-[#10B981] to-transparent origin-left rotate-45 animate-radar" />
                </div>

                {/* Blips */}
                <div className="absolute top-8 left-16 w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
                <div className="absolute bottom-12 right-20 w-2 h-2 rounded-full bg-[#FF5A36] animate-pulse" />
                <div className="absolute top-14 right-14 w-2 h-2 rounded-full bg-[#10B981]" />

                {/* Highlighted Match Startup Callout */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [0.96, 1.02, 0.96], opacity: 1 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 px-4 py-2.5 rounded-xl bg-[#111110] text-[#FAF8F5] shadow-[0_4px_20px_rgba(17,17,16,0.15)] text-center cursor-pointer border border-[#252523]"
                >
                  <span className="text-[10px] font-mono text-[#10B981] uppercase block font-semibold tracking-wider">
                    Target Lock &bull; 99.2% Affinity
                  </span>
                  <span className="text-xs font-semibold text-[#FAF8F5] block mt-0.5">
                    QuantumLedger OS ($1.8M SAFE)
                  </span>
                </motion.div>
              </div>

              {/* Match Criteria Parameters */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E6E4DD]">
                  <span className="text-[10px] text-[#9A9891] block font-mono">Ticket Fit</span>
                  <span className="text-[#10B981] font-semibold font-mono">100%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E6E4DD]">
                  <span className="text-[10px] text-[#9A9891] block font-mono">Sector Moat</span>
                  <span className="text-[#111110] font-semibold font-mono">Top 1%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E6E4DD]">
                  <span className="text-[10px] text-[#9A9891] block font-mono">Co-Investors</span>
                  <span className="text-[#10B981] font-semibold font-mono">3 Ready</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Spacer for center line */}
          <div className="hidden lg:flex lg:col-span-2 justify-center order-2">
            <div className="w-9 h-9 rounded-full bg-white border border-[#E6E4DD] shadow-[0_2px_8px_rgba(17,17,16,0.06)] flex items-center justify-center font-mono text-xs font-semibold text-[#10B981]">
              02
            </div>
          </div>

          {/* Narrative description */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 text-left order-1 lg:order-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F1EC] border border-[#E2DFD7] text-[#10B981] text-xs font-mono font-medium mb-3">
              <span>STEP 02</span>
              <span>&bull;</span>
              <span>INVESTOR RADAR</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#111110] tracking-[-0.02em] mb-3">
              Algorithmic Deal Radar &amp; Instant Filtering
            </h3>
            <p className="text-[#686763] text-sm leading-relaxed mb-6">
              Investors define target check velocity, thesis parameters, and co-investment syndicates. Our radar continuously parses on-chain code audits, patent filings, and traction data to deliver high-signal opportunities directly to your terminal.
            </p>
            <div className="flex flex-col gap-2.5 text-xs text-[#111110] font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0" />
                <span className="text-[#686763]">Zero cold outbound &mdash; only verified, responsive founders</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0" />
                <span className="text-[#686763]">Instant diligence dossiers with automated GitHub &amp; financial audits</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* STEP 3: Instant Synergy Room */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Narrative description */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F1EC] border border-[#E2DFD7] text-[#111110] text-xs font-mono font-medium mb-3">
              <span>STEP 03</span>
              <span>&bull;</span>
              <span>THE IGNITION</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#111110] tracking-[-0.02em] mb-3">
              Instant Synergy Room &amp; Cap-Table Execution
            </h3>
            <p className="text-[#686763] text-sm leading-relaxed mb-6">
              When founder and investor connect, an encrypted Synergy Room unlocks. Model cap-table dilution in real-time, adjust milestone tranches interactively, and execute binding term sheets backed by automated smart contracts.
            </p>
            <div className="flex flex-col gap-2.5 text-xs text-[#111110] font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#111110] shrink-0" />
                <span className="text-[#686763]">Interactive cap-table simulation with live investor dilution charts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#111110] shrink-0" />
                <span className="text-[#686763]">Instant escrow deployment &mdash; funds ready to disburse on milestone unlock</span>
              </div>
            </div>
          </motion.div>

          {/* Spacer for center line */}
          <div className="hidden lg:flex lg:col-span-2 justify-center">
            <div className="w-9 h-9 rounded-full bg-white border border-[#E6E4DD] shadow-[0_2px_8px_rgba(17,17,16,0.06)] flex items-center justify-center font-mono text-xs font-semibold text-[#111110]">
              03
            </div>
          </div>

          {/* Interactive Synergy UI Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl p-6 border border-[#E6E4DD] bg-white/90 backdrop-blur-xl shadow-[0_1px_0_0_#FFFFFF_inset,0_12px_32px_-8px_rgba(17,17,16,0.06)]">
              {/* Docked Avatars Node Animation */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E6E4DD] mb-5">
                <div className="flex items-center gap-3">
                  {/* Founder Node */}
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                      alt="Founder Marcus"
                      className="w-8 h-8 rounded-full ring-2 ring-[#FF5A36]"
                    />
                    <span className="text-xs font-semibold text-[#111110]">Marcus T.</span>
                  </div>

                  {/* Pulsing Ignition Core */}
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#111110] text-[#FAF8F5] shadow-sm">
                    <Zap className="w-3.5 h-3.5 text-[#FF5A36] fill-[#FF5A36]" />
                  </div>

                  {/* Investor Node */}
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                      alt="Investor Aria"
                      className="w-8 h-8 rounded-full ring-2 ring-[#10B981]"
                    />
                    <span className="text-xs font-semibold text-[#111110]">Aria S.</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-full border border-[#10B981]/20 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                    <span>Synergy Active &bull; {peersCount} Peers Synced</span>
                  </span>
                </div>
              </div>

              {/* Interactive Cap-Table Dilution Slider (Supabase Realtime Broadcast) */}
              <div className="mb-5 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E6E4DD]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#111110] flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#686763]" />
                    Interactive SAFE Cap-Table Slider
                    {isSyncing && (
                      <span className="text-[9px] font-mono font-bold text-[#10B981] animate-pulse ml-1">
                        &lt;50ms Realtime
                      </span>
                    )}
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#10B981]">
                    {capTable.equityPercentage.toFixed(1)}% Equity
                  </span>
                </div>

                <input
                  type="range"
                  min="3.0"
                  max="15.0"
                  step="0.5"
                  value={capTable.equityPercentage}
                  onChange={(e) => updateCapTable(parseFloat(e.target.value))}
                  className="w-full accent-[#111110] cursor-pointer h-1.5 bg-[#E6E4DD] rounded-lg"
                />

                <div className="flex items-center justify-between mt-2.5 text-[11px] font-mono text-[#686763]">
                  <span>Investment: $2.5M Check</span>
                  <span className="text-[#111110] font-semibold">
                    Implied Post: ${capTable.postMoneyValuation}M
                  </span>
                </div>
              </div>

              {/* Milestone Roadmap Tranches */}
              <div>
                <span className="text-[10px] uppercase font-mono text-[#9A9891] block mb-2 font-semibold">
                  Tranche Release Roadmap
                </span>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E6E4DD] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-[#111110] font-medium">
                      <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                      <span>Tranche 1: Mainnet Testnet Deployment</span>
                    </div>
                    <span className="font-mono text-[#10B981] font-semibold">$1.0M Released</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E6E4DD] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-[#111110] font-medium">
                      <span className="w-2 h-2 rounded-full bg-[#FF5A36] animate-pulse" />
                      <span>Tranche 2: SOC2 Type II + 10 Banking Pilots</span>
                    </div>
                    <span className="font-mono text-[#686763] font-semibold">$1.5M in Escrow</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
