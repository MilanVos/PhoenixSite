import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        phoenix: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        ash: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#131313",
          900: "#0d0d0d",
          950: "#080808",
        },
      },
      backgroundImage: {
        "phoenix-gradient": "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)",
        "phoenix-radial": "radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.15) 0%, transparent 70%)",
      },
      animation: {
        "flame-flicker": "flameFlicker 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "fade-in": "fadeIn 0.8s ease forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "ember-rise": "emberRise 4s ease-in infinite",
      },
      keyframes: {
        flameFlicker: {
          "0%": { opacity: "0.8", transform: "scale(1) translateY(0)" },
          "100%": { opacity: "1", transform: "scale(1.05) translateY(-2px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(249, 115, 22, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(249, 115, 22, 0.6)" },
        },
        emberRise: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0.8" },
          "100%": { transform: "translateY(-100px) scale(0)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
