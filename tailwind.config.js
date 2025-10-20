/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Schibsted Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        'zwa-bg': '#0b1b13',
        'zwa-ink': '#0f1720',
        'zwa-surface': '#12281d',
        'zwa-primary': '#1abc9c',
        'zwa-primary-ink': '#0e3b33',
        'zwa-accent': '#7bd389',
        'zwa-muted': '#94a3b8',
        'zwa-border': '#1f3b2d',
      },
    },
  },
  plugins: [],
}

