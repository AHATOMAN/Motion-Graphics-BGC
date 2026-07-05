import React from "react";
import { COLORS, FONT } from "../theme";
import { SceneFrame, ContentArea } from "../components/SceneFrame";
import { SubtitleBar, SubtitleChunk } from "../components/SubtitleBar";
import { Pop, FadeUp } from "../components/anim";
import { Avatar, AvatarKind } from "../components/People";
import { VoiceOver } from "../components/VoiceOver";

export const SCENE_04_SECONDS = 20;

const chunks: SubtitleChunk[] = [
  {
    from: 0.6,
    to: 7,
    text: "Before we go any further — you're our top priority, and safety is our first priority in our daily working hours.",
  },
  {
    from: 7,
    to: 13,
    text: "Whether you're a visitor, a contractor, an industry vendor, or on your first job —",
  },
  {
    from: 13,
    to: 18.8,
    text: "it is important that everyone has the knowledge to make the right decisions to stay safe.",
  },
];

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
            <Pop key={r.kind} delay={7 * fps + i * 14}>
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
        <FadeUp delay={13.5 * fps}>
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
