/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        BBprimary1: '#0D383E',
        BBpurple: '#BCA6E6',
        BBblue: '#5093E5',
        BBgreen: '#99802F',
        BBmagenta: '#660438',
        BBwhite: '#F6F4E4',
      },
      fontFamily: {
        unbounded: ['Unbounded', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
