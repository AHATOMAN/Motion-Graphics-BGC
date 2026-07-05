import React from "react";
import { COLORS } from "../theme";

export type AvatarKind = "visitor" | "contractor" | "vendor" | "employee";

const SKIN = "#F2C9A0";

// Simple flat person: head + shoulders, with a role-specific accessory.
export const Avatar: React.FC<{ kind: AvatarKind; size?: number }> = ({
  kind,
  size = 220,
}) => {
  const shirt =
    kind === "contractor"
      ? COLORS.orange
      : kind === "vendor"
        ? COLORS.blue
        : kind === "employee"
          ? COLORS.green
          : COLORS.navy;
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <circle cx={100} cy={100} r={96} fill={COLORS.paleBlue} />
      {/* body */}
      <path
        d="M 40 200 C 40 150 70 132 100 132 C 130 132 160 150 160 200 Z"
        fill={shirt}
      />
      {/* head */}
      <circle cx={100} cy={86} r={34} fill={SKIN} />
      {/* hair */}
      <path d="M 66 82 A 34 34 0 0 1 134 82 L 128 70 Q 100 48 72 70 Z" fill="#5B4633" />
      {kind === "contractor" ? (
        <>
          <path d="M 64 74 A 36 33 0 0 1 136 74 Z" fill={COLORS.yellow} />
          <rect x={58} y={72} width={84} height={8} rx={4} fill={COLORS.yellow} />
        </>
      ) : null}
      {kind === "visitor" ? (
        <>
          <path d="M 84 134 L 100 162 L 116 134" stroke={COLORS.red} strokeWidth={5} fill="none" />
          <rect x={88} y={158} width={24} height={30} rx={4} fill="#fff" stroke={COLORS.navy} strokeWidth={3} />
          <rect x={92} y={164} width={16} height={5} fill={COLORS.red} />
          <rect x={92} y={173} width={16} height={3} fill={COLORS.paleBlue} />
          <rect x={92} y={179} width={10} height={3} fill={COLORS.paleBlue} />
        </>
      ) : null}
      {kind === "vendor" ? (
        <>
          <rect x={66} y={150} width={68} height={50} rx={6} fill="#C98A3B" />
          <rect x={66} y={168} width={68} height={6} fill="#A96F28" />
          <rect x={94} y={150} width={12} height={18} fill="#E7B36B" />
        </>
      ) : null}
      {kind === "employee" ? (
        <path
          d="M 100 142 L 105 154 L 118 154 L 108 162 L 112 175 L 100 167 L 88 175 L 92 162 L 82 154 L 95 154 Z"
          fill={COLORS.yellow}
        />
      ) : null}
    </svg>
  );
};

// Full-height worker used in the PPE scene. Each gear item's opacity is
// controlled by the caller so items can appear one by one.
export const PPEWorker: React.FC<{
  width?: number;
  gear: {
    hat: number;
    goggles: number;
    vest: number;
    gloves: number;
    boots: number;
  };
}> = ({ width = 460, gear }) => (
  <svg viewBox="0 0 300 500" width={width} height={(width / 300) * 500}>
    {/* legs */}
    <rect x={112} y={330} width={30} height={120} fill={COLORS.navy} />
    <rect x={158} y={330} width={30} height={120} fill={COLORS.navy} />
    {/* boots */}
    <g opacity={gear.boots}>
      <path d="M 106 450 L 148 450 L 148 478 L 92 478 Q 92 456 106 450 Z" fill="#6B4A2B" />
      <path d="M 152 450 L 194 450 L 208 478 L 152 478 Z" fill="#6B4A2B" />
    </g>
    {/* torso */}
    <path d="M 96 190 Q 150 168 204 190 L 204 340 L 96 340 Z" fill="#3D5FA8" />
    {/* arms */}
    <path d="M 96 196 Q 66 214 62 290 L 88 296 Q 92 240 104 218 Z" fill="#3D5FA8" />
    <path d="M 204 196 Q 234 214 238 290 L 212 296 Q 208 240 196 218 Z" fill="#3D5FA8" />
    {/* gloves */}
    <g opacity={gear.gloves}>
      <circle cx={74} cy={304} r={17} fill={COLORS.red} />
      <circle cx={226} cy={304} r={17} fill={COLORS.red} />
    </g>
    {/* vest */}
    <g opacity={gear.vest}>
      <path d="M 104 192 Q 150 172 196 192 L 196 340 L 104 340 Z" fill={COLORS.orange} />
      <rect x={104} y={238} width={92} height={14} fill="#FFE066" />
      <rect x={104} y={290} width={92} height={14} fill="#FFE066" />
      <path d="M 128 196 L 128 340 M 172 196 L 172 340" stroke="#FFE066" strokeWidth={10} />
      <path d="M 104 192 L 196 340 M 196 192 L 104 340" stroke="none" />
    </g>
    {/* head */}
    <circle cx={150} cy={130} r={44} fill={SKIN} />
    {/* goggles */}
    <g opacity={gear.goggles}>
      <rect x={112} y={112} width={76} height={26} rx={13} fill="#BEE3F8" stroke={COLORS.navy} strokeWidth={5} />
      <line x1={112} y1={125} x2={106} y2={125} stroke={COLORS.navy} strokeWidth={5} />
      <line x1={188} y1={125} x2={194} y2={125} stroke={COLORS.navy} strokeWidth={5} />
    </g>
    {/* smile */}
    <path d="M 134 156 Q 150 168 166 156" stroke="#B3762F" strokeWidth={5} fill="none" strokeLinecap="round" />
    {/* hard hat */}
    <g opacity={gear.hat}>
      <path d="M 104 106 A 46 42 0 0 1 196 106 Z" fill={COLORS.yellow} />
      <rect x={96} y={102} width={108} height={12} rx={6} fill={COLORS.yellow} />
      <rect x={142} y={66} width={16} height={16} rx={4} fill={COLORS.yellow} />
    </g>
  </svg>
);
