import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { COLORS, DISPLAY } from "../theme";
import { KineticText } from "../components/KineticText";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp, EASE } from "../components/anim";
import { Person3D, StudioLights, Platform } from "../components/Person3D";
import { VoiceOver } from "../components/VoiceOver";
import { GlobalLogo } from "../branding/GlobalLogo";
import { Globe3D } from "../components/Globe3D";

export const SCENE_12_SECONDS = 10;

const chunks = SUBTITLES["scene-12"].filter(
  (c) => !/safety first/i.test(c.text),
);

const TEAM: {
  shirt: string;
  props: Partial<React.ComponentProps<typeof Person3D>>;
}[] = [
  { shirt: COLORS.orange, props: { helmet: 1, vest: 1 } },
  { shirt: "#059669", props: { star: true } },
  { shirt: "#1E3A8A", props: { lanyard: true } },
  { shirt: "#2563EB", props: {} },
];

const X_POSITIONS = [-2.9, -0.97, 0.97, 2.9];

export const Scene12Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
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
        {/* 3D team waving */}
        <ThreeCanvas
          width={1300}
          height={430}
          style={{ width: 1300, height: 430 }}
          camera={{ position: [0, 0.25, 7.6], fov: 32 }}
        >
          <StudioLights />
          {TEAM.map((member, i) => {
            const enter = spring({
              frame: frame - (1.6 + i * 0.35) * fps,
              fps,
              config: { damping: 13, mass: 0.6, stiffness: 120 },
            });
            return (
              <group
                key={i}
                position={[X_POSITIONS[i], -1.5, 0]}
                scale={enter}
              >
                <Platform radius={0.95} color="#2B3E66" />
                <Person3D
                  shirt={member.shirt}
                  swayPhase={frame / 24 + i * 1.3}
                  wavePhase={frame / 4.5 + i * 0.8}
                  rotationY={Math.sin(frame / 80 + i * 2) * 0.12}
                  {...member.props}
                />
              </group>
            );
          })}
        </ThreeCanvas>
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
