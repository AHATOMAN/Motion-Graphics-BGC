import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { COLORS, DISPLAY, FONT } from "../theme";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp } from "../components/anim";
import { KineticText } from "../components/KineticText";
import { FullScene, SceneTitle, Callout, Scrim } from "../components/FullScene";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_02_SECONDS = 65;

const chunks = SUBTITLES["scene-02"];
const fps = 30;

// Narration beats (forced alignment): sectors 0.8-10.8, history 11.5-20.7,
// lifecycle 21.4-40.8, workforce 41.7-49, commitment 49.5-63.4
const BEAT_HISTORY = 11.5;
const BEAT_WORKFORCE = 41.7;
const BEAT_COMMIT = 49.5;

const Milestone: React.FC<{
  at: number;
  value: string;
  caption: string;
}> = ({ at, value, caption }) => (
  <FadeUp delay={at * fps}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 26 }}>
      <div
        style={{
          fontFamily: DISPLAY,
          fontWeight: 800,
          fontSize: 92,
          letterSpacing: "-0.02em",
          color: COLORS.brandRed,
          minWidth: 300,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: 34,
          color: COLORS.text,
          lineHeight: 1.25,
          maxWidth: 560,
        }}
      >
        {caption}
      </div>
    </div>
  </FadeUp>
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

export const Scene02About: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Beat 1 — industries over the Oman landscape */}
      <Sequence durationInFrames={BEAT_HISTORY * fps}>
        <FullScene clip="landscape.mp4">
          <SceneTitle kicker="Who we are" title="About GCMS" />
          <Callout x={250} y={560} label="Power" delay={1.5 * fps} />
          <Callout
            x={430}
            y={430}
            label="Water & Wastewater"
            delay={3.5 * fps}
          />
          <Callout
            x={1350}
            y={480}
            label="Renewable Energy"
            delay={5.5 * fps}
          />
        </FullScene>
      </Sequence>

      {/* Beat 2 — history & lifecycle over the office */}
      <Sequence from={BEAT_HISTORY * fps} durationInFrames={(BEAT_WORKFORCE - BEAT_HISTORY) * fps}>
        <FullScene clip="office.mp4">
          <Scrim from="left" strength={0.62} />
          <div
            style={{
              position: "absolute",
              top: 150,
              left: 100,
              display: "flex",
              flexDirection: "column",
              gap: 44,
            }}
          >
            <Milestone at={0.2} value="1963" caption="Established in the Sultanate of Oman" />
            <Milestone at={2.3} value="1976" caption="Became a 100% Omani company" />
            <Milestone at={6.4} value="BGC" caption="Member of Al Barami Group of Companies" />
            <FadeUp delay={9.9 * fps}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 14,
                  maxWidth: 900,
                }}
              >
                {LIFECYCLE.map((step, i) => (
                  <FadeUp key={step} delay={(10.2 + i * 1.1) * fps}>
                    <div
                      style={{
                        fontFamily: FONT,
                        fontWeight: 700,
                        fontSize: 27,
                        color: "#ffffff",
                        background: COLORS.brandNavy,
                        padding: "10px 26px",
                        borderRadius: 999,
                        whiteSpace: "nowrap",
                        boxShadow: "0 10px 24px -8px rgba(15,23,42,0.4)",
                      }}
                    >
                      {step}
                    </div>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          </div>
        </FullScene>
      </Sequence>

      {/* Beat 3 — workforce stat frame (reference layout) */}
      <Sequence from={BEAT_WORKFORCE * fps} durationInFrames={(BEAT_COMMIT - BEAT_WORKFORCE) * fps}>
        <FullScene clip="workforce.mp4">
          <Scrim from="left" strength={0.5} />
          <div
            style={{
              position: "absolute",
              top: 165,
              left: 110,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              maxWidth: 820,
            }}
          >
            <KineticText
              text="1,500+"
              delay={6}
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontSize: 170,
                letterSpacing: "-0.03em",
                color: COLORS.text,
                lineHeight: 1,
              }}
            />
            <KineticText
              text="WORKFORCE"
              delay={14}
              stagger={4}
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontSize: 96,
                letterSpacing: "-0.01em",
                color: COLORS.text,
                lineHeight: 1.05,
              }}
            />
            <KineticText
              text="spread across all regions of the Sultanate of Oman"
              delay={24}
              stagger={2}
              style={{
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 42,
                color: "#334155",
                lineHeight: 1.3,
                textShadow: "0 2px 14px rgba(255,255,255,0.9)",
              }}
            />
          </div>
        </FullScene>
      </Sequence>

      {/* Beat 4 — QHSE commitment over the team */}
      <Sequence from={BEAT_COMMIT * fps}>
        <FullScene clip="team.mp4" dim={0.3}>
          <AbsoluteFill
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 120,
            }}
          >
            <KineticText
              text="A leader in Quality, Health, Safety & Environmental Protection"
              delay={8}
              stagger={3}
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontSize: 72,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                justifyContent: "center",
                textAlign: "center",
                maxWidth: 1400,
                textShadow: "0 6px 30px rgba(0,0,0,0.5)",
              }}
            />
          </AbsoluteFill>
        </FullScene>
      </Sequence>

      <VoiceOver file="scene-02.mp3" />
      <SubtitleBar chunks={chunks} />
    </AbsoluteFill>
  );
};
