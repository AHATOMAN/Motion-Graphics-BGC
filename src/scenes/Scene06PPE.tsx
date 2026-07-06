import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
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

// Checklist items with pulse-marker positions on the worker cutout
// (cutout is 3:4, rendered 620x827 anchored bottom-left at x=150)
const ITEMS = [
  { label: "Hard Hat", at: 2.5, px: 455, py: 360 },
  { label: "Safety Goggles", at: 3.9, px: 455, py: 440 },
  { label: "Reflective Vest", at: 5.3, px: 455, py: 625 },
  { label: "Gloves", at: 6.7, px: 310, py: 668 },
  { label: "Safety Boots", at: 8.1, px: 455, py: 945 },
];

const Pulse: React.FC<{ x: number; y: number; at: number }> = ({ x, y, at }) => {
  const frame = useCurrentFrame();
  const fps = 30;
  const on = interpolate(frame, [at * fps, at * fps + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ring = ((frame - at * fps) % 40) / 40;
  return (
    <div style={{ position: "absolute", left: x - 14, top: y - 14, opacity: on }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: COLORS.green,
          border: "4px solid #ffffff",
          boxShadow: "0 4px 14px rgba(15,23,42,0.4)",
        }}
      />
      {frame >= at * fps ? (
        <div
          style={{
            position: "absolute",
            inset: -6,
            borderRadius: "50%",
            border: `3px solid ${COLORS.green}`,
            scale: String(1 + ring * 0.9),
            opacity: 1 - ring,
          }}
        />
      ) : null}
    </div>
  );
};

export const Scene06PPE: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;
  const enter = interpolate(frame, [8, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <FullScene art="landscape.png" zoom="in" blur={12} dim={0.06}>
      <SceneTitle
        kicker="Personal Protective Equipment"
        title="Wear Your PPE — Every Time"
      />
      {/* PPE worker cutout */}
      <div
        style={{
          position: "absolute",
          left: 150,
          bottom: 0,
          opacity: enter,
          translate: `${(enter - 1) * 120}px 0px`,
        }}
      >
        <Img
          src={staticFile("art/ppe-worker.png")}
          style={{
            height: 830,
            scale: `1 ${1 + Math.sin(frame / 26) * 0.005}`,
            transformOrigin: "50% 100%",
            filter: "drop-shadow(0 24px 32px rgba(15,23,42,0.3))",
          }}
        />
      </div>
      {ITEMS.map((item) => (
        <Pulse key={item.label} x={item.px} y={item.py} at={item.at} />
      ))}
      {/* Checklist */}
      <div
        style={{
          position: "absolute",
          top: 330,
          right: 150,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          minWidth: 560,
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
                gap: 22,
                opacity: o,
                translate: `${(1 - o) * 60}px 0px`,
              }}
            >
              <svg viewBox="0 0 48 48" width={50} height={50}>
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
                  fontSize: 44,
                  color: COLORS.text,
                }}
              >
                {item.label}
              </div>
            </div>
          );
        })}
        <FadeUp delay={9.8 * fps} style={{ marginTop: 26, maxWidth: 620 }}>
          <BannerText tone="positive" text="Always check your PPE before starting work." />
        </FadeUp>
      </div>
      <VoiceOver file="scene-06.mp3" />
      <SubtitleBar chunks={chunks} />
    </FullScene>
  );
};
