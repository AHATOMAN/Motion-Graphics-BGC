import React from "react";
import { COLORS, DISPLAY, FONT } from "../theme";
import { KineticText } from "./KineticText";

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
      background: COLORS.white,
      borderRadius: 28,
      border: `1.5px solid ${COLORS.paleBlue}`,
      boxShadow: "0 24px 48px -20px rgba(15, 23, 42, 0.18)",
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
        background: bg,
        color: COLORS.white,
        padding: "22px 56px",
        borderRadius: 999,
        boxShadow: `0 20px 44px -12px ${shadow}`,
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
    </div>
  );
};
