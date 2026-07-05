import { loadFont } from "@remotion/fonts";
import { cancelRender, continueRender, delayRender, staticFile } from "remotion";

// Inter for body/UI text, Plus Jakarta Sans for display headlines,
// Poppins only for the GLOBAL wordmark (closest to the brand logotype),
// Cairo for the Arabic company name.
export const FONT = "Inter";
export const DISPLAY = "PlusJakartaSans";
export const LOGO_FONT = "Poppins";
export const ARABIC_FONT = "Cairo";

const handle = delayRender("Loading fonts");

Promise.all([
  loadFont({ family: FONT, url: staticFile("fonts/inter-500.woff2"), weight: "500" }),
  loadFont({ family: FONT, url: staticFile("fonts/inter-600.woff2"), weight: "600" }),
  loadFont({ family: FONT, url: staticFile("fonts/inter-700.woff2"), weight: "700" }),
  loadFont({ family: FONT, url: staticFile("fonts/inter-800.woff2"), weight: "800" }),
  loadFont({ family: DISPLAY, url: staticFile("fonts/jakarta-700.woff2"), weight: "700" }),
  loadFont({ family: DISPLAY, url: staticFile("fonts/jakarta-800.woff2"), weight: "800" }),
  loadFont({ family: LOGO_FONT, url: staticFile("fonts/poppins-700.woff2"), weight: "700" }),
  loadFont({ family: LOGO_FONT, url: staticFile("fonts/poppins-800.woff2"), weight: "800" }),
  loadFont({ family: ARABIC_FONT, url: staticFile("fonts/cairo-700-arabic.woff2"), weight: "700" }),
  loadFont({ family: ARABIC_FONT, url: staticFile("fonts/cairo-700-latin.woff2"), weight: "700" }),
])
  .then(() => continueRender(handle))
  .catch((err) => cancelRender(err));

export const COLORS = {
  // Brand identity (logos and brand moments) — from the supplied artwork
  brandNavy: "#16337E",
  brandRed: "#E32226",

  // High-trust corporate palette
  navy: "#1E293B", // slate-800 — headline text, dark panels
  navyDark: "#0F172A", // slate-900 — dark scene backgrounds
  text: "#0F172A",
  muted: "#64748B", // slate-500
  white: "#FFFFFF",
  lightBg: "#F8FAFC", // slate-50 — light scene background
  paleBlue: "#E2E8F0", // slate-200 — hairlines, soft shapes

  // Functional accents
  blue: "#3B82F6", // safe / informational
  green: "#10B981", // correct action
  orange: "#F97316", // safety alert
  red: "#EF4444", // hazard / crimson
  yellow: "#F59E0B", // PPE amber

  // Back-compat aliases used by branding components
  navyBrand: "#16337E",
};
