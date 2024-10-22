// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        blue: {
          DEFAULT: '#328bff',
          50: '#eef7ff',
          100: '#d9ecff',
          200: '#bcdfff',
          300: '#8ecbff',
          400: '#59adff',
          500: '#328bff',
          600: '#1b6bf5',
          700: '#1455e1',
          800: '#1745b6',
          900: '#193d8f',
          950: '#142757',
        },
        orange: {
          DEFAULT: '#ffb833',
          50: '#fffdef',
          100: '#fff7d0',
          200: '#ffee9d',
          300: '#ffe16a',
          400: '#ffd457',
          500: '#ffb833',
          600: '#ff9208',
          700: '#e06802',
          800: '#b54f0a',
          900: '#96400c',
          950: '#562000',
        },
        'neutral-background': '#fbfdff',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Josefin Sans', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
