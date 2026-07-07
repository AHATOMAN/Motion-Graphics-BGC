import React from "react";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FullScene, SceneTitle, BottomLabels, Scrim } from "../components/FullScene";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_05_SECONDS = 26;

const chunks = SUBTITLES["scene-05"];

export const Scene05FirstThings: React.FC = () => {
  const fps = 30;
  return (
    <FullScene clip="reception.mp4">
      <Scrim strength={0.34} />
      <SceneTitle kicker="Starting off right" title="First Things First!" />
      {/* Labels sit below the subjects: host on the left (reception desk),
          visitor pass at the handover point, no-photos as a general rule. */}
      <BottomLabels
        bottom={128}
        items={[
          {
            x: 420,
            label: "Your Host Assists You",
            sub: "Ask them any questions",
            delay: 10.3 * fps,
          },
          {
            x: 1010,
            label: "Visitor Pass",
            sub: "Visible at all times · return on exit",
            delay: 4.6 * fps,
          },
          {
            x: 1590,
            label: "No Photos or Video",
            sub: "Only with prior approval",
            tone: "alert",
            delay: 17.6 * fps,
          },
        ]}
      />
      <VoiceOver file="scene-05.mp3" />
      <SubtitleBar chunks={chunks} />
    </FullScene>
  );
};
