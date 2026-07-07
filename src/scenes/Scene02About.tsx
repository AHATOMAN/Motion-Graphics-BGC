import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
} from "remotion";
import { COLORS, DISPLAY, FONT } from "../theme";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp, popIn } from "../components/anim";
import { KineticText } from "../components/KineticText";
import { FullScene, SceneTitle, Callout, Scrim } from "../components/FullScene";
import { BGCLogo } from "../branding/BGCLogo";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_02_SECONDS = 65;

const chunks = SUBTITLES["scene-02"];
const fps = 30;

// Narration beats (forced alignment): sectors 0.8-10.8, history 11.5-20.7,
// lifecycle 21.4-40.8, workforce 41.7-49, commitment 49.5-63.4
const BEAT_HISTORY = 11.5;
const BEAT_LIFECYCLE = 21.4;
const BEAT_WORKFORCE = 41.7;
const BEAT_COMMIT = 49.5;

// A single node on the horizontal history timeline.
const TimelineNode: React.FC<{
  x: number;
  at: number; // seconds into the timeline sub-sequence
  top: React.ReactNode; // year or logo (above the track)
  caption: string; // below the track
}> = ({ x, at, top, caption }) => {
  const frame = useCurrentFrame();
  const { opacity, scale } = popIn(frame, fps, at * fps);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 250,
        width: 380,
        marginLeft: -190,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity,
        scale: String(scale),
      }}
    >
      {/* Above the track: year / logo */}
      <div
        style={{
          height: 190,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        {top}
      </div>
      {/* Node dot on the track */}
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: COLORS.brandRed,
          border: "6px solid #ffffff",
          boxShadow: "0 6px 16px rgba(15,23,42,0.28)",
          margin: "18px 0",
        }}
      />
      {/* Below the track: caption card */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: 16,
          border: `1.5px solid ${COLORS.paleBlue}`,
          boxShadow: "0 16px 34px -16px rgba(15,23,42,0.25)",
          padding: "16px 22px",
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: 28,
          color: COLORS.text,
          textAlign: "center",
          lineHeight: 1.28,
          maxWidth: 340,
        }}
      >
        {caption}
      </div>
    </div>
  );
};

// The horizontal history timeline (its own distinct scene).
const HistoryTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  // Track draws left -> right between the nodes
  const draw = interpolate(frame, [0.2 * fps, 6.8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const X1 = 300;
  const X2 = 1620;
  const trackY = 468;
  return (
    <AbsoluteFill>
      <SceneTitle kicker="Our journey" title="Four Decades of Trust" />
      {/* timeline track */}
      <svg
        viewBox="0 0 1920 1080"
        width="1920"
        height="1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <line
          x1={X1}
          y1={trackY}
          x2={X2}
          y2={trackY}
          stroke={COLORS.paleBlue}
          strokeWidth={6}
          strokeLinecap="round"
        />
        <line
          x1={X1}
          y1={trackY}
          x2={X1 + (X2 - X1) * draw}
          y2={trackY}
          stroke={COLORS.brandNavy}
          strokeWidth={6}
          strokeLinecap="round"
        />
      </svg>
      <TimelineNode
        x={560}
        at={0.2}
        top={
          <div
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              fontSize: 104,
              letterSpacing: "-0.02em",
              color: COLORS.brandRed,
            }}
          >
            1963
          </div>
        }
        caption="Established in the Sultanate of Oman"
      />
      <TimelineNode
        x={960}
        at={2.3}
        top={
          <div
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              fontSize: 104,
              letterSpacing: "-0.02em",
              color: COLORS.brandRed,
            }}
          >
            1976
          </div>
        }
        caption="Became a 100% Omani company"
      />
      <TimelineNode
        x={1360}
        at={6.4}
        top={<BGCLogo height={104} />}
        caption="Member of Al Barami Group of Companies"
      />
    </AbsoluteFill>
  );
};

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

      {/* Beat 2a — history as a horizontal animated timeline (its own scene) */}
      <Sequence
        from={BEAT_HISTORY * fps}
        durationInFrames={(BEAT_LIFECYCLE - BEAT_HISTORY) * fps}
      >
        <FullScene>
          <HistoryTimeline />
        </FullScene>
      </Sequence>

      {/* Beat 2b — full project lifecycle over the control room */}
      <Sequence
        from={BEAT_LIFECYCLE * fps}
        durationInFrames={(BEAT_WORKFORCE - BEAT_LIFECYCLE) * fps}
      >
        <FullScene clip="controlroom.mp4" dim={0.34}>
          <SceneTitle
            light
            kicker="End to end"
            title="The Full Project Lifecycle"
          />
          {/* Bottom scrim so the chips read cleanly, clear of the engineers */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 300,
              background:
                "linear-gradient(to top, rgba(11,18,36,0.82) 0%, rgba(11,18,36,0.4) 60%, transparent 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 96,
              left: 120,
              right: 120,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 16,
            }}
          >
            {LIFECYCLE.map((step, i) => (
              <FadeUp key={step} delay={(1.2 + i * 1.4) * fps}>
                <div
                  style={{
                    fontFamily: FONT,
                    fontWeight: 700,
                    fontSize: 32,
                    color: "#ffffff",
                    background: COLORS.brandNavy,
                    padding: "14px 30px",
                    borderRadius: 999,
                    whiteSpace: "nowrap",
                    boxShadow: "0 12px 28px -8px rgba(0,0,0,0.5)",
                  }}
                >
                  {step}
                </div>
              </FadeUp>
            ))}
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
