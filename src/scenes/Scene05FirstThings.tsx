import React from "react";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FullScene, SceneTitle, Callout } from "../components/FullScene";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_05_SECONDS = 26;

const chunks = SUBTITLES["scene-05"];

export const Scene05FirstThings: React.FC = () => {
  const fps = 30;
  return (
    <FullScene clip="reception.mp4">
      <SceneTitle kicker="Starting off right" title="First Things First!" />
      <Callout
        x={880}
        y={430}
        label="Visitor Pass"
        sub="Visible at all times — return it when you leave"
        delay={4.6 * fps}
      />
      <Callout
        x={210}
        y={240}
        label="Your Host Assists You"
        sub="Ask them any questions"
        delay={10.3 * fps}
      />
      <Callout
        x={1430}
        y={370}
        label="No Photos or Video"
        sub="Only with prior approval"
        tone="alert"
        delay={17.6 * fps}
      />
      <VoiceOver file="scene-05.mp3" />
      <SubtitleBar chunks={chunks} />
    </FullScene>
  );
};
