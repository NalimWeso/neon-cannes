/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#151515",
        "white": "#FFFDF6"
      },
      fontSize: {
        base: "18px"
      },
      fontFamily: {
        kannada: ["Anek Kannada", "sans-serif"]
      }
    },
  },
  plugins: [],
}
