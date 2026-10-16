-- ==============================================================================
-- NexusSpark Supabase Database Seed Data
-- 002_seed_data.sql
-- Description: 6 Startup Pitches (with JSONB sparklines), 4 Investor Profiles, 
--              and 1 Initial Synergy Room for immediate demo & interactive testing.
-- ==============================================================================

DO $$
DECLARE
  -- Founder UUIDs
  f1_id UUID := '11111111-1111-4111-8111-111111111111';
  f2_id UUID := '22222222-2222-4222-8222-222222222222';
  f3_id UUID := '33333333-3333-4333-8333-333333333333';
  f4_id UUID := '44444444-4444-4444-8444-444444444444';
  f5_id UUID := '55555555-5555-4555-8555-555555555555';
  f6_id UUID := '66666666-6666-4666-8666-666666666666';

  -- Investor UUIDs
  i1_id UUID := 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
  i2_id UUID := 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
  i3_id UUID := 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';
  i4_id UUID := 'dddddddd-dddd-4ddd-8ddd-dddddddddddd';

  -- Pitch UUIDs
  p1_id UUID := 'e1111111-1111-4111-8111-111111111111';
  p2_id UUID := 'e2222222-2222-4222-8222-222222222222';
  p3_id UUID := 'e3333333-3333-4333-8333-333333333333';
  p4_id UUID := 'e4444444-4444-4444-8444-444444444444';
  p5_id UUID := 'e5555555-5555-4555-8555-555555555555';
  p6_id UUID := 'e6666666-6666-4666-8666-666666666666';

  -- Initial Collab Request UUID
  collab1_id UUID := 'f1111111-1111-4111-8111-111111111111';
