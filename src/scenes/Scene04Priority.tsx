import React from "react";
import { COLORS, FONT } from "../theme";
import { SceneFrame, ContentArea } from "../components/SceneFrame";
import { SubtitleBar } from "../components/SubtitleBar";
import { SUBTITLES } from "../data/subtitles";
import { Pop, FadeUp } from "../components/anim";
import { Avatar, AvatarKind } from "../components/People";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_04_SECONDS = 20;

const chunks = SUBTITLES["scene-04"];

const ROLES: { kind: AvatarKind; label: string }[] = [
  { kind: "visitor", label: "Visitor" },
  { kind: "contractor", label: "Contractor" },
  { kind: "vendor", label: "Industry Vendor" },
  { kind: "employee", label: "New Employee" },
];

export const Scene04Priority: React.FC = () => {
  const fps = 30;
  return (
    <SceneFrame kicker="Our commitment to you" title="Safety Is Your Priority">
      <ContentArea top={300} style={{ flexDirection: "column", gap: 60 }}>
        <div style={{ display: "flex", gap: 70 }}>
          {ROLES.map((r, i) => (
            <Pop key={r.kind} delay={5.6 * fps + i * 27}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 26,
                }}
              >
                <Avatar kind={r.kind} size={250} />
                <div
                  style={{
                    fontFamily: FONT,
                    fontWeight: 700,
                    fontSize: 40,
                    color: COLORS.navy,
                  }}
                >
                  {r.label}
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
              fontSize: 46,
              color: COLORS.red,
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
