import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS } from "../theme";

// Premium flat-illustration characters (unDraw/Storyset corporate style):
// faceless heads, 6.5-head proportions, bent limbs with rounded caps,
// two-tone shading, soft contact shadows. All motion is frame-driven.

export type PersonaVariant =
  | "visitor"
  | "contractor"
  | "vendor"
  | "employee"
  | "supervisor";

const STYLES: Record<
  PersonaVariant,
  { skin: string; hair: string; shirt: string; shirtDark: string; pants: string }
> = {
  visitor: {
    skin: "#E8B08A",
    hair: "#3B2F2A",
    shirt: "#1E3A8A",
    shirtDark: "#16296B",
    pants: "#334155",
  },
  contractor: {
    skin: "#C68B59",
    hair: "#241C18",
    shirt: "#4A5A75",
    shirtDark: "#3A4860",
    pants: "#1E293B",
  },
  vendor: {
    skin: "#F2C9A0",
    hair: "#6B4A2B",
    shirt: "#2563EB",
    shirtDark: "#1B4CC4",
    pants: "#475569",
  },
  employee: {
    skin: "#9C6644",
    hair: "#171310",
    shirt: "#059669",
    shirtDark: "#047857",
    pants: "#334155",
  },
  supervisor: {
    skin: "#E8B08A",
    hair: "#4A4A4A",
    shirt: "#334155",
    shirtDark: "#273244",
    pants: "#1E293B",
  },
};

const SHADE = "rgba(15, 23, 42, 0.14)";

