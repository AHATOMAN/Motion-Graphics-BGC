import React from "react";
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const EASE = Easing.bezier(0.16, 1, 0.3, 1);

// Smooth, organic entrance — no bounce (damping 200), for text blocks.
export const fadeUp = (
  frame: number,
  fps: number,
  delay: number,
): { opacity: number; translate: string } => {
  const t = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.8, stiffness: 120 },
  });
  return { opacity: t, translate: `0px ${(1 - t) * 44}px` };
};

// Springy pop with a hint of overshoot, for cards and icons.
export const popIn = (
  frame: number,
  fps: number,
  delay: number,
): { opacity: number; scale: number } => {
  const t = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 130 },
  });
  return {
    opacity: interpolate(t, [0, 0.35], [0, 1], { extrapolateRight: "clamp" }),
    scale: 0.7 + 0.3 * t,
  };
};

// Wraps children in a div that fades in and rises from below (spring-based).
export const FadeUp: React.FC<{
  delay?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ delay = 0, style, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { opacity, translate } = fadeUp(frame, fps, delay);
  return <div style={{ opacity, translate, ...style }}>{children}</div>;
};

// Wraps children in a div that pops in with spring physics.
export const Pop: React.FC<{
  delay?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ delay = 0, style, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { opacity, scale } = popIn(frame, fps, delay);
  return <div style={{ opacity, scale: String(scale), ...style }}>{children}</div>;
};
