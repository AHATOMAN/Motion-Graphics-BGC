// Generates one narration MP3 per scene using the ElevenLabs API.
//
// Usage:
//   ELEVENLABS_API_KEY=... node scripts/generate-voiceover.mjs [voiceId]
//
// Output: public/voiceover/scene-01.mp3 ... scene-13.mp3
// Skips scenes whose MP3 already exists (delete a file to regenerate it).

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error("ELEVENLABS_API_KEY is not set.");
  process.exit(1);
}

// George — clear male narrative voice. Other options:
//   EXAVITQu4vr4xnSDxMaL Sarah (female, soft)
//   onwK4e9ZLuTAKqWW03F9 Daniel (male, authoritative)
//   XB0fDUnXU5powFXDhCwa Charlotte (female, conversational)
const VOICE_ID = process.argv[2] ?? "JBFqnCBsd6RMkjVDRZzb";
const MODEL_ID = "eleven_multilingual_v2";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const lines = JSON.parse(
  readFileSync(join(root, "scripts", "voiceover-lines.json"), "utf8"),
);
const outDir = join(root, "public", "voiceover");
mkdirSync(outDir, { recursive: true });

for (const [scene, text] of Object.entries(lines)) {
  const outFile = join(outDir, `${scene}.mp3`);
  if (existsSync(outFile)) {
    console.log(`skip ${scene} (exists)`);
    continue;
  }
  process.stdout.write(`generating ${scene} (${text.length} chars)... `);
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        model_id: MODEL_ID,
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    },
  );
  if (!res.ok) {
    console.error(`FAILED (${res.status}): ${await res.text()}`);
    process.exit(1);
  }
  writeFileSync(outFile, Buffer.from(await res.arrayBuffer()));
  console.log("done");
}
console.log("All voiceover files written to public/voiceover/");