// Shared body pieces. Canvas: 220 x 440, feet on y=414.
const Body: React.FC<{
  s: (typeof STYLES)[PersonaVariant];
  rightArm: "relaxed" | "wave" | "carry" | "clipboard";
  leftArm: "relaxed" | "carry";
  wavePhase?: number;
  vest?: number;
  helmet?: number;
  goggles?: number;
  gloves?: number;
  boots?: number;
  lanyard?: boolean;
  star?: boolean;
}> = ({
  s,
  rightArm,
  leftArm,
  wavePhase = 0,
  vest = 0,
  helmet = 0,
  goggles = 0,
  gloves = 0,
  boots = 0,
  lanyard = false,
  star = false,
}) => {
  const handColor = gloves > 0 ? COLORS.brandRed : s.skin;
  return (
    <>
      {/* ---- legs (back leg slightly darker) ---- */}
      <path
        d="M 121 250 C 124 292 122 330 121 366 L 121 400"
        stroke={s.pants}
        strokeWidth={30}
        strokeLinecap="round"
        fill="none"
        opacity={0.82}
      />
      <path
        d="M 99 250 C 96 292 97 330 98 366 L 98 400"
        stroke={s.pants}
        strokeWidth={30}
        strokeLinecap="round"
        fill="none"
      />
      {/* shoes / boots */}
      {boots > 0 ? (
        <g opacity={boots}>
          <path d="M 84 372 L 112 372 L 113 406 Q 113 414 104 414 L 76 414 Q 72 404 84 394 Z" fill="#5B4225" />
          <path d="M 108 372 L 136 372 L 148 406 Q 150 414 140 414 L 110 414 Z" fill="#6B4A2B" transform="translate(-1 0)" />
          <rect x={74} y={408} width={40} height={6} rx={3} fill="#3E2D19" />
          <rect x={108} y={408} width={42} height={6} rx={3} fill="#4A3620" />
        </g>
      ) : (
        <>
          <path d="M 84 396 L 112 396 L 112 410 Q 112 414 106 414 L 78 414 Q 74 406 84 402 Z" fill="#1F2937" />
          <path d="M 108 396 L 135 396 L 144 408 Q 146 414 138 414 L 108 414 Z" fill="#111827" />
        </>
      )}

      {/* ---- torso ---- */}
      <path
        d="M 78 122
           C 70 128 64 140 63 158
           C 61 190 66 224 72 252
           L 148 252
           C 154 224 159 190 157 158
           C 156 140 150 128 142 122
           C 128 114 92 114 78 122 Z"
        fill={s.shirt}
      />
      {/* torso side shade */}
      <path
        d="M 128 118 C 140 122 152 134 155 158 C 157 190 153 224 148 252 L 122 252 C 130 208 134 156 128 118 Z"
        fill={SHADE}
      />
      {/* hi-vis vest */}
      {vest > 0 ? (
        <g opacity={vest}>
          <path
            d="M 74 124 C 66 132 62 146 61 162 C 59 194 65 226 71 254 L 100 254 L 98 128 Z"
            fill={COLORS.orange}
          />
          <path
            d="M 146 124 C 154 132 158 146 159 162 C 161 194 155 226 149 254 L 120 254 L 122 128 Z"
            fill="#E4670F"
          />
          <path d="M 66 196 L 100 196 L 100 210 L 68 210 Z" fill="#FFE066" />
          <path d="M 120 196 L 154 196 L 152 210 L 120 210 Z" fill="#FFE066" />
          <path d="M 82 124 L 90 254 L 76 254 C 72 220 70 170 76 132 Z" fill="#FFE066" opacity={0.9} />
          <path d="M 138 124 L 130 254 L 144 254 C 148 220 150 170 144 132 Z" fill="#FFE066" opacity={0.9} />
        </g>
      ) : null}
      {/* lanyard + badge */}
      {lanyard ? (
        <>
          <path d="M 96 120 L 108 168 M 124 120 L 112 168" stroke={COLORS.brandRed} strokeWidth={5} fill="none" />
          <rect x={100} y={164} width={22} height={30} rx={4} fill="#fff" />
          <rect x={104} y={170} width={14} height={5} rx={2} fill={COLORS.brandRed} />
          <rect x={104} y={179} width={14} height={3} rx={1.5} fill="#CBD5E1" />
          <rect x={104} y={185} width={9} height={3} rx={1.5} fill="#CBD5E1" />
        </>
      ) : null}
      {/* star badge */}
      {star ? (
        <path
          d="M 88 150 L 91.5 158 L 100 158.5 L 93.5 164 L 95.5 172.5 L 88 168 L 80.5 172.5 L 82.5 164 L 76 158.5 L 84.5 158 Z"
          fill="#F5B300"
        />
      ) : null}

      {/* ---- left arm (viewer left) ---- */}
      {leftArm === "carry" ? (
        <>
          <path d="M 74 132 C 62 150 56 172 60 196" stroke={s.shirtDark} strokeWidth={17} strokeLinecap="round" fill="none" />
          <path d="M 60 196 C 64 210 74 218 88 220" stroke={s.shirtDark} strokeWidth={16} strokeLinecap="round" fill="none" />
          <circle cx={92} cy={221} r={10} fill={handColor} />
        </>
      ) : (
        <>
          <path d="M 74 132 C 62 152 56 178 57 204" stroke={s.shirtDark} strokeWidth={17} strokeLinecap="round" fill="none" />
          <path d="M 57 204 C 57 220 60 232 65 242" stroke={s.shirtDark} strokeWidth={16} strokeLinecap="round" fill="none" />
          <circle cx={66} cy={251} r={10} fill={handColor} />
          {gloves > 0 ? <circle cx={66} cy={251} r={12} fill={COLORS.brandRed} opacity={gloves} /> : null}
        </>
      )}

      {/* ---- right arm (viewer right) ---- */}
      {rightArm === "wave" ? (
        <g
          style={{
            rotate: `${Math.sin(wavePhase) * 7}deg`,
            transformOrigin: "146px 134px",
          }}
        >
          <path d="M 146 134 C 160 128 172 114 178 96" stroke={s.shirtDark} strokeWidth={17} strokeLinecap="round" fill="none" />
          <path d="M 178 96 C 182 82 183 70 181 58" stroke={s.shirtDark} strokeWidth={16} strokeLinecap="round" fill="none" />
          <circle cx={181} cy={49} r={11} fill={handColor} />
        </g>
      ) : rightArm === "carry" ? (
        <>
          <path d="M 146 132 C 158 150 164 172 160 196" stroke={s.shirtDark} strokeWidth={17} strokeLinecap="round" fill="none" />
          <path d="M 160 196 C 156 210 146 218 132 220" stroke={s.shirtDark} strokeWidth={16} strokeLinecap="round" fill="none" />
          <circle cx={128} cy={221} r={10} fill={handColor} />
        </>
      ) : rightArm === "clipboard" ? (
        <>
          <path d="M 146 132 C 158 148 163 166 161 184" stroke={s.shirtDark} strokeWidth={17} strokeLinecap="round" fill="none" />
          <path d="M 161 184 C 156 198 146 206 132 208" stroke={s.shirtDark} strokeWidth={16} strokeLinecap="round" fill="none" />
          <circle cx={128} cy={208} r={10} fill={handColor} />
          {/* clipboard */}
          <g transform="rotate(-8 118 196)">
            <rect x={94} y={168} width={48} height={62} rx={6} fill="#F1F5F9" />
            <rect x={94} y={168} width={48} height={62} rx={6} fill="none" stroke="#CBD5E1" strokeWidth={3} />
            <rect x={108} y={162} width={20} height={10} rx={4} fill="#94A3B8" />
            <rect x={102} y={182} width={32} height={5} rx={2.5} fill="#CBD5E1" />
            <rect x={102} y={194} width={32} height={5} rx={2.5} fill="#CBD5E1" />
            <rect x={102} y={206} width={22} height={5} rx={2.5} fill="#CBD5E1" />
          </g>
        </>
      ) : (
        <>
          <path d="M 146 132 C 158 152 164 178 163 204" stroke={s.shirtDark} strokeWidth={17} strokeLinecap="round" fill="none" />
          <path d="M 163 204 C 163 220 160 232 155 242" stroke={s.shirtDark} strokeWidth={16} strokeLinecap="round" fill="none" />
          <circle cx={154} cy={251} r={10} fill={handColor} />
          {gloves > 0 ? <circle cx={154} cy={251} r={12} fill={COLORS.brandRed} opacity={gloves} /> : null}
        </>
      )}

      {/* carried box (needs both arms in carry pose) */}
      {leftArm === "carry" && rightArm === "carry" ? (
        <g>
          <rect x={70} y={186} width={80} height={58} rx={6} fill="#D9A05B" />
          <rect x={70} y={186} width={80} height={20} rx={6} fill="#C98A3B" />
          <rect x={104} y={186} width={12} height={58} fill="#B87F35" opacity={0.5} />
        </g>
      ) : null}

      {/* ---- neck & head ---- */}
      <rect x={102} y={96} width={16} height={22} rx={7} fill={s.skin} />
      <ellipse cx={110} cy={66} rx={27} ry={30} fill={s.skin} />
      {/* ear */}
      <circle cx={84} cy={68} r={6} fill={s.skin} />
      {/* hair */}
      <path
        d="M 83 62 C 82 40 96 30 112 31 C 128 32 138 44 137 60 C 137 52 130 44 118 44 C 100 46 88 50 83 62 Z"
        fill={s.hair}
      />
      {/* safety goggles (band + lens) */}
      {goggles > 0 ? (
        <g opacity={goggles}>
          <path d="M 83 58 L 137 58" stroke="#1E293B" strokeWidth={7} />
          <rect x={94} y={48} width={44} height={20} rx={10} fill="#BEE3F8" stroke="#1E293B" strokeWidth={4} />
          <path d="M 100 54 L 112 54" stroke="#ffffff" strokeWidth={3} strokeLinecap="round" opacity={0.8} />
        </g>
      ) : null}
      {/* hard hat (drops with progress) */}
      {helmet > 0 ? (
        <g opacity={Math.min(helmet * 1.6, 1)} style={{ translate: `0px ${(1 - helmet) * -60}px` }}>
          <path d="M 80 46 C 80 24 93 12 110 12 C 127 12 140 24 140 46 Z" fill={COLORS.yellow} />
          <path d="M 121 14 C 132 18 139 30 140 46 L 126 46 C 127 32 125 21 121 14 Z" fill="#DD9C06" />
          <rect x={73} y={42} width={74} height={10} rx={5} fill={COLORS.yellow} />
          <rect x={104} y={4} width={12} height={12} rx={4} fill={COLORS.yellow} />
        </g>
      ) : null}
    </>
  );
};

