import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

export const EASE = Easing.bezier(0.16, 1, 0.3, 1);

export const fadeUp = (
  frame: number,
  delay: number,
  duration = 20,
): { opacity: number; translate: string } => {
  const t = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  return { opacity: t, translate: `0px ${(1 - t) * 40}px` };
};

export const popIn = (
  frame: number,
  delay: number,
  duration = 18,
): { opacity: number; scale: number } => {
  const t = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });
  return {
    opacity: interpolate(t, [0, 0.4], [0, 1], {
      extrapolateRight: "clamp",
    }),
    scale: 0.6 + 0.4 * t,
  };
};

// Wraps children in a div that fades in and rises from below.
export const FadeUp: React.FC<{
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ delay = 0, duration = 20, style, children }) => {
  const frame = useCurrentFrame();
  const { opacity, translate } = fadeUp(frame, delay, duration);
  return <div style={{ opacity, translate, ...style }}>{children}</div>;
};

// Wraps children in a div that pops in with a slight overshoot.
export const Pop: React.FC<{
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ delay = 0, duration = 18, style, children }) => {
  const frame = useCurrentFrame();
  const { opacity, scale } = popIn(frame, delay, duration);
  return <div style={{ opacity, scale: String(scale), ...style }}>{children}</div>;
};
