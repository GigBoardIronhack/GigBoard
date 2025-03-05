const { heroui } = require('@heroui/theme');
const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  important: true,
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Busca clases de Tailwind en toda la carpeta `src`
    "./node_modules/@heroui/theme/dist/components/**/*.js", // Incluye todos los componentes de HeroUI
  ],
  theme: {
    extend: {},
  },
  plugins: [
    heroui(),
    require('tailwind-scrollbar'), // Agregamos el plugin del scrollbar
  ],
});
