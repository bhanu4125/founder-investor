"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  FOUNDER_IDEAS,
  INVESTORS,
  FounderIdea,
  InvestorProfile,
} from "@/lib/data";
import { useLiveIdeaStream } from "@/hooks/useLiveIdeaStream";
import { useRequestCollab } from "@/hooks/useRequestCollab";
import {
  Zap,
  Check,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Flame,
} from "lucide-react";
import confetti from "canvas-confetti";

interface IdeaStreamMarqueeProps {
  onSelectIdea: (idea: FounderIdea) => void;
  onSelectInvestor: (investor: InvestorProfile) => void;
}

// 3D Perspective Tilt Card with Warm Editorial Spotlight Glare
function TiltCard({
  children,
  className = "",
  glowColor = "rgba(255, 90, 54, 0.05)",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);

    setGlarePos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
      opacity: 0.45,
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative perspective-1000 cursor-pointer select-none transition-shadow duration-300 ${className}`}
    >
      {/* Subtle Radial Spotlight Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-30 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: glarePos.opacity,
          background: `radial-gradient(350px circle at ${glarePos.x}% ${glarePos.y}%, ${glowColor} 0%, transparent 65%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

// Founder Idea Bento Card in Warm Editorial Style
function FounderCard({
  idea,
  onSelect,
  onRequestCollab,
  isRequested = false,
}: {
  idea: FounderIdea;
  onSelect: () => void;
  onRequestCollab?: (pitchId: string, eventPos: { x: number; y: number }) => void;
  isRequested?: boolean;
}) {
  const [localRequested, setLocalRequested] = useState(false);
  const [hovered, setHovered] = useState(false);

  const requested = isRequested || localRequested;

  const handleRequestCollab = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (requested) return;

    setLocalRequested(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const eventPos = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    if (onRequestCollab) {
      onRequestCollab(idea.id, eventPos);
    } else {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: {
          x: eventPos.x / window.innerWidth,
          y: eventPos.y / window.innerHeight,
        },
        colors: ["#FF5A36", "#FB923C", "#111110", "#FAF8F5"],
        ticks: 120,
      });
    }
  };

  const width = 160;
  const height = 40;
  const minVal = Math.min(...idea.sparkline);
  const maxVal = Math.max(...idea.sparkline);
  const points = idea.sparkline.map((val, idx) => {
    const px = (idx / (idea.sparkline.length - 1)) * width;
    const py = height - ((val - minVal) / (maxVal - minVal || 1)) * (height - 8) - 4;
    return `${px},${py}`;
  });
  const pathD = `M ${points.join(" L ")}`;

  return (
    <TiltCard
      glowColor="rgba(255, 90, 54, 0.08)"
      className="w-[360px] sm:w-[390px] shrink-0"
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full h-full rounded-2xl p-5 border border-[#E6E4DD] hover:border-[#FF5A36]/40 bg-white shadow-[0_2px_4px_rgba(17,17,16,0.02),0_12px_24px_-4px_rgba(17,17,16,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(17,17,16,0.08)] flex flex-col justify-between transition-all duration-300 group"
      >
        <div>
          {/* Card Top Pill */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#F3F1EC] border border-[#E2DFD7] text-[#FF5A36] font-semibold">
              {idea.category}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F3F1EC] border border-[#E2DFD7] text-[#686763]">
                {idea.stage}
              </span>
              <span className="text-[11px] font-bold text-[#111110] font-mono">
                {idea.matchScore}
              </span>
            </div>
          </div>

          {/* Title & Tagline */}
          <h3 className="text-base font-bold text-[#111110] tracking-tight group-hover:text-[#FF5A36] transition-colors flex items-center gap-1.5">
            <span>{idea.title}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A36] opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs text-[#FF5A36] font-medium mb-2">
            {idea.tagline}
          </p>

          <p className="text-xs text-[#686763] line-clamp-2 leading-relaxed mb-4">
            {idea.description}
          </p>

          {/* Sparkline & Traction Snapshot */}
          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E6E4DD] mb-4 flex items-center justify-between">
            <div>
              <span className="text-[9px] text-[#9A9891] uppercase font-mono font-semibold block">Velocity</span>
              <span className="text-xs font-bold text-[#111110] font-mono flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-[#10B981]" />
                {idea.stats[0]?.value || "+280%"}
              </span>
            </div>

            {/* Terracotta Sunset Sparkline */}
            <div className="w-[120px] h-[34px] relative">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id={`spark-${idea.id}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FF5A36" />
                    <stop offset="100%" stopColor="#FB923C" />
                  </linearGradient>
                </defs>
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke={`url(#spark-${idea.id})`}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0.8 }}
                  animate={{
                    pathLength: hovered ? 1 : 0.85,
                    strokeWidth: hovered ? 3 : 2.5,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </svg>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {idea.tags.map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded-md bg-[#F3F1EC] text-[#686763] border border-[#E2DFD7] font-medium"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer: Founder Avatar & Action */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E6E4DD]">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={idea.founder.avatar}
                alt={idea.founder.name}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-[#E6E4DD]"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#10B981] ring-1 ring-white" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#111110] block">
                {idea.founder.name}
              </span>
              <span className="text-[10px] text-[#9A9891] block">
                {idea.founder.role}
              </span>
            </div>
          </div>

          {/* Request Collab Morphing Button */}
          <motion.button
            onClick={handleRequestCollab}
            whileTap={{ scale: 0.94 }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 shadow-sm ${
              requested
                ? "bg-[#10B981] text-white"
                : "bg-[#111110] text-[#FAF8F5] hover:bg-[#252523]"
            }`}
            data-magnetic="true"
            data-cursor-text={requested ? "Sent!" : "Collab"}
          >
            {requested ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Collab Sent</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5 text-[#FF5A36] fill-[#FF5A36]" />
                <span>Request Collab</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </TiltCard>
  );
}

// Investor Profile Bento Card
function InvestorCard({
  investor,
  onSelect,
}: {
  investor: InvestorProfile;
  onSelect: () => void;
}) {
  const [pitched, setPitched] = useState(false);

  const handleDirectPitch = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pitched) return;

    setPitched(true);
    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 35,
      spread: 55,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: ["#10B981", "#111110", "#FF5A36"],
      ticks: 120,
    });

    onSelect();
  };

  return (
    <TiltCard
      glowColor="rgba(16, 185, 129, 0.08)"
      className="w-[360px] sm:w-[390px] shrink-0"
    >
      <div className="w-full h-full rounded-2xl p-5 border border-[#E6E4DD] hover:border-[#10B981]/40 bg-white shadow-[0_2px_4px_rgba(17,17,16,0.02),0_12px_24px_-4px_rgba(17,17,16,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(17,17,16,0.08)] flex flex-col justify-between transition-all duration-300 group">
        <div>
          {/* Card Top */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#F3F1EC] border border-[#E2DFD7] text-[#10B981] font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#10B981]" />
              Verified Syndicate
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F3F1EC] border border-[#E2DFD7] text-[#111110] font-semibold">
              {investor.dealsBacked} Deals
            </span>
          </div>

          {/* Firm & Name */}
          <h3 className="text-base font-bold text-[#111110] tracking-tight group-hover:text-[#10B981] transition-colors flex items-center gap-1.5">
            <span>{investor.firm}</span>
          </h3>
          <p className="text-xs text-[#686763] font-medium mb-2.5">
            {investor.name} &bull; {investor.role}
          </p>

          {/* Capital Ready Callout Banner */}
          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E6E4DD] mb-3 flex items-center justify-between">
            <div>
              <span className="text-[9px] text-[#9A9891] uppercase font-mono font-semibold block">Liquidity</span>
              <span className="text-sm font-extrabold text-[#10B981] font-mono">
                {investor.checkReady}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[9px] text-[#9A9891] uppercase font-mono font-semibold block">Check Range</span>
              <span className="text-xs font-bold text-[#111110] font-mono">
                {investor.checkRange}
              </span>
            </div>
          </div>

          <p className="text-xs text-[#686763] line-clamp-2 leading-relaxed mb-3">
            &ldquo;{investor.thesis}&rdquo;
          </p>

          {/* Sectors */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {investor.sectors.map((s) => (
              <span
                key={s}
                className="text-[10px] px-2 py-0.5 rounded-md bg-[#F3F1EC] text-[#686763] border border-[#E2DFD7] font-medium"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Portfolio Track Record */}
          <div className="flex items-center gap-1.5 text-[10px] text-[#9A9891] mb-2 font-mono">
            <span>Backed:</span>
            {investor.portfolio.map((p, i) => (
              <span key={p} className="text-[#111110] font-semibold">
                {p}
                {i < investor.portfolio.length - 1 ? " &bull; " : ""}
              </span>
            ))}
          </div>
        </div>

        {/* Footer: Investor Avatar & Pitch Action */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E6E4DD]">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={investor.avatar}
                alt={investor.name}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-[#E6E4DD]"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#10B981] ring-1 ring-white" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#111110] block">
                {investor.name}
              </span>
              <span className="text-[10px] text-[#9A9891] block">
                {investor.firm}
              </span>
            </div>
          </div>

          {/* Morphing Direct Pitch Button */}
          <motion.button
            onClick={handleDirectPitch}
            whileTap={{ scale: 0.94 }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 border ${
              pitched
                ? "bg-[#111110] text-white border-[#111110]"
                : "bg-[#F3F1EC] hover:bg-[#111110] hover:text-[#FAF8F5] border-[#E2DFD7] text-[#111110]"
            }`}
            data-magnetic="true"
            data-cursor-text={pitched ? "Sent!" : "Pitch"}
          >
            {pitched ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Pitch Queued</span>
              </>
            ) : (
              <>
                <span>⚡ Direct Pitch</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </TiltCard>
  );
}

export default function IdeaStreamMarquee({
  onSelectIdea,
  onSelectInvestor,
}: IdeaStreamMarqueeProps) {
  const { ideas, isLiveConnected } = useLiveIdeaStream();
  const { requestCollab, collabStatus } = useRequestCollab();

  const founderIdeasLoop = [...ideas, ...ideas, ...ideas];
  const investorsLoop = [...INVESTORS, ...INVESTORS, ...INVESTORS];

  return (
    <section id="live-stream" className="py-24 relative overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F1EC] border border-[#E2DFD7] text-xs font-semibold text-[#111110] mb-3">
          <Flame className="w-3.5 h-3.5 text-[#FF5A36]" />
          <span>Real-time Stream &bull; Hover to Pause & Tilt</span>
          {isLiveConnected && (
            <span className="flex items-center gap-1 text-[10px] text-[#10B981] font-mono font-bold ml-1.5 pl-1.5 border-l border-[#E2DFD7]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
              Live
            </span>
          )}
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-[#111110]">
          The <span className="text-founder-gradient">Live Idea</span> &amp;{" "}
          <span className="text-investor-gradient">Capital Stream</span>
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#686763] mt-3">
          Tactile 3D-perspective cards updating every second. Founders drop the spark &mdash; syndicates deploy the fuel.
        </p>
      </div>

      {/* Row 1: Founder Ideas Marquee */}
      <div className="relative w-full overflow-hidden mb-6 group/marquee1">
        {/* Left & Right gradient fade masks using Warm Gallery Alabaster */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#FAF8F5] to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#FAF8F5] to-transparent z-20" />

        <div className="flex gap-6 w-max animate-[marquee_45s_linear_infinite] group-hover/marquee1:[animation-play-state:paused]">
          {founderIdeasLoop.map((idea, idx) => (
            <FounderCard
              key={`founder-${idea.id}-${idx}`}
              idea={idea}
              onSelect={() => onSelectIdea(idea)}
              onRequestCollab={(id, pos) => requestCollab({ pitchId: id, eventPosition: pos })}
              isRequested={Boolean(collabStatus[idea.id])}
            />
          ))}
        </div>
      </div>

      {/* Row 2: Investor Profiles Marquee */}
      <div className="relative w-full overflow-hidden group/marquee2">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#FAF8F5] to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#FAF8F5] to-transparent z-20" />

        <div className="flex gap-6 w-max animate-[marquee-reverse_50s_linear_infinite] group-hover/marquee2:[animation-play-state:paused]">
          {investorsLoop.map((inv, idx) => (
            <InvestorCard
              key={`investor-${inv.id}-${idx}`}
              investor={inv}
              onSelect={() => onSelectInvestor(inv)}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </section>
  );
}
