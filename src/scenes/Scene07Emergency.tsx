import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT } from "../theme";
import { SceneFrame, ContentArea } from "../components/SceneFrame";
import { SubtitleBar, SubtitleChunk } from "../components/SubtitleBar";
import { FadeUp, Pop } from "../components/anim";
import { BannerText } from "../components/Card";

export const SCENE_07_SECONDS = 16;

const chunks: SubtitleChunk[] = [
  {
    from: 0.5,
    to: 6,
    text: "Know the emergency exits and the locations of safety equipment —",
  },
  {
    from: 6,
    to: 10.5,
    text: "fire extinguishers, first-aid kits, and emergency assembly points.",
  },
];

const Legend: React.FC<{ color: string; label: string; symbol: string }> = ({
  color,
  label,
  symbol,
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: 12,
        background: color,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 30,
      }}
    >
      {symbol}
    </div>
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 600,
        fontSize: 34,
        color: COLORS.text,
      }}
    >
      {label}
    </div>
  </div>
);

export const Scene07Emergency: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  // Animated evacuation route (draws on between 10.5s and 14s)
  const routeProgress = interpolate(frame, [10.5 * fps, 14 * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ROUTE_LENGTH = 560;

  return (
    <SceneFrame kicker="Be prepared" title="Emergency Procedures">
      <ContentArea top={290} style={{ gap: 90 }}>
        <FadeUp delay={15}>
          <svg viewBox="0 0 760 480" width={820} height={518}>
            {/* floor plan */}
            <rect x={10} y={10} width={640} height={460} rx={16} fill="#fff" stroke={COLORS.navy} strokeWidth={6} />
            <line x1={230} y1={10} x2={230} y2={200} stroke={COLORS.paleBlue} strokeWidth={6} />
            <line x1={230} y1={200} x2={10} y2={200} stroke={COLORS.paleBlue} strokeWidth={6} />
            <line x1={420} y1={470} x2={420} y2={300} stroke={COLORS.paleBlue} strokeWidth={6} />
            <line x1={420} y1={300} x2={650} y2={300} stroke={COLORS.paleBlue} strokeWidth={6} />
            {/* exits */}
            <rect x={618} y={80} width={32} height={80} fill={COLORS.green} />
            <text x={634} y={126} textAnchor="middle" fill="#fff" style={{ fontFamily: FONT, fontWeight: 800, fontSize: 20 }} transform="rotate(-90 634 122)">EXIT</text>
            <rect x={100} y={438} width={80} height={32} fill={COLORS.green} />
            <text x={140} y={461} textAnchor="middle" fill="#fff" style={{ fontFamily: FONT, fontWeight: 800, fontSize: 20 }}>EXIT</text>
            {/* fire extinguishers */}
            <circle cx={260} cy={60} r={17} fill={COLORS.red} />
            <circle cx={470} cy={340} r={17} fill={COLORS.red} />
            {/* first aid */}
            <rect x={60} y={240} width={38} height={38} rx={8} fill={COLORS.green} />
            <path d="M 79 248 L 79 270 M 68 259 L 90 259" stroke="#fff" strokeWidth={7} />
            {/* you are here */}
            <circle cx={120} cy={100} r={15} fill={COLORS.blue} />
            <text x={120} y={72} textAnchor="middle" fill={COLORS.blue} style={{ fontFamily: FONT, fontWeight: 700, fontSize: 22 }}>YOU ARE HERE</text>
            {/* evacuation route */}
            <path
              d="M 120 100 L 120 160 Q 120 200 170 200 L 500 200 Q 560 200 580 160 L 600 120"
              fill="none"
              stroke={COLORS.red}
              strokeWidth={9}
              strokeLinecap="round"
              strokeDasharray={`${ROUTE_LENGTH}`}
              strokeDashoffset={routeProgress * ROUTE_LENGTH}
            />
            {/* assembly point outside */}
            <circle cx={712} cy={120} r={40} fill={COLORS.green} />
            <circle cx={700} cy={110} r={7} fill="#fff" />
            <circle cx={724} cy={110} r={7} fill="#fff" />
            <circle cx={712} cy={126} r={7} fill="#fff" />
            <path d="M 692 142 Q 712 154 732 142" stroke="#fff" strokeWidth={5} fill="none" />
            <text x={712} y={182} textAnchor="middle" fill={COLORS.green} style={{ fontFamily: FONT, fontWeight: 700, fontSize: 20 }}>ASSEMBLY</text>
          </svg>
        </FadeUp>
        <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
          <Pop delay={2 * fps}>
            <Legend color={COLORS.green} symbol="⇥" label="Emergency Exits" />
          </Pop>
          <Pop delay={6 * fps}>
            <Legend color={COLORS.red} symbol="●" label="Fire Extinguishers" />
          </Pop>
          <Pop delay={7.5 * fps}>
            <Legend color={COLORS.green} symbol="+" label="First-Aid Kits" />
          </Pop>
          <Pop delay={9 * fps}>
            <Legend color={COLORS.green} symbol="⚑" label="Assembly Points" />
          </Pop>
          <FadeUp delay={11 * fps} style={{ marginTop: 26, maxWidth: 640 }}>
            <BannerText text="In case of emergency, follow the evacuation plan." />
          </FadeUp>
        </div>
      </ContentArea>
      <SubtitleBar chunks={chunks} />
    </SceneFrame>
  );
};
