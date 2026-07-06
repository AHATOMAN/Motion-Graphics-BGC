import React from "react";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp } from "../components/anim";
import { BannerText } from "../components/Card";
import { FullScene, SceneTitle, Callout, Scrim } from "../components/FullScene";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_08_SECONDS = 13;

const chunks = SUBTITLES["scene-08"].filter(
  (c) => !/report any hazards immediately/i.test(c.text),
);

export const Scene08Hazards: React.FC = () => {
  const fps = 30;
  return (
    <FullScene art="hazards.png" zoom="in">
      <Scrim strength={0.42} />
      <SceneTitle kicker="Stay alert" title="Hazard Identification" light />
      <Callout x={430} y={560} label="Slippery Floors" tone="alert" delay={1.5 * fps} />
      <Callout x={1050} y={380} label="Moving Machinery" tone="alert" delay={2.6 * fps} />
      <Callout x={1560} y={420} label="Electrical Wiring" tone="alert" delay={3.7 * fps} />
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
        <FadeUp delay={8.2 * fps}>
          <BannerText text="Report any hazards immediately to your supervisor." />
        </FadeUp>
      </div>
      <VoiceOver file="scene-08.mp3" />
      <SubtitleBar chunks={chunks} />
    </FullScene>
  );
};
