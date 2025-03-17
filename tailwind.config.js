/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        white: {
          DEFAULT: "#FFFFFF",
          alt: "#F7F7F7",
        },
        pry: "#1F3635",
        stroke: "#DDE3E0",
        accent: {
          1: "#8CC63F",
          2: "#0B9444",
        },
        text: {
          muted: "#B8BBB5",
          neutral: "#7D8277",
          dark: "#31332E",
        },
        green: {
          light: "#E7F5ED",
          alt: "#F2F9F5",
        },
        blue: {
          light: "#E5F3FF",
        },
        red: {
          DEFAULT: "#E24554",
          light: "#E5F3FF",
        },
        purple: {
          light: "#F1ECFF",
        },
        amber: {
          DEFAULT: "#DE9B18",
          light: "#F5F5E7",
        },
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
