import React from "react";
import { ARABIC_FONT, COLORS, FONT } from "../theme";
import { Globe } from "./Globe";

const ARABIC_NAME = "شركة جلوبال للأنظمة الكيميائية والصيانة المحدودة ش م م";
const ENGLISH_NAME = "Global Chemicals & Maintenance Systems LLC";

// Recreation of the GLOBAL wordmark: GL + red globe + BAL, with the
// Arabic and English company names underneath when showNames is set.
export const GlobalLogo: React.FC<{
  height?: number;
  showNames?: boolean;
}> = ({ height = 120, showNames = false }) => {
  const letterSize = height * 1.18;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: height * 0.22,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: letterSize,
          lineHeight: 1,
          color: COLORS.navy,
          letterSpacing: "-0.02em",
        }}
      >
        <span>GL</span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            margin: `0 ${height * 0.03}px`,
          }}
        >
          <Globe size={height * 0.98} />
        </span>
        <span>BAL</span>
      </div>
      {showNames ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: height * 0.06,
          }}
        >
          <div
            style={{
              fontFamily: ARABIC_FONT,
              fontWeight: 700,
              fontSize: height * 0.34,
              color: COLORS.navy,
              direction: "rtl",
            }}
          >
            {ARABIC_NAME}
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: height * 0.3,
              color: COLORS.navy,
            }}
          >
            {ENGLISH_NAME}
          </div>
        </div>
      ) : null}
    </div>
  );
};
