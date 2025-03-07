const { heroui } = require('@heroui/theme');
const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  important: true,
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
       sans: ["Be Vietnam Pro", "sans-serif"],
      },
    },
  },
  plugins: [
    heroui(),
    require('tailwind-scrollbar'),
  ],
});
