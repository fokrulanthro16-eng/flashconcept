import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        sage: {
          50: "#F5F7F2",
          100: "#E4E8DF", // Primary background
          200: "#DCE2D5", // Secondary panels
          300: "#CBD3C2",
          400: "#A9B49D",
          500: "#7C8870",
        },
        forest: {
          950: "#0A1410",
          900: "#0F1C17",
          800: "#162821", // Main dark forest accent
          700: "#1F382E",
          600: "#2A4C3F",
        },
        lemon: {
          300: "#F0FAAA",
          400: "#E6F77B", // Electric Lemon Accent
          500: "#D2E85A",
        },
        ink: {
          heading: "#162821",
          body: "#4A5568",
          muted: "#718096",
        },
      },
      borderRadius: {
        "28": "28px",
        "36": "36px",
        "44": "44px",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        bento: "0 10px 30px -10px rgba(22, 40, 33, 0.06), 0 4px 12px -4px rgba(22, 40, 33, 0.04)",
        "bento-lg": "0 20px 40px -12px rgba(22, 40, 33, 0.12)",
        "bento-dark": "0 20px 40px -10px rgba(10, 20, 16, 0.35)",
        glow: "0 0 25px rgba(230, 247, 123, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
