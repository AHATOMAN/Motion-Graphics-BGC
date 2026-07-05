import React from "react";
import { COLORS, FONT } from "../theme";

const Icon: React.FC<{ color: string; children: React.ReactNode }> = ({
  color,
  children,
}) => (
  <svg viewBox="-32 -32 64 64" width="100%" height="100%">
    <circle cx={0} cy={0} r={30} fill={color} />
    {children}
  </svg>
);

const icons = [
  // Quality - blue check
  <Icon key="q" color="#1877C9">
    <path
      d="M -13 1 L -4 10 L 14 -10"
      stroke="#fff"
      strokeWidth={7}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>,
  // Health - red heart
  <Icon key="h" color={COLORS.brandRed}>
    <path
      d="M 0 14 C -20 0 -14 -16 -4 -12 C -1 -11 0 -8 0 -8 C 0 -8 1 -11 4 -12 C 14 -16 20 0 0 14 Z"
      fill="#fff"
    />
  </Icon>,
  // Safety - yellow hard hat
  <Icon key="s" color="#F5B300">
    <path d="M -14 4 A 14 14 0 0 1 14 4 Z" fill="#fff" />
    <rect x={-19} y={4} width={38} height={5} rx={2.5} fill="#fff" />
    <rect x={-3} y={-16} width={6} height={8} rx={2} fill="#fff" />
  </Icon>,
  // Environment - green leaf
  <Icon key="e" color="#2FA84F">
    <path
      d="M -10 12 C -14 -6 0 -16 14 -14 C 16 0 6 12 -10 12 Z"
      fill="#fff"
    />
    <path
      d="M -12 14 C -4 4 4 -4 12 -12"
      stroke="#2FA84F"
      strokeWidth={2.5}
      fill="none"
    />
  </Icon>,
];

// Recreation of the QHSE department lockup: four badge icons over a
// green rule and the department name.
export const QhseBadge: React.FC<{ width?: number }> = ({ width = 560 }) => {
  const iconSize = width * 0.115;
  return (
    <div
      style={{
        width,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: width * 0.028,
      }}
    >
      <div style={{ display: "flex", gap: width * 0.03 }}>
        {icons.map((icon, i) => (
          <div key={i} style={{ width: iconSize, height: iconSize }}>
            {icon}
          </div>
        ))}
      </div>
      <div
        style={{
          width: width * 0.62,
          height: width * 0.016,
          borderRadius: width * 0.008,
          background: "#2FA84F",
        }}
      />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: width * 0.038,
          letterSpacing: "0.04em",
          color: "#111",
          textAlign: "center",
        }}
      >
        QUALITY, HEALTH &amp; SAFETY ENVIRONMENT DEPARTMENT
      </div>
    </div>
  );
};
