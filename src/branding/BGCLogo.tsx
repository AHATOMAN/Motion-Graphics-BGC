import React, { useId } from "react";
import { COLORS, FONT } from "../theme";

const StripedCircle: React.FC<{
  cx: number;
  cy: number;
  r: number;
  color: string;
  idSuffix: string;
}> = ({ cx, cy, r, color, idSuffix }) => {
  const id = useId() + idSuffix;
  const stripes: React.ReactNode[] = [];
  const stripeH = (r * 2) / 9;
  for (let i = 0; i < 9; i += 2) {
    stripes.push(
      <rect
        key={i}
        x={cx - r}
        y={cy - r + i * stripeH}
        width={r * 2}
        height={stripeH}
        fill={color}
      />,
    );
  }
  return (
    <>
      <defs>
        <clipPath id={id}>
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={color}
        strokeOpacity={0.35}
        strokeWidth={1.5}
      />
      <g clipPath={`url(#${id})`}>{stripes}</g>
    </>
  );
};

// Recreation of the Al Barami Group of Companies (BGC) mark:
// three overlapping striped circles (navy - red - navy) over "B G C".
export const BGCLogo: React.FC<{ height?: number }> = ({ height = 170 }) => {
  const width = (height / 200) * 380;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <svg viewBox="0 0 380 200" width={width} height={height}>
        <StripedCircle cx={190} cy={72} r={64} color={COLORS.red} idSuffix="c" />
        <StripedCircle cx={118} cy={72} r={64} color={COLORS.navy} idSuffix="l" />
        <StripedCircle cx={262} cy={72} r={64} color={COLORS.navy} idSuffix="r" />
        <text
          x={190}
          y={186}
          textAnchor="middle"
          fill={COLORS.navy}
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 52,
            letterSpacing: "0.45em",
          }}
        >
          BGC
        </text>
      </svg>
    </div>
  );
};
