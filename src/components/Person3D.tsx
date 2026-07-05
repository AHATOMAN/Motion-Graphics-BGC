import React from "react";
import { COLORS } from "../theme";

const SKIN = "#F2C9A0";
const HAIR = "#5B4633";
const PANTS = "#1E3A5F";

export type Person3DProps = {
  shirt: string;
  // Accessories (0..1 scale progress for animatable gear; booleans render at 1)
  helmet?: number;
  goggles?: number;
  vest?: number;
  gloves?: number;
  boots?: number;
  lanyard?: boolean;
  carryBox?: boolean;
  star?: boolean;
  // Animation drivers (pass frame-derived values; no self-animation)
  wavePhase?: number; // radians; >0 raises + waves the right arm
  swayPhase?: number; // radians; idle breathing/sway
  position?: [number, number, number];
  rotationY?: number;
  scale?: number;
};

// Low-poly 3D character built from primitives. Feet stand at y=0.
export const Person3D: React.FC<Person3DProps> = ({
  shirt,
  helmet = 0,
  goggles = 0,
  vest = 0,
  gloves = 0,
  boots = 0,
  lanyard = false,
  carryBox = false,
  star = false,
  wavePhase = -1,
  swayPhase = 0,
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1,
}) => {
  const breathe = 1 + Math.sin(swayPhase) * 0.012;
  const waving = wavePhase >= 0;
  const rightArmZ = waving ? -2.4 + Math.sin(wavePhase) * 0.3 : 0.42;
  const armForward = carryBox ? -1.1 : 0;

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <group scale={[1, breathe, 1]}>
        {/* legs */}
        {[-0.2, 0.2].map((x) => (
          <mesh key={x} position={[x, 0.48, 0]}>
            <cylinderGeometry args={[0.15, 0.17, 0.95, 16]} />
            <meshStandardMaterial color={PANTS} roughness={0.8} />
          </mesh>
        ))}
        {/* shoes / safety boots */}
        {[-0.2, 0.2].map((x) => (
          <group key={x}>
            <mesh position={[x, 0.09, 0.05]}>
              <boxGeometry args={[0.3, 0.18, 0.46]} />
              <meshStandardMaterial color="#334155" roughness={0.7} />
            </mesh>
            {boots > 0 ? (
              <mesh position={[x, 0.14, 0.05]} scale={boots}>
                <boxGeometry args={[0.36, 0.3, 0.54]} />
                <meshStandardMaterial color="#6B4A2B" roughness={0.6} />
              </mesh>
            ) : null}
          </group>
        ))}
        {/* torso */}
        <mesh position={[0, 1.32, 0]}>
          <capsuleGeometry args={[0.42, 0.62, 8, 24]} />
          <meshStandardMaterial color={shirt} roughness={0.65} />
        </mesh>
        {/* hi-vis vest */}
        {vest > 0 ? (
          <group scale={[vest, vest, vest]} position={[0, 1.32 * (1 - vest), 0]}>
            <mesh position={[0, 1.32, 0]}>
              <cylinderGeometry args={[0.47, 0.5, 0.72, 24, 1, true]} />
              <meshStandardMaterial color={COLORS.orange} roughness={0.55} side={2} />
            </mesh>
            {[1.18, 1.5].map((y) => (
              <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.49, 0.035, 12, 48]} />
                <meshStandardMaterial
                  color="#FFE066"
                  emissive="#FFE066"
                  emissiveIntensity={0.25}
                  roughness={0.4}
                />
              </mesh>
            ))}
          </group>
        ) : null}
        {/* arms */}
        <group position={[-0.54, 1.58, 0]} rotation={[armForward, 0, 0.42]}>
          <mesh position={[0, -0.32, 0]}>
            <capsuleGeometry args={[0.12, 0.5, 8, 16]} />
            <meshStandardMaterial color={shirt} roughness={0.65} />
          </mesh>
          <mesh position={[0, -0.66, 0]}>
            <sphereGeometry args={[0.14, 20, 20]} />
            <meshStandardMaterial color={SKIN} roughness={0.7} />
          </mesh>
          {gloves > 0 ? (
            <mesh position={[0, -0.66, 0]} scale={gloves}>
              <sphereGeometry args={[0.17, 20, 20]} />
              <meshStandardMaterial color={COLORS.brandRed} roughness={0.5} />
            </mesh>
          ) : null}
        </group>
        <group position={[0.54, 1.58, 0]} rotation={[armForward, 0, rightArmZ]}>
          <mesh position={[0, -0.32, 0]}>
            <capsuleGeometry args={[0.12, 0.5, 8, 16]} />
            <meshStandardMaterial color={shirt} roughness={0.65} />
          </mesh>
          <mesh position={[0, -0.66, 0]}>
            <sphereGeometry args={[0.14, 20, 20]} />
            <meshStandardMaterial color={SKIN} roughness={0.7} />
          </mesh>
          {gloves > 0 ? (
            <mesh position={[0, -0.66, 0]} scale={gloves}>
              <sphereGeometry args={[0.17, 20, 20]} />
              <meshStandardMaterial color={COLORS.brandRed} roughness={0.5} />
            </mesh>
          ) : null}
        </group>
        {/* carried box (vendor) */}
        {carryBox ? (
          <mesh position={[0, 1.15, 0.62]}>
            <boxGeometry args={[0.7, 0.5, 0.5]} />
            <meshStandardMaterial color="#C98A3B" roughness={0.7} />
          </mesh>
        ) : null}
        {/* lanyard badge (visitor) */}
        {lanyard ? (
          <mesh position={[0, 1.38, 0.45]} rotation={[0.1, 0, 0]}>
            <boxGeometry args={[0.2, 0.28, 0.03]} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} />
          </mesh>
        ) : null}
        {/* star badge (new employee) */}
        {star ? (
          <mesh position={[-0.2, 1.52, 0.42]}>
            <cylinderGeometry args={[0.09, 0.09, 0.03, 5]} />
            <meshStandardMaterial
              color="#F59E0B"
              emissive="#F59E0B"
              emissiveIntensity={0.3}
            />
          </mesh>
        ) : null}
        {/* head */}
        <mesh position={[0, 2.12, 0]}>
          <sphereGeometry args={[0.33, 28, 28]} />
          <meshStandardMaterial color={SKIN} roughness={0.6} />
        </mesh>
        {/* hair cap */}
        <mesh position={[0, 2.2, -0.04]} rotation={[-0.25, 0, 0]}>
          <sphereGeometry args={[0.335, 28, 28, 0, Math.PI * 2, 0, Math.PI / 2.4]} />
          <meshStandardMaterial color={HAIR} roughness={0.85} />
        </mesh>
        {/* eyes */}
        {[-0.11, 0.11].map((x) => (
          <mesh key={x} position={[x, 2.14, 0.3]}>
            <sphereGeometry args={[0.032, 12, 12]} />
            <meshStandardMaterial color="#1E293B" roughness={0.3} />
          </mesh>
        ))}
        {/* safety goggles */}
        {goggles > 0 ? (
          <group scale={goggles} position={[0, 2.14 * (1 - goggles), 0]}>
            <mesh position={[0, 2.14, 0.28]}>
              <boxGeometry args={[0.5, 0.14, 0.12]} />
              <meshStandardMaterial
                color="#BEE3F8"
                roughness={0.15}
                metalness={0.1}
                transparent
                opacity={0.9}
              />
            </mesh>
            <mesh position={[0, 2.14, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.33, 0.02, 8, 32]} />
              <meshStandardMaterial color={COLORS.navy} roughness={0.5} />
            </mesh>
          </group>
        ) : null}
        {/* hard hat (drops in with progress) */}
        {helmet > 0 ? (
          <group position={[0, (1 - helmet) * 1.4, 0]} scale={Math.max(helmet, 0.001)}>
            <mesh position={[0, 2.3, 0]}>
              <sphereGeometry args={[0.37, 28, 28, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color={COLORS.yellow} roughness={0.35} />
            </mesh>
            <mesh position={[0, 2.31, 0]}>
              <cylinderGeometry args={[0.46, 0.46, 0.05, 28]} />
              <meshStandardMaterial color={COLORS.yellow} roughness={0.35} />
            </mesh>
            <mesh position={[0, 2.48, 0]}>
              <boxGeometry args={[0.14, 0.06, 0.5]} />
              <meshStandardMaterial color="#D97706" roughness={0.4} />
            </mesh>
          </group>
        ) : null}
      </group>
    </group>
  );
};

// Standard studio lighting rig shared by the character scenes.
export const StudioLights: React.FC = () => (
  <>
    <ambientLight intensity={0.65} />
    <directionalLight position={[4, 7, 5]} intensity={1.5} />
    <directionalLight position={[-5, 3, -3]} intensity={0.4} color="#93C5FD" />
    <pointLight position={[0, 3, 6]} intensity={0.35} />
  </>
);

// Round display platform for characters to stand on.
export const Platform: React.FC<{ radius?: number; color?: string }> = ({
  radius = 1.5,
  color = "#E2E8F0",
}) => (
  <mesh position={[0, -0.06, 0]}>
    <cylinderGeometry args={[radius, radius * 1.06, 0.12, 48]} />
    <meshStandardMaterial color={color} roughness={0.9} />
  </mesh>
);
