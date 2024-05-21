/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#002E6D',
        secondary: '#FFD100'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif']
      }
    }
  },
  plugins: []
};
