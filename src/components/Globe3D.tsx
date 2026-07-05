import React from "react";
import { ThreeCanvas } from "@remotion/three";
import { useCurrentFrame } from "remotion";
import { COLORS } from "../theme";

const LATITUDES = [-52, -26, 26, 52];
const R = 1.32;

// 3D brand globe — red sphere with white latitude rings echoing the
// GLOBAL logo mark, with studio lighting and dimensional depth.
// Rotation and float are driven purely by useCurrentFrame().
export const Globe3D: React.FC<{ size?: number }> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const rotY = frame * 0.012;
  const bob = Math.sin(frame / 45) * 0.07;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <ThreeCanvas
        width={size}
        height={size}
        style={{ width: size, height: size }}
        camera={{ position: [0, 0.5, 4.4], fov: 38 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 5]} intensity={1.6} />
        <pointLight position={[-5, -2, 3]} intensity={0.6} color="#93C5FD" />
        <group rotation={[0.16, rotY, -0.07]} position={[0, bob, 0]}>
          <mesh>
            <sphereGeometry args={[R, 64, 64]} />
            <meshStandardMaterial
              color={COLORS.brandRed}
              roughness={0.32}
              metalness={0.12}
            />
          </mesh>
          {/* Equator band */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[R + 0.015, 0.062, 16, 128]} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} />
          </mesh>
          {LATITUDES.map((lat) => {
            const rad = (lat * Math.PI) / 180;
            return (
              <mesh
                key={lat}
                position={[0, (R + 0.015) * Math.sin(rad), 0]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <torusGeometry
                  args={[(R + 0.015) * Math.cos(rad), 0.042, 16, 128]}
                />
                <meshStandardMaterial color="#ffffff" roughness={0.4} />
              </mesh>
            );
          })}
        </group>
      </ThreeCanvas>
      {/* Soft contact shadow */}
      <div
        style={{
          position: "absolute",
          left: "18%",
          right: "18%",
          bottom: size * 0.02,
          height: size * 0.09,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(15,23,42,0.28), transparent)",
        }}
      />
    </div>
  );
};
