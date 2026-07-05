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
              bottom: 56,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              opacity,
            }}
          >
            <div
              style={{
                maxWidth: 1560,
                background: "rgba(15, 23, 42, 0.78)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1.5px solid rgba(255, 255, 255, 0.10)",
                color: COLORS.white,
                fontFamily: FONT,
                fontWeight: 600,
                fontSize: 38,
                lineHeight: 1.38,
                textAlign: "center",
                padding: "18px 46px",
                borderRadius: 22,
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
