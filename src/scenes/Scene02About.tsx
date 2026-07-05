import React from "react";
import { COLORS, FONT } from "../theme";
import { SceneFrame, ContentArea } from "../components/SceneFrame";
import { SubtitleBar, SubtitleChunk } from "../components/SubtitleBar";
import { FadeUp, Pop } from "../components/anim";

export const SCENE_02_SECONDS = 34;

const chunks: SubtitleChunk[] = [
  {
    from: 0.5,
    to: 6.5,
    text: "For over four decades, GCMS has been associated with Power and Water & Wastewater — life's most essential industries in the Sultanate of Oman.",
  },
  {
    from: 6.5,
    to: 12.5,
    text: "Established in 1963, GCMS became a 100% Omani company in 1976 and is a member of the Al Barami Group of Companies.",
  },
  {
    from: 12.5,
    to: 19.5,
    text: "GCMS handles the entire project lifecycle — BOOT, Engineering, Procurement, Construction, Testing, Commissioning, Operation & Maintenance and Facilities Management.",
  },
  {
    from: 19.5,
    to: 26,
    text: "Our work spans Power, Water & Wastewater and Renewable Energy, with a workforce of 1,500+ across all regions of the Sultanate of Oman.",
  },
  {
    from: 26,
    to: 33.5,
    text: "GCMS is committed to being a leader in Quality, Health, Safety and Environmental protection — for our people, our processes, and our communities.",
  },
];

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
        <FadeUp delay={7 * fps}>
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
            <Pop key={step} delay={13 * fps + i * 7}>
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
        <FadeUp delay={26 * fps}>
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
      <SubtitleBar chunks={chunks} />
    </SceneFrame>
  );
};
