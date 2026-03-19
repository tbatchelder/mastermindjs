import { useState, useCallback } from "react";
import type { StatsMap, LevelStats, GameSettings } from "../types";
import { STATS_STORAGE_KEY } from "../constants";

export function settingsKey(s: GameSettings): string {
  return `${s.slots}-${s.colors}-${s.duplicates}-${s.guesses}`;
}

function loadStats(): StatsMap {
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StatsMap) : {};
  } catch {
    return {};
  }
}

function saveStats(map: StatsMap): void {
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // storage unavailable — fail silently
  }
}

export function useStats() {
  const [statsMap, setStatsMap] = useState<StatsMap>(loadStats);

  const getStats = useCallback(
    (settings: GameSettings): LevelStats => {
      const key = settingsKey(settings);
      return statsMap[key] ?? { wins: 0, losses: 0, bestGuesses: null };
    },
    [statsMap],
  );

  const recordWin = useCallback(
    (settings: GameSettings, guessCount: number) => {
      setStatsMap((prev) => {
        const key = settingsKey(settings);
        const current = prev[key] ?? { wins: 0, losses: 0, bestGuesses: null };
        const updated: StatsMap = {
          ...prev,
          [key]: {
            wins: current.wins + 1,
            losses: current.losses,
            bestGuesses:
              current.bestGuesses === null
                ? guessCount
                : Math.min(current.bestGuesses, guessCount),
          },
        };
        saveStats(updated);
        return updated;
      });
    },
    [],
  );

  const recordLoss = useCallback((settings: GameSettings) => {
    setStatsMap((prev) => {
      const key = settingsKey(settings);
      const current = prev[key] ?? { wins: 0, losses: 0, bestGuesses: null };
      const updated: StatsMap = {
        ...prev,
        [key]: { ...current, losses: current.losses + 1 },
      };
      saveStats(updated);
      return updated;
    });
  }, []);

  const clearStats = useCallback(() => {
    setStatsMap({});
    try {
      localStorage.removeItem(STATS_STORAGE_KEY);
    } catch {
      /* silent */
    }
  }, []);

  return { getStats, recordWin, recordLoss, clearStats };
}
