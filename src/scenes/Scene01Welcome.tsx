import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, DISPLAY } from "../theme";
import { GlobalLogo } from "../branding/GlobalLogo";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { Pop } from "../components/anim";
import { KineticText } from "../components/KineticText";
import { FullScene, HseOfficer } from "../components/FullScene";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_01_SECONDS = 17;

const chunks = SUBTITLES["scene-01"];

export const Scene01Welcome: React.FC = () => {
  return (
    <FullScene art="landscape.png" zoom="in">
      {/* Welcome lockup floating in the sky area of the artwork */}
      <AbsoluteFill style={{ alignItems: "center" }}>
        <div
          style={{
            marginTop: 96,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 34,
          }}
        >
          <Pop delay={5}>
            <GlobalLogo height={104} showNames />
          </Pop>
          <div style={{ display: "flex", gap: 22 }}>
            <KineticText
              text="Welcome to Your"
              delay={38}
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontSize: 78,
                letterSpacing: "-0.02em",
                color: COLORS.text,
              }}
            />
            <KineticText
              text="QHSE Induction!"
              delay={50}
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontSize: 78,
                letterSpacing: "-0.02em",
                color: COLORS.brandRed,
              }}
            />
          </div>
        </div>
      </AbsoluteFill>
      {/* HSE officer welcomes the viewer */}
      <HseOfficer height={600} right={80} bottom={0} delay={55} />
      <VoiceOver file="scene-01.mp3" />
      <SubtitleBar chunks={chunks} />
    </FullScene>
  );
};
