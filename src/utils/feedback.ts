import type { Feedback } from "../types";

export function computeFeedback(guess: string[], secret: string[]): Feedback {
  const len = guess.length;
  let black = 0;
  let yellow = 0;

  const secretCopy = [...secret] as (string | null)[];
  const guessCopy = [...guess] as (string | null)[];

  // Black pegs: correct color, correct position
  for (let i = 0; i < len; i++) {
    if (guessCopy[i] === secretCopy[i]) {
      black++;
      secretCopy[i] = null;
      guessCopy[i] = null;
    }
  }

  // Yellow pegs: correct color, wrong position
  for (let i = 0; i < len; i++) {
    if (guessCopy[i] !== null && secretCopy.includes(guessCopy[i])) {
      yellow++;
      secretCopy[secretCopy.indexOf(guessCopy[i])] = null;
    }
  }

  return { black, yellow };
}

export function generateSecret(
  colors: string[],
  length: number,
  allowDuplicates: boolean,
): string[] {
  if (!allowDuplicates && length > colors.length) {
    // Fallback: can't have more slots than colors without dupes
    throw new Error("Not enough colors for no-duplicate secret of this length");
  }

  if (allowDuplicates) {
    return Array.from({ length }, () => {
      const idx = Math.floor(Math.random() * colors.length);
      return colors[idx];
    });
  }

  // Fisher-Yates shuffle, take first `length` items
  const pool = [...colors];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, length);
}
