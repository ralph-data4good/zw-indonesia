/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        // Eco Design System - Primary Palette
        'eco-soft': {
          100: '#E8F0E8',
          200: '#B8D4B8',
          300: '#A8C5A3',
          400: '#9BB89B',
        },
        'eco-vibrant': {
          300: '#5A8C69',
          500: '#4A7C59',
          700: '#3A6C49',
        },
        'eco-accent': {
          300: '#F5C563',
          500: '#E8B84D',
          700: '#D4A440',
        },
        // Neutrals
        'eco-neutral': {
          50: '#FEFFFE',
          100: '#F8F9F8',
          200: '#F5F7F5',
          300: '#E0E5E0',
          400: '#D5DAD5',
          500: '#C8CEC8',
          600: '#3F4F3F',
          700: '#2D3E2D',
          900: '#1A1A1A',
        },
        // Dark
        'eco-dark': {
          500: '#34495E',
          600: '#2C3E50',
          900: '#1C2833',
        },
        // Alias colors for easy usage
        'zwa-primary': '#4A7C59',
        'zwa-primary-ink': '#2C3E50',
        'zwa-accent': '#E8B84D',
        'zwa-ink': '#1A1A1A',
        'zwa-muted': '#3F4F3F',
        'zwa-border': '#E0E5E0',
        'zwa-surface': '#5A8C69',
        'zwa-bg': '#FEFFFE',
      },
      fontSize: {
        'hero': ['clamp(3rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'h1': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.3', fontWeight: '600' }],
      },
      spacing: {
        'section': 'clamp(4rem, 8vw, 8rem)',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        'pill': '999px',
      },
      boxShadow: {
        'eco-sm': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'eco-md': '0 4px 6px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.03)',
        'eco-lg': '0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.05)',
      },
      maxWidth: {
        'content': '1120px',
        'container': '1280px',
      },
      transitionDuration: {
        'DEFAULT': '200ms',
      },
      transitionTimingFunction: {
        'DEFAULT': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
