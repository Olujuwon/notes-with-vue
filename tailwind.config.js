/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    fontFamily: {
      'poppins': ['Poppins', 'system-ui', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}

