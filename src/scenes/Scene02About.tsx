import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, DISPLAY, FONT } from "../theme";
import { SceneFrame } from "../components/SceneFrame";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp } from "../components/anim";
import { VoiceOver } from "../components/VoiceOver";

// Bento block that is present from the start as a faint glass shell and
// "activates" (full opacity + content pop) on its narration cue.
const Reveal: React.FC<{
  at: number; // seconds
  span?: number;
  children: React.ReactNode;
}> = ({ at, span = 1, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const shell = interpolate(frame, [10, 24], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const t = spring({
    frame: frame - at * fps,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 120 },
  });
  return (
    <div
      style={{
        gridColumn: `span ${span}`,
        opacity: shell + (1 - shell) * t,
        scale: String(0.97 + 0.03 * t),
        display: "flex",
      }}
    >
      <div style={{ opacity: 0.25 + 0.75 * t, display: "flex", width: "100%" }}>
        {children}
      </div>
    </div>
  );
};

export const SCENE_02_SECONDS = 65;

const chunks = SUBTITLES["scene-02"];

// Frosted-glass bento block
const Bento: React.FC<{
  span?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ span = 1, children, style }) => (
  <div
    style={{
      gridColumn: `span ${span}`,
      background: "rgba(255, 255, 255, 0.75)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      border: "1.5px solid rgba(226, 232, 240, 0.9)",
      borderRadius: 26,
      boxShadow:
        "0 34px 64px -30px rgba(15, 23, 42, 0.25), 0 6px 18px rgba(15, 23, 42, 0.04)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      padding: "20px 26px",
      ...style,
    }}
  >
    {children}
  </div>
);

const Stat: React.FC<{ value: string; caption: string }> = ({
  value,
  caption,
}) => (
  <>
    <div
      style={{
        fontFamily: DISPLAY,
        fontWeight: 800,
        fontSize: 58,
        letterSpacing: "-0.02em",
        color: COLORS.brandRed,
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 600,
        fontSize: 26,
        color: COLORS.text,
        textAlign: "center",
        lineHeight: 1.3,
      }}
    >
      {caption}
    </div>
  </>
);

const BlockTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: FONT,
      fontWeight: 700,
      fontSize: 24,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: COLORS.muted,
    }}
  >
    {children}
  </div>
);

const SECTORS = ["Power", "Water & Wastewater", "Renewable Energy"];
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

export const Scene02About: React.FC = () => {
  const fps = 30;
  return (
    <SceneFrame kicker="Who we are" title="About GCMS">
      {/* Bento grid */}
      <div
        style={{
          position: "absolute",
          top: 275,
          left: 100,
          right: 100,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "185px 240px 104px",
          gap: 20,
        }}
      >
        {/* Row 1 — milestones & stats, revealed with the narration */}
        <Reveal at={11.5}>
          <Bento style={{ height: "100%", width: "100%" }}>
            <Stat value="1963" caption="Established in the Sultanate of Oman" />
          </Bento>
        </Reveal>
        <Reveal at={13.8}>
          <Bento style={{ height: "100%", width: "100%" }}>
            <Stat value="1976" caption="Became a 100% Omani company" />
          </Bento>
        </Reveal>
        <Reveal at={17.9}>
          <Bento style={{ height: "100%", width: "100%" }}>
            <Stat value="BGC" caption="Member of Al Barami Group of Companies" />
          </Bento>
        </Reveal>
        <Reveal at={41.7}>
          <Bento style={{ height: "100%", width: "100%" }}>
            <Stat value="1,500+" caption="Workforce across all regions of Oman" />
          </Bento>
        </Reveal>

        {/* Row 2 — sectors & lifecycle */}
        <Reveal at={1} span={2}>
          <Bento style={{ height: "100%", width: "100%" }}>
            <BlockTitle>Our industries</BlockTitle>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 16,
              }}
            >
              {SECTORS.map((s) => (
                <div
                  key={s}
                  style={{
                    fontFamily: FONT,
                    fontWeight: 700,
                    fontSize: 32,
                    color: COLORS.white,
                    background: COLORS.brandNavy,
                    padding: "14px 34px",
                    borderRadius: 999,
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </Bento>
        </Reveal>
        <Reveal at={21.4} span={2}>
          <Bento style={{ height: "100%", width: "100%" }}>
            <BlockTitle>Entire project lifecycle</BlockTitle>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 12,
                maxWidth: 720,
              }}
            >
              {LIFECYCLE.map((step, i) => (
                <FadeUp key={step} delay={(21.8 + i * 1.1) * fps}>
                  <div
                    style={{
                      fontFamily: FONT,
                      fontWeight: 600,
                      fontSize: 25,
                      color: COLORS.navy,
                      background: "rgba(255,255,255,0.9)",
                      border: `2px solid ${COLORS.paleBlue}`,
                      padding: "8px 22px",
                      borderRadius: 999,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {step}
                  </div>
                </FadeUp>
              ))}
            </div>
          </Bento>
        </Reveal>

        {/* Row 3 — commitment band */}
        <FadeUp delay={49.5 * fps} style={{ gridColumn: "span 4" }}>
          <Bento
            span={1}
            style={{
              height: "100%",
              background: COLORS.brandNavy,
              border: "none",
              gridColumn: "span 1",
            }}
          >
            <div
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontSize: 36,
                letterSpacing: "-0.01em",
                color: COLORS.white,
                textAlign: "center",
              }}
            >
              A leader in Quality, Health, Safety &amp; Environmental Protection
            </div>
          </Bento>
        </FadeUp>
      </div>
      <VoiceOver file="scene-02.mp3" />
      <SubtitleBar chunks={chunks} />
    </SceneFrame>
  );
};
