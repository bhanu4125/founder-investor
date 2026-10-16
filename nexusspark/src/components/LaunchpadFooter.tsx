"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Send,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import confetti from "canvas-confetti";

interface LaunchpadFooterProps {
  onOpenPitchModal: () => void;
  onOpenInvestorModal: () => void;
}

export default function LaunchpadFooter({
  onOpenPitchModal,
  onOpenInvestorModal,
}: LaunchpadFooterProps) {
  const [ideaInput, setIdeaInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const inputLen = ideaInput.length;
  const gravitationFactor = Math.min(inputLen / 40, 1);

  const estValuation =
    inputLen > 5
      ? `$${(1.5 + (inputLen % 7) * 0.4).toFixed(1)}M - $${(3.5 + (inputLen % 5) * 0.6).toFixed(1)}M`
      : "$1.5M - $4.0M";
  const syndicateMatches = Math.min(Math.floor(inputLen / 6) + 2, 14);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaInput.trim()) return;

    setSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.8 },
      colors: ["#111110", "#FF5A36", "#10B981", "#E6E4DD"],
    });

    setTimeout(() => {
      onOpenPitchModal();
      setSubmitted(false);
    }, 1200);
  };

  return (
    <footer id="launchpad" className="relative pt-24 pb-16 px-4 md:px-8 bg-[#F5F3ED] overflow-hidden border-t border-[#E6E4DD]">
      {/* Dynamic Background SVG Gravitating Nodes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="w-full h-full opacity-40">
          <defs>
            <radialGradient id="center-pull" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#FF5A36" stopOpacity={0.12 * gravitationFactor} />
              <stop offset="60%" stopColor="#10B981" stopOpacity={0.08 * gravitationFactor} />
              <stop offset="100%" stopColor="#F5F3ED" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Central pull glow */}
          <rect width="100%" height="100%" fill="url(#center-pull)" />

          {/* Floating Nodes gravitating inward */}
          {[
            { cx: "15%", cy: "25%", r: 2.5, color: "#FF5A36" },
            { cx: "25%", cy: "45%", r: 2, color: "#111110" },
            { cx: "85%", cy: "30%", r: 2.5, color: "#10B981" },
            { cx: "75%", cy: "55%", r: 2, color: "#FF5A36" },
            { cx: "35%", cy: "20%", r: 1.5, color: "#111110" },
            { cx: "65%", cy: "25%", r: 2, color: "#10B981" },
            { cx: "18%", cy: "65%", r: 2, color: "#FF5A36" },
            { cx: "82%", cy: "70%", r: 2, color: "#111110" },
          ].map((node, i) => {
            return (
              <motion.circle
                key={i}
                cx={node.cx}
                cy={node.cy}
                r={node.r + gravitationFactor * 1.5}
                fill={node.color}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3 + gravitationFactor * 0.4, 0.8, 0.3 + gravitationFactor * 0.4],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </svg>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Top Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFECE6] border border-[#E2DFD7] text-xs font-mono font-medium text-[#111110] mb-4">
          <Rocket className="w-3.5 h-3.5 text-[#FF5A36]" />
          <span className="uppercase tracking-wider">The Launchpad Engine</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold text-[#111110] tracking-[-0.03em] leading-tight">
          Drop Your Idea. <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A36] via-[#8B5CF6] to-[#10B981]">
            Ignite Your Syndicate.
          </span>
        </h2>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-[#686763] mt-4 mb-10">
          Type your startup thesis or venture hypothesis below. Watch the network respond in real time.
        </p>

        {/* MASSIVE INTERACTIVE "DROP YOUR IDEA" INPUT BAR IN DAYLIGHT STYLE */}
        <div className="relative max-w-3xl mx-auto">
          {/* Outer soft ambient glow */}
          <div
            className="absolute -inset-1 rounded-3xl blur-xl opacity-40 transition-all duration-500"
            style={{
              background:
                inputLen > 0
                  ? "linear-gradient(90deg, rgba(255,90,54,0.15) 0%, rgba(139,92,246,0.1) 50%, rgba(16,185,129,0.15) 100%)"
                  : "transparent",
            }}
          />

          <form
            onSubmit={handleSubmit}
            className="relative rounded-2xl bg-white border border-[#E6E4DD] p-2 sm:p-2.5 shadow-[0_12px_32px_-8px_rgba(17,17,16,0.08)] flex flex-col sm:flex-row items-center gap-3"
          >
            <div className="flex-1 w-full flex items-center pl-3">
              <Zap className="w-5 h-5 text-[#FF5A36] shrink-0 mr-3" />
              <input
                type="text"
                value={ideaInput}
                onChange={(e) => setIdeaInput(e.target.value)}
                placeholder="e.g., Autonomous spatial intelligence for warehouse humanoid robots..."
                className="w-full bg-transparent text-sm sm:text-base text-[#111110] placeholder-[#9A9891] focus:outline-none py-2 font-normal"
                data-magnetic="true"
                data-cursor-text="Type"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#111110] hover:bg-[#252523] text-[#FAF8F5] font-semibold text-xs sm:text-sm tracking-wide shadow-[0_4px_16px_rgba(17,17,16,0.15)] flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer"
              data-magnetic="true"
              data-cursor-text="Ignite"
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36] animate-pulse" />
                  <span>Ignite Venture</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* REAL-TIME NETWORK TELEMETRY FEEDBACK */}
          {inputLen > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-xl border border-[#E6E4DD] bg-white flex flex-wrap items-center justify-between gap-4 text-xs font-mono shadow-[0_4px_16px_rgba(17,17,16,0.04)]"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                <span className="text-[#686763]">Estimated SAFE Valuation:</span>
                <span className="text-[#10B981] font-semibold">{estValuation}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#686763]">Target Syndicate Matches:</span>
                <span className="text-[#FF5A36] font-semibold">{syndicateMatches} Angels Ready</span>
              </div>
              <div className="flex items-center gap-2 text-[#111110]">
                <span className="text-[#686763]">Avg Response:</span>
                <span className="font-semibold text-[#111110]">&lt; 4 Hours</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Quick Persona Alternative CTAs */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-[#686763] font-medium">
          <button
            onClick={onOpenPitchModal}
            className="hover:text-[#111110] transition-colors flex items-center gap-1.5 cursor-pointer"
            data-magnetic="true"
          >
            <span>Have a full technical deck? Upload Pitch</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#9A9891]" />
          </button>
          <span className="text-[#E2DFD7]">&bull;</span>
          <button
            onClick={onOpenInvestorModal}
            className="hover:text-[#111110] transition-colors flex items-center gap-1.5 cursor-pointer"
            data-magnetic="true"
          >
            <span>Managing a syndicate? Join as Investor</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#9A9891]" />
          </button>
        </div>

        {/* Bottom Footer Info & Links */}
        <div className="mt-20 pt-8 border-t border-[#E6E4DD] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#9A9891] font-normal">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-[#111110] flex items-center justify-center text-[#FAF8F5] font-bold text-[10px]">
              N
            </div>
            <span>&copy; {new Date().getFullYear()} NexusSpark Protocol Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#10B981] font-mono text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              All Systems Operational (99.99%)
            </span>
            <a href="#" className="hover:text-[#111110] transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-[#111110] transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-[#111110] transition-colors">
              SAFE Architecture
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
