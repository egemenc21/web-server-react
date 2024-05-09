/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      "primary": "#CDE8E5",
      "secondary": "#EEF7FF",
      "tertiary":"#7AB2B2",
      "quaternary":"#4D869C"
    },
    extend: {},
  },
  plugins: [],
}