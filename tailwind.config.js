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
        // Zero Waste Asia Brand Colors
        'zwa-blue': {
          400: '#53A7D0',
          500: '#2179B3', // Primary Blue
          700: '#14526F',
          800: '#0D3A4E', // Header
        },
        'zwa-gold': {
          400: '#E7C876',
          500: '#D4A73F', // Secondary/CTA
          600: '#B8923A',
        },
        'zwa-green': {
          500: '#489E4A', // Accent Green
        },
        // Semantic colors
        'primary': '#2179B3',
        'primary-light': '#53A7D0',
        'primary-dark': '#14526F',
        'secondary': '#D4A73F',
        'secondary-dark': '#B8923A',
        'accent': '#489E4A',
        'header-bg': '#0D3A4E',
        // Neutrals
        'neutral': {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        // Semantic aliases
        'bg': '#FFFFFF',
        'bg-muted': '#F9FAFB',
        'bg-card': '#FFFFFF',
        'fg': '#111827',
        'fg-muted': '#4B5563',
        'border': '#E5E7EB',
        'border-muted': '#F3F4F6',
      },
      fontSize: {
        'hero': ['clamp(3rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'h1': ['clamp(1.5rem, 3vw, 3rem)', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['clamp(1.25rem, 2.5vw, 2rem)', { lineHeight: '1.3', fontWeight: '700' }],
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
        'sm': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'md': '0 4px 6px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.03)',
        'lg': '0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.05)',
      },
      maxWidth: {
        'content': '1120px',
        'container': '1280px',
        '6xl': '1152px',
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
