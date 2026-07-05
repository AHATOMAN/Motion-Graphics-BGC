import { loadFont } from "@remotion/fonts";
import { cancelRender, continueRender, delayRender, staticFile } from "remotion";

export const FONT = "Poppins";
export const ARABIC_FONT = "Cairo";

const handle = delayRender("Loading fonts");

Promise.all([
  loadFont({ family: FONT, url: staticFile("fonts/poppins-500.woff2"), weight: "500" }),
  loadFont({ family: FONT, url: staticFile("fonts/poppins-600.woff2"), weight: "600" }),
  loadFont({ family: FONT, url: staticFile("fonts/poppins-700.woff2"), weight: "700" }),
  loadFont({ family: FONT, url: staticFile("fonts/poppins-800.woff2"), weight: "800" }),
  loadFont({ family: ARABIC_FONT, url: staticFile("fonts/cairo-700-arabic.woff2"), weight: "700" }),
  loadFont({ family: ARABIC_FONT, url: staticFile("fonts/cairo-700-latin.woff2"), weight: "700" }),
])
  .then(() => continueRender(handle))
  .catch((err) => cancelRender(err));

export const COLORS = {
  navy: "#16337E",
  navyDark: "#0E2258",
  red: "#E32226",
  white: "#FFFFFF",
  lightBg: "#F4F7FC",
  paleBlue: "#E3EAF7",
  yellow: "#F5B300",
  orange: "#F07818",
  green: "#2FA84F",
  blue: "#1877C9",
  text: "#22315C",
  muted: "#5A6486",
};
