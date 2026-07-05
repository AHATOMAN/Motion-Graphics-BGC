import React, { useId } from "react";
import { COLORS } from "../theme";

// Red globe with white latitude bands - the "O" of the GLOBAL wordmark.
export const Globe: React.FC<{ size?: number }> = ({ size = 200 }) => {
  const clipId = useId();
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <defs>
        <clipPath id={clipId}>
          <circle cx="100" cy="100" r="96" />
        </clipPath>
      </defs>
      <circle cx="100" cy="100" r="96" fill={COLORS.red} />
      <g
        clipPath={`url(#${clipId})`}
        stroke={COLORS.white}
        strokeWidth="9"
        fill="none"
      >
        <path d="M -10 26 Q 100 66 210 26" />
        <path d="M -10 60 Q 100 94 210 60" />
        <path d="M -14 100 L 214 100" strokeWidth="14" />
        <path d="M -10 140 Q 100 106 210 140" />
        <path d="M -10 174 Q 100 134 210 174" />
      </g>
    </svg>
  );
};
