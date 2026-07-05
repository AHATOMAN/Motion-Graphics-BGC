import React from "react";
import { AbsoluteFill } from "remotion";
import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";

type Props = Record<string, never>;

const CameraZoomPresentation: React.FC<
  TransitionPresentationComponentProps<Props>
> = ({ children, presentationDirection, presentationProgress }) => {
  const entering = presentationDirection === "entering";
  // Snappy camera push: outgoing scene keeps zooming forward while the
  // incoming scene settles back from a slight zoom-out.
  const scale = entering
    ? 0.955 + 0.045 * presentationProgress
    : 1 + 0.06 * presentationProgress;
  const opacity = entering ? presentationProgress : 1 - presentationProgress;

  return (
    <AbsoluteFill
      style={{
        opacity,
        scale: String(scale),
        transformOrigin: "50% 42%",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// 3D-camera-style zoom transition ("snappy push") for TransitionSeries.
export const cameraZoom = (): TransitionPresentation<Props> => ({
  component: CameraZoomPresentation,
  props: {},
});
