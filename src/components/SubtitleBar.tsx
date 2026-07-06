import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT } from "../theme";

export type SubtitleChunk = {
  text: string;
  // Seconds, relative to the start of the scene.
  from: number;
  to: number;
};

// Voiceover text rendered as subtitles in a pill at the bottom of the frame.
export const SubtitleBar: React.FC<{ chunks: SubtitleChunk[] }> = ({
  chunks,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {chunks.map((chunk, i) => {
        const start = chunk.from * fps;
        const end = chunk.to * fps;
        if (frame < start - 5 || frame > end + 5) {
          return null;
        }
        const opacity = interpolate(
          frame,
          [start, start + 8, end - 8, end],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: 30,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              opacity,
            }}
          >
            <div
              style={{
                maxWidth: 1200,
                background: "rgba(15, 23, 42, 0.76)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                color: COLORS.white,
                fontFamily: FONT,
                fontWeight: 500,
                fontSize: 26,
                lineHeight: 1.4,
                textAlign: "center",
                padding: "8px 28px",
                borderRadius: 12,
              }}
            >
              {chunk.text}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
