export type UserRole = "FOUNDER" | "INVESTOR";
export type PitchStage = "IDEA" | "PROTOTYPE" | "PRE_SEED" | "SEED";
export type CollabStatus = "PENDING" | "ACCEPTED" | "REJECTED";
export type MilestoneStatus = "LOCKED" | "IN_PROGRESS" | "COMPLETED";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface SparklinePoint {
  month: string;
  value: number;
}

export interface CapTableConfig {
  postMoneyValuation: number;
  investmentAmount: number;
  equityPercentage: number;
}

export interface MilestoneItem {
  id: string;
  title: string;
  trancheAmount: number;
  status: MilestoneStatus;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: UserRole;
  is_verified: boolean;
  headline: string | null;
  bio: string | null;
  skills: string[];
  github_url: string | null;
  linkedin_url: string | null;
  firm_name: string | null;
  investor_type: string | null;
  min_check_size: number;
  max_check_size: number;
  available_capital: number;
  target_sectors: string[];
  target_stages: PitchStage[];
  created_at: string;
  updated_at: string;
}

export interface StartupPitch {
  id: string;
  founder_id: string;
  title: string;
  tagline: string;
  problem: string | null;
  solution: string | null;
  stage: PitchStage;
  sectors: string[];
  funding_ask: number;
  equity_offered: number;
  sparkline_data: SparklinePoint[];
  views_count: number;
  upvotes_count: number;
  collab_requests_count: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface CollaborationRequest {
  id: string;
  pitch_id: string;
  founder_id: string;
  investor_id: string;
  proposed_capital: number;
  proposed_equity: number;
  message: string | null;
  status: CollabStatus;
  created_at: string;
}

export interface SynergyRoom {
  id: string;
  collaboration_id: string;
  pitch_id: string;
  founder_id: string;
  investor_id: string;
  cap_table_config: CapTableConfig;
  milestones: MilestoneItem[];
  term_sheet_unlocked: boolean;
  created_at: string;
}

export interface PitchWithFounder extends StartupPitch {
  founder: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    headline: string | null;
    is_verified: boolean;
  };
}

export interface RadarMatchPitch {
  pitch_id: string;
  founder_id: string;
  title: string;
  tagline: string;
  stage: PitchStage;
  sectors: string[];
  funding_ask: number;
  equity_offered: number;
  sparkline_data: SparklinePoint[];
  views_count: number;
  upvotes_count: number;
  is_featured: boolean;
  founder_name: string;
  founder_avatar: string | null;
  founder_verified: boolean;
  match_score: number;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          email: string;
          full_name?: string;
          avatar_url?: string | null;
          role?: UserRole;
          is_verified?: boolean;
          headline?: string | null;
          bio?: string | null;
          skills?: string[];
          github_url?: string | null;
          linkedin_url?: string | null;
          firm_name?: string | null;
          investor_type?: string | null;
          min_check_size?: number;
          max_check_size?: number;
          available_capital?: number;
          target_sectors?: string[];
          target_stages?: PitchStage[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string;
          full_name?: string;
          avatar_url?: string | null;
          role?: UserRole;
          is_verified?: boolean;
          headline?: string | null;
          bio?: string | null;
          skills?: string[];
          github_url?: string | null;
          linkedin_url?: string | null;
          firm_name?: string | null;
          investor_type?: string | null;
          min_check_size?: number;
          max_check_size?: number;
          available_capital?: number;
          target_sectors?: string[];
          target_stages?: PitchStage[];
          updated_at?: string;
        };
        Relationships: [];
      };
      startup_pitches: {
        Row: StartupPitch;
        Insert: {
          id?: string;
          founder_id: string;
          title: string;
          tagline: string;
          problem?: string | null;
          solution?: string | null;
          stage?: PitchStage;
          sectors?: string[];
          funding_ask?: number;
          equity_offered?: number;
          sparkline_data?: Json;
          views_count?: number;
          upvotes_count?: number;
          collab_requests_count?: number;
          is_featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          tagline?: string;
          problem?: string | null;
          solution?: string | null;
          stage?: PitchStage;
          sectors?: string[];
          funding_ask?: number;
          equity_offered?: number;
          sparkline_data?: Json;
          views_count?: number;
          upvotes_count?: number;
          collab_requests_count?: number;
          is_featured?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      collaboration_requests: {
        Row: CollaborationRequest;
        Insert: {
          id?: string;
          pitch_id: string;
          founder_id: string;
          investor_id: string;
          proposed_capital: number;
          proposed_equity: number;
          message?: string | null;
          status?: CollabStatus;
          created_at?: string;
        };
        Update: {
          status?: CollabStatus;
          proposed_capital?: number;
          proposed_equity?: number;
          message?: string | null;
        };
        Relationships: [];
      };
      synergy_rooms: {
        Row: SynergyRoom;
        Insert: {
          id?: string;
          collaboration_id: string;
          pitch_id: string;
          founder_id: string;
          investor_id: string;
          cap_table_config?: Json;
          milestones?: Json;
          term_sheet_unlocked?: boolean;
          created_at?: string;
        };
        Update: {
          cap_table_config?: Json;
          milestones?: Json;
          term_sheet_unlocked?: boolean;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_investor_radar_matches: {
        Args: {
          p_investor_id: string;
        };
        Returns: {
          pitch_id: string;
          founder_id: string;
          title: string;
          tagline: string;
          stage: PitchStage;
          sectors: string[];
          funding_ask: number;
          equity_offered: number;
          sparkline_data: Json;
          views_count: number;
          upvotes_count: number;
          is_featured: boolean;
          founder_name: string;
          founder_avatar: string | null;
          founder_verified: boolean;
          match_score: number;
        }[];
      };
    };
    Enums: {
      user_role: UserRole;
      pitch_stage: PitchStage;
      collab_status: CollabStatus;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
