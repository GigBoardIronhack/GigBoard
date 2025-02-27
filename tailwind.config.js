const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.css",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(card|ripple).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
};
