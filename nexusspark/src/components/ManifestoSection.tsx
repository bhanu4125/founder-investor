"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Award, CheckCircle2 } from "lucide-react";

export default function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const manifesto =
    "We believe the greatest bottleneck to human progress is the speed at which bold ideas find aligned capital. NexusSpark removes the friction, politics, and delay—igniting high-conviction ventures at the speed of thought.";

  const words = manifesto.split(" ");

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="py-32 relative px-4 md:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Soft Neutral Wireframe Orbit */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full animate-[spin_80s_linear_infinite]">
          <circle cx="200" cy="200" r="180" stroke="#E6E4DD" strokeWidth="1" strokeDasharray="4 6" fill="none" />
          <circle cx="200" cy="200" r="130" stroke="#E6E4DD" strokeWidth="0.8" strokeDasharray="3 4" fill="none" />
          <circle cx="200" cy="200" r="80" stroke="#E6E4DD" strokeWidth="0.8" strokeDasharray="2 4" fill="none" />
          <line x1="20" y1="200" x2="380" y2="200" stroke="#E6E4DD" strokeWidth="0.5" />
          <line x1="200" y1="20" x2="200" y2="380" stroke="#E6E4DD" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* LEFT: Scroll-Triggered Text Scrubbing Manifesto */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3F1EC] border border-[#E2DFD7] text-xs font-mono font-medium text-[#111110] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A36]" />
            <span className="uppercase tracking-wider">The Nexus Manifesto</span>
          </div>

          <h3 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-[#111110] leading-[1.3] tracking-[-0.03em]">
            {words.map((word, i) => {
              const start = 0.15 + (i / words.length) * 0.45;
              const end = start + 0.05;
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const y = useTransform(scrollYProgress, [start, end], [6, 0]);

              const isHighlight =
                word.includes("greatest") ||
                word.includes("bold") ||
                word.includes("NexusSpark") ||
                word.includes("speed");

              return (
                <motion.span
                  key={i}
                  style={{ opacity, y }}
                  className={`inline-block mr-2.5 transition-colors ${
                    isHighlight
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A36] to-[#FB923C] font-semibold"
                      : "text-[#111110]"
                  }`}
                >
                  {word}
                </motion.span>
              );
            })}
          </h3>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-[#9A9891] font-mono font-medium tracking-wider">
            <span>&bull; AUDITED SMART SAFES</span>
            <span>&bull; ZERO PITCH DECKS</span>
            <span>&bull; REAL-TIME SYNDICATES</span>
          </div>
        </div>

        {/* RIGHT: Layered Parallax Showcase (3 Layers) in Warm Minimal Style */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-visible">
            {/* LAYER 1: Background Rotating Geometric Wireframe */}
            <div className="absolute -inset-6 z-0 flex items-center justify-center opacity-40 pointer-events-none">
              <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_50s_linear_infinite]">
                <polygon
                  points="100,10 190,50 190,150 100,190 10,150 10,50"
                  fill="none"
                  stroke="#E6E4DD"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
                <circle cx="100" cy="100" r="70" fill="none" stroke="#E6E4DD" strokeWidth="0.8" />
                <polygon
                  points="100,25 175,65 175,135 100,175 25,135 25,65"
                  fill="none"
                  stroke="#E6E4DD"
                  strokeWidth="0.8"
                />
              </svg>
            </div>

            {/* LAYER 2: High-Contrast Portrait Image in Daylight Container */}
            <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden border border-[#E6E4DD] bg-white shadow-[0_20px_40px_-12px_rgba(17,17,16,0.08)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
                alt="Showcase Founder"
                className="w-full h-full object-cover contrast-[1.05] brightness-95 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5]/80 via-transparent to-transparent opacity-60" />
            </div>

            {/* LAYER 3: Floating Daylight Glassmorphic UI Pills with Butter Shadows */}
            {/* Pill 1: Top Right */}
            <div className="absolute -top-4 -right-4 z-20 px-3.5 py-2 rounded-xl border border-[#E6E4DD] bg-white/95 backdrop-blur-xl shadow-[0_12px_24px_-4px_rgba(17,17,16,0.08)] animate-float flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <div>
                <span className="text-[10px] text-[#9A9891] block font-mono font-medium">SAFE Velocity</span>
                <span className="text-xs font-semibold text-[#10B981] font-mono">Funded in 48 hrs</span>
              </div>
            </div>

            {/* Pill 2: Bottom Left */}
            <div className="absolute -bottom-4 -left-4 z-20 px-3.5 py-2 rounded-xl border border-[#E6E4DD] bg-white/95 backdrop-blur-xl shadow-[0_12px_24px_-4px_rgba(17,17,16,0.08)] animate-float-delayed flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#111110] flex items-center justify-center text-[#FAF8F5] shadow-sm">
                <Award className="w-3.5 h-3.5 text-[#FF5A36]" />
              </div>
              <div>
                <span className="text-[10px] text-[#9A9891] block font-mono font-medium">Syndicate</span>
                <span className="text-xs font-semibold text-[#111110]">3 Co-Investors Joined</span>
              </div>
            </div>

            {/* Pill 3: Mid Right */}
            <div className="absolute top-1/2 -right-6 z-20 px-3 py-1.5 rounded-xl border border-[#E6E4DD] bg-white/95 backdrop-blur-xl shadow-[0_12px_24px_-4px_rgba(17,17,16,0.08)] animate-float flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A36]" />
              <span className="text-[11px] font-semibold text-[#111110] font-mono">98.4% Match Affinity</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
