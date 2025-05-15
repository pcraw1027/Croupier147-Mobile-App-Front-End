/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      boxShadow: {
        "stats-card": "0 15px 50px 0px rgba(205, 213, 219, 0.50)",
      },
      colors: {
        white: {
          DEFAULT: "#FFFFFF",
          alt: "#F7F7F7",
        },
        black50: "#00000050",
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
          dark: "#1e3635",
          alt: "#F2F9F5",
        },
        blue: {
          light: "#E5F3FF",
        },
        red: {
          DEFAULT: "#E24554",
          light: "#F5EBE7",
        },
        purple: {
          light: "#F1ECFF",
        },
        amber: {
          DEFAULT: "#DE9B18",
          light: "#F5F5E7",
        },
      },
    },
  },
  plugins: [],
};
