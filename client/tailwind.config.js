/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        stroke: {
          1: '#20C20E',
          2: '#39FF14'
        },
        n:{
          3: "#ADA8C3",
          6: "#252134"
        }
      },
      letterSpacing: {
        tagline: ".15em",
      },
      borderWidth: {
        '1': '1px',
      },
      fontFamily: {
        'poppins': ['Poppins','sans-serif']
      }
    },
  },
  spacing: {
    0.25: "0.0625rem",
    7.5: "1.875rem",
    15: "3.75rem",
  },
  plugins: [
    require("flowbite/plugin"), 
    require('tailwind-scrollbar'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-transparent': {
          color: 'transparent',
        },
        '.text-stroker-1': {
          '-webkit-text-stroke-width': '1px',
        },
        '.text-stroker-2': {
          '-webkit-text-stroke-width': '2px',
        },
        '.text-stroke-black': {
          '-webkit-text-stroke-color': '#000',
        },
        '.text-stroke-custom': {
          '-webkit-text-stroke-color': '#FC2207',
        },
        ".container": {
          "@apply max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-16 xl:max-w-[87.5rem]":
            {},
        },
        ".h1": {
          "@apply font-semibold text-[2.5rem] leading-[3.25rem] md:text-[2.75rem] md:leading-[3.75rem] lg:text-[3.25rem] lg:leading-[4.0625rem] xl:text-[3.75rem] xl:leading-[4.5rem]":
            {},
        },
        ".h2": {
          "@apply text-[1.75rem] leading-[2.5rem] md:text-[2rem] md:leading-[2.5rem] lg:text-[2.5rem] lg:leading-[3.5rem] xl:text-[3rem] xl:leading-tight":
            {},
        },
        ".h3": {
          "@apply text-[2rem] leading-normal md:text-[2.5rem]": {},
        },
        ".h4": {
          "@apply text-[2rem] leading-normal": {},
        },
        ".h5": {
          "@apply text-2xl leading-normal": {},
        },
        ".h6": {
          "@apply font-semibold text-lg leading-8": {},
        },
        ".body-1": {
          "@apply text-[0.875rem] leading-[1.5rem] md:text-[1rem] md:leading-[1.75rem] lg:text-[1.25rem] lg:leading-8":
            {},
        },
        ".body-2": {
          "@apply font-light text-[0.875rem] leading-6 md:text-base": {},
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}