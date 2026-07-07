import React from "react";
import { DISPLAY } from "../theme";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp } from "../components/anim";
import { KineticText } from "../components/KineticText";
import { FullScene, SceneTitle, BottomLabels, Scrim } from "../components/FullScene";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_04_SECONDS = 20;

const chunks = SUBTITLES["scene-04"];

// The four roles arriving at the facility gate. Labels sit BELOW each
// person (aligned to their x) so they refer to the subject without
// covering faces.
const ROLES = [
  { label: "Visitor", x: 340 },
  { label: "Contractor", x: 760 },
  { label: "Industry Vendor", x: 1180 },
  { label: "New Employee", x: 1600 },
];

export const Scene04Priority: React.FC = () => {
  const fps = 30;
  return (
    <FullScene clip="gate.mp4">
      <Scrim strength={0.5} />
      <SceneTitle kicker="Our commitment to you" title="Safety Is Your Priority" />
      <BottomLabels
        bottom={128}
        items={ROLES.map((r, i) => ({
          x: r.x,
          label: r.label,
          delay: (5.6 + i * 0.9) * fps,
        }))}
      />
      <div
        style={{
          position: "absolute",
          top: 250,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FadeUp delay={14.3 * fps}>
          <div
            style={{
              background: "rgba(15,23,42,0.62)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              borderRadius: 999,
              padding: "14px 44px",
            }}
          >
            <KineticText
              text="Everyone deserves the knowledge to stay safe."
              delay={14.3 * fps + 4}
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontSize: 46,
                letterSpacing: "-0.01em",
                color: "#ffffff",
                justifyContent: "center",
              }}
            />
          </div>
        </FadeUp>
      </div>
      <VoiceOver file="scene-04.mp3" />
      <SubtitleBar chunks={chunks} />
    </FullScene>
  );
};
