import type { Color, Feedback } from "../types";
import { FeedbackBox } from "./FeedbackBox";

interface GuessRowProps {
  guess: Color[];
  feedback: Feedback;
  slots: number;
  isActive: boolean;
}

export function GuessRow({ guess, feedback, slots, isActive }: GuessRowProps) {
  return (
    <div className={`guess-row ${isActive ? "active" : "inactive"}`}>
      {guess.map((color, i) => (
        <div
          key={i}
          className={[
            "slot",
            color ? "filled" : "",
            color === "#FFFFFF" ? "white-pin" : "",
          ]
            .join(" ")
            .trim()}
          style={{ background: color ?? undefined }}
        />
      ))}
      <FeedbackBox feedback={feedback} slots={slots} />
    </div>
  );
}
