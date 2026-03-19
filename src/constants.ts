import type { GameSettings } from "./types";

// Full Wong color palette — colorblind-friendly, ordered by increasing difficulty
export const ALL_COLORS: string[] = [
  "#E69F00", // orange
  "#56B4E9", // sky blue
  "#009E73", // bluish green
  "#F0E442", // yellow
  "#0072B2", // blue
  "#D55E00", // vermillion
  "#CC79A7", // reddish purple
  "#FFFFFF", // white
  "#000000", // black
];

// Slider ranges
export const SLOT_MIN = 3;
export const SLOT_MAX = 6;
export const COLOR_MIN = 4;
export const COLOR_MAX = 9;
export const GUESS_MIN = 6;
export const GUESS_MAX = 15;

// Default settings on first load
export const DEFAULT_SETTINGS: GameSettings = {
  slots: 4,
  colors: 6,
  duplicates: true,
  guesses: 10,
};

// localStorage key for stats
export const STATS_STORAGE_KEY = "mastermind_stats";
