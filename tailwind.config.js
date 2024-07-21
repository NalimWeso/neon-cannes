/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "night": "#151515",
        "jungle": "#13241A",
        "forest": "#477411",
        "sunset": "#C24E07"
      },
      fontSize: {
        base: "18px"
      },
      fontFamily: {
        kannada: ["Anek Kannada", "sans-serif"]
      },
      margin: {
        '5.2': '1.3rem',
        '5.7': '1.425rem',
        '6.2': '1.55rem'
      }
    },
  },
  plugins: [],
}