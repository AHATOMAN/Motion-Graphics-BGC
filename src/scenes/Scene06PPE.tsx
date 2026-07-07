import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT } from "../theme";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp } from "../components/anim";
import { BannerText } from "../components/Card";
import { FullScene, SceneTitle } from "../components/FullScene";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_06_SECONDS = 15;

const chunks = SUBTITLES["scene-06"].filter(
  (c) => !/always check your ppe/i.test(c.text),
);

// The worker gears up in the locker room (animated); the checklist
// confirms each item in sync with the narration.
const ITEMS = [
  { label: "Hard Hat", at: 2.5 },
  { label: "Safety Goggles", at: 3.9 },
  { label: "Reflective Vest", at: 5.3 },
  { label: "Gloves", at: 6.7 },
  { label: "Safety Boots", at: 8.1 },
];

export const Scene06PPE: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  return (
    <FullScene clip="locker.mp4">
      <SceneTitle
        kicker="Personal Protective Equipment"
        title="Wear Your PPE — Every Time"
      />
      {/* Checklist on a frosted panel over the lockers */}
      <div
        style={{
          position: "absolute",
          top: 330,
          right: 110,
          background: "rgba(255, 255, 255, 0.88)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: 24,
          padding: "34px 44px",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          boxShadow: "0 24px 54px -18px rgba(15,23,42,0.35)",
        }}
      >
        {ITEMS.map((item) => {
          const o = interpolate(
            frame,
            [item.at * fps, item.at * fps + 14],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          return (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity: o,
                translate: `${(1 - o) * 50}px 0px`,
              }}
            >
              <svg viewBox="0 0 48 48" width={44} height={44}>
                <circle cx={24} cy={24} r={22} fill={COLORS.green} />
                <path
                  d="M 14 24 L 21 31 L 34 17"
                  stroke="#fff"
                  strokeWidth={5}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div
                style={{
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 38,
                  color: COLORS.text,
                }}
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FadeUp delay={9.8 * fps}>
          <BannerText tone="positive" text="Always check your PPE before starting work." />
        </FadeUp>
      </div>
      <VoiceOver file="scene-06.mp3" />
      <SubtitleBar chunks={chunks} />
    </FullScene>
  );
};
