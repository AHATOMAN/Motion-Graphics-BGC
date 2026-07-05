import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, DISPLAY } from "../theme";
import { GlobalLogo } from "../branding/GlobalLogo";
import { BGCLogo } from "../branding/BGCLogo";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp, Pop, EASE } from "../components/anim";
import { KineticText } from "../components/KineticText";
import { VoiceOver } from "../components/VoiceOver";
import { Globe3D } from "../components/Globe3D";

export const SCENE_01_SECONDS = 17;

const chunks = SUBTITLES["scene-01"];

export const Scene01Welcome: React.FC = () => {
  const frame = useCurrentFrame();
  const glow = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: "clamp",
    easing: EASE,
  });

  return (
    <AbsoluteFill style={{ background: COLORS.lightBg }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(15,23,42,0.05) 2px, transparent 2px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -320,
          left: "50%",
          width: 1400,
          height: 860,
          marginLeft: -700,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(22,51,126,0.10), transparent)",
          opacity: glow,
        }}
      />
      {/* Top brand bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          background: COLORS.brandNavy,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 420,
          height: 10,
          background: COLORS.brandRed,
        }}
      />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          paddingBottom: 110,
        }}
      >
        <Pop delay={5}>
          <GlobalLogo height={120} showNames />
        </Pop>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <Pop delay={16}>
            <Globe3D size={480} />
          </Pop>
          <FadeUp delay={38}>
            <div style={{ maxWidth: 940 }}>
              <KineticText
                text="Welcome to Your"
                delay={40}
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 800,
                  fontSize: 88,
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: COLORS.text,
                }}
              />
              <KineticText
                text="QHSE Induction!"
                delay={52}
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 800,
                  fontSize: 88,
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: COLORS.brandRed,
                }}
              />
              <FadeUp delay={70} style={{ marginTop: 34 }}>
                <BGCLogo height={130} />
              </FadeUp>
            </div>
          </FadeUp>
        </div>
      </AbsoluteFill>
      <VoiceOver file="scene-01.mp3" />
      <SubtitleBar chunks={chunks} />
    </AbsoluteFill>
  );
};
