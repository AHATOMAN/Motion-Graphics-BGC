// Computes exact subtitle timings from the generated narration using the
// ElevenLabs forced-alignment API (character-level timestamps).
//
// Usage:
//   ELEVENLABS_API_KEY=... node scripts/align-voiceover.mjs
//
// Output: src/data/subtitles.ts
//   - SUBTITLES: per-scene subtitle chunks { text, from, to } in scene seconds
//   - RULE_TIMINGS: exact start/end of each of the 12 Golden Rules sentences
//
// Subtitle text is sliced from the narration itself, so captions always
// match the spoken words exactly.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error("ELEVENLABS_API_KEY is not set.");
  process.exit(1);
}

// Audio starts 0.6s into each scene (see src/components/VoiceOver.tsx).
const AUDIO_START = 0.6;
const MAX_CHUNK = 120; // max characters per subtitle chunk

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const lines = JSON.parse(
  readFileSync(join(root, "scripts", "voiceover-lines.json"), "utf8"),
);

// Split narration into subtitle-sized chunks at sentence boundaries,
// falling back to dash/comma breaks for long sentences.
// Returns [start, end) character ranges into the original text.
const splitRanges = (text) => {
  const sentences = [];
  let start = 0;
  const re = /[.!?](?:\s+|$)/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    sentences.push([start, m.index + 1]);
    start = re.lastIndex;
  }
  if (start < text.length) sentences.push([start, text.length]);

  const chunks = [];
  const splitLong = ([s, e]) => {
    if (e - s <= MAX_CHUNK) {
      chunks.push([s, e]);
      return;
    }
    const slice = text.slice(s, e);
    const mid = Math.floor(slice.length / 2);
    // Break after the separator closest to the middle; both halves must be
    // meaningfully non-empty or we hard-split at the midpoint space.
    let best = -1;
    for (const sep of [" — ", "; ", ", ", " "]) {
      let cursor = 0;
      while (true) {
        const found = slice.indexOf(sep, cursor);
        if (found === -1) break;
        const cut = found + sep.length;
        if (cut >= 10 && cut <= slice.length - 10) {
          if (best === -1 || Math.abs(cut - mid) < Math.abs(best - mid)) {
            best = cut;
          }
        }
        cursor = found + 1;
      }
      if (best !== -1) break;
    }
    if (best === -1) {
      chunks.push([s, e]);
      return;
    }
    splitLong([s, s + best]);
    splitLong([s + best, e]);
  };
  sentences.forEach(splitLong);
  return chunks;
};

const align = async (scene, text) => {
  const audio = readFileSync(join(root, "public", "voiceover", `${scene}.mp3`));
  const form = new FormData();
  form.append("file", new Blob([audio], { type: "audio/mpeg" }), `${scene}.mp3`);
  form.append("text", text);
  const res = await fetch("https://api.elevenlabs.io/v1/forced-alignment", {
    method: "POST",
    headers: { "xi-api-key": API_KEY },
    body: form,
  });
  if (!res.ok) {
    throw new Error(`${scene}: ${res.status} ${await res.text()}`);
  }
  return res.json();
};

const subtitles = {};
const ruleTimings = [];

for (const [scene, text] of Object.entries(lines)) {
  process.stdout.write(`aligning ${scene}... `);
  const result = await align(scene, text);
  const chars = result.characters; // [{text, start, end}]
  if (!chars || chars.length !== text.length) {
    console.warn(
      `warning: ${scene} characters ${chars?.length} != text ${text.length}`,
    );
  }
  const timeAt = (idx, edge) => {
    const clamped = Math.max(0, Math.min(idx, chars.length - 1));
    return chars[clamped][edge];
  };
  const ranges = splitRanges(text);
  subtitles[scene] = ranges.map(([s, e]) => {
    const chunkText = text.slice(s, e).trim();
    const from = timeAt(s, "start") + AUDIO_START;
    const to = timeAt(e - 1, "end") + AUDIO_START + 0.15;
    return { text: chunkText, from: Number(from.toFixed(2)), to: Number(to.toFixed(2)) };
  });
  // No overlapping chunks: a subtitle must end before the next one starts.
  for (let i = 0; i < subtitles[scene].length - 1; i++) {
    subtitles[scene][i].to = Math.min(
      subtitles[scene][i].to,
      Number((subtitles[scene][i + 1].from - 0.05).toFixed(2)),
    );
  }
  if (scene === "scene-10") {
    for (const chunk of subtitles[scene]) {
      if (/^Rule\s/.test(chunk.text)) {
        ruleTimings.push({ from: chunk.from, to: chunk.to });
      }
    }
  }
  console.log(`${subtitles[scene].length} chunks`);
}

// Merge consecutive rule chunks that belong to the same rule (a rule
// sentence split into two chunks yields two entries starting with "Rule"
// only for the first part, so this is already handled by the regex).
if (ruleTimings.length !== 12) {
  console.warn(`warning: expected 12 rule timings, got ${ruleTimings.length}`);
}

mkdirSync(join(root, "src", "data"), { recursive: true });
const out = `// AUTO-GENERATED by scripts/align-voiceover.mjs — do not edit by hand.
// Exact narration timings from ElevenLabs forced alignment.

export type TimedChunk = { text: string; from: number; to: number };

export const SUBTITLES: Record<string, TimedChunk[]> = ${JSON.stringify(subtitles, null, 2)};

export const RULE_TIMINGS: { from: number; to: number }[] = ${JSON.stringify(ruleTimings, null, 2)};
`;
writeFileSync(join(root, "src", "data", "subtitles.ts"), out);
console.log("wrote src/data/subtitles.ts");
