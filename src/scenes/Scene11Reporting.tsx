import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT } from "../theme";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp } from "../components/anim";
import { BannerText } from "../components/Card";
import { FullScene, SceneTitle, Scrim } from "../components/FullScene";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_11_SECONDS = 13;

const chunks = SUBTITLES["scene-11"].filter(
  (c) => !/near misses are incidents/i.test(c.text),
);

export const Scene11Reporting: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;
  const alert = interpolate(frame, [1.6 * fps, 2.1 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blink = Math.sin(frame / 4) * 0.5 + 0.5;

  return (
    <FullScene art="nearmiss.png" zoom="in">
      <Scrim strength={0.62} />
      <SceneTitle kicker="See it, say it" title="Report Incidents & Near Misses" light maxWidth={1450} />
      {/* Alert badge over the falling box */}
      <div
        style={{
          position: "absolute",
          left: 700,
          top: 300,
          opacity: alert,
          scale: String(0.6 + 0.4 * alert),
        }}
      >
        <svg viewBox="0 0 90 90" width={100} height={100}>
          <circle
            cx={45}
            cy={45}
            r={38}
            fill={COLORS.red}
            opacity={0.75 + 0.25 * blink}
          />
          <circle
            cx={45}
            cy={45}
            r={44}
            fill="none"
            stroke={COLORS.red}
            strokeWidth={4}
            opacity={0.6 * blink}
          />
          <text
            x={45}
            y={62}
            textAnchor="middle"
            fill="#fff"
            style={{ fontFamily: FONT, fontWeight: 800, fontSize: 52 }}
          >
            !
          </text>
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 190,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 26,
        }}
      >
        <FadeUp delay={3.5 * fps}>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 46,
              color: "#ffffff",
              textShadow: "0 4px 24px rgba(0,0,0,0.55)",
            }}
          >
            Reporting today prevents the accident of tomorrow.
          </div>
        </FadeUp>
        <FadeUp delay={6.3 * fps}>
          <BannerText text="Near misses could have caused injury — report them!" />
        </FadeUp>
      </div>
      <VoiceOver file="scene-11.mp3" />
      <SubtitleBar chunks={chunks} />
    </FullScene>
  );
};
