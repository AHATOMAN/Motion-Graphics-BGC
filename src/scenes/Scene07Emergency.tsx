import React from "react";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp } from "../components/anim";
import { BannerText } from "../components/Card";
import { FullScene, SceneTitle, Callout, Scrim } from "../components/FullScene";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_07_SECONDS = 14;

const chunks = SUBTITLES["scene-07"].filter(
  (c) => !/in case of emergency/i.test(c.text),
);

export const Scene07Emergency: React.FC = () => {
  const fps = 30;
  return (
    <FullScene clip="evacuation.mp4">
      <Scrim strength={0.4} />
      <SceneTitle kicker="Be prepared" title="Emergency Procedures" />
      <Callout x={1450} y={330} label="Emergency Exit" tone="positive" delay={1.5 * fps} />
      <Callout x={40} y={430} label="Fire Extinguisher" tone="alert" delay={4.4 * fps} />
      <Callout x={165} y={310} label="First-Aid Kit" tone="positive" delay={6 * fps} />
      <div style={{ position: "absolute", top: 246, left: 90 }}>
        <FadeUp delay={8.9 * fps}>
          <BannerText text="In case of emergency, follow the evacuation plan." />
        </FadeUp>
      </div>
      <VoiceOver file="scene-07.mp3" />
      <SubtitleBar chunks={chunks} />
    </FullScene>
  );
};
