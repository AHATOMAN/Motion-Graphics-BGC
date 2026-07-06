import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, DISPLAY } from "../theme";
import { KineticText } from "../components/KineticText";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp, Pop, EASE } from "../components/anim";
import { Persona, PersonaVariant } from "../components/IllustratedPeople";
import { VoiceOver } from "../components/VoiceOver";
import { GlobalLogo } from "../branding/GlobalLogo";
import { Globe3D } from "../components/Globe3D";

export const SCENE_12_SECONDS = 10;

const chunks = SUBTITLES["scene-12"].filter(
  (c) => !/safety first/i.test(c.text),
);

const TEAM: PersonaVariant[] = ["contractor", "employee", "visitor", "vendor"];

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
      {/* Persistent GLOBAL logo */}
      <div style={{ position: "absolute", top: 52, right: 90 }}>
        <GlobalLogo height={52} inverted />
      </div>
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
          gap: 26,
          paddingBottom: 110,
        }}
      >
        <FadeUp delay={10}>
          <div
            style={{
              background: COLORS.white,
              borderRadius: 999,
              padding: "24px 76px",
              boxShadow: "0 30px 60px -20px rgba(0,0,0,0.5)",
            }}
          >
            <KineticText
              text="Together, We Work Safely."
              delay={12}
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontSize: 68,
                letterSpacing: "-0.02em",
                color: COLORS.brandNavy,
                justifyContent: "center",
              }}
            />
          </div>
        </FadeUp>
        {/* Illustrated team waving */}
        <div style={{ display: "flex", gap: 110, alignItems: "flex-end" }}>
          {TEAM.map((variant, i) => (
            <Pop key={variant} delay={(1.6 + i * 0.35) * fps}>
              <Persona variant={variant} width={172} wave phaseOffset={i * 0.8} />
            </Pop>
          ))}
        </div>
        <div
          style={{
            scale: String(bannerScale),
            opacity: bannerScale,
            background: COLORS.brandRed,
            color: COLORS.white,
            fontFamily: DISPLAY,
            fontWeight: 800,
            fontSize: 52,
            letterSpacing: "-0.01em",
            padding: "18px 64px",
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
