import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp } from "../components/anim";
import { BannerText } from "../components/Card";
import { FullScene, SceneTitle } from "../components/FullScene";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_09_SECONDS = 11;

const chunks = SUBTITLES["scene-09"].filter(
  (c) => !/use your legs/i.test(c.text),
);

// Big verdict badge stamped over the artwork
const Verdict: React.FC<{ x: number; y: number; good: boolean; at: number }> = ({
  x,
  y,
  good,
  at,
}) => {
  const frame = useCurrentFrame();
  const fps = 30;
  const t = interpolate(frame, [at * fps, at * fps + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: t,
        scale: String(1.6 - 0.6 * t),
      }}
    >
      <svg viewBox="0 0 80 80" width={110} height={110}>
        <circle
          cx={40}
          cy={40}
          r={35}
          fill={good ? COLORS.green : COLORS.red}
          stroke="#ffffff"
          strokeWidth={5}
        />
        {good ? (
          <path d="M 22 40 L 34 52 L 58 26" stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M 26 26 L 54 54 M 54 26 L 26 54" stroke="#fff" strokeWidth={9} strokeLinecap="round" />
        )}
      </svg>
    </div>
  );
};

export const Scene09SafeWork: React.FC = () => {
  const fps = 30;
  return (
    <FullScene clip="lifting.mp4">
      <SceneTitle kicker="Do it the right way" title="Safe Work Practices" light />
      <Verdict x={500} y={420} good={false} at={1.5} />
      <Verdict x={1300} y={420} good at={3.5} />
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
        <FadeUp delay={6.2 * fps}>
          <BannerText tone="positive" text="Lifting: Use your legs, not your back." />
        </FadeUp>
      </div>
      <VoiceOver file="scene-09.mp3" />
      <SubtitleBar chunks={chunks} />
    </FullScene>
  );
};
