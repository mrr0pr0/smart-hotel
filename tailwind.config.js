/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#6b82f6',
          500: '#1e40af',
          600: '#17327f',
          700: '#0f274f',
          800: '#0b1830',
          900: '#060c18',
        },
        accent: {
          50: '#fff1f1',
          100: '#ffe3e3',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#991b1b',
          600: '#7f1d1d',
          700: '#641616',
          800: '#4a0f0f',
          900: '#2e0808',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}