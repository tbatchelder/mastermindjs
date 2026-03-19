import type { Feedback } from "../types";

interface FeedbackBoxProps {
  feedback: Feedback;
  slots: number;
}

export function FeedbackBox({ feedback, slots }: FeedbackBoxProps) {
  const pegs: ("black" | "yellow" | "empty")[] = [
    ...Array(feedback.black).fill("black"),
    ...Array(feedback.yellow).fill("yellow"),
    ...Array(Math.max(0, slots - feedback.black - feedback.yellow)).fill(
      "empty",
    ),
  ];

  // Layout: up to 3 columns so it stays compact for 3–6 slots
  const cols = slots <= 4 ? 2 : 3;

  return (
    <div
      className="feedback-box"
      style={{ gridTemplateColumns: `repeat(${cols}, 12px)` }}
      title={`${feedback.black} right spot, ${feedback.yellow} wrong spot`}
    >
      {pegs.map((type, i) => (
        <div
          key={i}
          className={
            type === "black"
              ? "peg peg-black"
              : type === "yellow"
                ? "peg peg-yellow"
                : "peg peg-empty"
          }
        />
      ))}
    </div>
  );
}
