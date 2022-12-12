/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#CDFAE4",
        secondary: "#37CABF",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded"],
  },
};
