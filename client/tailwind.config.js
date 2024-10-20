/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {},

  },
  darkMode: "class",
  plugins: [
  
    nextui({
      themes: {
        light:{
          colors: {
            primary: {
              DEFAULT: "rgb(51,122,183)",
              foreground: "rgb(255,255,255)",
            },
            focus: "rgb(51,122,183)",
          },
        },
      },
    }),
  ],
}