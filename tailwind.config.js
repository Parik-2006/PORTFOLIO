/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#FEFDF8',
          100: '#FDFAF0',
          200: '#F9F3DC',
          300: '#F2E9C4',
          400: '#E8D99A',
          500: '#D4C170',
        },
        gold: {
          400: '#D4A843',
          500: '#C9963A',
          600: '#A87C2A',
        },
        ink: {
          900: '#1A1208',
          700: '#3D2E12',
          500: '#6B5B3E',
          300: '#A89880',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
