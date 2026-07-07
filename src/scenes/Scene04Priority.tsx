import React from "react";
import { DISPLAY } from "../theme";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp } from "../components/anim";
import { KineticText } from "../components/KineticText";
import { FullScene, SceneTitle, Callout, Scrim } from "../components/FullScene";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_04_SECONDS = 20;

const chunks = SUBTITLES["scene-04"];

// The four roles arriving at the facility gate (dedicated animated scene).
// Labels sit in a clean row above the walking group.
const ROLES = [
  { label: "Visitor", x: 210 },
  { label: "Contractor", x: 640 },
  { label: "Industry Vendor", x: 1080 },
  { label: "New Employee", x: 1510 },
];

export const Scene04Priority: React.FC = () => {
  const fps = 30;
  return (
    <FullScene clip="gate.mp4">
      <Scrim strength={0.5} />
      <SceneTitle kicker="Our commitment to you" title="Safety Is Your Priority" />
      {ROLES.map((role, i) => (
        <Callout
          key={role.label}
          x={role.x}
          y={330}
          label={role.label}
          delay={(5.6 + i * 0.9) * fps}
        />
      ))}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FadeUp delay={14.3 * fps}>
          <KineticText
            text="Everyone deserves the knowledge to stay safe."
            delay={14.3 * fps + 4}
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              fontSize: 52,
              letterSpacing: "-0.01em",
              color: "#ffffff",
              textShadow: "0 4px 24px rgba(0,0,0,0.55)",
              justifyContent: "center",
            }}
          />
        </FadeUp>
      </div>
      <VoiceOver file="scene-04.mp3" />
      <SubtitleBar chunks={chunks} />
    </FullScene>
  );
};
