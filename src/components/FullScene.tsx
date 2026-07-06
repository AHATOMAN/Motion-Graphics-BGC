import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Loop,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { COLORS, DISPLAY, FONT } from "../theme";
import { LogoLockup } from "../branding/LogoLockup";
import { KineticText } from "./KineticText";
import { FadeUp } from "./anim";

const CLIP_FRAMES = 8 * 30; // all animated scene clips are 8s @ 30fps

// Full-bleed illustrated scene (reference explainer-video style).
// With `clip`, the background is a looping animated video of the scene;
// otherwise the still artwork with a slow camera drift. The brand
// lockup sits top-right, and content overlays live on the scene.
export const FullScene: React.FC<{
  art?: string;
  clip?: string;
  zoom?: "in" | "out";
  blur?: number;
  dim?: number; // 0..1 dark overlay for busy artwork under text
  children: React.ReactNode;
}> = ({ art, clip, zoom = "in", blur = 0, dim = 0, children }) => {
  const frame = useCurrentFrame();
  const drift = Math.min(frame * 0.00014, 0.14);
  const scale = zoom === "in" ? 1.04 + drift : 1.18 - drift;

  return (
    <AbsoluteFill style={{ background: COLORS.lightBg, overflow: "hidden" }}>
      {clip ? (
        <Loop durationInFrames={CLIP_FRAMES}>
          <OffthreadVideo
            muted
            src={staticFile(`art/clips/${clip}`)}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: blur > 0 ? `blur(${blur}px)` : undefined,
            }}
          />
        </Loop>
      ) : (
        <Img
          src={staticFile(`art/${art}`)}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            scale: String(scale),
            translate: `0px ${-frame * 0.02}px`,
            filter: blur > 0 ? `blur(${blur}px)` : undefined,
          }}
        />
      )}
      {dim > 0 ? (
        <AbsoluteFill style={{ background: `rgba(11, 18, 36, ${dim})` }} />
      ) : null}
      {children}
      {/* Brand lockup — always on top, like the reference */}
      <div style={{ position: "absolute", top: 44, right: 64 }}>
        <LogoLockup height={76} />
      </div>
    </AbsoluteFill>
  );
};

// Scene title anchored into the scene (not a slide header): kicker chip
// plus kinetic display text, dark or light ink depending on the artwork.
export const SceneTitle: React.FC<{
  kicker?: string;
  title: string;
  light?: boolean; // white text for dark/busy artwork
  top?: number;
  left?: number;
  maxWidth?: number;
}> = ({ kicker, title, light = false, top = 84, left = 90, maxWidth = 1100 }) => (
  <div
    style={{
      position: "absolute",
      top,
      left,
      maxWidth,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 16,
    }}
  >
    {kicker ? (
      <FadeUp delay={0}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 25,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: light ? "#FFD9DA" : COLORS.brandRed,
            background: light
              ? "rgba(227, 34, 38, 0.30)"
              : "rgba(255, 255, 255, 0.85)",
            border: `1.5px solid ${
              light ? "rgba(255, 217, 218, 0.4)" : "rgba(227, 34, 38, 0.25)"
            }`,
            borderRadius: 999,
            padding: "9px 26px",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {kicker}
        </div>
      </FadeUp>
    ) : null}
    <KineticText
      text={title}
      delay={4}
      style={{
        fontFamily: DISPLAY,
        fontWeight: 800,
        fontSize: 76,
        lineHeight: 1.05,
        letterSpacing: "-0.02em",
        color: light ? "#ffffff" : COLORS.text,
        textShadow: light
          ? "0 4px 24px rgba(0,0,0,0.45)"
          : "0 2px 18px rgba(255,255,255,0.8)",
      }}
    />
  </div>
);

// Floating callout tag pinned to a point in the artwork.
export const Callout: React.FC<{
  x: number; // px in 1920x1080 space
  y: number;
  label: string;
  sub?: string;
  tone?: "light" | "alert" | "positive";
  delay?: number;
}> = ({ x, y, label, sub, tone = "light", delay = 0 }) => {
  const bg =
    tone === "alert"
      ? COLORS.orange
      : tone === "positive"
        ? COLORS.green
        : "rgba(255, 255, 255, 0.94)";
  const ink = tone === "light" ? COLORS.text : "#ffffff";
  return (
    <div style={{ position: "absolute", left: x, top: y }}>
      <FadeUp delay={delay}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: bg,
              border: "3.5px solid rgba(255,255,255,0.95)",
              boxShadow: "0 4px 14px rgba(15,23,42,0.35)",
            }}
          />
          <div
            style={{
              background: bg,
              color: ink,
              borderRadius: 14,
              padding: "12px 24px",
              boxShadow: "0 14px 30px -8px rgba(15,23,42,0.35)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <div
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontSize: 30,
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </div>
            {sub ? (
              <div
                style={{
                  fontFamily: FONT,
                  fontWeight: 600,
                  fontSize: 21,
                  opacity: 0.82,
                  whiteSpace: "nowrap",
                }}
              >
                {sub}
              </div>
            ) : null}
          </div>
        </div>
      </FadeUp>
    </div>
  );
};

// The HSE officer presenter cutout, breathing gently.
export const HseOfficer: React.FC<{
  height?: number;
  right?: number;
  bottom?: number;
  delay?: number;
  flip?: boolean;
}> = ({ height = 620, right = 60, bottom = 0, delay = 10, flip = false }) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [delay, delay + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const breathe = 1 + Math.sin(frame / 26) * 0.006;
  return (
    <div
      style={{
        position: "absolute",
        right,
        bottom,
        opacity: enter,
        translate: `${(1 - enter) * 120}px 0px`,
      }}
    >
      <Img
        src={staticFile("art/hse-officer.png")}
        style={{
          height,
          scale: `${flip ? -1 : 1} ${breathe}`,
          transformOrigin: "50% 100%",
          filter: "drop-shadow(0 24px 32px rgba(15,23,42,0.3))",
        }}
      />
    </div>
  );
};

// Bottom gradient scrim for text readability over artwork.
export const Scrim: React.FC<{ strength?: number; from?: "bottom" | "left" }> = ({
  strength = 0.55,
  from = "bottom",
}) => (
  <AbsoluteFill
    style={{
      background:
        from === "bottom"
          ? `linear-gradient(to top, rgba(11,18,36,${strength}) 0%, transparent 42%)`
          : `linear-gradient(to right, rgba(248,250,252,${strength + 0.3}) 0%, rgba(248,250,252,${strength * 0.7}) 38%, transparent 62%)`,
    }}
  />
);
