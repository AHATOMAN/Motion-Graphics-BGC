import React from "react";
import { COLORS } from "../theme";
import { SceneFrame, ContentArea } from "../components/SceneFrame";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { Pop, FadeUp } from "../components/anim";
import { IconCard, BannerText } from "../components/Card";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_08_SECONDS = 13;

const chunks = SUBTITLES["scene-08"];

const WarnTriangle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 120 120" width={120} height={120}>
    <path
      d="M 60 8 L 114 104 L 6 104 Z"
      fill={COLORS.yellow}
      stroke="#C88F00"
      strokeWidth={4}
      strokeLinejoin="round"
    />
    {children}
  </svg>
);

const SlipIcon = (
  <WarnTriangle>
    <circle cx={52} cy={48} r={9} fill={COLORS.navy} />
    <path d="M 46 60 L 66 66 L 58 82 M 66 66 L 80 60" stroke={COLORS.navy} strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M 28 94 Q 40 88 52 94 T 76 94 T 96 94" stroke={COLORS.navy} strokeWidth={5} fill="none" />
  </WarnTriangle>
);

const MachineIcon = (
  <WarnTriangle>
    <circle cx={60} cy={70} r={20} fill="none" stroke={COLORS.navy} strokeWidth={8} />
    {Array.from({ length: 8 }).map((_, i) => {
      const a = (i / 8) * Math.PI * 2;
      return (
        <line
          key={i}
          x1={60 + Math.cos(a) * 24}
          y1={70 + Math.sin(a) * 24}
          x2={60 + Math.cos(a) * 34}
          y2={70 + Math.sin(a) * 34}
          stroke={COLORS.navy}
          strokeWidth={7}
          strokeLinecap="round"
        />
      );
    })}
  </WarnTriangle>
);

const ElectricIcon = (
  <WarnTriangle>
    <path d="M 66 36 L 46 70 L 60 70 L 52 96 L 78 60 L 62 60 Z" fill={COLORS.navy} />
  </WarnTriangle>
);

export const Scene08Hazards: React.FC = () => {
  const fps = 30;
  return (
    <SceneFrame kicker="Stay alert" title="Hazard Identification">
      <ContentArea top={300} style={{ flexDirection: "column", gap: 56 }}>
        <div style={{ display: "flex", gap: 44 }}>
          <Pop delay={1.5 * fps}>
            <IconCard icon={SlipIcon} label="Slippery Floors" sub="Spills & wet surfaces" />
          </Pop>
          <Pop delay={2.5 * fps}>
            <IconCard icon={MachineIcon} label="Moving Machinery" sub="Rotating & moving parts" />
          </Pop>
          <Pop delay={3.5 * fps}>
            <IconCard icon={ElectricIcon} label="Electrical Wiring" sub="Live cables & panels" />
          </Pop>
        </div>
        <FadeUp delay={8.2 * fps}>
          <BannerText text="Report any hazards immediately to your supervisor." />
        </FadeUp>
      </ContentArea>
      <VoiceOver file="scene-08.mp3" />
      <SubtitleBar chunks={chunks} />
    </SceneFrame>
  );
};
