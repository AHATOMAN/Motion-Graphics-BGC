import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT } from "../theme";
import { SubtitleBar, SubtitleChunk } from "../components/SubtitleBar";
import { FadeUp, Pop, EASE } from "../components/anim";
import { Avatar } from "../components/People";

export const SCENE_12_SECONDS = 12;

const chunks: SubtitleChunk[] = [
  {
    from: 0.5,
    to: 6,
    text: "Safety is a team effort. Let's work together to ensure everyone stays safe on the job.",
  },
];

export const Scene12Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;
  const bannerScale = interpolate(frame, [6 * fps, 6 * fps + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  return (
    <AbsoluteFill style={{ background: COLORS.navy }}>
      {/* soft shapes */}
      <div
        style={{
          position: "absolute",
          top: -220,
          right: -180,
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -260,
          left: -200,
          width: 640,
          height: 640,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
        }}
      />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: 64,
          paddingBottom: 120,
        }}
      >
        <FadeUp delay={10}>
          <div
            style={{
              background: COLORS.white,
              borderRadius: 999,
              padding: "26px 80px",
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 72,
              color: COLORS.navy,
            }}
          >
            Together, We Work Safely.
          </div>
        </FadeUp>
        <div style={{ display: "flex", gap: 46 }}>
          {(["contractor", "employee", "visitor", "vendor"] as const).map(
            (kind, i) => (
              <Pop key={kind} delay={2 * fps + i * 10}>
                <Avatar kind={kind} size={200} />
              </Pop>
            ),
          )}
        </div>
        <div
          style={{
            scale: String(bannerScale),
            opacity: bannerScale,
            background: COLORS.red,
            color: COLORS.white,
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 56,
            padding: "20px 70px",
            borderRadius: 999,
          }}
        >
          Safety First! Always.
        </div>
      </AbsoluteFill>
      <SubtitleBar chunks={chunks} />
    </AbsoluteFill>
  );
};
