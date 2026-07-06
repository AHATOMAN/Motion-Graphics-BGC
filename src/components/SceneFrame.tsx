import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, DISPLAY, FONT } from "../theme";
import { LogoLockup } from "../branding/LogoLockup";
import { KineticText } from "./KineticText";
import { LightSweep } from "./cinematic";
import { FadeUp } from "./anim";

// Shared scene chrome: high-trust corporate background (light or dark),
// persistent GLOBAL logo, kicker chip + kinetic display title, and
// multi-dimensional layering — the background layer drifts while the
// content layer slowly pushes toward the camera (Z-space separation).
export const SceneFrame: React.FC<{
  kicker?: string;
  title?: string;
  dark?: boolean;
  children: React.ReactNode;
}> = ({ kicker, title, dark = false, children }) => {
  const frame = useCurrentFrame();
  // Slow camera push on content; background drifts the opposite way
  const contentScale = 1 + Math.min(frame * 0.000055, 0.035);
  const bgDrift = frame * 0.045;

  return (
    <AbsoluteFill
      style={{
        background: dark
          ? `linear-gradient(160deg, ${COLORS.navyDark} 0%, ${COLORS.navy} 100%)`
          : COLORS.lightBg,
      }}
    >
      {/* Background layer (drifts backward in Z) */}
      <AbsoluteFill style={{ translate: `0px ${-bgDrift * 0.4}px` }}>
        <AbsoluteFill
          style={{
            backgroundImage: `radial-gradient(${
              dark ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.05)"
            } 2px, transparent 2px)`,
            backgroundSize: "56px 56px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -340 + bgDrift,
            right: -260,
            width: 900,
            height: 900,
            borderRadius: "50%",
            background: `radial-gradient(closest-side, ${
              dark ? "rgba(59,130,246,0.16)" : "rgba(22,51,126,0.08)"
            }, transparent)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -380 + bgDrift * 0.6,
            left: -300,
            width: 940,
            height: 940,
            borderRadius: "50%",
            background: `radial-gradient(closest-side, ${
              dark ? "rgba(227,34,38,0.10)" : "rgba(227,34,38,0.05)"
            }, transparent)`,
          }}
        />
      </AbsoluteFill>

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
          overflow: "hidden",
        }}
      >
        <LightSweep periodInFrames={210} intensity={0.5} />
      </div>

      {/* Content layer (pushes gently toward camera) */}
      <AbsoluteFill style={{ scale: String(contentScale) }}>
        {/* Persistent brand lockup */}
        <div style={{ position: "absolute", top: 44, right: 64 }}>
          <LogoLockup height={76} />
        </div>

        {/* Header */}
        {title ? (
          <div
            style={{
              position: "absolute",
              top: 74,
              left: 100,
              right: 480,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 18,
            }}
          >
            {kicker ? (
              <FadeUp delay={0}>
                <div
                  style={{
                    position: "relative",
                    fontFamily: FONT,
                    fontWeight: 700,
                    fontSize: 27,
                    letterSpacing: "0.16em",
                    color: dark ? "#93C5FD" : COLORS.brandRed,
                    textTransform: "uppercase",
                    background: dark
                      ? "rgba(59,130,246,0.14)"
                      : "rgba(227,34,38,0.07)",
                    border: `1.5px solid ${
                      dark ? "rgba(147,197,253,0.35)" : "rgba(227,34,38,0.22)"
                    }`,
                    borderRadius: 999,
                    padding: "10px 28px",
                    overflow: "hidden",
                  }}
                >
                  {kicker}
                  <LightSweep periodInFrames={190} intensity={0.28} />
                </div>
              </FadeUp>
            ) : null}
            <KineticText
              text={title}
              delay={4}
              metal={dark}
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontSize: 88,
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: dark ? COLORS.white : COLORS.text,
              }}
            />
            {/* Brushed-metal accent underline with drifting light catch */}
            <FadeUp delay={14}>
              <div
                style={{
                  position: "relative",
                  width: 190,
                  height: 9,
                  borderRadius: 5,
                  background:
                    "linear-gradient(100deg, #9AA8C0 0%, #E8EEF8 30%, #8592A8 55%, #DDE5F2 80%, #93A2BA 100%)",
                  overflow: "hidden",
                }}
              >
                <LightSweep periodInFrames={150} intensity={0.7} />
              </div>
            </FadeUp>
          </div>
        ) : null}

        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Content area below the standard header, laid out with flex.
export const ContentArea: React.FC<{
  top?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ top = 280, children, style }) => (
  <div
    style={{
      position: "absolute",
      top,
      left: 100,
      right: 100,
      bottom: 170,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...style,
    }}
  >
    {children}
  </div>
);
