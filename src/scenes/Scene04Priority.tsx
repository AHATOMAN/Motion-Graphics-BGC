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

export const Scene04Priority: React.FC = () => {
  const fps = 30;
  return (
    <FullScene clip="office.mp4">
      <Scrim strength={0.45} />
      <SceneTitle kicker="Our commitment to you" title="Safety Is Your Priority" />
      {/* Role callouts pinned to the people in the scene */}
      <Callout x={300} y={300} label="Visitor" delay={5.6 * fps} />
      <Callout x={600} y={260} label="Industry Vendor" delay={6.5 * fps} />
      <Callout x={1250} y={330} label="Contractor" delay={7.4 * fps} />
      <Callout x={1520} y={640} label="New Employee" delay={8.3 * fps} />
      <div
        style={{
          position: "absolute",
          bottom: 176,
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
