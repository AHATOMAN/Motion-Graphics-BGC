import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, DISPLAY } from "../theme";
import { KineticText } from "../components/KineticText";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp, EASE } from "../components/anim";
import { FullScene } from "../components/FullScene";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_12_SECONDS = 10;

const chunks = SUBTITLES["scene-12"].filter(
  (c) => !/safety first/i.test(c.text),
);

export const Scene12Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;
  const bannerScale = interpolate(frame, [6.2 * fps, 6.2 * fps + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  return (
    <FullScene clip="team.mp4" dim={0.12}>
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FadeUp delay={10}>
          <div
            style={{
              background: "rgba(255,255,255,0.96)",
              borderRadius: 999,
              padding: "22px 70px",
              boxShadow: "0 30px 60px -20px rgba(0,0,0,0.5)",
            }}
          >
            <KineticText
              text="Together, We Work Safely."
              delay={12}
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontSize: 64,
                letterSpacing: "-0.02em",
                color: COLORS.brandNavy,
                justifyContent: "center",
              }}
            />
          </div>
        </FadeUp>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 150,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            scale: String(bannerScale),
            opacity: bannerScale,
            background: COLORS.brandRed,
            color: "#ffffff",
            fontFamily: DISPLAY,
            fontWeight: 800,
            fontSize: 50,
            letterSpacing: "-0.01em",
            padding: "16px 60px",
            borderRadius: 999,
            boxShadow: "0 24px 48px -12px rgba(227,34,38,0.6)",
          }}
        >
          Safety First! Always.
        </div>
      </div>
      <VoiceOver file="scene-12.mp3" />
      <SubtitleBar chunks={chunks} />
    </FullScene>
  );
};
