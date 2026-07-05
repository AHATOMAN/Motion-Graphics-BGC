import React from "react";
import { COLORS, FONT } from "../theme";
import { SceneFrame, ContentArea } from "../components/SceneFrame";
import { SubtitleBar, SubtitleChunk } from "../components/SubtitleBar";
import { Pop } from "../components/anim";
import { IconCard } from "../components/Card";

export const SCENE_03_SECONDS = 20;

const chunks: SubtitleChunk[] = [
  {
    from: 0.5,
    to: 5.5,
    text: "GCMS is approved as a “Grade A” Electrical & Solar contractor by the Distribution Code Review Panel (DCRP).",
  },
  {
    from: 5.5,
    to: 10.5,
    text: "We are registered on the Joint Supplier Registration System (JSRS) for Oil & Gas, and GCMS is a member of OPAL.",
  },
  {
    from: 10.5,
    to: 15,
    text: "GCMS is certified to ISO 9001, ISO 14001 and ISO 45001 — the QHSE management system standards.",
  },
  {
    from: 15,
    to: 19.5,
    text: "GCMS is also registered as “Excellent Grade” with the Tender Board.",
  },
];

const Rosette: React.FC<{ color: string; label: string }> = ({
  color,
  label,
}) => (
  <svg viewBox="-60 -60 120 120" width={110} height={110}>
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
    icon: <Rosette color={COLORS.red} label="A" />,
    label: "DCRP “Grade A”",
    sub: "Electrical & Solar Contractor",
  },
  {
    icon: <Rosette color={COLORS.navy} label="JSRS" />,
    label: "JSRS Registered",
    sub: "Oil & Gas Supplier Registration",
  },
  {
    icon: <Rosette color={COLORS.green} label="OPAL" />,
    label: "OPAL Member",
    sub: "Oman Energy Association",
  },
  {
    icon: <Rosette color={COLORS.blue} label="ISO" />,
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
  const delays = [1, 6, 8.5, 11, 15.5];
  return (
    <SceneFrame kicker="Trusted & Accredited" title="Approvals & Certifications">
      <ContentArea top={300} style={{ gap: 24 }}>
        {CERTS.map((c, i) => (
          <Pop key={c.label} delay={delays[i] * fps}>
            <IconCard icon={c.icon} label={c.label} sub={c.sub} width={315} />
          </Pop>
        ))}
      </ContentArea>
      <SubtitleBar chunks={chunks} />
    </SceneFrame>
  );
};
