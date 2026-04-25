/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        'surface-1': '#1A1A1A',
        'surface-2': '#2A2A2A',
        'text-muted': '#CCCCCC',
        accent: '#E50914',
      }
    },
  },
  plugins: [],
}
