import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, DISPLAY, FONT } from "../theme";
import { GlobalLogo } from "../branding/GlobalLogo";
import { KineticText } from "./KineticText";
import { FadeUp } from "./anim";

// Shared scene chrome: high-trust corporate background (light or dark),
// persistent GLOBAL logo, kicker chip + kinetic display title.
export const SceneFrame: React.FC<{
  kicker?: string;
  title?: string;
  dark?: boolean;
  children: React.ReactNode;
}> = ({ kicker, title, dark = false, children }) => {
  return (
    <AbsoluteFill
      style={{
        background: dark
          ? `linear-gradient(160deg, ${COLORS.navyDark} 0%, ${COLORS.navy} 100%)`
          : COLORS.lightBg,
      }}
    >
      {/* Subtle dot grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${
            dark ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.05)"
          } 2px, transparent 2px)`,
          backgroundSize: "56px 56px",
        }}
      />
      {/* Soft brand glows */}
      <div
        style={{
          position: "absolute",
          top: -340,
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
          bottom: -380,
          left: -300,
          width: 940,
          height: 940,
          borderRadius: "50%",
          background: `radial-gradient(closest-side, ${
            dark ? "rgba(227,34,38,0.10)" : "rgba(227,34,38,0.05)"
          }, transparent)`,
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

      {/* Persistent GLOBAL logo */}
      <div style={{ position: "absolute", top: 52, right: 90 }}>
        <GlobalLogo height={52} inverted={dark} />
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
                }}
              >
                {kicker}
              </div>
            </FadeUp>
          ) : null}
          <KineticText
            text={title}
            delay={4}
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              fontSize: 88,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: dark ? COLORS.white : COLORS.text,
            }}
          />
        </div>
      ) : null}

      {children}
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
