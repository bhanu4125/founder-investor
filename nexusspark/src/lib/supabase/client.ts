"use client";

import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/supabase";

let supabaseClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export const isSupabaseConfigured = (): boolean => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
    anonKey &&
    !url.includes("your-project") &&
    !anonKey.includes("dummy_anon_key")
  );
};

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  if (!supabaseClient) {
    supabaseClient = createBrowserClient<Database>(url, anonKey);
  }

  return supabaseClient;
}

export const supabase = createClient();
