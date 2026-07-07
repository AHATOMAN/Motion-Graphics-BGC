import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp } from "../components/anim";
import { BannerText } from "../components/Card";
import { FullScene, SceneTitle, BottomLabels, Scrim } from "../components/FullScene";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_07_SECONDS = 14;

const chunks = SUBTITLES["scene-07"].filter(
  (c) => !/in case of emergency/i.test(c.text),
);

const fps = 30;
const CUT = 8.6; // narration reaches "assembly points" → cut outside

export const Scene07Emergency: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Shot 1 — corridor evacuation walk; labels below the equipment */}
      <Sequence durationInFrames={CUT * fps}>
        <FullScene clip="evacuation.mp4">
          <Scrim strength={0.34} />
          <SceneTitle kicker="Be prepared" title="Emergency Procedures" />
          <BottomLabels
            bottom={128}
            items={[
              { x: 230, label: "Fire Extinguisher", tone: "alert", delay: 4.4 * fps },
              { x: 620, label: "First-Aid Kit", tone: "positive", delay: 6 * fps },
              { x: 1500, label: "Emergency Exit", tone: "positive", delay: 1.5 * fps },
            ]}
          />
        </FullScene>
      </Sequence>
      {/* Shot 2 — assembly point headcount */}
      <Sequence from={CUT * fps}>
        <FullScene clip="assembly.mp4">
          <Scrim strength={0.4} />
          <SceneTitle kicker="Be prepared" title="Assembly Point" light />
          <div style={{ position: "absolute", top: 262, left: 90 }}>
            <FadeUp delay={0.4 * fps}>
              <BannerText text="In case of emergency, follow the evacuation plan." />
            </FadeUp>
          </div>
        </FullScene>
      </Sequence>
      <VoiceOver file="scene-07.mp3" />
      <SubtitleBar chunks={chunks} />
    </AbsoluteFill>
  );
};
