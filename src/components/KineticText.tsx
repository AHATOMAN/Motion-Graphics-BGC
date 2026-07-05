import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// Brushed-titanium gradient for metal type; the light catch drifts
// across it over time via backgroundPosition.
const METAL_GRADIENT =
  "linear-gradient(100deg, #C7D2E4 0%, #F8FAFF 18%, #93A2BA 40%, #EDF2FA 58%, #8592A8 78%, #DDE5F2 100%)";

// Kinetic typography: splits text into words and staggers their
// entrances with spring physics ("word-by-word pop").
// `metal` renders the glyphs with a liquid-metal shader look whose
// specular highlight drifts with the timeline.
export const KineticText: React.FC<{
  text: string;
  delay?: number;
  stagger?: number;
  metal?: boolean;
  style?: React.CSSProperties;
}> = ({ text, delay = 0, stagger = 3, metal = false, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");
  const lightDrift = (frame * 0.45) % 260;

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
              ...(metal
                ? {
                    backgroundImage: METAL_GRADIENT,
                    backgroundSize: "260% 100%",
                    backgroundPositionX: `${-lightDrift}%`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }
                : null),
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
