// Layout configs per template variant.
// Coordinates are in canvas pixels (== export pixels).
// NOTE: placeholder values until the real graphics guideline / blank
// template assets are provided — see PLAN.md "Open questions".

export const TEMPLATES = {
  desktop: {
    id: "desktop",
    label: "Desktop Banner",
    width: 1440,
    height: 360,
    photoFrame: {
      x: 960,
      y: 0,
      width: 480,
      height: 360,
      shape: "rect",
    },
    logo: {
      x: 40,
      y: 24,
      width: 200,
      height: 70,
    },
    text: {
      greeting: { x: 40, y: 150, fontSize: 34, text: "Hai! Saya" },
      name: { x: 40, y: 190, fontSize: 40 },
      tagline: {
        x: 40,
        y: 244,
        fontSize: 18,
        text: "Ini adalah kumpulan liburan menarik pilihan saya",
      },
      handle: { x: 40, y: 284, fontSize: 20 },
    },
  },
  mobile: {
    id: "mobile",
    label: "Mobile / Story Card",
    width: 720,
    height: 960,
    photoFrame: {
      x: 0,
      y: 380,
      width: 720,
      height: 580,
      shape: "rect",
    },
    logo: {
      x: 260,
      y: 40,
      width: 200,
      height: 70,
    },
    text: {
      greeting: { x: 40, y: 640, fontSize: 34, text: "Hai! Saya" },
      name: { x: 40, y: 680, fontSize: 40 },
      tagline: {
        x: 40,
        y: 736,
        fontSize: 18,
        text: "Ini adalah kumpulan liburan menarik pilihan saya",
      },
      handle: { x: 40, y: 776, fontSize: 20 },
    },
  },
};

export const COLORS = {
  skyTop: "#1E7FE0",
  skyBottom: "#5FB8F5",
  gold: "#FFC93C",
  white: "#FFFFFF",
};

export const MAX_EXPORT_BYTES = 250 * 1024;
