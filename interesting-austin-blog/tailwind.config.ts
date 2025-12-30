import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{ts,tsx}", "./sanity/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      colors: {
        austin: {
          cream: "#FAF7F2",
          terracotta: "#C84B31",
          navy: "#2C3E50",
          sage: "#6B8E6F",
          orange: "#E67E22",
          teal: "#16A085",
        },
        category: {
          music: "#9B59B6",
          food: "#E67E22",
          art: "#E74C3C",
          comedy: "#F39C12",
          nightlife: "#34495E",
          outdoor: "#27AE60",
          culture: "#8E44AD",
          default: "#7F8C8D",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "lift": "lift 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        lift: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-4px)" },
        },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config;
