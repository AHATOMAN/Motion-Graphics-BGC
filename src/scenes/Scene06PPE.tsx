import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT } from "../theme";
import { SceneFrame, ContentArea } from "../components/SceneFrame";
import { SubtitleBar, SubtitleChunk } from "../components/SubtitleBar";
import { FadeUp } from "../components/anim";
import { BannerText } from "../components/Card";
import { PPEWorker } from "../components/People";

export const SCENE_06_SECONDS = 20;

const chunks: SubtitleChunk[] = [
  {
    from: 0.5,
    to: 6,
    text: "Before you start, it's essential to wear the correct Personal Protective Equipment — PPE.",
  },
  {
    from: 6,
    to: 13,
    text: "Your safety gear will help protect you from potential hazards.",
  },
];

const ITEMS: { key: "hat" | "goggles" | "vest" | "gloves" | "boots"; label: string; at: number }[] = [
  { key: "hat", label: "Hard Hat", at: 3 },
  { key: "goggles", label: "Safety Goggles", at: 5.2 },
  { key: "vest", label: "Reflective Vest", at: 7.4 },
  { key: "gloves", label: "Gloves", at: 9.6 },
  { key: "boots", label: "Safety Boots", at: 11.8 },
];

export const Scene06PPE: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  const gearOpacity = (at: number) =>
    interpolate(frame, [at * fps, at * fps + 14], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  const gear = {
    hat: gearOpacity(3),
    goggles: gearOpacity(5.2),
    vest: gearOpacity(7.4),
    gloves: gearOpacity(9.6),
    boots: gearOpacity(11.8),
  };

  return (
    <SceneFrame
      kicker="Personal Protective Equipment"
      title="Wear Your PPE — Every Time"
    >
      <ContentArea top={280} style={{ gap: 110 }}>
        <FadeUp delay={10}>
          <PPEWorker width={430} gear={gear} />
        </FadeUp>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 26,
            minWidth: 560,
          }}
        >
          {ITEMS.map((item) => {
            const o = gearOpacity(item.at);
            return (
              <div
                key={item.key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  opacity: o,
                  translate: `${(1 - o) * 60}px 0px`,
                }}
              >
                <svg viewBox="0 0 48 48" width={54} height={54}>
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
                    fontSize: 46,
                    color: COLORS.navy,
                  }}
                >
                  {item.label}
                </div>
              </div>
            );
          })}
          <FadeUp delay={14 * fps} style={{ marginTop: 30 }}>
            <BannerText text="Always check your PPE before starting work." />
          </FadeUp>
        </div>
      </ContentArea>
      <SubtitleBar chunks={chunks} />
    </SceneFrame>
  );
};