// A standing persona with idle sway. Height ~ 440 units; scale via width.
export const Persona: React.FC<{
  variant: PersonaVariant;
  width?: number;
  wave?: boolean;
  ppe?: {
    helmet?: number;
    goggles?: number;
    vest?: number;
    gloves?: number;
    boots?: number;
  };
  phaseOffset?: number;
}> = ({ variant, width = 220, wave = false, ppe, phaseOffset = 0 }) => {
  const frame = useCurrentFrame();
  const s = STYLES[variant];
  const swing = Math.sin(frame / 26 + phaseOffset);
  const isContractor = variant === "contractor";
  const gear = {
    helmet: ppe?.helmet ?? (isContractor ? 1 : 0),
    goggles: ppe?.goggles ?? 0,
    vest: ppe?.vest ?? (isContractor ? 1 : 0),
    gloves: ppe?.gloves ?? 0,
    boots: ppe?.boots ?? (isContractor ? 1 : 0),
  };
  return (
    <svg viewBox="0 0 220 440" width={width} height={width * 2}>
      {/* soft contact shadow */}
      <ellipse cx={110} cy={420} rx={64} ry={11} fill="rgba(15,23,42,0.13)" />
      <g
        style={{
          rotate: `${swing * 0.8}deg`,
          transformOrigin: "110px 414px",
        }}
      >
        <Body
          s={s}
          rightArm={wave ? "wave" : variant === "vendor" ? "carry" : variant === "supervisor" ? "clipboard" : "relaxed"}
          leftArm={variant === "vendor" ? "carry" : "relaxed"}
          wavePhase={frame / 4.5 + phaseOffset}
          lanyard={variant === "visitor"}
          star={variant === "employee"}
          {...gear}
        />
      </g>
    </svg>
  );
};

// The PPE hero worker: gear layers animate on via 0..1 progress values.
export const PPEWorkerIllustration: React.FC<{
  width?: number;
  gear: {
    hat: number;
    goggles: number;
    vest: number;
    gloves: number;
    boots: number;
  };
}> = ({ width = 300, gear }) => {
  const frame = useCurrentFrame();
  const swing = Math.sin(frame / 26);
  return (
    <svg viewBox="0 0 220 440" width={width} height={width * 2}>
      <ellipse cx={110} cy={420} rx={70} ry={12} fill="rgba(15,23,42,0.13)" />
      <g style={{ rotate: `${swing * 0.7}deg`, transformOrigin: "110px 414px" }}>
        <Body
          s={{
            skin: "#C68B59",
            hair: "#241C18",
            shirt: "#3D5FA8",
            shirtDark: "#324E8C",
            pants: "#1E293B",
          }}
          rightArm="relaxed"
          leftArm="relaxed"
          helmet={gear.hat}
          goggles={gear.goggles}
          vest={gear.vest}
          gloves={gear.gloves}
          boots={gear.boots}
        />
      </g>
    </svg>
  );
};
