import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a1aff",
        "primary-dark": "#1212cc",
        "primary-light": "#4d4dff",
        danger: "#e63329",
        "danger-dark": "#c0271e",
        neutral: {
          white: "#ffffff",
          light: "#f5f5f5",
          dark: "#1a1a2e",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Playfair Display", "serif"],
      },
    },
  },
};

export default config;
