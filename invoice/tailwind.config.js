/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['montserrat', 'sans-serif'],
        worksans: ['"work sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
