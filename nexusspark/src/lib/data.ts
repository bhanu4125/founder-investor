export interface FounderIdea {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  stage: string;
  targetRaise: string;
  equityOffered: string;
  founder: {
    name: string;
    role: string;
    avatar: string;
  };
  stats: {
    label: string;
    value: string;
  }[];
  sparkline: number[];
  matchScore: string;
  sparkColor: string;
  tags: string[];
}

export interface InvestorProfile {
  id: string;
  name: string;
  firm: string;
  role: string;
  avatar: string;
  checkReady: string;
  checkRange: string;
  thesis: string;
  sectors: string[];
  portfolio: string[];
  dealsBacked: number;
  verified: boolean;
  color: string;
}

export const FOUNDER_IDEAS: FounderIdea[] = [
  {
    id: "idea-1",
    title: "NeuroFlow AI",
    tagline: "Autonomous Supply Chain Synapses",
    description: "Self-healing logistics graph neural network predicting customs bottlenecks 72h prior with zero-shot routing.",
    category: "AI & Infra",
    stage: "Pre-Seed",
    targetRaise: "$1.4M",
    equityOffered: "7.5%",
    founder: {
      name: "Elena Rostova",
      role: "Ex-DeepMind Staff Scientist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    },
    stats: [
      { label: "MRR Growth", value: "+340%" },
      { label: "Waitlist", value: "2,400 enterprise" },
      { label: "Latency", value: "1.2ms" },
    ],
    sparkline: [14, 22, 18, 35, 42, 60, 75, 94],
    matchScore: "98.4%",
    sparkColor: "from-violet-500 via-purple-500 to-amber-400",
    tags: ["Graph NN", "Logistics", "Autonomous Agents"],
  },
  {
    id: "idea-2",
    title: "BioSynth Matrix",
    tagline: "Enzyme Folding on Silicon Wafers",
    description: "Direct carbon capture through synthetic biocatalysts printed on standard 28nm semiconductor nodes.",
    category: "DeepTech / Climate",
    stage: "Seed",
    targetRaise: "$2.8M",
    equityOffered: "9.0%",
    founder: {
      name: "Dr. Kaelen Vance",
      role: "MIT Bio-Nano Lab Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    },
    stats: [
      { label: "Capture Yield", value: "42x Benchmark" },
      { label: "IP Patents", value: "3 Granted" },
      { label: "Lab Validation", value: "DARPA Certified" },
    ],
    sparkline: [20, 28, 25, 45, 52, 68, 80, 98],
    matchScore: "96.7%",
    sparkColor: "from-amber-400 via-rose-500 to-violet-500",
    tags: ["Synthetic Bio", "Semiconductors", "Carbon Capture"],
  },
  {
    id: "idea-3",
    title: "CleanGrid Zero",
    tagline: "Decentralized Virtual Power Plants",
    description: "High-frequency peer-to-peer microgrid settlement protocol with sub-millisecond dispatch algorithms.",
    category: "ClimateTech",
    stage: "Seed",
    targetRaise: "$3.5M",
    equityOffered: "10.0%",
    founder: {
      name: "Soraya Chen",
      role: "Ex-Tesla Energy Architect",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
    },
    stats: [
      { label: "Grid Capacity", value: "240 MW" },
      { label: "Pipeline", value: "$18.5M" },
      { label: "LTV / CAC", value: "8.4x" },
    ],
    sparkline: [12, 19, 32, 40, 58, 64, 82, 95],
    matchScore: "97.9%",
    sparkColor: "from-fuchsia-500 via-amber-400 to-violet-400",
    tags: ["Virtual Power", "P2P Energy", "Grid AI"],
  },
  {
    id: "idea-4",
    title: "QuantumLedger",
    tagline: "Post-Quantum Cryptographic Treasury",
    description: "Lattice-based homomorphic encryption layer protecting institutional reserves against Shor's quantum attacks.",
    category: "Quantum FinTech",
    stage: "Pre-Seed",
    targetRaise: "$1.8M",
    equityOffered: "6.5%",
    founder: {
      name: "Marcus Thorne",
      role: "CERN Fellow & Cryptographer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    },
    stats: [
      { label: "Throughput", value: "100k tx/sec" },
      { label: "Audited By", value: "Trail of Bits" },
      { label: "Banking Pilots", value: "4 Tier-1" },
    ],
    sparkline: [18, 25, 34, 48, 55, 72, 88, 99],
    matchScore: "99.2%",
    sparkColor: "from-violet-400 via-amber-300 to-indigo-500",
    tags: ["Post-Quantum", "Homomorphic", "Treasury"],
  },
  {
    id: "idea-5",
    title: "OmniSight Spatial",
    tagline: "Real-time World Model Engine",
    description: "Foundation spatial model transforming raw phone video feeds into photorealistic gaussian radiance field twins.",
    category: "Spatial AI",
    stage: "Pre-Seed",
    targetRaise: "$2.0M",
    equityOffered: "8.0%",
    founder: {
      name: "Zayn Al-Mansoor",
      role: "Stanford Vision Lab Alum",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80",
    },
    stats: [
      { label: "Inference Speed", value: "60 FPS 4K" },
      { label: "Developer SDK", value: "12,000 DLs" },
      { label: "Compression", value: "98% NeRF" },
    ],
    sparkline: [15, 20, 35, 42, 66, 74, 85, 96],
    matchScore: "95.8%",
    sparkColor: "from-amber-400 via-violet-500 to-orange-400",
    tags: ["3D Gaussian", "Spatial Compute", "Robotics"],
  },
];

export const INVESTORS: InvestorProfile[] = [
  {
    id: "inv-1",
    name: "Aria Sterling",
    firm: "Apex Horizon Syndicate",
    role: "General Partner",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    checkReady: "$350K Ready to Deploy",
    checkRange: "$250K — $1.5M",
    thesis: "Leading rounds in autonomous agent infrastructure, neuromorphic processors, and synthetic biology.",
    sectors: ["AI Infrastructure", "Robotics", "DeepTech"],
    portfolio: ["Stripe", "Wayve", "Cohere", "Mistral AI"],
    dealsBacked: 32,
    verified: true,
    color: "from-emerald-400 via-teal-400 to-cyan-500",
  },
  {
    id: "inv-2",
    name: "Devon Thorne",
    firm: "Vortex Quantum Capital",
    role: "Managing Director",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80",
    checkReady: "$750K Ready to Deploy",
    checkRange: "$500K — $3.0M",
    thesis: "High-conviction lead capital in post-quantum cryptographic security, photonic chips, and zero-carbon grids.",
    sectors: ["Quantum", "Compute", "Clean Energy"],
    portfolio: ["Rigetti", "Groq", "Heliogen", "Zap Energy"],
    dealsBacked: 45,
    verified: true,
    color: "from-cyan-400 via-emerald-400 to-teal-500",
  },
  {
    id: "inv-3",
    name: "Dr. Mira Solis",
    firm: "Catalyst BioVenture",
    role: "Founding Partner",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
    checkReady: "$400K Ready to Deploy",
    checkRange: "$200K — $1.0M",
    thesis: "Backing technical solo founders transforming biology into programmable, scalable manufacturing platforms.",
    sectors: ["Synthetic Bio", "Bio-Nanotech", "AI Diagnostics"],
    portfolio: ["Recursion", "Ginkgo", "Inceptive", "Insilico"],
    dealsBacked: 24,
    verified: true,
    color: "from-teal-300 via-emerald-400 to-cyan-400",
  },
  {
    id: "inv-4",
    name: "Liam Vance",
    firm: "ZeroGravity Capital",
    role: "Lead Angel & Partner",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
    checkReady: "$500K Ready to Deploy",
    checkRange: "$250K — $1.2M",
    thesis: "FinTech rails for algorithmic cross-border liquidity, sovereign reserve protocols, and machine payments.",
    sectors: ["FinTech", "Treasury Rails", "Autonomous Markets"],
    portfolio: ["Ramp", "Mercury", "Monad", "Circle"],
    dealsBacked: 38,
    verified: true,
    color: "from-emerald-400 via-cyan-400 to-teal-400",
  },
  {
    id: "inv-5",
    name: "Cassandra Blake",
    firm: "Hyperion Frontiers",
    role: "Angel Syndicate Lead",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
    checkReady: "$300K Ready to Deploy",
    checkRange: "$150K — $800K",
    thesis: "Early believer in spatial perception, multi-modal robotics, and neuro-adaptive human-computer interfaces.",
    sectors: ["Spatial AI", "BCI", "Robotics"],
    portfolio: ["Figure", "Physical Intelligence", "Sanctuary"],
    dealsBacked: 29,
    verified: true,
    color: "from-cyan-300 via-teal-400 to-emerald-400",
  },
];

export const PLATFORM_STATS = [
  { label: "Total Capital Deployed", value: "$184.2M", change: "+42% this quarter", icon: "TrendingUp" },
  { label: "Ideas Posted & Audited", value: "5,420+", change: "98.4% vetted", icon: "Lightbulb" },
  { label: "Active Syndicates", value: "890+", change: "Top tier angels", icon: "ShieldCheck" },
  { label: "Avg. Term Sheet Speed", value: "68 Hours", change: "4.8x faster than traditional VC", icon: "Zap" },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    persona: "Founders",
    title: "Post the Spark",
    subtitle: "Turn raw ambition into an interactive, cryptographically audited startup dossier in 60 seconds.",
    description: "Feed your technical thesis, milestone targets, and equity parameters into the dynamic Idea Canvas. Our multi-agent engine benchmarks your valuation against live private rounds and auto-generates interactive financial models.",
    badge: "Idea Canvas Engine",
    color: "from-violet-500 to-amber-400",
    accent: "#8B5CF6",
  },
  {
    step: "02",
    persona: "Investors",
    title: "Smart Discovery & Radar",
    subtitle: "Zero noise. Instant algorithmic deal matching aligned with your thesis and ticket velocity.",
    description: "Set your risk tolerance, sector mandates, and check sizes. NexusSpark's Neural Radar continuously scans verified pitches, filtering for high-conviction founders with deep technical moats and verifiable early traction.",
    badge: "Vector Deal Radar",
    color: "from-emerald-400 to-cyan-500",
    accent: "#10B981",
  },
  {
    step: "03",
    persona: "The Synergy",
    title: "Instant Synergy Room",
    subtitle: "Two minds connect. Cap-table simulation, real-time chat, and frictionless term sheet execution.",
    description: "When an investor requests collaboration and the founder accepts, an ephemeral Synergy Room unlocks. Model milestone-based tranches, run cap-table dilutive scenarios live, and sign smart contracts with built-in escrow.",
    badge: "Live Term Sheet Room",
    color: "from-amber-400 via-emerald-400 to-cyan-400",
    accent: "#F59E0B",
  },
];
