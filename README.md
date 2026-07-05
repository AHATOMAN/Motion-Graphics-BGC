# GCMS HSE Induction — Motion Graphics Video

A [Remotion](https://remotion.dev) motion-graphics video for the Global Chemicals &
Maintenance Systems LLC (Al Barami Group) QHSE induction, built from the
HSE Induction script (10 scenes + end credits).

## Contents

- `src/HseInduction.tsx` — main composition (1920×1080, 30 fps, ~4 min)
- `src/scenes/` — one component per scene:
  1. Welcome (logos + "Welcome to Your QHSE Induction!")
  2. About GCMS (history, sectors, project lifecycle, workforce)
  3. Approvals & Certifications (DCRP Grade A, JSRS, OPAL, ISO 9001/14001/45001, Tender Board)
  4. Safety Is Your Priority (visitor / contractor / vendor / new employee)
  5. First Things First (visitor pass, host, no photography)
  6. PPE (worker gears up item by item)
  7. Emergency Procedures (animated evacuation map)
  8. Hazard Identification
  9. Safe Work Practices (lifting do / don't)
  10. The 12 Golden Life Saving Rules
  11. Reporting Incidents & Near Misses
  12. Closing — "Together, We Work Safely."
  13. End credits
- `src/branding/` — SVG recreations of the GLOBAL logo, BGC logo and QHSE badge
- `src/components/` — subtitle bar, scene chrome, cards, people illustrations
- `public/fonts/` — self-hosted Poppins (Latin) and Cairo (Arabic) fonts

## Commands

```bash
npm install
npx remotion studio          # preview & edit
npx remotion render HseInduction out/hse-induction.mp4
```

## Voiceover & music

The voiceover text from the script is currently shown as burned-in subtitles.
To add narration, drop audio files into `public/` and add `<Audio>` tags
(see `@remotion/media`), or generate speech with an ElevenLabs TTS skill
(`npx skills add elevenlabs/skills --skill text-to-speech`, requires an API key).
Background music can be added the same way.
