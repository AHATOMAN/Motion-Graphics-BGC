import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { COLORS, FONT } from "../theme";
import { SceneFrame, ContentArea } from "../components/SceneFrame";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp } from "../components/anim";
import { BannerText } from "../components/Card";
import { Person3D, StudioLights, Platform } from "../components/Person3D";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_06_SECONDS = 15;

const chunks = SUBTITLES["scene-06"].filter(
  (c) => !/always check your ppe/i.test(c.text),
);

const ITEMS: { key: string; label: string; at: number }[] = [
  { key: "hat", label: "Hard Hat", at: 2.5 },
  { key: "goggles", label: "Safety Goggles", at: 3.9 },
  { key: "vest", label: "Reflective Vest", at: 5.3 },
  { key: "gloves", label: "Gloves", at: 6.7 },
  { key: "boots", label: "Safety Boots", at: 8.1 },
];

export const Scene06PPE: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  const gearProgress = (at: number) =>
    interpolate(frame, [at * fps, at * fps + 16], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  const gear = {
    hat: gearProgress(2.5),
    goggles: gearProgress(3.9),
    vest: gearProgress(5.3),
    gloves: gearProgress(6.7),
    boots: gearProgress(8.1),
  };

  // Gentle turntable oscillation so the worker stays facing the camera
  const turntable = Math.sin(frame / 55) * 0.4;

  return (
    <SceneFrame
      kicker="Personal Protective Equipment"
      title="Wear Your PPE — Every Time"
    >
      <ContentArea top={270} style={{ gap: 80 }}>
        <FadeUp delay={8}>
          <ThreeCanvas
            width={640}
            height={640}
            style={{ width: 640, height: 640 }}
            camera={{ position: [0, 0.2, 5.9], fov: 35 }}
          >
            <StudioLights />
            <group position={[0, -1.35, 0]} rotation={[0, turntable, 0]}>
              <Platform radius={1.4} />
              <Person3D
                shirt="#3D5FA8"
                helmet={gear.hat}
                goggles={gear.goggles}
                vest={gear.vest}
                gloves={gear.gloves}
                boots={gear.boots}
                swayPhase={frame / 24}
              />
            </group>
          </ThreeCanvas>
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
            const o = gearProgress(item.at);
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
          <FadeUp delay={9.8 * fps} style={{ marginTop: 30 }}>
            <BannerText tone="positive" text="Always check your PPE before starting work." />
          </FadeUp>
        </div>
      </ContentArea>
      <VoiceOver file="scene-06.mp3" />
      <SubtitleBar chunks={chunks} />
    </SceneFrame>
  );
};
