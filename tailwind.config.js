/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#f8f9fa',
          text: '#212529',
        },
        dark: {
          background: '#343a40',
          text: '#f8f9fa',
        },
        neon: {
          background: '#000000',
          text: '#39ff14',
        },
      },
    },
  },
  plugins: [],
};
