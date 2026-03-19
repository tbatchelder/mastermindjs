import React from "react";
import type { Color } from "../types";
import { FeedbackBox } from "./FeedbackBox";

interface CurrentGuessRowProps {
  guess: Color[];
  slots: number;
  onPlaceColor: (index: number, color: string) => void;
  onClearSlot: (index: number) => void;
  onSubmit: () => void;
}

export function CurrentGuessRow({
  guess,
  slots,
  onPlaceColor,
  onClearSlot,
  onSubmit,
}: CurrentGuessRowProps) {
  function handleDrop(e: React.DragEvent<HTMLDivElement>, index: number) {
    const color = e.dataTransfer.getData("color");
    if (color) onPlaceColor(index, color);
  }

  const isComplete = guess.every((c) => c !== null);
  const emptyFeedback = { black: 0, yellow: 0 };

  return (
    <div className="guess-row active">
      {guess.map((color, i) => (
        <div
          key={i}
          className={[
            "slot",
            color ? "filled" : "",
            color === "#FFFFFF" ? "white-pin" : "",
            color ? "slot-clearable" : "",
          ]
            .join(" ")
            .trim()}
          style={{ background: color ?? undefined }}
          title={color ? "Click to clear" : undefined}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, i)}
          onClick={() => {
            if (color) onClearSlot(i);
          }}
        />
      ))}
      <FeedbackBox feedback={emptyFeedback} slots={slots} />
      <button
        className="submit-btn"
        onClick={onSubmit}
        disabled={!isComplete}
        title={isComplete ? "Submit your guess" : "Fill all slots first"}
      >
        Submit
      </button>
    </div>
  );
}
