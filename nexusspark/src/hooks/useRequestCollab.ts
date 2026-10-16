"use client";

import { useState, useCallback } from "react";
import confetti from "canvas-confetti";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { CollabStatus } from "@/types/supabase";

interface RequestCollabParams {
  pitchId: string;
  proposedCapital?: number;
  proposedEquity?: number;
  message?: string;
  eventPosition?: { x: number; y: number };
}

export function useRequestCollab() {
  const [requesting, setRequesting] = useState<boolean>(false);
  const [collabStatus, setCollabStatus] = useState<Record<string, CollabStatus>>({});
  const [error, setError] = useState<string | null>(null);

  const requestCollab = useCallback(async ({
    pitchId,
    proposedCapital = 500000,
    proposedEquity = 7.5,
    message = "High conviction match. Looking forward to connecting in the Synergy Room.",
    eventPosition,
  }: RequestCollabParams) => {
    // 1. Optimistic Feedback: Fire celebratory confetti immediately
    confetti({
      particleCount: 50,
      spread: 70,
      origin: eventPosition
        ? { x: eventPosition.x / window.innerWidth, y: eventPosition.y / window.innerHeight }
        : { y: 0.7 },
      colors: ["#111110", "#FF5A36", "#10B981", "#E6E4DD"],
    });

    // Mark as pending locally
    setCollabStatus((prev) => ({ ...prev, [pitchId]: "PENDING" }));
    setRequesting(true);
    setError(null);

    // 2. Demo / Fallback Simulation if Supabase is unconfigured
    if (!isSupabaseConfigured()) {
      // Simulate automated acceptance after 2.5 seconds for instant gratification
      setTimeout(() => {
        setCollabStatus((prev) => ({ ...prev, [pitchId]: "ACCEPTED" }));
        setRequesting(false);
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.5 },
          colors: ["#10B981", "#FF5A36", "#FAF8F5"],
        });
      }, 2500);
      return { success: true, status: "PENDING" };
    }

    // 3. Live Supabase Backend Insertion
    try {
      const { data: userData } = await supabase.auth.getUser();
      const investorId = userData?.user?.id || "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa"; // Default seed investor

      // Fetch the founder_id of this pitch
      const { data: pitchData, error: pitchErr } = await (supabase as any)
        .from("startup_pitches")
        .select("founder_id")
        .eq("id", pitchId)
        .single();

      if (pitchErr || !pitchData) {
        throw new Error(pitchErr?.message || "Pitch not found");
      }

      const { data: collab, error: insertErr } = await (supabase as any)
        .from("collaboration_requests")
        .insert({
          pitch_id: pitchId,
          founder_id: (pitchData as any).founder_id,
          investor_id: investorId,
          proposed_capital: proposedCapital,
          proposed_equity: proposedEquity,
          message,
          status: "PENDING",
        })
        .select()
        .single();

      if (insertErr) {
        // If already requested (duplicate constraint)
        if (insertErr.code === "23505") {
          setCollabStatus((prev) => ({ ...prev, [pitchId]: "ACCEPTED" }));
          return { success: true, status: "ACCEPTED" };
        }
        throw insertErr;
      }

      const collabRecord = collab as any;

      // 4. Listen for Real-Time Acceptance on this specific request
      const channel = supabase
        .channel(`collab_request:${collabRecord?.id || "temp"}`)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "collaboration_requests",
            filter: `id=eq.${collabRecord?.id}`,
          },
          (payload) => {
            const updated = payload.new as { status: CollabStatus };
            setCollabStatus((prev) => ({ ...prev, [pitchId]: updated.status }));

            if (updated.status === "ACCEPTED") {
              confetti({
                particleCount: 90,
                spread: 100,
                origin: { y: 0.5 },
                colors: ["#10B981", "#FF5A36", "#FAF8F5"],
              });
            }
          }
        )
        .subscribe();

      // Auto-cleanup channel after 2 minutes
      setTimeout(() => {
        supabase.removeChannel(channel);
      }, 120000);

      setRequesting(false);
      return { success: true, collabId: collab.id, status: "PENDING" };
    } catch (err: any) {
      console.warn("Collaboration request notice:", err.message);
      setError(err.message);
      setRequesting(false);
      // Still maintain positive UI state for interactive demo
      setCollabStatus((prev) => ({ ...prev, [pitchId]: "PENDING" }));
      return { success: false, error: err.message };
    }
  }, []);

  return {
    requestCollab,
    requesting,
    collabStatus,
    error,
  };
}
