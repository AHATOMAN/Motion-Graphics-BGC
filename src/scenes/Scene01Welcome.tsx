import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, DISPLAY } from "../theme";
import { GlobalLogo } from "../branding/GlobalLogo";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { Pop } from "../components/anim";
import { KineticText } from "../components/KineticText";
import { FullScene } from "../components/FullScene";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_01_SECONDS = 17;

const chunks = SUBTITLES["scene-01"];

export const Scene01Welcome: React.FC = () => {
  return (
    <FullScene clip="welcome.mp4">
      {/* Welcome lockup floating in the open upper-right space; the HSE
          officer waving is built into the scene itself. */}
      <div
        style={{
          position: "absolute",
          top: 120,
          right: 90,
          left: 620,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
        }}
      >
        <Pop delay={5}>
          <GlobalLogo height={92} showNames />
        </Pop>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <KineticText
            text="Welcome to Your"
            delay={38}
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              fontSize: 70,
              letterSpacing: "-0.02em",
              color: COLORS.text,
              justifyContent: "center",
              textShadow: "0 2px 16px rgba(255,255,255,0.85)",
            }}
          />
          <KineticText
            text="QHSE Induction!"
            delay={50}
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              fontSize: 70,
              letterSpacing: "-0.02em",
              color: COLORS.brandRed,
              justifyContent: "center",
              textShadow: "0 2px 16px rgba(255,255,255,0.85)",
            }}
          />
        </div>
      </div>
      <AbsoluteFill style={{ pointerEvents: "none" }} />
      <VoiceOver file="scene-01.mp3" />
      <SubtitleBar chunks={chunks} />
    </FullScene>
  );
};
