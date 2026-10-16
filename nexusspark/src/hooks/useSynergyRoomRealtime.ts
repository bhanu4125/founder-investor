"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { CapTableConfig } from "@/types/supabase";

const DEFAULT_CAP_TABLE: CapTableConfig = {
  investmentAmount: 2500000,
  equityPercentage: 8.5,
  postMoneyValuation: 29.4,
};

export function useSynergyRoomRealtime(roomId: string = "demo-room-synergy") {
  const [capTable, setCapTable] = useState<CapTableConfig>(DEFAULT_CAP_TABLE);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [peersCount, setPeersCount] = useState<number>(2); // Default Founder + Investor
  const channelRef = useRef<any>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      return;
    }

    // 1. Create a Supabase Realtime Channel with Broadcast & Presence
    const channel = supabase.channel(`synergy_room:${roomId}`, {
      config: {
        broadcast: { ack: false, self: false },
        presence: { key: `user-${Math.random().toString(36).substring(7)}` },
      },
    });

    // 2. Listen to Fast Realtime Broadcasts (<50ms slider updates)
    channel.on("broadcast", { event: "cap_table_slider_move" }, (payload) => {
      const remoteConfig = payload.payload as CapTableConfig;
      if (remoteConfig && typeof remoteConfig.equityPercentage === "number") {
        setCapTable(remoteConfig);
        setIsSyncing(true);
        setTimeout(() => setIsSyncing(false), 400);
      }
    });

    // 3. Listen to Persistent Postgres Changes
    channel.on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "synergy_rooms",
      },
      (payload) => {
        const updatedRow = payload.new as any;
        if (updatedRow?.cap_table_config) {
          setCapTable({
            investmentAmount: updatedRow.cap_table_config.investmentAmount || 2500000,
            equityPercentage: updatedRow.cap_table_config.equityPercentage || 8.5,
            postMoneyValuation: updatedRow.cap_table_config.postMoneyValuation || 29.4,
          });
        }
      }
    );

    // 4. Track Peer Presence
    channel.on("presence", { event: "sync" }, () => {
      const presenceState = channel.presenceState();
      const count = Object.keys(presenceState).length;
      setPeersCount(Math.max(count, 1));
    });

    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        channel.track({ online_at: new Date().toISOString() });
      }
    });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [roomId]);

  // Method called when dragging the slider
  const updateCapTable = useCallback((newEquity: number, customValuation?: number) => {
    const val = customValuation || Number((2.5 / (newEquity / 100)).toFixed(1));
    const newConfig: CapTableConfig = {
      investmentAmount: 2500000,
      equityPercentage: newEquity,
      postMoneyValuation: val,
    };

    // 1. Update local UI state immediately for 60fps responsiveness
    setCapTable(newConfig);

    // 2. Fast broadcast over Realtime WebSockets to all connected peers (<50ms)
    if (channelRef.current && isSupabaseConfigured()) {
      channelRef.current.send({
        type: "broadcast",
        event: "cap_table_slider_move",
        payload: newConfig,
      });

      // 3. Debounced persistent database update (1000ms after user stops sliding)
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(async () => {
        try {
          await (supabase as any)
            .from("synergy_rooms")
            .update({
              cap_table_config: newConfig,
            })
            .eq("id", roomId);
        } catch {
          // Ignore if in demo or seed mode
        }
      }, 1000);
    }
  }, [roomId]);

  return {
    capTable,
    updateCapTable,
    isSyncing,
    peersCount,
  };
}
