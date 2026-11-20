import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FFFFFF",
        alabaster: "#FAF9F6",
        ink: "#1A1A1A",
        muted: "#63615C",
        hairline: "#E6E4DF",
        accent: {
          DEFAULT: "#9A5B3A",
          hover: "#824A2D",
          subtle: "#F5EFEA",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        quiet: "0 2px 12px -4px rgba(26, 26, 26, 0.04)",
        quietHover: "0 10px 26px -8px rgba(26, 26, 26, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
