import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT } from "../theme";
import { SceneFrame, ContentArea } from "../components/SceneFrame";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp, Pop } from "../components/anim";
import { BannerText } from "../components/Card";
import { Persona } from "../components/IllustratedPeople";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_11_SECONDS = 13;

const chunks = SUBTITLES["scene-11"].filter(
  (c) => !/near misses are incidents/i.test(c.text),
);

// Illustrated near-miss: a box tips off a storage rack beside the
// worker, who reports it to the supervisor.
const NearMissIllustration: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;
  const fall = interpolate(frame, [1 * fps, 1.8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const alert = interpolate(frame, [2 * fps, 2.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ position: "relative", width: 880, height: 540 }}>
      {/* rack + falling box */}
      <svg
        viewBox="0 0 260 460"
        width={250}
        height={442}
        style={{ position: "absolute", left: 0, bottom: 20 }}
      >
        <ellipse cx={120} cy={448} rx={100} ry={10} fill="rgba(15,23,42,0.10)" />
        {/* uprights */}
        <rect x={28} y={60} width={14} height={384} rx={6} fill="#64748B" />
        <rect x={198} y={60} width={14} height={384} rx={6} fill="#64748B" />
        {/* shelves */}
        {[110, 240, 370].map((y) => (
          <rect key={y} x={22} y={y} width={196} height={14} rx={6} fill="#94A3B8" />
        ))}
        {/* boxes on shelves */}
        <rect x={52} y={182} width={54} height={58} rx={6} fill="#D9A05B" />
        <rect x={52} y={182} width={54} height={18} rx={6} fill="#C98A3B" />
        <rect x={128} y={318} width={60} height={52} rx={6} fill="#C98A3B" />
        {/* falling box */}
        <g
          style={{
            translate: `${fall * 78}px ${fall * fall * 286}px`,
            rotate: `${fall * 55}deg`,
            transformOrigin: "160px 80px",
          }}
        >
          <rect x={132} y={52} width={58} height={56} rx={6} fill="#D9A05B" />
          <rect x={132} y={52} width={58} height={18} rx={6} fill="#C98A3B" />
        </g>
      </svg>
      {/* worker reporting */}
      <div style={{ position: "absolute", left: 300, bottom: 22 }}>
        <Persona variant="contractor" width={195} phaseOffset={0.6} />
      </div>
      {/* supervisor with clipboard */}
      <div style={{ position: "absolute", left: 590, bottom: 22 }}>
        <Persona variant="supervisor" width={195} phaseOffset={2.1} />
      </div>
      {/* alert badge above the fallen box */}
      <div
        style={{
          position: "absolute",
          left: 168,
          top: 20,
          opacity: alert,
          scale: String(0.6 + 0.4 * alert),
        }}
      >
        <svg viewBox="0 0 80 80" width={84} height={84}>
          <circle cx={40} cy={40} r={34} fill={COLORS.red} />
          <text
            x={40}
            y={54}
            textAnchor="middle"
            fill="#fff"
            style={{ fontFamily: FONT, fontWeight: 800, fontSize: 46 }}
          >
            !
          </text>
        </svg>
      </div>
      {/* report arrow between worker and supervisor */}
      <div style={{ position: "absolute", left: 470, top: 130, opacity: alert }}>
        <svg viewBox="0 0 160 60" width={150} height={56}>
          <path d="M 10 42 Q 80 8 140 30" stroke={COLORS.green} strokeWidth={9} fill="none" strokeLinecap="round" />
          <path d="M 140 30 L 118 19 M 140 30 L 121 44" stroke={COLORS.green} strokeWidth={9} fill="none" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

export const Scene11Reporting: React.FC = () => {
  const fps = 30;
  return (
    <SceneFrame kicker="See it, say it" title="Report Incidents & Near Misses">
      <ContentArea top={280} style={{ gap: 70 }}>
        <FadeUp delay={10}>
          <NearMissIllustration />
        </FadeUp>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 40,
            maxWidth: 640,
          }}
        >
          <Pop delay={3.5 * fps}>
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
          <FadeUp delay={6.3 * fps}>
            <BannerText text="Near misses could have caused injury — report them!" />
          </FadeUp>
        </div>
      </ContentArea>
      <VoiceOver file="scene-11.mp3" />
      <SubtitleBar chunks={chunks} />
    </SceneFrame>
  );
};