BEGIN

  -- 1. SEED AUTH USERS (Allows public.profiles FK to satisfy constraint cleanly)
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
  VALUES
    (f1_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'elena@neuroflow.ai', crypt('NexusSpark2026!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Elena Rostova","role":"FOUNDER"}', now(), now()),
    (f2_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'kaelen@biosynth.io', crypt('NexusSpark2026!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Dr. Kaelen Vance","role":"FOUNDER"}', now(), now()),
    (f3_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'soraya@cleangrid.tech', crypt('NexusSpark2026!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Soraya Chen","role":"FOUNDER"}', now(), now()),
    (f4_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'marcus@quantumledger.os', crypt('NexusSpark2026!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Marcus Thorne","role":"FOUNDER"}', now(), now()),
    (f5_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'devon@heliotrope.energy', crypt('NexusSpark2026!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Devon Reyes","role":"FOUNDER"}', now(), now()),
    (f6_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'zara@verisafe.ai', crypt('NexusSpark2026!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Zara Al-Mansoor","role":"FOUNDER"}', now(), now()),
    -- Investors
    (i1_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'aria@apexfrontier.vc', crypt('NexusSpark2026!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Aria Sterling","role":"INVESTOR"}', now(), now()),
    (i2_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'reid@stratamacro.com', crypt('NexusSpark2026!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Reid Nakamura","role":"INVESTOR"}', now(), now()),
    (i3_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'celeste@luminarydeep.org', crypt('NexusSpark2026!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Celeste Moreau","role":"INVESTOR"}', now(), now()),
    (i4_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'tarek@horizonquantum.fund', crypt('NexusSpark2026!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Tarek Ben-Haim","role":"INVESTOR"}', now(), now())
  ON CONFLICT (id) DO NOTHING;

  -- 2. SEED PROFILES
  INSERT INTO public.profiles (
    id, email, full_name, avatar_url, role, is_verified, headline, bio,
    skills, github_url, linkedin_url,
    firm_name, investor_type, min_check_size, max_check_size, available_capital, target_sectors, target_stages
  ) VALUES
    -- Founders
    (f1_id, 'elena@neuroflow.ai', 'Elena Rostova', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80', 'FOUNDER', true, 'Ex-DeepMind Staff Scientist', 'Architecting self-healing logistics neural networks with sub-millisecond edge latency.', ARRAY['PyTorch', 'Graph NN', 'Distributed Systems'], 'https://github.com/elena-rostova', 'https://linkedin.com/in/elenarostova', NULL, NULL, 0, 0, 0, '{}', '{}'),
    (f2_id, 'kaelen@biosynth.io', 'Dr. Kaelen Vance', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80', 'FOUNDER', true, 'MIT Bio-Nano Lab Director', 'Synthesizing carbon-capturing enzymes printed on standard semiconductor wafers.', ARRAY['Synthetic Biology', 'Semiconductors', 'Nanotech'], 'https://github.com/kvance-nano', 'https://linkedin.com/in/kaelenvance', NULL, NULL, 0, 0, 0, '{}', '{}'),
    (f3_id, 'soraya@cleangrid.tech', 'Soraya Chen', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80', 'FOUNDER', true, 'Ex-Tesla Grid Intelligence Lead', 'Building decentralized peer-to-peer microgrid settlement protocols.', ARRAY['Rust', 'Smart Contracts', 'Energy Systems'], 'https://github.com/sorayachen', 'https://linkedin.com/in/sorayachen', NULL, NULL, 0, 0, 0, '{}', '{}'),
    (f4_id, 'marcus@quantumledger.os', 'Marcus Thorne', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80', 'FOUNDER', true, 'Quantum Cryptographer & Ex-NSA', 'Developing Shor-resistant autonomous treasury rails with sub-second cross-border liquidation.', ARRAY['Post-Quantum Crypto', 'Zero-Knowledge Proofs', 'Go'], 'https://github.com/marcusthorne', 'https://linkedin.com/in/marcusthorne', NULL, NULL, 0, 0, 0, '{}', '{}'),
    (f5_id, 'devon@heliotrope.energy', 'Devon Reyes', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80', 'FOUNDER', false, 'Aerospace Propulsion Engineer', 'Continuous laser-driven satellite beaming delivering clean baseload power to remote data centers.', ARRAY['Aerospace', 'Optics', 'Power Electronics'], 'https://github.com/devonreyes', 'https://linkedin.com/in/devonreyes', NULL, NULL, 0, 0, 0, '{}', '{}'),
    (f6_id, 'zara@verisafe.ai', 'Zara Al-Mansoor', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80', 'FOUNDER', true, 'Ex-OpenAI Alignment Researcher', 'Mathematical interpretability and safety bounds for multi-agent reasoning systems.', ARRAY['Formal Verification', 'Python', 'LLM Alignment'], 'https://github.com/zara-almansoor', 'https://linkedin.com/in/zara-almansoor', NULL, NULL, 0, 0, 0, '{}', '{}'),

    -- Investors
    (i1_id, 'aria@apexfrontier.vc', 'Aria Sterling', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80', 'INVESTOR', true, 'Managing Partner @ Apex Frontier', 'Leading seed & Series A rounds in frontier AI, quantum architecture, and high-moat deep tech.', '{}', NULL, 'https://linkedin.com/in/ariasterling', 'Apex Frontier Partners', 'Lead Venture Fund', 500000, 3000000, 45000000, ARRAY['AI Systems', 'DeepTech', 'Quantum', 'ClimateTech'], ARRAY['PRE_SEED', 'SEED']::pitch_stage[]),
    (i2_id, 'reid@stratamacro.com', 'Reid Nakamura', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80', 'INVESTOR', true, 'General Partner @ Strata Syndicate', 'Syndicating high-velocity angel rounds for technical founders with verified GitHub moats.', '{}', NULL, 'https://linkedin.com/in/reidnakamura', 'Strata Syndicate', 'Syndicate Lead', 100000, 1000000, 18000000, ARRAY['AI & Infra', 'Fintech', 'Quantum'], ARRAY['IDEA', 'PRE_SEED', 'SEED']::pitch_stage[]),
    (i3_id, 'celeste@luminarydeep.org', 'Celeste Moreau', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80', 'INVESTOR', true, 'Founding Partner @ Luminary Bio & Climate', 'Investing in planetary scale technologies: synthetic biology, decarbonization, and fusion materials.', '{}', NULL, 'https://linkedin.com/in/celestemoreau', 'Luminary Climate Fund', 'Impact Lead Fund', 250000, 2500000, 32000000, ARRAY['DeepTech / Climate', 'Synthetic Bio', 'Energy'], ARRAY['PRE_SEED', 'SEED']::pitch_stage[]),
    (i4_id, 'tarek@horizonquantum.fund', 'Tarek Ben-Haim', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80', 'INVESTOR', true, 'Partner @ Horizon Quantum Syndicate', 'Backing next-generation quantum computing protocols, post-quantum cryptography, and space tech.', '{}', NULL, 'https://linkedin.com/in/tarekbenhaim', 'Horizon Quantum Capital', 'Angel Syndicate', 50000, 500000, 12000000, ARRAY['Quantum', 'SpaceTech', 'Cryptography'], ARRAY['IDEA', 'PRE_SEED']::pitch_stage[])
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    avatar_url = EXCLUDED.avatar_url,
    headline = EXCLUDED.headline,
    bio = EXCLUDED.bio,
    target_sectors = EXCLUDED.target_sectors,
    target_stages = EXCLUDED.target_stages;

  -- 3. SEED STARTUP PITCHES
  INSERT INTO public.startup_pitches (
    id, founder_id, title, tagline, problem, solution, stage, sectors,
    funding_ask, equity_offered, sparkline_data, views_count, upvotes_count, collab_requests_count, is_featured
  ) VALUES
    (
      p1_id, f1_id, 'NeuroFlow AI', 'Autonomous Supply Chain Synapses',
      'Global logistics networks suffer $400B in annual losses due to unexpected port and customs bottlenecks.',
      'Self-healing logistics graph neural network predicting customs bottlenecks 72h prior with zero-shot routing.',
      'PRE_SEED', ARRAY['AI & Infra', 'Graph NN', 'Logistics'],
      1400000, 7.50,
      '[{"month":"Jan","value":14},{"month":"Feb","value":22},{"month":"Mar","value":18},{"month":"Apr","value":35},{"month":"May","value":42},{"month":"Jun","value":60},{"month":"Jul","value":75},{"month":"Aug","value":94}]'::jsonb,
      1420, 284, 8, true
    ),
    (
      p2_id, f2_id, 'BioSynth Matrix', 'Enzyme Folding on Silicon Wafers',
      'Conventional biological chemical synthesis relies on high-heat, high-emission petrochemical vats.',
      'Direct carbon capture through synthetic biocatalysts printed on standard 28nm semiconductor nodes.',
      'SEED', ARRAY['DeepTech / Climate', 'Synthetic Bio', 'Semiconductors'],
      2800000, 9.00,
      '[{"month":"Jan","value":20},{"month":"Feb","value":28},{"month":"Mar","value":25},{"month":"Apr","value":45},{"month":"May","value":52},{"month":"Jun","value":68},{"month":"Jul","value":80},{"month":"Aug","value":98}]'::jsonb,
      2100, 412, 12, true
    ),
    (
      p3_id, f3_id, 'CleanGrid Zero', 'Decentralized Virtual Power Plants',
      'Renewable energy surges overwhelm legacy utility grids, forcing curtailment and wasted green power.',
      'High-frequency peer-to-peer microgrid settlement protocol with sub-millisecond dispatch algorithms.',
      'SEED', ARRAY['ClimateTech', 'Energy', 'Decentralized Systems'],
      3500000, 10.00,
      '[{"month":"Jan","value":10},{"month":"Feb","value":18},{"month":"Mar","value":28},{"month":"Apr","value":38},{"month":"May","value":55},{"month":"Jun","value":70},{"month":"Jul","value":88},{"month":"Aug","value":104}]'::jsonb,
      980, 195, 5, false
    ),
    (
      p4_id, f4_id, 'QuantumLedger OS', 'Autonomous Quantum-Safe Treasury Rails',
      'Current banking encryption (RSA-2048) will be broken by emerging Shor algorithm quantum processors.',
      'Lattice-based cryptographic treasury protocol providing sub-second settlement with mathematically guaranteed quantum immunity.',
      'PRE_SEED', ARRAY['Quantum', 'Fintech', 'Post-Quantum Crypto'],
      1800000, 8.50,
      '[{"month":"Jan","value":15},{"month":"Feb","value":24},{"month":"Mar","value":36},{"month":"Apr","value":48},{"month":"May","value":64},{"month":"Jun","value":82},{"month":"Jul","value":95},{"month":"Aug","value":112}]'::jsonb,
      3450, 780, 19, true
    ),
    (
      p5_id, f5_id, 'Heliotrope Orbital', 'Laser-Beamed Space Solar Energy',
      'Terrestrial solar power is limited by night cycles, cloud cover, and seasonal variations.',
      'Constellation of low-earth orbit photovoltaic satellites transmitting continuous optical laser power to terrestrial receptor grids.',
      'PRE_SEED', ARRAY['SpaceTech', 'DeepTech', 'CleanTech'],
      2200000, 8.00,
      '[{"month":"Jan","value":12},{"month":"Feb","value":19},{"month":"Mar","value":29},{"month":"Apr","value":34},{"month":"May","value":46},{"month":"Jun","value":58},{"month":"Jul","value":72},{"month":"Aug","value":89}]'::jsonb,
      1650, 340, 7, false
    ),
    (
      p6_id, f6_id, 'VeriSafe AI', 'Formal Verification Bounds for Autonomous LLMs',
      'Enterprises cannot deploy LLM autonomous agents due to hallucination risks and unverified non-deterministic outputs.',
      'Compiler-level formal verification proof engine bounding LLM agent outputs with mathematical invariants before action execution.',
      'SEED', ARRAY['AI Systems', 'Enterprise Infra', 'Safety'],
      2500000, 8.00,
      '[{"month":"Jan","value":18},{"month":"Feb","value":30},{"month":"Mar","value":44},{"month":"Apr","value":58},{"month":"May","value":76},{"month":"Jun","value":92},{"month":"Jul","value":110},{"month":"Aug","value":130}]'::jsonb,
      2890, 620, 14, true
    )
  ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    tagline = EXCLUDED.tagline,
    funding_ask = EXCLUDED.funding_ask,
    equity_offered = EXCLUDED.equity_offered,
    sparkline_data = EXCLUDED.sparkline_data;

  -- 4. SEED AN ACCEPTED COLLABORATION & SYNERGY ROOM (Immediate Demo for Cap Table Slider)
  INSERT INTO public.collaboration_requests (
    id, pitch_id, founder_id, investor_id, proposed_capital, proposed_equity, message, status
  ) VALUES (
    collab1_id, p4_id, f4_id, i1_id, 2500000, 8.50,
    'Aria Sterling from Apex Frontier: We are eager to lead your $2.5M SAFE with our syndicate partners.',
    'ACCEPTED'
  )
  ON CONFLICT (id) DO NOTHING;

  -- Insert matching synergy room
  INSERT INTO public.synergy_rooms (
    collaboration_id, pitch_id, founder_id, investor_id, cap_table_config, milestones, term_sheet_unlocked
  ) VALUES (
    collab1_id, p4_id, f4_id, i1_id,
    '{"postMoneyValuation": 29400000, "investmentAmount": 2500000, "equityPercentage": 8.5}'::jsonb,
    '[
      {"id": "m1", "title": "Tranche 1: Mainnet Testnet Deployment & Quantum Audit", "trancheAmount": 1000000, "status": "COMPLETED"},
      {"id": "m2", "title": "Tranche 2: SOC2 Type II + 10 Banking Pilots Secured", "trancheAmount": 1000000, "status": "IN_PROGRESS"},
      {"id": "m3", "title": "Tranche 3: Cross-Border Liquidity Rails Live", "trancheAmount": 500000, "status": "LOCKED"}
    ]'::jsonb,
    true
  )
  ON CONFLICT (collaboration_id) DO NOTHING;

END $$;
