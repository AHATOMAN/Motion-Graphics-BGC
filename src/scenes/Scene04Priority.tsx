import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { COLORS, FONT } from "../theme";
import { SceneFrame, ContentArea } from "../components/SceneFrame";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp } from "../components/anim";
import { Person3D, StudioLights, Platform } from "../components/Person3D";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_04_SECONDS = 20;

const chunks = SUBTITLES["scene-04"];

const ROLES: {
  label: string;
  shirt: string;
  props: Partial<React.ComponentProps<typeof Person3D>>;
}[] = [
  { label: "Visitor", shirt: "#1E3A8A", props: { lanyard: true } },
  { label: "Contractor", shirt: COLORS.orange, props: { helmet: 1, vest: 1 } },
  { label: "Industry Vendor", shirt: "#2563EB", props: { carryBox: true } },
  { label: "New Employee", shirt: "#059669", props: { star: true } },
];

const X_POSITIONS = [-3.45, -1.15, 1.15, 3.45];

export const Scene04Priority: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneFrame kicker="Our commitment to you" title="Safety Is Your Priority">
      <ContentArea top={280} style={{ flexDirection: "column", gap: 8 }}>
        <ThreeCanvas
          width={1600}
          height={520}
          style={{ width: 1600, height: 520 }}
          camera={{ position: [0, 0.2, 5.9], fov: 33 }}
        >
          <StudioLights />
          {ROLES.map((role, i) => {
            const enter = spring({
              frame: frame - (5.6 + i * 0.9) * fps,
              fps,
              config: { damping: 13, mass: 0.6, stiffness: 120 },
            });
            return (
              <group
                key={role.label}
                position={[X_POSITIONS[i], -1.45, 0]}
                scale={enter}
              >
                <Platform radius={1.05} />
                <Person3D
                  shirt={role.shirt}
                  swayPhase={frame / 24 + i * 1.7}
                  rotationY={Math.sin(frame / 70 + i) * 0.18}
                  {...role.props}
                />
              </group>
            );
          })}
        </ThreeCanvas>
        {/* Labels centered under each character. With camera z=5.9 / fov 33
            the world-to-pixel factor puts the 2.3-unit spacing at ~342px. */}
        <div style={{ width: 1600, display: "flex", justifyContent: "center" }}>
          {ROLES.map((role, i) => (
            <FadeUp key={role.label} delay={(5.9 + i * 0.9) * fps}>
              <div
                style={{
                  width: 342,
                  textAlign: "center",
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 38,
                  color: COLORS.navy,
                }}
              >
                {role.label}
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={14.3 * fps} style={{ marginTop: 20 }}>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 42,
              color: COLORS.brandRed,
            }}
          >
            Everyone deserves the knowledge to stay safe.
          </div>
        </FadeUp>
      </ContentArea>
      <VoiceOver file="scene-04.mp3" />
      <SubtitleBar chunks={chunks} />
    </SceneFrame>
  );
};
