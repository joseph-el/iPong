/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./srcs/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '128': '37rem', // 2xl
        '118': '34.5rem', // xl
        '108': '32rem', // lg
        '98': '29.5rem', // md
        '88': '27rem', // sm
      },      
      width: {
        '128': '32rem', // 2xl
        '118': '29.5rem', // xl
        '108': '27rem', // lg
        '98': '26.5rem', // md (added 2rem)
        '88': '24rem', // sm (added 2rem)
      },      
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}

