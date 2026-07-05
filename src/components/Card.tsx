import React from "react";
import { COLORS, DISPLAY, FONT } from "../theme";
import { KineticText } from "./KineticText";
import { LightSweep } from "./cinematic";

// Every tile in the video shares these exact dimensions.
export const CARD_WIDTH = 325;
export const CARD_HEIGHT = 400;

// Clean corporate card with an icon slot, a label and an optional sub-line.
// Fixed size so all tiles across scenes are identical.
export const IconCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  sub?: string;
  accent?: string;
}> = ({ icon, label, sub, accent = COLORS.brandRed }) => (
  <div
    style={{
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      // Frosted glass over the scene background
      background: "rgba(255, 255, 255, 0.78)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      borderRadius: 28,
      border: "1.5px solid rgba(226, 232, 240, 0.9)",
      // Soft ambient-occlusion shadow for physical weight
      boxShadow:
        "0 34px 64px -28px rgba(15, 23, 42, 0.28), 0 6px 18px rgba(15, 23, 42, 0.05)",
      padding: "30px 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 18,
      borderTop: `8px solid ${accent}`,
    }}
  >
    <div
      style={{
        height: 116,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <div
      style={{
        fontFamily: DISPLAY,
        fontWeight: 800,
        fontSize: 34,
        letterSpacing: "-0.01em",
        color: COLORS.text,
        textAlign: "center",
        lineHeight: 1.12,
      }}
    >
      {label}
    </div>
    {sub ? (
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 500,
          fontSize: 26,
          color: COLORS.muted,
          textAlign: "center",
          lineHeight: 1.35,
        }}
      >
        {sub}
      </div>
    ) : null}
  </div>
);

// Kinetic call-to-action banner for the script's "text on screen" lines.
// tone: "alert" (safety orange) | "positive" (emerald) | "brand" (red).
export const BannerText: React.FC<{
  text: string;
  tone?: "alert" | "positive" | "brand";
}> = ({ text, tone = "alert" }) => {
  const bg =
    tone === "positive"
      ? COLORS.green
      : tone === "brand"
        ? COLORS.brandRed
        : COLORS.orange;
  const shadow =
    tone === "positive"
      ? "rgba(16, 185, 129, 0.4)"
      : tone === "brand"
        ? "rgba(227, 34, 38, 0.4)"
        : "rgba(249, 115, 22, 0.4)";
  return (
    <div
      style={{
        position: "relative",
        background: bg,
        color: COLORS.white,
        padding: "22px 56px",
        borderRadius: 999,
        boxShadow: `0 20px 44px -12px ${shadow}`,
        overflow: "hidden",
      }}
    >
      <KineticText
        text={text}
        stagger={2}
        style={{
          fontFamily: DISPLAY,
          fontWeight: 800,
          fontSize: 43,
          letterSpacing: "-0.01em",
          justifyContent: "center",
        }}
      />
      <LightSweep periodInFrames={130} intensity={0.4} />
    </div>
  );
};
