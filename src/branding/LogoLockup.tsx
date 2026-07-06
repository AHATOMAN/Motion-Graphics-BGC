import React from "react";
import { ARABIC_FONT, COLORS, LOGO_FONT } from "../theme";
import { Globe } from "./Globe";
import { BGCLogo } from "./BGCLogo";

// Corner brand lockup matching the reference video: the GLOBAL wordmark
// inside a red-ringed white oval, next to the BGC mark with the Arabic
// group name.
export const LogoLockup: React.FC<{ height?: number }> = ({ height = 64 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: height * 0.35 }}>
    <div
      style={{
        background: "#ffffff",
        border: `${height * 0.055}px solid ${COLORS.brandRed}`,
        borderRadius: "50%",
        padding: `${height * 0.16}px ${height * 0.42}px`,
        display: "flex",
        alignItems: "center",
        boxShadow: "0 8px 22px rgba(15,23,42,0.18)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontFamily: LOGO_FONT,
          fontWeight: 800,
          fontSize: height * 0.52,
          lineHeight: 1,
          color: COLORS.brandNavy,
          letterSpacing: "-0.02em",
        }}
      >
        <span>GL</span>
        <span style={{ display: "flex", margin: `0 ${height * 0.015}px` }}>
          <Globe size={height * 0.44} />
        </span>
        <span>BAL</span>
      </div>
    </div>
    <div
      style={{
        background: "rgba(255,255,255,0.92)",
        borderRadius: height * 0.16,
        padding: `${height * 0.1}px ${height * 0.2}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 8px 22px rgba(15,23,42,0.18)",
      }}
    >
      <BGCLogo height={height * 0.62} />
      <div
        style={{
          fontFamily: ARABIC_FONT,
          fontWeight: 700,
          fontSize: height * 0.14,
          color: COLORS.brandNavy,
          direction: "rtl",
          marginTop: height * 0.02,
        }}
      >
        مجموعة شركات البرعمي
      </div>
    </div>
  </div>
);
