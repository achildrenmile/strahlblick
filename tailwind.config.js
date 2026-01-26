/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        safety: {
          compliant: '#22C55E',
          warning: '#EAB308',
          danger: '#EF4444',
          occupational: '#3B82F6',
          public: '#A855F7',
        }
      }
    },
  },
  plugins: [],
}
