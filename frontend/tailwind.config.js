/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        monomaniac: ['Monomaniac One', 'sans-serif'],
      },
      colors: {
        blue: '#001589',
        red: '#E40246',
        teal: '#40F6D5',
        lightBlue: '#0084CA',
      },
    },
  },
  plugins: [],
};
