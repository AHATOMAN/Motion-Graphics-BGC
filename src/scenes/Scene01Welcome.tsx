import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, DISPLAY } from "../theme";
import { GlobalLogo } from "../branding/GlobalLogo";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { Pop, FadeUp } from "../components/anim";
import { KineticText } from "../components/KineticText";
import { FullScene } from "../components/FullScene";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_01_SECONDS = 17;

const chunks = SUBTITLES["scene-01"];

export const Scene01Welcome: React.FC = () => {
  return (
    <FullScene clip="welcome.mp4">
      {/* Soft scrim so the message reads cleanly over the artwork,
          concentrated on the right where the officer is not standing. */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to right, rgba(248,250,252,0) 30%, rgba(248,250,252,0.55) 55%, rgba(248,250,252,0.78) 100%)",
        }}
      />
      {/* Welcome card in the open right two-thirds */}
      <AbsoluteFill
        style={{
          alignItems: "flex-end",
          justifyContent: "center",
          paddingRight: 110,
          paddingBottom: 40,
        }}
      >
        <FadeUp delay={4}>
          <div
            style={{
              width: 1020,
              background: "rgba(255,255,255,0.82)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderRadius: 32,
              border: "1.5px solid rgba(255,255,255,0.9)",
              boxShadow: "0 40px 80px -30px rgba(15,23,42,0.4)",
              padding: "54px 64px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 30,
            }}
          >
            <Pop delay={8}>
              <GlobalLogo height={98} showNames />
            </Pop>
            <div
              style={{
                width: "78%",
                height: 2,
                background: COLORS.paleBlue,
                borderRadius: 1,
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <KineticText
                text="Welcome to Your"
                delay={40}
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 800,
                  fontSize: 74,
                  letterSpacing: "-0.02em",
                  color: COLORS.text,
                  justifyContent: "center",
                }}
              />
              <KineticText
                text="QHSE Induction!"
                delay={52}
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 800,
                  fontSize: 74,
                  letterSpacing: "-0.02em",
                  color: COLORS.brandRed,
                  justifyContent: "center",
                }}
              />
            </div>
          </div>
        </FadeUp>
      </AbsoluteFill>
      <VoiceOver file="scene-01.mp3" />
      <SubtitleBar chunks={chunks} />
    </FullScene>
  );
};
