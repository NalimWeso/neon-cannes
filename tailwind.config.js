/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
