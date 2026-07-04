import type { Config } from "tailwindcss";

// Cotton Pearls — "Cyber-Ethnic" brand token system
// Every color/type decision on the site should trace back to these tokens.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          DEFAULT: "#0F1B29", // primary text / borders / dark surfaces
          soft: "#1C2C3E",    // hover state of indigo surfaces
        },
        mint: {
          DEFAULT: "#A3FFD6", // electric mint — CTAs, badges, high-impact only
          dim: "#7FE6BA",     // pressed / hover state for mint CTAs
        },
        pearl: {
          DEFAULT: "#EAEAEA", // section backgrounds
          white: "#FAFAF9",   // near-white base
        },
      },
      fontFamily: {
        // Display: bold, expressive — used with restraint (headlines, drop badges)
        display: ["var(--font-display)", "sans-serif"],
        // Body: scannable, neutral workhorse
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        none: "0px", // brand uses structural grid lines, not soft corners
        sm: "2px",
      },
      letterSpacing: {
        tightest: "-0.03em",
        widest: "0.2em",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        "fade-up": "fade-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
