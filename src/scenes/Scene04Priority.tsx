import React from "react";
import { COLORS, FONT } from "../theme";
import { SceneFrame, ContentArea } from "../components/SceneFrame";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { FadeUp, Pop } from "../components/anim";
import { Persona, PersonaVariant } from "../components/IllustratedPeople";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_04_SECONDS = 20;

const chunks = SUBTITLES["scene-04"];

const ROLES: { variant: PersonaVariant; label: string }[] = [
  { variant: "visitor", label: "Visitor" },
  { variant: "contractor", label: "Contractor" },
  { variant: "vendor", label: "Industry Vendor" },
  { variant: "employee", label: "New Employee" },
];

export const Scene04Priority: React.FC = () => {
  const fps = 30;
  return (
    <SceneFrame kicker="Our commitment to you" title="Safety Is Your Priority">
      <ContentArea top={280} style={{ flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", gap: 120, alignItems: "flex-end" }}>
          {ROLES.map((role, i) => (
            <Pop key={role.variant} delay={(5.6 + i * 0.9) * fps}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <Persona variant={role.variant} width={190} phaseOffset={i * 1.7} />
                <div
                  style={{
                    fontFamily: FONT,
                    fontWeight: 700,
                    fontSize: 36,
                    color: COLORS.navy,
                  }}
                >
                  {role.label}
                </div>
              </div>
            </Pop>
          ))}
        </div>
        <FadeUp delay={14.3 * fps}>
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
