import React from "react";
import { COLORS, FONT } from "../theme";
import { SceneFrame, ContentArea } from "../components/SceneFrame";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { Pop } from "../components/anim";
import { IconCard } from "../components/Card";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_05_SECONDS = 26;

const chunks = SUBTITLES["scene-05"];

const PassIcon = (
  <svg viewBox="0 0 120 120" width={110} height={110}>
    <path d="M 40 8 Q 60 22 80 8" stroke={COLORS.red} strokeWidth={6} fill="none" />
    <rect x={30} y={22} width={60} height={86} rx={8} fill="#fff" stroke={COLORS.navy} strokeWidth={5} />
    <rect x={40} y={34} width={40} height={12} rx={3} fill={COLORS.red} />
    <circle cx={60} cy={66} r={12} fill={COLORS.paleBlue} />
    <rect x={42} y={86} width={36} height={7} rx={3} fill={COLORS.paleBlue} />
  </svg>
);

const HostIcon = (
  <svg viewBox="0 0 120 120" width={110} height={110}>
    <circle cx={48} cy={46} r={20} fill="#F2C9A0" />
    <path d="M 18 108 C 18 78 36 68 48 68 C 60 68 78 78 78 108 Z" fill={COLORS.navy} />
    <circle cx={92} cy={38} r={22} fill={COLORS.red} />
    <text x={92} y={47} textAnchor="middle" fill="#fff" style={{ fontFamily: FONT, fontWeight: 800, fontSize: 30 }}>?</text>
  </svg>
);

const NoPhotoIcon = (
  <svg viewBox="0 0 120 120" width={110} height={110}>
    <rect x={22} y={38} width={76} height={54} rx={10} fill={COLORS.navy} />
    <rect x={44} y={28} width={32} height={14} rx={5} fill={COLORS.navy} />
    <circle cx={60} cy={65} r={17} fill="#fff" />
    <circle cx={60} cy={65} r={10} fill={COLORS.paleBlue} />
    <circle cx={60} cy={60} r={52} fill="none" stroke={COLORS.red} strokeWidth={8} />
    <line x1={24} y1={24} x2={96} y2={96} stroke={COLORS.red} strokeWidth={8} />
  </svg>
);

export const Scene05FirstThings: React.FC = () => {
  const fps = 30;
  return (
    <SceneFrame kicker="Starting off right" title="First Things First!">
      <ContentArea top={310} style={{ gap: 50 }}>
        <Pop delay={4.6 * fps}>
          <IconCard
            icon={PassIcon}
            label="Visitor Pass"
            sub="Visible at all times — return it when you leave"
          />
        </Pop>
        <Pop delay={10.3 * fps}>
          <IconCard
            icon={HostIcon}
            label="Your Host Assists You"
            sub="Ask them any questions — anytime"
          />
        </Pop>
        <Pop delay={17.6 * fps}>
          <IconCard
            icon={NoPhotoIcon}
            label="No Photos or Video"
            sub="Only with prior approval"
          />
        </Pop>
      </ContentArea>
      <VoiceOver file="scene-05.mp3" />
      <SubtitleBar chunks={chunks} />
    </SceneFrame>
  );
};
