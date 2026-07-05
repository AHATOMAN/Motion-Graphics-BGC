import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { COLORS, FONT } from "../theme";
import { SceneFrame, ContentArea } from "../components/SceneFrame";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp, Pop } from "../components/anim";
import { BannerText } from "../components/Card";
import { Person3D, StudioLights, Platform } from "../components/Person3D";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_11_SECONDS = 13;

const chunks = SUBTITLES["scene-11"].filter(
  (c) => !/near misses are incidents/i.test(c.text),
);

// 3D near-miss: a box falls off a rack beside the worker, who reports
// it to the supervisor.
const NearMiss3D: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;
  const fall = interpolate(frame, [1 * fps, 1.8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const alert = interpolate(frame, [2 * fps, 2.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Box drops with acceleration and tips over
  const boxY = 2.6 - fall * fall * 2.35;
  const boxTilt = fall * 0.9;

  return (
    <div style={{ position: "relative", width: 880, height: 560 }}>
      <ThreeCanvas
        width={880}
        height={560}
        style={{ width: 880, height: 560 }}
        camera={{ position: [0, 0.3, 6.4], fov: 36 }}
      >
        <StudioLights />
        <group position={[0, -1.5, 0]}>
          <Platform radius={3.1} />
          {/* storage rack */}
          <group position={[-2.35, 0, -0.3]}>
            {[0.05, 1.5, 2.6].map((y) => (
              <mesh key={y} position={[0, y, 0]}>
                <boxGeometry args={[1.5, 0.1, 1]} />
                <meshStandardMaterial color="#94A3B8" roughness={0.6} />
              </mesh>
            ))}
            {[-0.7, 0.7].map((x) => (
              <mesh key={x} position={[x, 1.3, 0]}>
                <boxGeometry args={[0.1, 2.7, 1]} />
                <meshStandardMaterial color="#64748B" roughness={0.6} />
              </mesh>
            ))}
            {/* box still on the shelf */}
            <mesh position={[0.35, 1.83, 0]}>
              <boxGeometry args={[0.55, 0.55, 0.55]} />
              <meshStandardMaterial color="#C98A3B" roughness={0.7} />
            </mesh>
          </group>
          {/* falling box */}
          <mesh
            position={[-1.35, Math.max(boxY, 0.31), 0.35]}
            rotation={[0, 0.4, -boxTilt]}
          >
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial color="#B07A2F" roughness={0.7} />
          </mesh>
          {/* worker who noticed the near miss */}
          <Person3D
            shirt={COLORS.orange}
            helmet={1}
            vest={1}
            position={[0.15, 0, 0.4]}
            rotationY={0.9}
            swayPhase={frame / 24}
          />
          {/* supervisor with clipboard */}
          <group position={[2.15, 0, 0]}>
            <Person3D
              shirt="#1E3A8A"
              lanyard
              rotationY={-0.55}
              swayPhase={frame / 24 + 2}
            />
            {/* clipboard */}
            <mesh position={[-0.42, 1.05, 0.42]} rotation={[0.35, 0.4, 0]}>
              <boxGeometry args={[0.34, 0.46, 0.04]} />
              <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>
          </group>
        </group>
      </ThreeCanvas>
      {/* alert + report arrow overlays */}
      <div
        style={{
          position: "absolute",
          left: 210,
          top: 96,
          opacity: alert,
          scale: String(0.6 + 0.4 * alert),
        }}
      >
        <svg viewBox="0 0 80 80" width={86} height={86}>
          <circle cx={40} cy={40} r={34} fill={COLORS.red} />
          <text
            x={40}
            y={54}
            textAnchor="middle"
            fill="#fff"
            style={{ fontFamily: FONT, fontWeight: 800, fontSize: 46 }}
          >
            !
          </text>
        </svg>
      </div>
      <div style={{ position: "absolute", left: 485, top: 108, opacity: alert }}>
        <svg viewBox="0 0 160 60" width={170} height={64}>
          <path
            d="M 10 40 Q 80 10 140 32"
            stroke={COLORS.green}
            strokeWidth={9}
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 140 32 L 118 20 M 140 32 L 122 46"
            stroke={COLORS.green}
            strokeWidth={9}
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export const Scene11Reporting: React.FC = () => {
  const fps = 30;
  return (
    <SceneFrame kicker="See it, say it" title="Report Incidents & Near Misses">
      <ContentArea top={280} style={{ gap: 70 }}>
        <FadeUp delay={10}>
          <NearMiss3D />
        </FadeUp>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 40,
            maxWidth: 660,
          }}
        >
          <Pop delay={3.5 * fps}>
            <div
              style={{
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 48,
                lineHeight: 1.25,
                color: COLORS.navy,
              }}
            >
              Reporting today prevents the accident of tomorrow.
            </div>
          </Pop>
          <FadeUp delay={6.3 * fps}>
            <BannerText text="Near misses could have caused injury — report them!" />
          </FadeUp>
        </div>
      </ContentArea>
      <VoiceOver file="scene-11.mp3" />
      <SubtitleBar chunks={chunks} />
    </SceneFrame>
  );
};
