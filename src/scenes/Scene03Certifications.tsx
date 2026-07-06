import React from "react";
import { COLORS, DISPLAY, FONT } from "../theme";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { Pop } from "../components/anim";
import { DCRPLogo, JSRSLogo, OPALLogo, ISOLogo } from "../branding/CertLogos";
import { FullScene, SceneTitle } from "../components/FullScene";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_03_SECONDS = 28;

const chunks = SUBTITLES["scene-03"];

const Rosette: React.FC = () => (
  <svg viewBox="-60 -60 120 120" width={96} height={96}>
    <circle cx={0} cy={0} r={44} fill={COLORS.yellow} />
    {Array.from({ length: 12 }).map((_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return (
        <circle key={i} cx={Math.cos(a) * 46} cy={Math.sin(a) * 46} r={7} fill={COLORS.yellow} />
      );
    })}
    <circle cx={0} cy={0} r={34} fill="#fff" opacity={0.18} />
    <text
      x={0}
      y={2}
      textAnchor="middle"
      dominantBaseline="middle"
      fill="#fff"
      style={{ fontFamily: FONT, fontWeight: 800, fontSize: 30 }}
    >
      ★
    </text>
  </svg>
);

const CERTS: { icon: React.ReactNode; label: string; sub: string }[] = [
  { icon: <DCRPLogo height={112} />, label: "DCRP “Grade A”", sub: "Electrical & Solar Contractor" },
  { icon: <JSRSLogo height={100} />, label: "JSRS Registered", sub: "Oil & Gas Supplier" },
  { icon: <OPALLogo height={106} />, label: "OPAL Member", sub: "Oman Energy Association" },
  { icon: <ISOLogo height={100} />, label: "ISO 9001 · 14001 · 45001", sub: "QHSE Management System" },
  { icon: <Rosette />, label: "“Excellent Grade”", sub: "Tender Board Registration" },
];

export const Scene03Certifications: React.FC = () => {
  const fps = 30;
  const delays = [1.5, 7.3, 10.8, 14.3, 20.1];
  return (
    <FullScene art="office.png" zoom="in" blur={7} dim={0.42}>
      <SceneTitle
        light
        kicker="Trusted & Accredited"
        title="Approvals & Certifications"
      />
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 90,
          right: 90,
          display: "flex",
          justifyContent: "center",
          gap: 26,
        }}
      >
        {CERTS.map((c, i) => (
          <Pop key={c.label} delay={delays[i] * fps}>
            <div
              style={{
                width: 300,
                height: 350,
                background: "#ffffff",
                borderRadius: 26,
                boxShadow: "0 34px 64px -20px rgba(0, 0, 0, 0.5)",
                borderTop: `8px solid ${COLORS.brandRed}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                padding: "28px 20px",
              }}
            >
              <div
                style={{
                  height: 118,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {c.icon}
              </div>
              <div
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 800,
                  fontSize: 31,
                  color: COLORS.text,
                  textAlign: "center",
                  lineHeight: 1.12,
                }}
              >
                {c.label}
              </div>
              <div
                style={{
                  fontFamily: FONT,
                  fontWeight: 500,
                  fontSize: 24,
                  color: COLORS.muted,
                  textAlign: "center",
                  lineHeight: 1.3,
                }}
              >
                {c.sub}
              </div>
            </div>
          </Pop>
        ))}
      </div>
      <VoiceOver file="scene-03.mp3" />
      <SubtitleBar chunks={chunks} />
    </FullScene>
  );
};
