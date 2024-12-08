/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      container: {
        center: true,
        padding: '15px',
        screens: {
          sm: '540px',
          md: '720px',
          lg: '960px',
          xl: '1140px',
        },
      },
      fontFamily: {
        roboto: ['Roboto', 'Arial', 'sans-serif'],
      },
      colors: {
        'footer-main': '#FFEAE3',
        'footer-second': '#FF9EA2',
      },
    },
  },

  plugins: [],
};
