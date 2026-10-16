"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Gem,
  CheckCircle2,
  Lock,
  Zap,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
  Globe,
  Sliders,
} from "lucide-react";

interface PersonaSwitcherProps {
  activePersona: "founder" | "investor";
  setActivePersona: (p: "founder" | "investor") => void;
  onOpenPitchModal: () => void;
  onOpenInvestorModal: () => void;
}

export default function PersonaSwitcher({
  activePersona,
  setActivePersona,
  onOpenPitchModal,
  onOpenInvestorModal,
}: PersonaSwitcherProps) {
  const isFounder = activePersona === "founder";

  const founderFeatures = [
    {
      title: "Zero Deck Fatigue",
      desc: "Turn your code commits, README, and technical thesis into a live interactive startup prospectus.",
      metric: "60-SEC SETUP",
      icon: Zap,
      accent: "text-[#FF5A36]",
      tag: "FOUNDER FIRST",
    },
    {
      title: "Real-Time Syndicate Bidding",
      desc: "Receive competitive term sheet proposals from tier-1 angels and micro-funds without endless back-and-forth.",
      metric: "AVG 3.4 TERM SHEETS",
      icon: TrendingUp,
      accent: "text-[#FF5A36]",
      tag: "COMPETITIVE",
    },
    {
      title: "Milestone-Escrow SAFEs",
      desc: "Protect your cap-table. Unlock capital in tranches as you achieve your engineering and user growth targets.",
      metric: "72H ESCROW",
      icon: Lock,
      accent: "text-[#FB923C]",
      tag: "DILUTION GUARD",
    },
    {
      title: "Automated Valuation Simulator",
      desc: "Run predictive dilution models against real private transactions to defend your post-money targets.",
      metric: "LIVE BENCHMARKING",
      icon: Sliders,
      accent: "text-[#FF5A36]",
      tag: "CAP-TABLE INTELLIGENCE",
    },
  ];

  const investorFeatures = [
    {
      title: "Pre-Audited GitHub & IP",
      desc: "Instant cryptographic verification of repo activity, code quality scores, and verified founder patent filings.",
      metric: "100% VETTED CODE",
      icon: Cpu,
      accent: "text-[#10B981]",
      tag: "INSTITUTIONAL DILIGENCE",
    },
    {
      title: "Vector Mandate Radar",
      desc: "Never look through irrelevant decks again. Our neural matching engine routes only thesis-aligned founders.",
      metric: "98.4% PRECISION",
      icon: Layers,
      accent: "text-[#0D9488]",
      tag: "ZERO NOISE",
    },
    {
      title: "1-Click Syndicate Co-Investment",
      desc: "Co-invest alongside trusted syndicate leads. Automated SPVs and streamlined single-line cap-table entries.",
      metric: "INSTANT SPVS",
      icon: Globe,
      accent: "text-[#10B981]",
      tag: "SYNDICATE VELOCITY",
    },
    {
      title: "Telemetry & Live Milestone Alerts",
      desc: "Direct integration with company telemetry. Automated notifications when engineering milestones are met.",
      metric: "REAL-TIME TELEMETRY",
      icon: CheckCircle2,
      accent: "text-[#0D9488]",
      tag: "POST-CLOSE VISIBILITY",
    },
  ];

  const features = isFounder ? founderFeatures : investorFeatures;

  return (
    <section id="persona-matrix" className="py-24 relative px-4 md:px-8 max-w-7xl mx-auto">
      {/* Dynamic ambient halo shifting with active persona */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[320px] rounded-full blur-[120px] pointer-events-none transition-all duration-700"
        style={{
          background: isFounder
            ? "radial-gradient(circle, rgba(255,90,54,0.08) 0%, rgba(251,146,60,0.04) 50%, transparent 80%)"
            : "radial-gradient(circle, rgba(16,185,129,0.08) 0%, rgba(13,148,136,0.04) 50%, transparent 80%)",
        }}
      />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-5xl font-semibold text-[#111110] tracking-[-0.03em]">
          Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A36] to-[#FB923C]">Both Sides</span> of the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D9488] to-[#10B981]">Table</span>
        </h2>
        <p className="text-[#686763] text-sm sm:text-base mt-3">
          Whether you&apos;re building the next paradigm or funding it, NexusSpark is calibrated for maximum velocity.
        </p>

        {/* Minimalist floating pill container in #EFECE6 */}
        <div className="inline-flex p-1.5 rounded-full bg-[#EFECE6] border border-[#E2DFD7] mt-8 relative shadow-sm">
          <button
            onClick={() => setActivePersona("founder")}
            className={`relative z-10 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 flex items-center gap-2 ${
              isFounder ? "text-[#111110]" : "text-[#686763] hover:text-[#111110]"
            }`}
            data-magnetic="true"
            data-cursor-text="Founder"
          >
            <span
              className={`w-2 h-2 rounded-full transition-colors ${
                isFounder ? "bg-[#FF5A36]" : "bg-[#9A9891]"
              }`}
            />
            <Rocket className="w-4 h-4 text-[#FF5A36]" />
            <span>I&apos;m a Founder</span>
          </button>

          <button
            onClick={() => setActivePersona("investor")}
            className={`relative z-10 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 flex items-center gap-2 ${
              !isFounder ? "text-[#111110]" : "text-[#686763] hover:text-[#111110]"
            }`}
            data-magnetic="true"
            data-cursor-text="Investor"
          >
            <span
              className={`w-2 h-2 rounded-full transition-colors ${
                !isFounder ? "bg-[#10B981]" : "bg-[#9A9891]"
              }`}
            />
            <Gem className="w-4 h-4 text-[#10B981]" />
            <span>I&apos;m an Investor</span>
          </button>

          {/* Active sliding tab: pure #FFFFFF with butter shadow */}
          <motion.div
            layoutId="persona-active-pill"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className={`absolute top-1.5 bottom-1.5 rounded-full bg-white shadow-[0_2px_8px_rgba(17,17,16,0.08),0_1px_2px_rgba(17,17,16,0.04)] ${
              isFounder
                ? "left-1.5 right-[50%]"
                : "left-[50%] right-1.5"
            }`}
          />
        </div>
      </div>

      {/* Feature Bento Grid with Spring Physics Reorganization */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePersona}
            initial={{ opacity: 0, y: 16, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: idx * 0.06,
                    type: "spring",
                    stiffness: 140,
                    damping: 16,
                  }}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl bg-white border border-[#E6E4DD] shadow-[0_2px_4px_rgba(17,17,16,0.02),0_12px_24px_-4px_rgba(17,17,16,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(17,17,16,0.1)] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Feature Top */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl bg-[#F3F1EC] border border-[#E2DFD7] flex items-center justify-center">
                        <Icon className={`w-4 h-4 ${feat.accent}`} />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F3F1EC] text-[#111110] border border-[#E2DFD7] font-medium tracking-wider">
                        {feat.tag}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-[#111110] mb-2 tracking-tight">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-[#686763] leading-relaxed mb-6 font-normal">
                      {feat.desc}
                    </p>
                  </div>

                  {/* Metric Pill */}
                  <div className="pt-4 border-t border-[#E6E4DD] flex items-center justify-between">
                    <span className="text-[11px] font-mono font-medium tracking-wider text-[#111110]">
                      {feat.metric}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#9A9891] group-hover:text-[#111110] group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dynamic Persona CTA */}
      <div className="mt-14 text-center">
        <motion.button
          onClick={isFounder ? onOpenPitchModal : onOpenInvestorModal}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-[#FAF8F5] bg-[#111110] hover:bg-[#252523] shadow-[0_4px_20px_rgba(17,17,16,0.15)] transition-all inline-flex items-center gap-2.5 cursor-pointer"
          data-magnetic="true"
          data-cursor-text={isFounder ? "Launch" : "Deploy"}
        >
          <span
            className={`w-2 h-2 rounded-full animate-pulse ${
              isFounder ? "bg-[#FF5A36]" : "bg-[#10B981]"
            }`}
          />
          {isFounder ? (
            <>
              <Rocket className="w-4 h-4 text-[#FF5A36]" />
              <span>Launch Your Founder Idea in 60 Seconds</span>
            </>
          ) : (
            <>
              <Gem className="w-4 h-4 text-[#10B981]" />
              <span>Access Verified Syndicate Deal Flow</span>
            </>
          )}
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </motion.button>
      </div>
    </section>
  );
}
