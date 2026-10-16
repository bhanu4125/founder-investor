"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Gem, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

interface InvestorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InvestorModal({ isOpen, onClose }: InvestorModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [ticketSize, setTicketSize] = useState("$250K - $1M");
  const [selectedSectors, setSelectedSectors] = useState<string[]>([
    "AI Systems",
    "DeepTech",
  ]);

  const toggleSector = (sector: string) => {
    setSelectedSectors((prev) =>
      prev.includes(sector)
        ? prev.filter((s) => s !== sector)
        : [...prev, sector]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#111110", "#FF5A36", "#10B981", "#E6E4DD"],
    });

    if (isSupabaseConfigured()) {
      try {
        const { data: user } = await supabase.auth.getUser();
        if (user?.user) {
          await (supabase as any).from("profiles").update({
            target_sectors: selectedSectors,
            min_check_size: ticketSize.includes("$50K") ? 50000 : 250000,
            max_check_size: ticketSize.includes("$5M") ? 5000000 : 1000000,
          }).eq("id", user.user.id);
        }
      } catch (err) {
        console.warn("Investor profile update notice:", err);
      }
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
                  Syndicate Access Granted!
                </h3>
                <p className="text-sm text-[#686763] max-w-sm mx-auto">
                  Your radar parameters have been locked. Verified deal vectors will be delivered to your syndicate inbox.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-[#F3F1EC] border border-[#E2DFD7] flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#111110] tracking-tight">
                      Access Verified Deal Flow
                    </h3>
                    <span className="text-xs text-[#10B981] font-mono font-medium">
                      Algorithmic Matching &bull; Automated SPVs
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-[#686763] block mb-1 font-medium">
                      Syndicate / Fund Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Frontier Partners"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E6E4DD] text-[#111110] placeholder-[#9A9891] text-sm focus:outline-none focus:border-[#111110]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-[#686763] block mb-1 font-medium">
                      Target Check Size
                    </label>
                    <select
                      value={ticketSize}
                      onChange={(e) => setTicketSize(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E6E4DD] text-[#111110] text-sm focus:outline-none focus:border-[#111110] font-normal"
                    >
                      <option value="$50K - $250K">$50K - $250K (Angel / Scout)</option>
                      <option value="$250K - $1M">$250K - $1M (Syndicate Lead)</option>
                      <option value="$1M - $5M">$1M - $5M (Lead Venture Fund)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-[#686763] block mb-2 font-medium">
                      Sectors of High Conviction
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "AI Systems",
                        "DeepTech",
                        "Quantum",
                        "ClimateTech",
                        "Robotics",
                        "Synthetic Bio",
                      ].map((sector) => {
                        const active = selectedSectors.includes(sector);
                        return (
                          <button
                            type="button"
                            key={sector}
                            onClick={() => toggleSector(sector)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                              active
                                ? "bg-[#111110] text-[#FAF8F5] shadow-sm"
                                : "bg-white border border-[#E6E4DD] text-[#686763] hover:text-[#111110] hover:border-[#111110]/30"
                            }`}
                          >
                            {sector}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#111110] hover:bg-[#252523] text-[#FAF8F5] font-semibold text-sm tracking-wide shadow-[0_4px_16px_rgba(17,17,16,0.15)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      data-magnetic="true"
                    >
                      <Gem className="w-4 h-4 text-[#10B981]" />
                      <span>Activate Investor Radar</span>
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
