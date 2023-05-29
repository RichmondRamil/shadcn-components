
// import daisyUI
import daisyUI from 'daisyui'

/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        altusdigital: '#8248e5'
      },
    },
  },
  daisyui: {
    themes: ['dark']
  },
  plugins: [ daisyUI ],

}

