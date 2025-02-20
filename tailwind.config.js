/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        "ibm-plex-mono": ["IBM Plex Mono", "monospace"],
      },
      colors: {
        "black-primary": "#111111",
        "green-primary": "#3AD900",
        "green-secondary": "#00EE57",
        "pink-primary": "#D90070",
        "pink-secondary": "#EE006B",
        "purple-primary": "#DE49B1",
        "white-transparent": "#FFFFFF08",
      },
      backgroundImage: {
        "white-black-gradient-primary": "linear-gradient(#111111BF, #111111BF), linear-gradient(100deg, #FFFFFF80 0% 5%, #FFFFFF03)",
        "white-black-gradient-secondary": "linear-gradient(#111111CC, #111111CC), linear-gradient(20deg, #FFFFFF66, #FFFFFF40)",
        "white-pink-gradient": "linear-gradient(to right, #FFFFFF26, #FFFFFF26), linear-gradient(45deg, #D9007026, #EE006B26)",
        "white-green-gradient": "linear-gradient(to right, #FFFFFF26, #FFFFFF26), linear-gradient(45deg, #3AD90026, #00EE5726)",
        "pink-gradient": "linear-gradient(45deg, #D90070, #EE006B)",
        "green-gradient": "linear-gradient(45deg, #3AD900, #00EE57)",
      },
    },
  },
  plugins: [],
};
