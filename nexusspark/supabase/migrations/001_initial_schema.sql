-- ==============================================================================
-- NexusSpark Supabase Database Migration
-- 001_initial_schema.sql
-- Description: Core Schema, Enums, RLS Policies, Triggers, and Radar Matching RPC
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. CUSTOM ENUMS
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('FOUNDER', 'INVESTOR');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE pitch_stage AS ENUM ('IDEA', 'PROTOTYPE', 'PRE_SEED', 'SEED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE collab_status AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. TABLES

-- Table 1: Profiles (Linked 1:1 to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'FOUNDER',
  is_verified BOOLEAN NOT NULL DEFAULT false,
  headline TEXT,
  bio TEXT,
  -- Founder Specific
  skills TEXT[] DEFAULT '{}',
  github_url TEXT,
  linkedin_url TEXT,
  -- Investor Specific
  firm_name TEXT,
  investor_type TEXT,
  min_check_size NUMERIC DEFAULT 50000,
  max_check_size NUMERIC DEFAULT 1000000,
  available_capital NUMERIC DEFAULT 5000000,
  target_sectors TEXT[] DEFAULT '{}',
  target_stages pitch_stage[] DEFAULT '{PRE_SEED,SEED}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table 2: Startup Pitches (Powers the 3D Bento Marquee & Idea Stream)
CREATE TABLE IF NOT EXISTS public.startup_pitches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  founder_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  problem TEXT,
  solution TEXT,
  stage pitch_stage NOT NULL DEFAULT 'PRE_SEED',
  sectors TEXT[] NOT NULL DEFAULT '{}',
  funding_ask NUMERIC NOT NULL DEFAULT 1000000,
  equity_offered NUMERIC(5,2) NOT NULL DEFAULT 7.50,
  sparkline_data JSONB NOT NULL DEFAULT '[]'::jsonb,
  views_count INT NOT NULL DEFAULT 0,
  upvotes_count INT NOT NULL DEFAULT 0,
  collab_requests_count INT NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table 3: Collaboration Requests (Powers the "⚡ Request Collab" & Hero Ignition)
CREATE TABLE IF NOT EXISTS public.collaboration_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pitch_id UUID NOT NULL REFERENCES public.startup_pitches(id) ON DELETE CASCADE,
  founder_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  proposed_capital NUMERIC NOT NULL,
  proposed_equity NUMERIC(5,2) NOT NULL,
  message TEXT,
  status collab_status NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_pitch_investor_collab UNIQUE(pitch_id, investor_id)
);

-- Table 4: Synergy Rooms (Automatically unlocked when status = 'ACCEPTED')
CREATE TABLE IF NOT EXISTS public.synergy_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collaboration_id UUID NOT NULL UNIQUE REFERENCES public.collaboration_requests(id) ON DELETE CASCADE,
  pitch_id UUID NOT NULL REFERENCES public.startup_pitches(id) ON DELETE CASCADE,
  founder_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  cap_table_config JSONB NOT NULL DEFAULT '{"postMoneyValuation": 20000000, "investmentAmount": 2000000, "equityPercentage": 10.0}'::jsonb,
  milestones JSONB NOT NULL DEFAULT '[]'::jsonb,
  term_sheet_unlocked BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. DATABASE TRIGGERS & FUNCTIONS

-- A. Auto-update updated_at timestamp function
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_profiles_updated_at ON public.profiles;
CREATE TRIGGER trigger_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

DROP TRIGGER IF EXISTS trigger_pitches_updated_at ON public.startup_pitches;
CREATE TRIGGER trigger_pitches_updated_at
BEFORE UPDATE ON public.startup_pitches
FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- B. Auto-Create Profile on Signup Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_role user_role := 'FOUNDER';
  v_meta_role TEXT;
BEGIN
  v_meta_role := UPPER(COALESCE(NEW.raw_user_meta_data->>'role', 'FOUNDER'));
  IF v_meta_role IN ('FOUNDER', 'INVESTOR') THEN
    v_role := v_meta_role::user_role;
  END IF;

  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    avatar_url,
    role,
    headline,
    bio
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'),
    v_role,
    COALESCE(NEW.raw_user_meta_data->>'headline', CASE WHEN v_role = 'FOUNDER' THEN 'Building the next frontier' ELSE 'Backing high-conviction ventures' END),
    COALESCE(NEW.raw_user_meta_data->>'bio', '')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = CASE WHEN profiles.full_name = '' THEN EXCLUDED.full_name ELSE profiles.full_name END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- C. Auto-Unlock Synergy Room Trigger (When Collaboration Request is Accepted)
CREATE OR REPLACE FUNCTION public.handle_accepted_collaboration()
RETURNS TRIGGER AS $$
DECLARE
  v_post_valuation NUMERIC;
  v_default_milestones JSONB;
BEGIN
  -- Only fire when status transitions from PENDING to ACCEPTED
  IF OLD.status = 'PENDING' AND NEW.status = 'ACCEPTED' THEN
    -- Calculate implied valuation: Capital / (Equity / 100)
    IF NEW.proposed_equity > 0 THEN
      v_post_valuation := ROUND(NEW.proposed_capital / (NEW.proposed_equity / 100.0), 2);
    ELSE
      v_post_valuation := NEW.proposed_capital * 10;
    END IF;

    -- Standard 3-Tranche Milestone Roadmap
    v_default_milestones := jsonb_build_array(
      jsonb_build_object(
        'id', 'm1',
        'title', 'Tranche 1: Core Architecture & Testnet Protocol Deployment',
        'trancheAmount', ROUND(NEW.proposed_capital * 0.40, 2),
        'status', 'COMPLETED'
      ),
      jsonb_build_object(
        'id', 'm2',
        'title', 'Tranche 2: SOC2 Type II Audit & 10 Enterprise Beta Pilots',
        'trancheAmount', ROUND(NEW.proposed_capital * 0.35, 2),
        'status', 'IN_PROGRESS'
      ),
      jsonb_build_object(
        'id', 'm3',
        'title', 'Tranche 3: Production Mainnet & Institutional Liquidity Scale',
        'trancheAmount', ROUND(NEW.proposed_capital * 0.25, 2),
        'status', 'LOCKED'
      )
    );

    -- Insert into synergy_rooms
    INSERT INTO public.synergy_rooms (
      collaboration_id,
      pitch_id,
      founder_id,
      investor_id,
      cap_table_config,
      milestones,
      term_sheet_unlocked
    ) VALUES (
      NEW.id,
      NEW.pitch_id,
      NEW.founder_id,
      NEW.investor_id,
      jsonb_build_object(
        'postMoneyValuation', v_post_valuation,
        'investmentAmount', NEW.proposed_capital,
        'equityPercentage', NEW.proposed_equity
      ),
      v_default_milestones,
      true
    )
    ON CONFLICT (collaboration_id) DO NOTHING;

    -- Increment collab_requests_count on the pitch
    UPDATE public.startup_pitches
    SET collab_requests_count = collab_requests_count + 1
    WHERE id = NEW.pitch_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_collab_accepted ON public.collaboration_requests;
CREATE TRIGGER on_collab_accepted
AFTER UPDATE OF status ON public.collaboration_requests
FOR EACH ROW EXECUTE FUNCTION public.handle_accepted_collaboration();

-- D. Smart Discovery Radar RPC (Match Score 0-100 Calculation)
CREATE OR REPLACE FUNCTION public.get_investor_radar_matches(p_investor_id UUID)
RETURNS TABLE (
  pitch_id UUID,
  founder_id UUID,
  title TEXT,
  tagline TEXT,
  stage pitch_stage,
  sectors TEXT[],
  funding_ask NUMERIC,
  equity_offered NUMERIC,
  sparkline_data JSONB,
  views_count INT,
  upvotes_count INT,
  is_featured BOOLEAN,
  founder_name TEXT,
  founder_avatar TEXT,
  founder_verified BOOLEAN,
  match_score INT
) AS $$
DECLARE
  v_investor RECORD;
BEGIN
  -- Fetch investor radar parameters
  SELECT
    target_sectors,
    target_stages,
    min_check_size,
    max_check_size
  INTO v_investor
  FROM public.profiles
  WHERE id = p_investor_id;

  RETURN QUERY
  SELECT
    p.id AS pitch_id,
    p.founder_id,
    p.title,
    p.tagline,
    p.stage,
    p.sectors,
    p.funding_ask,
    p.equity_offered,
    p.sparkline_data,
    p.views_count,
    p.upvotes_count,
    p.is_featured,
    prof.full_name AS founder_name,
    prof.avatar_url AS founder_avatar,
    prof.is_verified AS founder_verified,
    (
      -- Match Score Algorithm:
      -- +40 if pitch sectors overlap with investor target sectors
      (CASE WHEN v_investor.target_sectors IS NOT NULL AND p.sectors && v_investor.target_sectors THEN 40 ELSE 10 END) +
      -- +30 if pitch stage matches investor target stages
      (CASE WHEN v_investor.target_stages IS NOT NULL AND p.stage = ANY(v_investor.target_stages) THEN 30 ELSE 10 END) +
      -- +30 if funding ask is within investor check size range
      (CASE WHEN v_investor.min_check_size IS NOT NULL AND v_investor.max_check_size IS NOT NULL 
            AND p.funding_ask BETWEEN v_investor.min_check_size AND v_investor.max_check_size THEN 30 
            ELSE 10 END)
    )::INT AS match_score
  FROM public.startup_pitches p
  JOIN public.profiles prof ON p.founder_id = prof.id
  ORDER BY match_score DESC, p.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. ROW-LEVEL SECURITY (RLS) POLICIES

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.startup_pitches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collaboration_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.synergy_rooms ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone"
ON public.profiles FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Startup Pitches Policies
DROP POLICY IF EXISTS "Pitches are viewable by everyone" ON public.startup_pitches;
CREATE POLICY "Pitches are viewable by everyone"
ON public.startup_pitches FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Founders can insert pitches" ON public.startup_pitches;
CREATE POLICY "Founders can insert pitches"
ON public.startup_pitches FOR INSERT
WITH CHECK (auth.uid() = founder_id);

DROP POLICY IF EXISTS "Founders can update their own pitches" ON public.startup_pitches;
CREATE POLICY "Founders can update their own pitches"
ON public.startup_pitches FOR UPDATE
USING (auth.uid() = founder_id)
WITH CHECK (auth.uid() = founder_id);

DROP POLICY IF EXISTS "Founders can delete their own pitches" ON public.startup_pitches;
CREATE POLICY "Founders can delete their own pitches"
ON public.startup_pitches FOR DELETE
USING (auth.uid() = founder_id);

-- Collaboration Requests Policies
DROP POLICY IF EXISTS "Participants can view collaboration requests" ON public.collaboration_requests;
CREATE POLICY "Participants can view collaboration requests"
ON public.collaboration_requests FOR SELECT
USING (auth.uid() = founder_id OR auth.uid() = investor_id);

DROP POLICY IF EXISTS "Investors can initiate collaboration requests" ON public.collaboration_requests;
CREATE POLICY "Investors can initiate collaboration requests"
ON public.collaboration_requests FOR INSERT
WITH CHECK (auth.uid() = investor_id);

DROP POLICY IF EXISTS "Participants can update collaboration requests" ON public.collaboration_requests;
CREATE POLICY "Participants can update collaboration requests"
ON public.collaboration_requests FOR UPDATE
USING (auth.uid() = founder_id OR auth.uid() = investor_id)
WITH CHECK (auth.uid() = founder_id OR auth.uid() = investor_id);

-- Synergy Rooms Policies (Strictly Confidential)
DROP POLICY IF EXISTS "Synergy rooms are private to participating founder and investor" ON public.synergy_rooms;
CREATE POLICY "Synergy rooms are private to participating founder and investor"
ON public.synergy_rooms FOR SELECT
USING (auth.uid() = founder_id OR auth.uid() = investor_id);

DROP POLICY IF EXISTS "Participants can update synergy room state" ON public.synergy_rooms;
CREATE POLICY "Participants can update synergy room state"
ON public.synergy_rooms FOR UPDATE
USING (auth.uid() = founder_id OR auth.uid() = investor_id)
WITH CHECK (auth.uid() = founder_id OR auth.uid() = investor_id);

-- 6. REALTIME REPLICATION CONFIGURATION
DO $$
BEGIN
  -- Enable Realtime on tables for live stream updates & instant synergy synchronization
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'startup_pitches'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.startup_pitches;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'collaboration_requests'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.collaboration_requests;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'synergy_rooms'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.synergy_rooms;
  END IF;
END $$;
