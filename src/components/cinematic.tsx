import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// Static film grain via SVG turbulence (deterministic across frames).
const NOISE_URI = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// Cinematic finishing layer: corner vignette + ~10% film grain to take
// away the sterile digital sharpness. Render above everything.
export const CinematicOverlay: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 78% 70% at 50% 46%, transparent 60%, rgba(15, 23, 42, 0.17) 100%)",
      }}
    />
    <AbsoluteFill
      style={{
        backgroundImage: NOISE_URI,
        backgroundRepeat: "repeat",
        opacity: 0.055,
        mixBlendMode: "overlay",
      }}
    />
  </AbsoluteFill>
);

// A soft specular band that sweeps across its parent on a loop —
// the classic "light sweep" over typography and panels.
// Parent must have overflow hidden (and a borderRadius if rounded).
export const LightSweep: React.FC<{
  periodInFrames?: number;
  intensity?: number;
}> = ({ periodInFrames = 150, intensity = 0.35 }) => {
  const frame = useCurrentFrame();
  const t = (frame % periodInFrames) / periodInFrames;
  // Sweep crosses in the first 35% of the period, rests the remainder
  const x = t < 0.35 ? (t / 0.35) * 190 - 45 : -45;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        borderRadius: "inherit",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-40%",
          bottom: "-40%",
          width: "22%",
          left: `${x}%`,
          rotate: "10deg",
          background: `linear-gradient(105deg, transparent, rgba(255,255,255,${intensity}), transparent)`,
        }}
      />
    </div>
  );
};
