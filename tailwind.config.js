/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green_blue: {
          DEFAULT: "#2669AF",
          100: "#081523",
          200: "#0f2a46",
          300: "#173f69",
          400: "#1f548d",
          500: "#2669af",
          600: "#3d86d4",
          700: "#6da4df",
          800: "#9ec3ea",
          900: "#cee1f4",
        },
        fawn: {
          DEFAULT: "#EBAC77",
          100: "#3d2109",
          200: "#7a4112",
          300: "#b8621b",
          400: "#e18438",
          500: "#ebac77",
          600: "#efbb91",
          700: "#f3ccac",
          800: "#f7ddc8",
          900: "#fbeee3",
        },
        old_lace: {
          DEFAULT: "#F6EFE2",
          100: "#493716",
          200: "#916e2d",
          300: "#caa053",
          400: "#e0c89b",
          500: "#f6efe2",
          600: "#f8f3e9",
          700: "#faf6ef",
          800: "#fcf9f4",
          900: "#fdfcfa",
        },
      },
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
    },
  },
  plugins: [],
};

