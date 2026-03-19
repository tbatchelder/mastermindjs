export type Color = string | null;

export interface Feedback {
  black: number; // correct color, correct position
  yellow: number; // correct color, wrong position
}

export interface GuessEntry {
  guess: Color[];
  feedback: Feedback;
}

export type PickerSide = "left" | "right";

export interface GameSettings {
  slots: number; // 3–6
  colors: number; // 4–9
  duplicates: boolean; // allow duplicate colors in secret
  guesses: number; // 6–15
}

export interface LevelStats {
  wins: number;
  losses: number;
  bestGuesses: number | null; // fewest guesses to win, null if never won
}

// Stats are keyed by a canonical string of the settings, e.g. "4-6-true-10"
export type StatsMap = Record<string, LevelStats>;
