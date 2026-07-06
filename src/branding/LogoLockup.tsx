import React from "react";
import { GlobalLogo } from "./GlobalLogo";
import { BGCLogo } from "./BGCLogo";

// Corner brand lockup: the official GLOBAL wordmark and BGC mark on a
// soft white backing so they read cleanly over scene artwork.
export const LogoLockup: React.FC<{ height?: number }> = ({ height = 64 }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: height * 0.45,
      background: "rgba(255, 255, 255, 0.93)",
      borderRadius: height * 0.22,
      padding: `${height * 0.16}px ${height * 0.34}px`,
      boxShadow: "0 10px 26px rgba(15, 23, 42, 0.2)",
    }}
  >
    <GlobalLogo height={height * 0.62} />
    <div
      style={{
        width: 2,
        height: height * 0.7,
        background: "rgba(15, 23, 42, 0.12)",
        borderRadius: 1,
      }}
    />
    <BGCLogo height={height * 0.86} />
  </div>
);
