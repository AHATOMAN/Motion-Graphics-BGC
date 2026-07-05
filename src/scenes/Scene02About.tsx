import React from "react";
import { COLORS, FONT } from "../theme";
import { SceneFrame, ContentArea } from "../components/SceneFrame";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp, Pop } from "../components/anim";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_02_SECONDS = 65;

const chunks = SUBTITLES["scene-02"];

const Milestone: React.FC<{ year: string; text: string }> = ({
  year,
  text,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
      width: 340,
    }}
  >
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 62,
        color: COLORS.red,
      }}
    >
      {year}
    </div>
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 600,
        fontSize: 28,
        color: COLORS.text,
        textAlign: "center",
        lineHeight: 1.3,
      }}
    >
      {text}
    </div>
  </div>
);

const LIFECYCLE = [
  "BOOT",
  "Engineering",
  "Procurement",
  "Construction",
  "Testing",
  "Commissioning",
  "O&M",
  "Facilities Mgmt.",
];

const SECTORS = ["Power", "Water & Wastewater", "Renewable Energy"];

export const Scene02About: React.FC = () => {
  const fps = 30;
  return (
    <SceneFrame kicker="Who we are" title="About GCMS">
      <ContentArea top={265} style={{ flexDirection: "column", gap: 38 }}>
        {/* Sectors */}
        <div style={{ display: "flex", gap: 26 }}>
          {SECTORS.map((s, i) => (
            <Pop key={s} delay={1 * fps + i * 8}>
              <div
                style={{
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 34,
                  color: COLORS.white,
                  background: COLORS.navy,
                  padding: "14px 38px",
                  borderRadius: 999,
                }}
              >
                {s}
              </div>
            </Pop>
          ))}
        </div>

        {/* Timeline */}
        <FadeUp delay={9 * fps}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 34,
              background: COLORS.white,
              borderRadius: 28,
              padding: "34px 50px",
              boxShadow: "0 18px 40px rgba(22, 51, 126, 0.14)",
            }}
          >
            <Milestone year="1963" text="Established in the Sultanate of Oman" />
            <div
              style={{
                alignSelf: "center",
                width: 70,
                height: 8,
                background: COLORS.paleBlue,
                borderRadius: 4,
              }}
            />
            <Milestone
              year="1976"
              text="100% Omani company — member of Al Barami Group"
            />
            <div
              style={{
                alignSelf: "center",
                width: 70,
                height: 8,
                background: COLORS.paleBlue,
                borderRadius: 4,
              }}
            />
            <Milestone year="1,500+" text="Workforce across all regions of Oman" />
          </div>
        </FadeUp>

        {/* Lifecycle chips */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
          }}
        >
          {LIFECYCLE.map((step, i) => (
            <Pop key={step} delay={18 * fps + i * 30}>
              <div
                style={{
                  fontFamily: FONT,
                  fontWeight: 600,
                  fontSize: 26,
                  color: COLORS.navy,
                  background: COLORS.white,
                  border: `3px solid ${COLORS.paleBlue}`,
                  padding: "10px 24px",
                  borderRadius: 999,
                  whiteSpace: "nowrap",
                }}
              >
                {step}
              </div>
            </Pop>
          ))}
        </div>

        {/* Commitment */}
        <FadeUp delay={45 * fps}>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 38,
              color: COLORS.red,
              textAlign: "center",
            }}
          >
            A leader in Quality, Health, Safety &amp; Environmental Protection
          </div>
        </FadeUp>
      </ContentArea>
      <VoiceOver file="scene-02.mp3" />
      <SubtitleBar chunks={chunks} />
    </SceneFrame>
  );
};
