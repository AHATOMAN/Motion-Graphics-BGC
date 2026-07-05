import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT } from "../theme";
import { GlobalLogo } from "../branding/GlobalLogo";
import { BGCLogo } from "../branding/BGCLogo";
import { SubtitleBar, SubtitleChunk } from "../components/SubtitleBar";
import { FadeUp, Pop, EASE } from "../components/anim";

export const SCENE_01_SECONDS = 16;

const chunks: SubtitleChunk[] = [
  {
    from: 0.5,
    to: 5.5,
    text: "Welcome to Global Chemicals & Maintenance Systems LLC — Al Barami Group of Companies.",
  },
  {
    from: 5.5,
    to: 11.5,
    text: "Today, we'll introduce you to the key safety guidelines and best practices to keep you safe while working with us.",
  },
  { from: 11.5, to: 15.5, text: "Safety is everyone's responsibility." },
];

export const Scene01Welcome: React.FC = () => {
  const frame = useCurrentFrame();
  const glow = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: "clamp",
    easing: EASE,
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.white} 0%, ${COLORS.lightBg} 60%, ${COLORS.paleBlue} 100%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -300,
          left: "50%",
          width: 1200,
          height: 700,
          marginLeft: -600,
          borderRadius: "50%",
          background: `radial-gradient(closest-side, ${COLORS.paleBlue}, transparent)`,
          opacity: glow,
        }}
      />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: 60,
          paddingBottom: 120,
        }}
      >
        <Pop delay={5}>
          <GlobalLogo height={130} showNames />
        </Pop>
        <div style={{ display: "flex", alignItems: "center", gap: 90 }}>
          <Pop delay={25}>
            <BGCLogo height={170} />
          </Pop>
          <FadeUp delay={45}>
            <div
              style={{
                fontFamily: FONT,
                fontWeight: 800,
                fontSize: 88,
                lineHeight: 1.12,
                color: COLORS.navy,
                maxWidth: 900,
              }}
            >
              Welcome to Your{" "}
              <span style={{ color: COLORS.red }}>QHSE Induction!</span>
            </div>
          </FadeUp>
        </div>
      </AbsoluteFill>
      <SubtitleBar chunks={chunks} />
    </AbsoluteFill>
  );
};
