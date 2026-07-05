import React from "react";
import { COLORS, FONT } from "../theme";
import { SceneFrame, ContentArea } from "../components/SceneFrame";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { Pop } from "../components/anim";
import { IconCard } from "../components/Card";
import { DCRPLogo, JSRSLogo, OPALLogo, ISOLogo } from "../branding/CertLogos";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_03_SECONDS = 28;

const chunks = SUBTITLES["scene-03"];

// Accreditation logos sit on a clean white tile inside each card.
const LogoTile: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      width: 240,
      height: 116,
      background: "#ffffff",
      borderRadius: 16,
      border: `1.5px solid ${COLORS.paleBlue}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </div>
);

const Rosette: React.FC<{ color: string; label: string }> = ({
  color,
  label,
}) => (
  <svg viewBox="-60 -60 120 120" width={104} height={104}>
    <circle cx={0} cy={0} r={44} fill={color} />
    {Array.from({ length: 12 }).map((_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return (
        <circle
          key={i}
          cx={Math.cos(a) * 46}
          cy={Math.sin(a) * 46}
          r={7}
          fill={color}
        />
      );
    })}
    <circle cx={0} cy={0} r={34} fill="#fff" opacity={0.18} />
    <text
      x={0}
      y={2}
      textAnchor="middle"
      dominantBaseline="middle"
      fill="#fff"
      style={{ fontFamily: FONT, fontWeight: 800, fontSize: 26 }}
    >
      {label}
    </text>
  </svg>
);

const CERTS: { icon: React.ReactNode; label: string; sub: string }[] = [
  {
    icon: <DCRPLogo height={118} />,
    label: "DCRP “Grade A”",
    sub: "Electrical & Solar Contractor",
  },
  {
    icon: <JSRSLogo height={106} />,
    label: "JSRS Registered",
    sub: "Oil & Gas Supplier Registration",
  },
  {
    icon: <OPALLogo height={112} />,
    label: "OPAL Member",
    sub: "Oman Energy Association",
  },
  {
    icon: <ISOLogo height={106} />,
    label: "ISO 9001 · 14001 · 45001",
    sub: "Certified QHSE Management System",
  },
  {
    icon: <Rosette color={COLORS.yellow} label="★" />,
    label: "“Excellent Grade”",
    sub: "Tender Board Registration",
  },
];

export const Scene03Certifications: React.FC = () => {
  const fps = 30;
  const delays = [1.5, 7.3, 10.8, 14.3, 20.1];
  return (
    <SceneFrame kicker="Trusted & Accredited" title="Approvals & Certifications">
      <ContentArea top={300} style={{ gap: 23 }}>
        {CERTS.map((c, i) => (
          <Pop key={c.label} delay={delays[i] * fps}>
            <IconCard
              icon={<LogoTile>{c.icon}</LogoTile>}
              label={c.label}
              sub={c.sub}
            />
          </Pop>
        ))}
      </ContentArea>
      <VoiceOver file="scene-03.mp3" />
      <SubtitleBar chunks={chunks} />
    </SceneFrame>
  );
};
