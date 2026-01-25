// Global type definitions for the CTF platform

export type User = {
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  total_points: number;
  total_solved: number;
  current_rank: number;
};

export type Genre = {
  id: string;
  title: string;
  description: string;
  total_questions: number;
  total_solved?: number;
  icon?: string;
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty: "easy" | "medium" | "hard";
  genre_id: string;
  is_solved?: boolean;
  solves_count?: number;
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  email?: string;
  total_points: number;
  total_solved: number;
};

export type FlagSubmission = {
  challenge_id: string;
  flag: string;
};

export type SubmissionResponse = {
  success: boolean;
  message: string;
  points_earned?: number;
};

export type Question_ID={
  id:string
}
