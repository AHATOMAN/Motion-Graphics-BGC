import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { cameraZoom } from "./components/cameraZoom";
import { CinematicOverlay } from "./components/cinematic";
import { Scene01Welcome, SCENE_01_SECONDS } from "./scenes/Scene01Welcome";
import { Scene02About, SCENE_02_SECONDS } from "./scenes/Scene02About";
import {
  Scene03Certifications,
  SCENE_03_SECONDS,
} from "./scenes/Scene03Certifications";
import { Scene04Priority, SCENE_04_SECONDS } from "./scenes/Scene04Priority";
import {
  Scene05FirstThings,
  SCENE_05_SECONDS,
} from "./scenes/Scene05FirstThings";
import { Scene06PPE, SCENE_06_SECONDS } from "./scenes/Scene06PPE";
import { Scene07Emergency, SCENE_07_SECONDS } from "./scenes/Scene07Emergency";
import { Scene08Hazards, SCENE_08_SECONDS } from "./scenes/Scene08Hazards";
import { Scene09SafeWork, SCENE_09_SECONDS } from "./scenes/Scene09SafeWork";
import {
  Scene10GoldenRules,
  SCENE_10_SECONDS,
} from "./scenes/Scene10GoldenRules";
import { Scene11Reporting, SCENE_11_SECONDS } from "./scenes/Scene11Reporting";
import { Scene12Closing, SCENE_12_SECONDS } from "./scenes/Scene12Closing";
import { Scene13Credits, SCENE_13_SECONDS } from "./scenes/Scene13Credits";

export const FPS = 30;
const TRANSITION_FRAMES = 15;

const SCENES: { component: React.FC; seconds: number }[] = [
  { component: Scene01Welcome, seconds: SCENE_01_SECONDS },
  { component: Scene02About, seconds: SCENE_02_SECONDS },
  { component: Scene03Certifications, seconds: SCENE_03_SECONDS },
  { component: Scene04Priority, seconds: SCENE_04_SECONDS },
  { component: Scene05FirstThings, seconds: SCENE_05_SECONDS },
  { component: Scene06PPE, seconds: SCENE_06_SECONDS },
  { component: Scene07Emergency, seconds: SCENE_07_SECONDS },
  { component: Scene08Hazards, seconds: SCENE_08_SECONDS },
  { component: Scene09SafeWork, seconds: SCENE_09_SECONDS },
  { component: Scene10GoldenRules, seconds: SCENE_10_SECONDS },
  { component: Scene11Reporting, seconds: SCENE_11_SECONDS },
  { component: Scene12Closing, seconds: SCENE_12_SECONDS },
  { component: Scene13Credits, seconds: SCENE_13_SECONDS },
];

export const TOTAL_DURATION_IN_FRAMES =
  SCENES.reduce((sum, s) => sum + s.seconds * FPS, 0) -
  TRANSITION_FRAMES * (SCENES.length - 1);

export const HseInduction: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {SCENES.map((scene, i) => {
          const Comp = scene.component;
          const elements = [
            <TransitionSeries.Sequence
              key={`scene-${i}`}
              durationInFrames={scene.seconds * FPS}
            >
              <Comp />
            </TransitionSeries.Sequence>,
          ];
          if (i < SCENES.length - 1) {
            elements.push(
              <TransitionSeries.Transition
                key={`transition-${i}`}
                presentation={
                  (i % 4 === 3
                    ? fade()
                    : cameraZoom()) as ReturnType<typeof cameraZoom>
                }
                timing={springTiming({
                  config: { damping: 200 },
                  durationInFrames: TRANSITION_FRAMES,
                })}
              />,
            );
          }
          return elements;
        })}
      </TransitionSeries>
      <CinematicOverlay />
    </AbsoluteFill>
  );
};
