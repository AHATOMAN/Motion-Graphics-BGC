import React from "react";
import { Audio } from "@remotion/media";
import { Sequence, staticFile } from "remotion";

// Per-scene narration track. Starts 0.6s into the scene so the first
// words land after the incoming transition has settled.
export const VoiceOver: React.FC<{ file: string }> = ({ file }) => (
  <Sequence from={18} layout="none">
    <Audio src={staticFile(`voiceover/${file}`)} />
  </Sequence>
);
