"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export default function BackgroundGrid({ activePersona = "all" }: { activePersona?: "all" | "founder" | "investor" }) {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleClick = (e: MouseEvent) => {
      const newRipple = { x: e.clientX, y: e.clientY, id: Date.now() };
      setRipples((prev) => [...prev.slice(-4), newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#FAF8F5]"
    >
      {/* Soft Gallery Ambient Glow Blobs (Minimal & Airy) */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000"
        style={{
          background:
            activePersona === "investor"
              ? "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(255,90,54,0.06) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          x: [0, 20, 0],
          y: [0, 15, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/4 -right-40 w-[650px] h-[650px] rounded-full blur-[150px] pointer-events-none transition-colors duration-1000"
        style={{
          background:
            activePersona === "founder"
              ? "radial-gradient(circle, rgba(251,146,60,0.05) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1.08, 1, 1.08],
          x: [0, -20, 0],
          y: [0, -15, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* SVG Interactive Dot Grid in Warm Gallery Theme */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="gallery-dot-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="#E6E4DD" />
          </pattern>

          {/* Radial gradient mask following cursor */}
          <radialGradient
            id="cursor-light"
            cx={mousePos.x}
            cy={mousePos.y}
            r="320"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#111110" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#9A9891" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0" />
          </radialGradient>

          <mask id="grid-cursor-mask">
            <rect width="100%" height="100%" fill="url(#cursor-light)" />
          </mask>
        </defs>

        {/* Base subtle grid */}
        <rect width="100%" height="100%" fill="url(#gallery-dot-grid)" />

        {/* Illuminated grid under cursor */}
        <rect
          width="100%"
          height="100%"
          fill="#111110"
          mask="url(#grid-cursor-mask)"
          opacity="0.6"
        />
      </svg>

      {/* Click ripple animations */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full border border-[#111110]/20 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ width: 0, height: 0, opacity: 0.6 }}
          animate={{
            width: 440,
            height: 440,
            opacity: 0,
            borderColor: ["rgba(255,90,54,0.4)", "rgba(16,185,129,0.3)", "rgba(230,228,221,0)"],
          }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
