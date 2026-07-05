import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT } from "../theme";
import { SceneFrame, ContentArea } from "../components/SceneFrame";
import { SubtitleBar, SubtitleChunk } from "../components/SubtitleBar";
import { FadeUp, Pop } from "../components/anim";
import { BannerText } from "../components/Card";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_11_SECONDS = 13;

const chunks: SubtitleChunk[] = [
  { from: 0.6, to: 3.2, text: "Report any incidents or near-misses." },
  {
    from: 3.2,
    to: 6.2,
    text: "Reporting helps prevent future accidents.",
  },
];

// Worker spots a falling object (near miss) and reports to a supervisor.
const NearMiss: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;
  // object falls between 1s and 2s
  const fall = interpolate(frame, [1 * fps, 2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const alert = interpolate(frame, [2 * fps, 2.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <svg viewBox="0 0 560 420" width={640} height={480}>
      {/* shelf */}
      <rect x={40} y={60} width={200} height={14} fill={COLORS.navy} />
      <rect x={52} y={74} width={12} height={300} fill={COLORS.navy} />
      {/* falling box */}
      <g
        style={{
          translate: `0px ${fall * 250}px`,
          rotate: `${fall * 38}deg`,
          transformOrigin: "170px 40px",
        }}
      >
        <rect x={145} y={14} width={54} height={46} rx={6} fill="#C98A3B" />
        <rect x={145} y={32} width={54} height={6} fill="#A96F28" />
      </g>
      {/* alert mark */}
      <g opacity={alert}>
        <circle cx={262} cy={90} r={30} fill={COLORS.red} />
        <text x={262} y={102} textAnchor="middle" fill="#fff" style={{ fontFamily: FONT, fontWeight: 800, fontSize: 42 }}>!</text>
      </g>
      {/* worker (noticing) */}
      <circle cx={300} cy={190} r={30} fill="#F2C9A0" />
      <path d="M 288 168 A 32 30 0 0 1 330 176 L 334 170 Q 312 142 284 162 Z" fill={COLORS.yellow} />
      <path d="M 258 360 C 258 280 280 252 300 252 C 320 252 342 280 342 360 Z" fill={COLORS.orange} />
      <rect x={258} y={286} width={84} height={12} fill="#FFE066" />
      {/* supervisor with clipboard */}
      <circle cx={462} cy={186} r={30} fill="#F2C9A0" />
      <path d="M 432 182 A 30 30 0 0 1 492 182 L 486 164 Q 462 142 438 164 Z" fill="#5B4633" />
      <path d="M 420 360 C 420 280 442 248 462 248 C 482 248 504 280 504 360 Z" fill={COLORS.navy} />
      <rect x={398} y={266} width={52} height={68} rx={8} fill="#fff" stroke={COLORS.navy} strokeWidth={5} />
      <line x1={408} y1={286} x2={440} y2={286} stroke={COLORS.paleBlue} strokeWidth={5} />
      <line x1={408} y1={302} x2={440} y2={302} stroke={COLORS.paleBlue} strokeWidth={5} />
      <line x1={408} y1={318} x2={432} y2={318} stroke={COLORS.paleBlue} strokeWidth={5} />
      {/* speech arrow from worker to supervisor */}
      <g opacity={alert}>
        <path d="M 348 210 Q 396 190 414 206" stroke={COLORS.green} strokeWidth={8} fill="none" strokeLinecap="round" />
        <path d="M 414 206 L 398 198 M 414 206 L 402 218" stroke={COLORS.green} strokeWidth={8} fill="none" strokeLinecap="round" />
      </g>
      {/* ground */}
      <line x1={30} y1={374} x2={530} y2={374} stroke={COLORS.paleBlue} strokeWidth={8} />
    </svg>
  );
};

export const Scene11Reporting: React.FC = () => {
  const fps = 30;
  return (
    <SceneFrame kicker="See it, say it" title="Report Incidents & Near Misses">
      <ContentArea top={290} style={{ gap: 80 }}>
        <FadeUp delay={10}>
          <NearMiss />
        </FadeUp>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 40,
            maxWidth: 700,
          }}
        >
          <Pop delay={3.6 * fps}>
            <div
              style={{
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 48,
                lineHeight: 1.25,
                color: COLORS.navy,
              }}
            >
              Reporting today prevents the accident of tomorrow.
            </div>
          </Pop>
          <FadeUp delay={6.2 * fps}>
            <BannerText text="Near misses could have caused injury — report them!" />
          </FadeUp>
        </div>
      </ContentArea>
      <VoiceOver file="scene-11.mp3" />
      <SubtitleBar chunks={chunks} />
    </SceneFrame>
  );
};
