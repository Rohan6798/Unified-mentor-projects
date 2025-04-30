/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#ffffff', // Ensuring proper definition for Tailwind v3
      },
    },
  },
  plugins: [],
};