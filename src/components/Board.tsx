import type { Color, GuessEntry } from "../types";
import { GuessRow } from "./GuessRow";
import { CurrentGuessRow } from "./CurrentGuessRow";

interface BoardProps {
  guesses: GuessEntry[];
  currentGuess: Color[];
  activeRow: number;
  slots: number;
  maxRows: number;
  selectedColor: string | null;
  onPlaceColor: (index: number, color: string) => void;
  onClearSlot: (index: number) => void;
  onSubmit: () => void;
  gameOver: boolean;
  won: boolean;
  secret: string[];
}

export function Board({
  guesses,
  currentGuess,
  activeRow,
  slots,
  maxRows,
  selectedColor,
  onPlaceColor,
  onClearSlot,
  onSubmit,
  gameOver,
  won,
  secret,
}: BoardProps) {
  return (
    <div className="board">
      {gameOver && (
        <div className={`game-over-banner ${won ? "won" : "lost"}`}>
          {won
            ? `🎉 You cracked it in ${guesses.length} guess${guesses.length === 1 ? "" : "es"}!`
            : "💀 Out of guesses! Better luck next time."}
        </div>
      )}

      {Array.from({ length: maxRows }).map((_, i) => {
        const rowData = guesses[i];
        const isActive = i === activeRow && !gameOver;

        if (rowData) {
          return (
            <GuessRow
              key={i}
              guess={rowData.guess}
              feedback={rowData.feedback}
              slots={slots}
              isActive={false}
            />
          );
        }

        if (isActive) {
          return (
            <CurrentGuessRow
              key={i}
              guess={currentGuess}
              slots={slots}
              selectedColor={selectedColor}
              onPlaceColor={onPlaceColor}
              onClearSlot={onClearSlot}
              onSubmit={onSubmit}
            />
          );
        }

        return (
          <GuessRow
            key={i}
            guess={Array(slots).fill(null)}
            feedback={{ black: 0, yellow: 0 }}
            slots={slots}
            isActive={false}
          />
        );
      })}

      {gameOver && (
        <div className="reveal-row">
          <span className="reveal-label">Secret:</span>
          {secret.map((color, i) => (
            <div
              key={i}
              className={["slot filled", color === "#FFFFFF" ? "white-pin" : ""]
                .join(" ")
                .trim()}
              style={{ background: color }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
