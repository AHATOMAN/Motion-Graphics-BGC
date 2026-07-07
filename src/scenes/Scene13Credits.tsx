import React from "react";
import { AbsoluteFill, Loop, OffthreadVideo, staticFile } from "remotion";
import { COLORS, FONT } from "../theme";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp } from "../components/anim";
import { VoiceOver } from "../components/VoiceOver";
import { GlobalLogo } from "../branding/GlobalLogo";
import { BGCLogo } from "../branding/BGCLogo";
import { QhseBadge } from "../branding/QhseBadge";

export const SCENE_13_SECONDS = 12;

const chunks = SUBTITLES["scene-13"];

export const Scene13Credits: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: COLORS.lightBg,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Animated landscape softly washed out behind the credits */}
      <Loop durationInFrames={8 * 30}>
        <OffthreadVideo
          muted
          src={staticFile("art/clips/landscape.mp4")}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Loop>
      <AbsoluteFill style={{ background: "rgba(248, 250, 252, 0.82)" }} />
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
      <VoiceOver file="scene-13.mp3" />
      <SubtitleBar chunks={chunks} />
    </AbsoluteFill>
  );
};
