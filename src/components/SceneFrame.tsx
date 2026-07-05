import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT } from "../theme";
import { Globe } from "../branding/Globe";
import { EASE } from "./anim";

// Shared scene chrome: light branded background, decorative shapes,
// top-left kicker + title, and a slot for the scene content.
export const SceneFrame: React.FC<{
  kicker?: string;
  title?: string;
  children: React.ReactNode;
}> = ({ kicker, title, children }) => {
  const frame = useCurrentFrame();

  const titleAnim = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.white} 0%, ${COLORS.lightBg} 55%, ${COLORS.paleBlue} 100%)`,
      }}
    >
      {/* Decorative brand shapes */}
      <div
        style={{
          position: "absolute",
          top: -260,
          right: -220,
          width: 640,
          height: 640,
          borderRadius: "50%",
          background: COLORS.paleBlue,
          opacity: 0.7,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -320,
          left: -260,
          width: 700,
          height: 700,
          borderRadius: "50%",
          border: `56px solid ${COLORS.paleBlue}`,
          opacity: 0.6,
        }}
      />
      <div style={{ position: "absolute", top: 64, right: 84, opacity: 0.16 }}>
        <Globe size={150} />
      </div>

      {/* Top brand bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 14,
          background: COLORS.navy,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 420,
          height: 14,
          background: COLORS.red,
        }}
      />

      {/* Header */}
      {title ? (
        <div
          style={{
            position: "absolute",
            top: 72,
            left: 100,
            right: 280,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            opacity: titleAnim,
            translate: `0px ${(1 - titleAnim) * 30}px`,
          }}
        >
          {kicker ? (
            <div
              style={{
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 34,
                letterSpacing: "0.18em",
                color: COLORS.red,
                textTransform: "uppercase",
              }}
            >
              {kicker}
            </div>
          ) : null}
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 84,
              lineHeight: 1.05,
              color: COLORS.navy,
            }}
          >
            {title}
          </div>
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
