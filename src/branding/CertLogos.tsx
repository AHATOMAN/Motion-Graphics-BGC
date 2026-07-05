import React from "react";

// SVG recreations of the accreditation logos supplied as brand artwork.

// DCRP — orange diamond lattice with a blue sphere and orbit ring,
// "DC" blue / "RP" orange wordmark.
export const DCRPLogo: React.FC<{ height?: number }> = ({ height = 100 }) => {
  const diamonds: [number, number][] = [
    [60, 22],
    [42, 40],
    [78, 40],
    [24, 58],
    [96, 58],
    [42, 76],
    [78, 76],
    [60, 94],
  ];
  return (
    <svg viewBox="0 0 120 148" height={height}>
      <defs>
        <radialGradient id="dcrpSphere" cx="38%" cy="32%">
          <stop offset="0%" stopColor="#A8E4F7" />
          <stop offset="55%" stopColor="#33A7D8" />
          <stop offset="100%" stopColor="#0E6FA8" />
        </radialGradient>
      </defs>
      {diamonds.map(([x, y], i) => (
        <rect
          key={i}
          x={-11}
          y={-11}
          width={22}
          height={22}
          rx={3}
          fill="#F3AE63"
          transform={`translate(${x} ${y}) rotate(45)`}
        />
      ))}
      <ellipse
        cx={60}
        cy={58}
        rx={56}
        ry={15}
        fill="none"
        stroke="#2596BE"
        strokeWidth={3}
        transform="rotate(-16 60 58)"
      />
      <circle cx={60} cy={58} r={14} fill="url(#dcrpSphere)" />
      <text
        x={60}
        y={138}
        textAnchor="middle"
        style={{
          fontFamily: "Poppins",
          fontWeight: 800,
          fontSize: 34,
          letterSpacing: "0.02em",
        }}
      >
        <tspan fill="#1B75BB">DC</tspan>
        <tspan fill="#F09A3E">RP</tspan>
      </text>
    </svg>
  );
};

// JSRS — black oil drop with a blue molecular starburst.
export const JSRSLogo: React.FC<{ height?: number }> = ({ height = 100 }) => {
  const spokes = [15, 55, 100, 145, 185, 225, 265, 310].map((deg, i) => {
    const rad = (deg * Math.PI) / 180;
    const len = [52, 40, 50, 38, 52, 42, 48, 40][i];
    const ballR = [8, 5, 7, 4.5, 8, 5.5, 7, 5][i];
    return {
      x: Math.cos(rad) * len,
      y: Math.sin(rad) * len,
      ballR,
    };
  });
  return (
    <svg viewBox="-70 -70 140 140" height={height}>
      <defs>
        <radialGradient id="jsrsBall" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#BDE8FA" />
          <stop offset="60%" stopColor="#3FA9DC" />
          <stop offset="100%" stopColor="#156F9E" />
        </radialGradient>
        <radialGradient id="jsrsDrop" cx="38%" cy="30%">
          <stop offset="0%" stopColor="#6E6E6E" />
          <stop offset="45%" stopColor="#1A1A1A" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
      </defs>
      {spokes.map((s, i) => (
        <g key={i}>
          <line
            x1={0}
            y1={0}
            x2={s.x}
            y2={s.y}
            stroke="#8FCBEA"
            strokeWidth={3.4}
          />
          <circle cx={s.x} cy={s.y} r={s.ballR} fill="url(#jsrsBall)" />
        </g>
      ))}
      {/* oil drop */}
      <path
        d="M 0 -34 C 10 -16 22 -4 22 10 A 22 22 0 1 1 -22 10 C -22 -4 -10 -16 0 -34 Z"
        fill="url(#jsrsDrop)"
      />
      <ellipse cx={-7} cy={2} rx={5} ry={9} fill="#ffffff" opacity={0.25} />
    </svg>
  );
};

// ISO — blue wireframe globe behind the bold ISO wordmark.
export const ISOLogo: React.FC<{ height?: number }> = ({ height = 100 }) => {
  const BLUE = "#1B75BB";
  return (
    <svg viewBox="0 0 160 160" height={height}>
      <g stroke={BLUE} strokeWidth={4} fill="none">
        {/* globe outline */}
        <circle cx={80} cy={80} r={62} />
        {/* meridians */}
        <ellipse cx={80} cy={80} rx={30} ry={62} />
        <ellipse cx={80} cy={80} rx={54} ry={62} />
        <line x1={80} y1={18} x2={80} y2={142} />
        {/* parallels */}
        <path d="M 26 52 Q 80 30 134 52" />
        <path d="M 20 74 Q 80 58 140 74" />
        <path d="M 26 108 Q 80 130 134 108" />
        <path d="M 20 86 Q 80 102 140 86" />
      </g>
      {/* white band so the wordmark sits cleanly on the globe */}
      <rect x={4} y={56} width={152} height={48} fill="#ffffff" />
      <text
        x={80}
        y={100}
        textAnchor="middle"
        fill={BLUE}
        style={{
          fontFamily: "Poppins",
          fontWeight: 800,
          fontSize: 58,
          letterSpacing: "0.01em",
        }}
      >
        ISO
      </text>
    </svg>
  );
};

// OPAL — red flame swoosh around a green crescent and black oil drop,
// with the angled red OPAL wordmark.
export const OPALLogo: React.FC<{ height?: number }> = ({ height = 100 }) => (
  <svg viewBox="0 0 150 160" height={height}>
    <defs>
      <radialGradient id="opalDrop" cx="38%" cy="30%">
        <stop offset="0%" stopColor="#555" />
        <stop offset="50%" stopColor="#111" />
        <stop offset="100%" stopColor="#000" />
      </radialGradient>
    </defs>
    {/* red outer flame: thick arc with a flame tip at the top */}
    <path
      d="M 96 14
         C 60 2 20 26 14 66
         C 8 108 40 142 82 138
         L 78 118
         C 48 120 30 98 34 68
         C 38 40 64 24 88 32
         C 84 24 88 18 96 14 Z"
      fill="#E1251B"
    />
    {/* green crescent */}
    <path
      d="M 88 40
         C 62 34 42 52 42 76
         C 42 100 62 116 84 112
         L 81 97
         C 66 99 56 89 56 75
         C 56 60 70 50 84 54 Z"
      fill="#009B48"
    />
    {/* black oil drop */}
    <path
      d="M 76 46 C 82 58 90 66 90 76 A 15 15 0 1 1 60 76 C 60 66 70 58 76 46 Z"
      fill="url(#opalDrop)"
    />
    <text
      x={118}
      y={112}
      textAnchor="middle"
      transform="rotate(-48 118 112)"
      style={{
        fontFamily: "Poppins",
        fontWeight: 800,
        fontSize: 30,
        letterSpacing: "0.06em",
      }}
      fill="#E1251B"
      stroke="#ffffff"
      strokeWidth={0.8}
    >
      OPAL
    </text>
  </svg>
);
