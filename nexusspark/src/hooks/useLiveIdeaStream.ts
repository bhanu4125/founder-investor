"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { FOUNDER_IDEAS, FounderIdea } from "@/lib/data";
import { PitchStage } from "@/types/supabase";

export function useLiveIdeaStream() {
  const [ideas, setIdeas] = useState<FounderIdea[]>(FOUNDER_IDEAS);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);

  // Normalizer: Convert Supabase row into frontend FounderIdea interface
  const normalizePitch = useCallback((pitch: any, founder: any): FounderIdea => {
    // Extract sparkline numbers array
    let sparkline: number[] = [20, 30, 45, 60, 75, 88, 100];
    if (Array.isArray(pitch.sparkline_data) && pitch.sparkline_data.length > 0) {
      sparkline = pitch.sparkline_data.map((item: any) =>
        typeof item === "number" ? item : Number(item.value) || 20
      );
    }

    const askFormatted = pitch.funding_ask >= 1000000
      ? `$${(pitch.funding_ask / 1000000).toFixed(1)}M`
      : `$${(pitch.funding_ask / 1000).toFixed(0)}K`;

    return {
      id: pitch.id,
      title: pitch.title,
      tagline: pitch.tagline,
      description: pitch.solution || pitch.problem || pitch.tagline,
      category: pitch.sectors?.[0] || "Frontier Tech",
      stage: pitch.stage?.replace("_", "-") || "Pre-Seed",
      targetRaise: askFormatted,
      equityOffered: `${Number(pitch.equity_offered).toFixed(1)}%`,
      founder: {
        name: founder?.full_name || "Nexus Founder",
        role: founder?.headline || "Technical Founder",
        avatar: founder?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      },
      stats: [
        { label: "Views", value: `${pitch.views_count || 120}` },
        { label: "Syndicate Pings", value: `${pitch.collab_requests_count || 3}` },
        { label: "Upvotes", value: `${pitch.upvotes_count || 48}` },
      ],
      sparkline,
      matchScore: `${Math.floor(92 + (pitch.upvotes_count % 7))}.${pitch.views_count % 9}%`,
      sparkColor: "from-[#FF5A36] via-[#FB923C] to-[#10B981]",
      tags: pitch.sectors?.slice(0, 3) || ["DeepTech", "AI", "Frontier"],
    };
  }, []);

  // Fetch initial pitches from Supabase
  const fetchPitches = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setIdeas(FOUNDER_IDEAS);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("startup_pitches")
        .select(`
          *,
          founder:profiles!startup_pitches_founder_id_fkey(
            id, full_name, avatar_url, headline, is_verified
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Supabase pitches fetch fallback to mock:", error.message);
        setIdeas(FOUNDER_IDEAS);
      } else if (data && data.length > 0) {
        const normalized = data.map((row: any) => normalizePitch(row, row.founder));
        setIdeas(normalized);
      } else {
        setIdeas(FOUNDER_IDEAS);
      }
    } catch (err) {
      console.warn("Error loading live idea stream:", err);
      setIdeas(FOUNDER_IDEAS);
    } finally {
      setLoading(false);
    }
  }, [normalizePitch]);

  // Realtime Subscription
  useEffect(() => {
    fetchPitches();

    if (!isSupabaseConfigured()) {
      return;
    }

    // Subscribe to new startup_pitches INSERT events
    const channel = supabase
      .channel("public:startup_pitches:stream")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "startup_pitches",
        },
        async (payload) => {
          const newRow = payload.new;

          // Fetch founder info for the newly created pitch
          const { data: founder } = await supabase
            .from("profiles")
            .select("id, full_name, avatar_url, headline, is_verified")
            .eq("id", newRow.founder_id)
            .single();

          const normalized = normalizePitch(newRow, founder);

          // Prepend newly inserted pitch with seamless layout transition
          setIdeas((prev) => [normalized, ...prev.filter((item) => item.id !== normalized.id)]);
        }
      )
      .subscribe((status) => {
        setIsLiveConnected(status === "SUBSCRIBED");
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPitches, normalizePitch]);

  // Helper function to create a new pitch
  const createNewPitch = async (pitch: {
    title: string;
    tagline: string;
    problem?: string;
    solution?: string;
    stage?: PitchStage;
    sectors?: string[];
    funding_ask: number;
    equity_offered: number;
  }) => {
    if (!isSupabaseConfigured()) {
      // Optimistic local add in offline demo mode
      const localIdea: FounderIdea = {
        id: `local-${Date.now()}`,
        title: pitch.title,
        tagline: pitch.tagline,
        description: pitch.solution || pitch.tagline,
        category: pitch.sectors?.[0] || "AI Systems",
        stage: pitch.stage?.replace("_", "-") || "Pre-Seed",
        targetRaise: `$${(pitch.funding_ask / 1000000).toFixed(1)}M`,
        equityOffered: `${pitch.equity_offered.toFixed(1)}%`,
        founder: {
          name: "You (Founder)",
          role: "Visionary Builder",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
        },
        stats: [
          { label: "Status", value: "Live on Radar" },
          { label: "Syndicates", value: "Pinging..." },
        ],
        sparkline: [10, 25, 40, 65, 80, 95],
        matchScore: "99.1%",
        sparkColor: "from-[#FF5A36] to-[#10B981]",
        tags: pitch.sectors || ["Frontier", "Autonomous"],
      };
      setIdeas((prev) => [localIdea, ...prev]);
      return { data: localIdea, error: null };
    }

    try {
      const { data: userData } = await supabase.auth.getUser();
      const founderId = userData?.user?.id || "11111111-1111-4111-8111-111111111111"; // Fallback to seeded demo founder

      const { data, error } = await (supabase as any)
        .from("startup_pitches")
        .insert({
          founder_id: founderId,
          title: pitch.title,
          tagline: pitch.tagline,
          problem: pitch.problem || "",
          solution: pitch.solution || pitch.tagline,
          stage: pitch.stage || "PRE_SEED",
          sectors: pitch.sectors || ["AI Systems"],
          funding_ask: pitch.funding_ask,
          equity_offered: pitch.equity_offered,
          sparkline_data: [
            { month: "M1", value: 15 },
            { month: "M2", value: 30 },
            { month: "M3", value: 55 },
            { month: "M4", value: 80 },
            { month: "M5", value: 110 },
          ],
        })
        .select()
        .single();

      return { data, error };
    } catch (err: any) {
      return { data: null, error: err };
    }
  };

  return {
    ideas,
    loading,
    isLiveConnected,
    createNewPitch,
    refetch: fetchPitches,
  };
}
