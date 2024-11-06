/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "montserrat": ["Montserrat", "sans-serif"],
        "ibm-plex-mono": ["IBM Plex Mono", "monospace"],
      },
      colors: {
        "black-primary": "#111111",
        "green-primary": "#3AD900",
        "green-secondary": "#00EE57",
        "pink-primary": "#D90070",
        "pink-secondary": "#EE006B",
        "purple-primary": "#DE49B1",
      },
    },
  },
  plugins: [],
};
