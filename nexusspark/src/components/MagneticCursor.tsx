"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInputActive, setIsInputActive] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "founder" | "investor">("default");
  const [isVisible, setIsVisible] = useState(false);

  // Smooth buttery trailing spring for the ambient magnetic highlight ring
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringSpring = { damping: 28, stiffness: 220, mass: 0.4 };
  const ringX = useSpring(mouseX, ringSpring);
  const ringY = useSpring(mouseY, ringSpring);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Detect if user is inside an input, textarea, select, or modal form
      const inputEl = target.closest("input, textarea, select, [contenteditable='true']");
      if (inputEl) {
        setIsInputActive(true);
        setIsHovered(false);
        return;
      } else {
        setIsInputActive(false);
      }

      // Check if inside open modal dialog
      const inModal = target.closest("[role='dialog'], .fixed.inset-0.z-50");
      if (inModal) {
        setIsInputActive(true);
        return;
      }

      // Detect interactive buttons/links
      const interactiveEl = target.closest("button, a, [data-magnetic='true'], [role='button']");
      if (interactiveEl) {
        setIsHovered(true);

        if (interactiveEl.classList.contains("persona-founder") || interactiveEl.closest("#founder, [data-persona='founder']")) {
          setCursorType("founder");
        } else if (interactiveEl.classList.contains("persona-investor") || interactiveEl.closest("#investor, [data-persona='investor']")) {
          setCursorType("investor");
        } else {
          setCursorType("default");
        }
      } else {
        setIsHovered(false);
        setCursorType("default");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted) return null;

  // Don't render or show anything when user is typing in forms or inside modals
  if (isInputActive) return null;

  const getRingColor = () => {
    switch (cursorType) {
      case "founder":
        return "border-[#FF5A36]/60 bg-[#FF5A36]/5";
      case "investor":
        return "border-[#10B981]/60 bg-[#10B981]/5";
      default:
        return "border-[#111110]/20 bg-[#111110]/3";
    }
  };

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-30 overflow-hidden hidden md:block transition-opacity duration-200 ${
        isVisible && !isInputActive ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Subtle Ambient Magnetic Follower Ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full border transition-colors duration-200 backdrop-blur-[0.5px] ${getRingColor()}`}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 44 : 26,
          height: isHovered ? 44 : 26,
          scale: isHovered ? 1.15 : 1,
          opacity: isHovered ? 0.9 : 0.45,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />
    </div>
  );
}
