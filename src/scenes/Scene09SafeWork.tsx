import React from "react";
import { COLORS, FONT } from "../theme";
import { SceneFrame, ContentArea } from "../components/SceneFrame";
import { SubtitleBar, SubtitleChunk } from "../components/SubtitleBar";
import { Pop, FadeUp } from "../components/anim";
import { BannerText } from "../components/Card";

export const SCENE_09_SECONDS = 14;

const chunks: SubtitleChunk[] = [
  { from: 0.5, to: 4.5, text: "Follow safe work practices at all times." },
  {
    from: 4.5,
    to: 8.5,
    text: "Always read signs and instructions carefully.",
  },
];

// Figure lifting a box the wrong way (bent back) or right way (squat).
const Lifter: React.FC<{ good: boolean }> = ({ good }) => (
  <svg viewBox="0 0 260 240" width={330} height={305}>
    {good ? (
      <>
        {/* squatting, straight back */}
        <circle cx={120} cy={62} r={26} fill="#F2C9A0" />
        <path d="M 120 88 L 118 150" stroke={COLORS.navy} strokeWidth={24} strokeLinecap="round" />
        <path d="M 118 150 L 88 196 L 96 224" stroke={COLORS.navy} strokeWidth={20} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 118 150 L 148 192 L 142 224" stroke={COLORS.navy} strokeWidth={20} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 118 100 L 168 128" stroke={COLORS.navy} strokeWidth={16} strokeLinecap="round" />
        <rect x={152} y={120} width={64} height={56} rx={8} fill="#C98A3B" />
        <rect x={152} y={142} width={64} height={7} fill="#A96F28" />
      </>
    ) : (
      <>
        {/* bent over, curved back */}
        <circle cx={182} cy={94} r={26} fill="#F2C9A0" />
        <path d="M 96 150 Q 130 84 164 100" stroke={COLORS.navy} strokeWidth={24} fill="none" strokeLinecap="round" />
        <path d="M 96 150 L 92 224" stroke={COLORS.navy} strokeWidth={20} strokeLinecap="round" />
        <path d="M 96 150 L 122 224" stroke={COLORS.navy} strokeWidth={20} strokeLinecap="round" />
        <path d="M 168 108 L 188 148" stroke={COLORS.navy} strokeWidth={16} strokeLinecap="round" />
        <rect x={160} y={148} width={64} height={56} rx={8} fill="#C98A3B" />
        <rect x={160} y={170} width={64} height={7} fill="#A96F28" />
        {/* strain marks on the back */}
        <path d="M 118 92 L 128 82 M 130 86 L 140 76" stroke={COLORS.red} strokeWidth={6} strokeLinecap="round" />
      </>
    )}
    <line x1={20} y1={226} x2={240} y2={226} stroke={COLORS.paleBlue} strokeWidth={6} />
  </svg>
);

const Verdict: React.FC<{ good: boolean }> = ({ good }) => (
  <svg viewBox="0 0 80 80" width={84} height={84}>
    <circle cx={40} cy={40} r={36} fill={good ? COLORS.green : COLORS.red} />
    {good ? (
      <path d="M 22 40 L 34 52 L 58 26" stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d="M 26 26 L 54 54 M 54 26 L 26 54" stroke="#fff" strokeWidth={9} strokeLinecap="round" />
    )}
  </svg>
);

export const Scene09SafeWork: React.FC = () => {
  const fps = 30;
  return (
    <SceneFrame kicker="Do it the right way" title="Safe Work Practices">
      <ContentArea top={300} style={{ flexDirection: "column", gap: 46 }}>
        <div style={{ display: "flex", gap: 120 }}>
          <Pop delay={2 * fps}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                background: "#FDEDED",
                border: `4px solid ${COLORS.red}`,
                borderRadius: 28,
                padding: "30px 46px",
              }}
            >
              <Lifter good={false} />
              <Verdict good={false} />
              <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 36, color: COLORS.red }}>
                Bent back — never!
              </div>
            </div>
          </Pop>
          <Pop delay={5 * fps}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                background: "#EDF8F0",
                border: `4px solid ${COLORS.green}`,
                borderRadius: 28,
                padding: "30px 46px",
              }}
            >
              <Lifter good />
              <Verdict good />
              <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 36, color: COLORS.green }}>
                Bend your knees
              </div>
            </div>
          </Pop>
        </div>
        <FadeUp delay={9 * fps}>
          <BannerText text="Lifting: Use your legs, not your back." />
        </FadeUp>
      </ContentArea>
      <SubtitleBar chunks={chunks} />
    </SceneFrame>
  );
};
