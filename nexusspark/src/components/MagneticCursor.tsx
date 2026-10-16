"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorType, setCursorType] = useState<"default" | "founder" | "investor" | "interactive">("default");
  const [isVisible, setIsVisible] = useState(false);

  // Exact 1:1 instant mouse tracking for zero-latency pointer precision
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth buttery trailing spring for the floating designer metadata badge
  const badgeSpring = { damping: 24, stiffness: 280, mass: 0.3 };
  const badgeX = useSpring(mouseX, badgeSpring);
  const badgeY = useSpring(mouseY, badgeSpring);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest("button, a, [data-magnetic='true'], input, textarea, select, [role='button']");
      if (interactiveEl) {
        setIsHovered(true);
        const text = interactiveEl.getAttribute("data-cursor-text");
        if (text) {
          setCursorText(text);
        } else {
          const isButton = interactiveEl.tagName.toLowerCase() === "button";
          const isLink = interactiveEl.tagName.toLowerCase() === "a";
          const isInput = ["input", "textarea"].includes(interactiveEl.tagName.toLowerCase());
          if (isInput) setCursorText("Type");
          else if (isButton) setCursorText("Select");
          else if (isLink) setCursorText("Visit");
          else setCursorText("");
        }

        if (interactiveEl.classList.contains("persona-founder") || interactiveEl.closest("#founder, [data-persona='founder']")) {
          setCursorType("founder");
        } else if (interactiveEl.classList.contains("persona-investor") || interactiveEl.closest("#investor, [data-persona='investor']")) {
          setCursorType("investor");
        } else {
          setCursorType("interactive");
        }
      } else {
        setIsHovered(false);
        setCursorText("");
        setCursorType("default");
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted) return null;

  const getAccentDot = () => {
    switch (cursorType) {
      case "founder":
        return "bg-[#FF5A36]";
      case "investor":
        return "bg-[#10B981]";
      case "interactive":
        return "bg-[#111110]";
      default:
        return "bg-[#FF5A36]";
    }
  };

  const getBadgeBorder = () => {
    switch (cursorType) {
      case "founder":
        return "border-[#FF5A36]/40 text-[#FF5A36]";
      case "investor":
        return "border-[#10B981]/40 text-[#10B981]";
      default:
        return "border-[#E6E4DD] text-[#111110]";
    }
  };

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* 1. Precision Crosshair Hairlines (Subtle designer grid coordinate marks) */}
      <motion.div
        className="fixed top-0 left-0"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          className={`transition-opacity duration-300 ${
            isHovered ? "opacity-15 scale-125" : "opacity-40"
          }`}
        >
          {/* Subtle Designer Crosshair Ticks */}
          <line x1="16" y1="6" x2="16" y2="11" stroke="#9A9891" strokeWidth="1" strokeLinecap="round" />
          <line x1="16" y1="21" x2="16" y2="26" stroke="#9A9891" strokeWidth="1" strokeLinecap="round" />
          <line x1="6" y1="16" x2="11" y2="16" stroke="#9A9891" strokeWidth="1" strokeLinecap="round" />
          <line x1="21" y1="16" x2="26" y2="16" stroke="#9A9891" strokeWidth="1" strokeLinecap="round" />
          <circle cx="16" cy="16" r="1.5" fill="#9A9891" opacity="0.6" />
        </svg>
      </motion.div>

      {/* 2. Modern Linear / Figma Designer SVG Arrow (Zero-Latency 1:1 Response) */}
      <motion.div
        className="fixed top-0 left-0"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isClicking ? 0.88 : isHovered ? 1.08 : 1,
          rotate: isClicking ? -6 : 0,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="filter drop-shadow-[0_2px_6px_rgba(17,17,16,0.22)] -ml-[1px] -mt-[1px]"
        >
          {/* Razor-Sharp Geometric Designer Arrow */}
          <path
            d="M3.5 2.5L10.5 20.5L13.8 13.8L20.5 10.5L3.5 2.5Z"
            fill="#111110"
            stroke="#FAF8F5"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>

        {/* Precision Core Dot on Arrow Notch */}
        <div
          className={`absolute left-3 top-3 w-1.5 h-1.5 rounded-full ${getAccentDot()} transition-colors duration-200 shadow-sm`}
        />
      </motion.div>

      {/* 3. Floating Designer Metadata Pill / Action Badge (Linear Style) */}
      {(cursorText || isHovered) && (
        <motion.div
          className={`fixed top-0 left-0 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md border shadow-[0_4px_16px_rgba(17,17,16,0.08)] flex items-center gap-1.5 ${getBadgeBorder()}`}
          style={{
            x: badgeX,
            y: badgeY,
            translateX: 18,
            translateY: 20,
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.15 }}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${getAccentDot()} animate-pulse`} />
          <span className="text-[10px] font-mono font-bold tracking-wider uppercase">
            {cursorText || "Select"}
          </span>
        </motion.div>
      )}
    </div>
  );
}
