import React from "react";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp } from "../components/anim";
import { BannerText } from "../components/Card";
import { FullScene, SceneTitle, BottomLabels, Scrim } from "../components/FullScene";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_08_SECONDS = 13;

const chunks = SUBTITLES["scene-08"].filter(
  (c) => !/report any hazards immediately/i.test(c.text),
);

export const Scene08Hazards: React.FC = () => {
  const fps = 30;
  return (
    <FullScene clip="hazards.mp4">
      <Scrim strength={0.42} />
      <SceneTitle kicker="Stay alert" title="Hazard Identification" light />
      {/* Hazard labels sit below each hazard, not on top of it */}
      <BottomLabels
        bottom={128}
        items={[
          { x: 430, label: "Slippery Floors", tone: "alert", delay: 1.5 * fps },
          { x: 980, label: "Moving Machinery", tone: "alert", delay: 2.6 * fps },
          { x: 1560, label: "Electrical Wiring", tone: "alert", delay: 3.7 * fps },
        ]}
      />
      {/* Call-to-action banner under the title, clear of the machinery */}
      <div style={{ position: "absolute", top: 258, left: 100 }}>
        <FadeUp delay={8.2 * fps}>
          <BannerText text="Report any hazards immediately to your supervisor." />
        </FadeUp>
      </div>
      <VoiceOver file="scene-08.mp3" />
      <SubtitleBar chunks={chunks} />
    </FullScene>
  );
};
