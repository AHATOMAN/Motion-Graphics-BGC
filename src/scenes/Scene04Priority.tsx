import React from "react";
import { COLORS, FONT } from "../theme";
import { SceneFrame, ContentArea } from "../components/SceneFrame";
import { SubtitleBar, SubtitleChunk } from "../components/SubtitleBar";
import { Pop, FadeUp } from "../components/anim";
import { Avatar, AvatarKind } from "../components/People";

export const SCENE_04_SECONDS = 14;

const chunks: SubtitleChunk[] = [
  {
    from: 0.5,
    to: 5,
    text: "Before we go any further — you are our top priority, and safety comes first in our daily working hours.",
  },
  {
    from: 5,
    to: 9.5,
    text: "Whether you're a visitor, a contractor, an industry vendor, or on your first job —",
  },
  {
    from: 9.5,
    to: 13.5,
    text: "everyone needs the knowledge to make the right decisions and stay safe.",
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
            <Pop key={r.kind} delay={5 * fps + i * 12}>
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
        <FadeUp delay={10 * fps}>
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
      <SubtitleBar chunks={chunks} />
    </SceneFrame>
  );
};
