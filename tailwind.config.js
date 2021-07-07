const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: {
        DEFAULT: '#FFFFFF',
        light: '#f4f9f9'
      },
      gray: {
        DEFAULT: '#aaaaaa',
        light: '#edeef7',
        dark: '#c4c4c4' 
      },
      indigo: colors.indigo,
      red: {
        DEFAULT: '#ff0000',
        light: '#ff5757'
      },
      yellow: colors.amber,
      blue: {
        DEFAULT: '#0000FF',
        light: '#5656f5',
        dark: '#a4ebf3',
        ullight: '#5d5de8'
      },
      purple:{
        DEFAULT: '#57394a',
        light: '#b8b5ff'
      },
      green:{
        DEFAULT: '#00ff00',
        dark: '#00b300'
      },
      orange:{
        DEFAULT: '#f05945',
      },
      brown:{
        DEFAULT: '#b2481b',
        light: '#eab586',
        ullight: '#d65e2b',
      },
      cyan:{
        DEFAULT: '#5eaaa8',
        light: '#a3d2ca'
      },
      pink:{
        DEFAULT: '#FFC0CB',
        light: '#dbb0a0',
        ullight: '#e0c2c0'
      }
      

    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
