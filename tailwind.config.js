/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#e74c3c',
        "my-gray": {
          900: '#212121',
          800: '#212121',
          700: '#212121',
          600: '#212121',
          500: '#212121',
          400: '#212121',
          300: '#212121',
          200: '#212121',
          100: '#212121',
        }
      }
    },
  },
  plugins: [],
}

