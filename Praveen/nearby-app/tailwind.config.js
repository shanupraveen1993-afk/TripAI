/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // ── Brand Primary — Red-Orange #FF4500 ──
        "appbar-bg":             "#FF4500",
        "primary":               "#FF4500",
        "on-primary":            "#ffffff",
        "appbar-bg-dim":         "#CC3700",
        "primary-container":     "#d83900",
        "on-primary-container":  "#fffbff",

        // ── Surface scale — warm pinkish tint ──
        "surface":                   "#fff8f6",
        "surface-container-lowest":  "#ffffff",
        "surface-container-low":     "#fff1ed",
        "surface-container":         "#ffe9e4",
        "surface-container-high":    "#ffe2db",
        "surface-container-highest": "#fddbd3",
        "surface-off-white":         "#FAFAFA",
        "background":                "#fff8f6",
        "surface-bright":            "#fff8f6",
        "surface-gray":              "#F2F4F7",

        // Light warm tints (map/hero backgrounds)
        "orange-fixed":    "#fff1ed",
        "orange-container":"#ffe9e4",

        // ── On-surface ──
        "on-surface":         "#291712",
        "on-surface-variant": "#5d4038",
        "inverse-surface":    "#4a2b1d",
        "inverse-on-surface": "#fff0eb",

        // ── Outlines ──
        "outline":         "#926f66",
        "outline-variant": "#e7bdb2",
        "border-subtle":   "#e7bdb2",

        // ── Secondary (neutral gray) ──
        "secondary":               "#5d4038",
        "secondary-container":     "#e4e2e1",
        "on-secondary-container":  "#656464",
        "secondary-fixed":         "#fddbd3",

        // ── Tertiary — Trust Blue ──
        "tertiary":             "#005daa",
        "tertiary-container":   "#0075d5",
        "on-tertiary-container":"#fefcff",

        // ── Error ──
        "error":              "#ba1a1a",
        "error-container":    "#ffdad6",
        "on-error-container": "#93000a",
        "error-red":          "#D92D20",

        // ── Status tokens ──
        "status-success":    "#1B8A4A",
        "status-success-bg": "#DCFCE7",
        "status-error":      "#C62828",
        "status-error-bg":   "#FFDAD6",

        // ── Rating ──
        "rating": "#FFC107",

        // ── Text ──
        "text-primary":   "#1A1A1A",
        "text-secondary": "#757575",

        // ── Semantic — kept for Aadhaar & Trust context ──
        "aadhaar-gold":      "#BF953F",
        "trust-blue":        "#0056D2",
        "primary-fixed":     "#dae2ff",
        "primary-fixed-dim": "#b2c5ff",
        "brand-teal":        "#15767E",
        "brand-teal-dim":    "#0F5A61",
        "teal-container":    "#D1EDEF",
        "teal-fixed":        "#EBF7F8",
        "on-teal":           "#FFFFFF",
        "on-teal-container": "#0A4247",
        "success-teal":      "#00A389",
      },
      spacing: {
        "margin-mobile":  "16px",
        "margin-desktop": "24px",
        "touch-target":   "48px",
        "stack-lg":       "24px",
        "stack-md":       "12px",
        "stack-sm":       "4px",
        "gutter":         "12px",
        "base":           "8px",
      },
      fontFamily: {
        sans: ["System"],
      },
      borderRadius: {
        "card": "16px",
        "chip": "8px",
        "btn":  "12px",
        "full": "9999px",
      },
    },
  },
  plugins: [],
};
