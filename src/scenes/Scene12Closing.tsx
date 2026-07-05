import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, DISPLAY } from "../theme";
import { KineticText } from "../components/KineticText";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp, Pop, EASE } from "../components/anim";
import { Avatar } from "../components/People";
import { VoiceOver } from "../components/VoiceOver";
import { GlobalLogo } from "../branding/GlobalLogo";
import { Globe3D } from "../components/Globe3D";

export const SCENE_12_SECONDS = 10;

const chunks = SUBTITLES["scene-12"];

export const Scene12Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;
  const bannerScale = interpolate(frame, [6.2 * fps, 6.2 * fps + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.navyDark} 0%, ${COLORS.brandNavy} 100%)`,
      }}
    >
      {/* Persistent GLOBAL logo */}
      <div
        style={{
          position: "absolute",
          top: 52,
          right: 90,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <GlobalLogo height={52} inverted />
      </div>
      {/* 3D brand globe drifting in the background */}
      <div
        style={{
          position: "absolute",
          right: -110,
          bottom: -90,
          opacity: 0.45,
        }}
      >
        <Globe3D size={520} />
      </div>
      {/* soft shapes */}
      <div
        style={{
          position: "absolute",
          top: -220,
          right: -180,
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -260,
          left: -200,
          width: 640,
          height: 640,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
        }}
      />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: 64,
          paddingBottom: 120,
        }}
      >
        <FadeUp delay={10}>
          <div
            style={{
              background: COLORS.white,
              borderRadius: 999,
              padding: "26px 80px",
              boxShadow: "0 30px 60px -20px rgba(0,0,0,0.5)",
            }}
          >
            <KineticText
              text="Together, We Work Safely."
              delay={12}
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontSize: 72,
                letterSpacing: "-0.02em",
                color: COLORS.brandNavy,
                justifyContent: "center",
              }}
            />
          </div>
        </FadeUp>
        <div style={{ display: "flex", gap: 46 }}>
          {(["contractor", "employee", "visitor", "vendor"] as const).map(
            (kind, i) => (
              <Pop key={kind} delay={2 * fps + i * 10}>
                <Avatar kind={kind} size={200} />
              </Pop>
            ),
          )}
        </div>
        <div
          style={{
            scale: String(bannerScale),
            opacity: bannerScale,
            background: COLORS.brandRed,
            color: COLORS.white,
            fontFamily: DISPLAY,
            fontWeight: 800,
            fontSize: 56,
            letterSpacing: "-0.01em",
            padding: "20px 70px",
            borderRadius: 999,
            boxShadow: "0 24px 48px -12px rgba(227,34,38,0.5)",
          }}
        >
          Safety First! Always.
        </div>
      </AbsoluteFill>
      <VoiceOver file="scene-12.mp3" />
      <SubtitleBar chunks={chunks} />
    </AbsoluteFill>
  );
};
