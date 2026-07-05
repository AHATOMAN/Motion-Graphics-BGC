import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// Kinetic typography: splits text into words and staggers their
// entrances with spring physics ("word-by-word pop").
export const KineticText: React.FC<{
  text: string;
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
}> = ({ text, delay = 0, stagger = 3, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        columnGap: "0.28em",
        ...style,
      }}
    >
      {words.map((word, i) => {
        const t = spring({
          frame: frame - delay - i * stagger,
          fps,
          config: { damping: 13, mass: 0.5, stiffness: 110 },
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              translate: `0px ${interpolate(t, [0, 1], [26, 0])}px`,
              opacity: t,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
