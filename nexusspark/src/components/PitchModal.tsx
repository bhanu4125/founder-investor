"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Rocket, CheckCircle2, Code2 } from "lucide-react";
import confetti from "canvas-confetti";

import { useLiveIdeaStream } from "@/hooks/useLiveIdeaStream";

interface PitchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PitchModal({ isOpen, onClose }: PitchModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const { createNewPitch } = useLiveIdeaStream();
  const [formData, setFormData] = useState({
    startupName: "",
    thesis: "",
    targetRaise: "$1,500,000",
    equity: "8.0%",
    stage: "Pre-Seed",
    githubRepo: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#111110", "#FF5A36", "#10B981", "#E6E4DD"],
    });

    try {
      const askNum = parseFloat(formData.targetRaise.replace(/[^0-9.]/g, "")) || 1500000;
      const eqNum = parseFloat(formData.equity.replace(/[^0-9.]/g, "")) || 8.0;
      await createNewPitch({
        title: formData.startupName,
        tagline: formData.thesis,
        solution: formData.thesis,
        funding_ask: askNum,
        equity_offered: eqNum,
      });
    } catch (err) {
      console.warn("Pitch submit notice:", err);
    }

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#111110]/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-[#E6E4DD] bg-[#FAF8F5] shadow-[0_25px_60px_-15px_rgba(17,17,16,0.18)] z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white hover:bg-[#F3F1EC] text-[#686763] hover:text-[#111110] transition-colors border border-[#E6E4DD] cursor-pointer"
              data-magnetic="true"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#111110] mx-auto flex items-center justify-center text-[#10B981] mb-4 shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-[#111110] mb-2 tracking-tight">
                  Spark Dispatched to Syndicates!
                </h3>
                <p className="text-sm text-[#686763] max-w-sm mx-auto">
                  Your thesis is now live on the verified deal radar. Expect syndicate match pings within 4 hours.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-[#F3F1EC] border border-[#E2DFD7] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#FF5A36]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#111110] tracking-tight">
                      Pitch Your Vision
                    </h3>
                    <span className="text-xs text-[#FF5A36] font-mono font-medium">
                      Automated SAFE &bull; Tier-1 Syndicate Reach
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-[#686763] block mb-1 font-medium">
                      Startup / Project Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Synapse Bio-Silicon"
                      value={formData.startupName}
                      onChange={(e) =>
                        setFormData({ ...formData, startupName: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E6E4DD] text-[#111110] placeholder-[#9A9891] text-sm focus:outline-none focus:border-[#111110]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-[#686763] block mb-1 font-medium">
                      Core Technical Thesis (1-2 sentences)
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="What is your unfair technical moat? What barrier are you breaking?"
                      value={formData.thesis}
                      onChange={(e) =>
                        setFormData({ ...formData, thesis: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E6E4DD] text-[#111110] placeholder-[#9A9891] text-sm focus:outline-none focus:border-[#111110] resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono uppercase text-[#686763] block mb-1 font-medium">
                        Target SAFE Raise
                      </label>
                      <input
                        type="text"
                        value={formData.targetRaise}
                        onChange={(e) =>
                          setFormData({ ...formData, targetRaise: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E6E4DD] text-[#111110] text-sm focus:outline-none focus:border-[#111110] font-mono font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono uppercase text-[#686763] block mb-1 font-medium">
                        Target Equity Cap
                      </label>
                      <input
                        type="text"
                        value={formData.equity}
                        onChange={(e) =>
                          setFormData({ ...formData, equity: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E6E4DD] text-[#111110] text-sm focus:outline-none focus:border-[#111110] font-mono font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-[#686763] block mb-1 font-medium">
                      GitHub or Technical Whitepaper Link
                    </label>
                    <div className="relative">
                      <Code2 className="w-4 h-4 text-[#9A9891] absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="https://github.com/your-org/core-protocol"
                        value={formData.githubRepo}
                        onChange={(e) =>
                          setFormData({ ...formData, githubRepo: e.target.value })
                        }
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-[#E6E4DD] text-[#111110] placeholder-[#9A9891] text-sm focus:outline-none focus:border-[#111110] font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#111110] hover:bg-[#252523] text-[#FAF8F5] font-semibold text-sm tracking-wide shadow-[0_4px_16px_rgba(17,17,16,0.15)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      data-magnetic="true"
                    >
                      <Rocket className="w-4 h-4 text-[#FF5A36]" />
                      <span>Submit for Instant Syndicate Radar</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
