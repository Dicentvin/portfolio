/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: { DEFAULT: '#7bd850', 400: '#7bd850', 500: '#6bc940' },
      },
      keyframes: {
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
      },
      animation: {
        blink: 'blink 0.75s step-end infinite',
      },
    },
  },
  plugins: [],
}
