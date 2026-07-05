import "./index.css";
import { Composition } from "remotion";
import {
  HseInduction,
  TOTAL_DURATION_IN_FRAMES,
  FPS,
} from "./HseInduction";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HseInduction"
        component={HseInduction}
        durationInFrames={TOTAL_DURATION_IN_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
