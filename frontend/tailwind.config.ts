import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        "cta-background": "rgba(var(--cta-background))",
        "pop-background": "rgba(var(--pop-background))",
        "message-background":"rgba(var(--message-background))",
        "modal-background":"rgba(var( --modal-background))",
        "message-day-background":"rgba(var(--message-day-background))",
        "button-background":"rgba(var(--button-background))",
        "sidebar-open-background":"rgba(var(--sidebar-open-background))",
        border: "rgba(var(--border))",
        card: "rgba(var(--card))",
        "copy-primary": "rgba(var(--copy-primary))",
        "copy-secondary": "rgba(var(--copy-secondary))",
        cta: "rgba(var(--cta))",
        "cta-active": "rgba(var(--cta-active))",
        "cta-text": "rgba(var(--cta-text))",

        grape: "rgba(var(--grape))",
        scrollbarTrack: "rgba(var(--scrollbarTrack))",
        scrollbarThumb: "rgba(var(--scrollbarThumb))",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".scrollbar-hide": {
          "scrollbar-width": "none", // ✅ Works in Firefox
          "&::-webkit-scrollbar": {
            display: "none", // ✅ Corrected for Chrome, Safari, Edge
          },
      },});
    })
  ],
} satisfies Config;
