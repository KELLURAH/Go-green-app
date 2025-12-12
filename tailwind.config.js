/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#C8A45E",   // Gold
          hover: "#B08D4B",
          light: "#E6D5AA",
        },
        secondary: {
          DEFAULT: "#2E3340",   // Dark Navy
          hover: "#1E212B",
        },
        accent: {
          green: "#4CAF50",
          red: "#F44336",
          blue: "#2196F3",
          yellow: "#FFEB3B",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F9F5EB",
        },
        background: "#F5F0E1",  // Warm Beige
        border: "#E0E0E0",
      },
    },
  },
  plugins: [],
};
