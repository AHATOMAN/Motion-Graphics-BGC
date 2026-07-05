import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, FONT } from "../theme";
import { SubtitleBar, SubtitleChunk } from "../components/SubtitleBar";
import { FadeUp } from "../components/anim";
import { GlobalLogo } from "../branding/GlobalLogo";
import { BGCLogo } from "../branding/BGCLogo";
import { QhseBadge } from "../branding/QhseBadge";

export const SCENE_13_SECONDS = 12;

const chunks: SubtitleChunk[] = [
  {
    from: 0.5,
    to: 6,
    text: "Thank you for completing your HSE induction. Stay safe!",
  },
];

export const Scene13Credits: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.white} 0%, ${COLORS.lightBg} 60%, ${COLORS.paleBlue} 100%)`,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: 54,
          paddingBottom: 110,
        }}
      >
        <FadeUp delay={5}>
          <div style={{ display: "flex", alignItems: "center", gap: 90 }}>
            <GlobalLogo height={96} showNames />
            <BGCLogo height={150} />
          </div>
        </FadeUp>
        <FadeUp delay={30}>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 46,
              color: COLORS.navy,
              textAlign: "center",
              maxWidth: 1300,
              lineHeight: 1.35,
            }}
          >
            For any questions or concerns about safety,
            <br />
            please speak with your supervisor.
          </div>
        </FadeUp>
        <FadeUp delay={55}>
          <QhseBadge width={620} />
        </FadeUp>
      </AbsoluteFill>
      <SubtitleBar chunks={chunks} />
    </AbsoluteFill>
  );
};
