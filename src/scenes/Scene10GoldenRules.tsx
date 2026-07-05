import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT } from "../theme";
import { SceneFrame } from "../components/SceneFrame";
import { SubtitleBar, SubtitleChunk } from "../components/SubtitleBar";
import { FadeUp } from "../components/anim";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_10_SECONDS = 99;

const RULES: { title: string; desc: string }[] = [
  { title: "Life of Line", desc: "Comply with HSE rules" },
  { title: "Public Safety", desc: "Safeguard the public from hazards" },
  { title: "Traffic Safety", desc: "Adhere to road safety rules" },
  { title: "Electrical Safety", desc: "Follow the ESR without fail" },
  { title: "Lifting Safety", desc: "No lifting without a PTW" },
  { title: "Excavation Safety", desc: "No excavation without a PTW" },
  { title: "Hot Work Safety", desc: "Fire protection before hot work" },
  { title: "Work at Height", desc: "Full-body harness above 1.5 m" },
  { title: "Confined Space", desc: "No entry without a PTW" },
  { title: "Radiography Work", desc: "No radiography without a PTW" },
  { title: "No Drugs, Alcohol, Smoking", desc: "Strictly prohibited on premises" },
  { title: "PPE", desc: "Wear the correct PPE, always" },
];

// Timed against the narration audio: the intro sentence runs ~12s and
// each spoken rule takes ~6.1s.
const INTRO = 12.5; // seconds before the first rule
const PER_RULE = 6.1;

const ruleChunks: SubtitleChunk[] = RULES.map((r, i) => ({
  from: INTRO + i * PER_RULE,
  to: INTRO + (i + 1) * PER_RULE,
  text: `${i + 1}. ${r.title} — ${r.desc}.`,
}));

const chunks: SubtitleChunk[] = [
  {
    from: 0.6,
    to: INTRO,
    text: "The GCMS 12 Golden Life Saving Rules are concise commitment statements designed to ensure workers work safely — and return safely to their loved ones.",
  },
  ...ruleChunks,
  {
    from: INTRO + 12 * PER_RULE + 0.4,
    to: 97.4,
    text: "The pocketbook is distributed to every employee in their preferred language — English, Arabic, Hindi, Urdu and Bangla.",
  },
];

const RuleCard: React.FC<{ index: number; title: string; desc: string }> = ({
  index,
  title,
  desc,
}) => {
  const frame = useCurrentFrame();
  const fps = 30;
  const start = (INTRO + index * PER_RULE) * fps;
  const t = interpolate(frame, [start, start + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Highlight while this rule's subtitle is active
  const end = (INTRO + (index + 1) * PER_RULE) * fps;
  const active = frame >= start && frame < end;

  return (
    <div
      style={{
        width: 400,
        display: "flex",
        alignItems: "center",
        gap: 20,
        background: active ? COLORS.white : "rgba(255, 255, 255, 0.06)",
        border: `1.5px solid ${
          active ? COLORS.white : "rgba(255, 255, 255, 0.14)"
        }`,
        borderRadius: 22,
        padding: "20px 24px",
        boxShadow: active
          ? "0 24px 48px -16px rgba(0, 0, 0, 0.45)"
          : "none",
        opacity: t,
        scale: String(0.8 + 0.2 * t + (active ? 0.04 : 0)),
      }}
    >
      <div
        style={{
          minWidth: 62,
          height: 62,
          borderRadius: "50%",
          background: active ? COLORS.brandRed : "rgba(227, 34, 38, 0.85)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 32,
        }}
      >
        {index + 1}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 30,
            color: active ? COLORS.text : COLORS.white,
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 500,
            fontSize: 22,
            color: active ? COLORS.muted : "rgba(255, 255, 255, 0.65)",
            lineHeight: 1.2,
          }}
        >
          {desc}
        </div>
      </div>
    </div>
  );
};

export const Scene10GoldenRules: React.FC = () => {
  const fps = 30;
  return (
    <SceneFrame
      dark
      kicker="Commitments that save lives"
      title="The 12 Golden Life Saving Rules"
    >
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 90,
          right: 90,
          bottom: 270,
          display: "flex",
          flexWrap: "wrap",
          gap: 26,
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {RULES.map((r, i) => (
          <RuleCard key={r.title} index={i} title={r.title} desc={r.desc} />
        ))}
      </div>
      <FadeUp
        delay={(INTRO + 12 * PER_RULE) * fps}
        style={{
          position: "absolute",
          bottom: 180,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 40,
            color: COLORS.brandRed,
            background: COLORS.white,
            borderRadius: 999,
            padding: "16px 48px",
            boxShadow: "0 20px 44px -12px rgba(0,0,0,0.45)",
          }}
        >
          Follow the 12 Golden Rules — so everyone gets home safely.
        </div>
      </FadeUp>
      <VoiceOver file="scene-10.mp3" />
      <SubtitleBar chunks={chunks} />
    </SceneFrame>
  );
};
