/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        "1": "1px"
      },
      colors: {
        "dark": "#252525",
        "dark-mid": "#6e6e6e",
        "light": "#dfdfdf",
        "light-mid": "b9b9b9",
      },
    },
  },
  plugins: [],
}