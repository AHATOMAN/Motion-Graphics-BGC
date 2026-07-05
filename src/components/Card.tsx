import React from "react";
import { COLORS, FONT } from "../theme";

// White rounded card with an icon slot, a label and an optional sub-line.
export const IconCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  sub?: string;
  width?: number;
}> = ({ icon, label, sub, width = 330 }) => (
  <div
    style={{
      width,
      background: COLORS.white,
      borderRadius: 24,
      boxShadow: "0 18px 40px rgba(22, 51, 126, 0.14)",
      padding: "36px 28px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 20,
      borderTop: `10px solid ${COLORS.red}`,
    }}
  >
    <div
      style={{
        height: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </div>
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 38,
        color: COLORS.navy,
        textAlign: "center",
        lineHeight: 1.15,
      }}
    >
      {label}
    </div>
    {sub ? (
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 500,
          fontSize: 28,
          color: COLORS.muted,
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {sub}
      </div>
    ) : null}
  </div>
);

// Full-width red banner used for the "text on screen" call-to-action lines.
export const BannerText: React.FC<{ text: string }> = ({ text }) => (
  <div
    style={{
      background: COLORS.red,
      color: COLORS.white,
      fontFamily: FONT,
      fontWeight: 700,
      fontSize: 44,
      padding: "22px 56px",
      borderRadius: 999,
      boxShadow: "0 16px 36px rgba(227, 34, 38, 0.35)",
      textAlign: "center",
    }}
  >
    {text}
  </div>
);
