
import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
// tailwind.config.js

export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /border-(bg-default|bg-success|bg-error)-(100|#E8FAF0|#FEE7EF)/,
    },
    {
      pattern: /bg-(bg-default|bg-success|bg-error)-(100|#E8FAF0|#FEE7EF)/,
    },
  ],
  theme: {
    fontFamily: {
      "CALISTB": ['CALISTB'],
      "WorkSans": ['WorkSans'],
    },
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInUpOutRight: {
          '0%': { opacity: 0, transform: 'translate3d(0,20px,0)' },
          '10%': { opacity: 1, transform: 'translate3d(0,0,0)' },
          '90%': { opacity: 1, transform: 'translate3d(0,0,0)' },
          '100%': { opacity: 0, transform: 'translate3d(50px,0,0)' },
        },
        zoomIn: {
          '0%': { opacity: 0, transform: 'scale3d(.3, .3, .3)' },
          '100%': { opacity: 1 },
        }
      },
      animation: {
        fadeIn: 'fadeIn 1.6s ease-in-out',
        fadeInUp: 'fadeInUp 0.6s ease-in-out',
        fadeInDown: 'fadeInDown 0.6s ease-in-out',
        fadeInRight: 'fadeInRight 0.6s ease-in-out',
        fadeOutRight: 'fadeOutRight 0.6s ease-in-out',
        fadeInUpOutRight: 'fadeInUpOutRight 3s ease-in-out forwards',
        zoomIn: 'zoomIn 1s ease-in-out',
      },
      boxShadow: {
        new: "6px 6px 13px #ebe7e7",
      },
    },

    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'dark-green': '#095143',
      'green': '#37B35C',
      'light-green': 'rgba(223, 246,233,1)',
      'light-green-100': 'rgba(223, 246,233,0.2)',
      'light-green-200': 'rgba(223, 246,233,0.4)',
      'yellow': 'rgba(222,160,30,1)',
      'dark-yellow': 'rgb(184, 130, 15)',
      'gray': '#6b7280',
      'light-gray': 'rgb(145, 143, 143)',
      'light-gray-100': 'rgba(244,244,245,1)',
      'opacity-light-main': 'rgba(144, 224, 247, 0.4)',
      'opacity-main': 'rgba(32,180,222, 0.3)',
      'opacity-main-100': 'rgba(32,180,222, 0.1)',
      'opacity-white-50': 'rgba(255,255,255, 0.5)',
      'opacity-dark': 'rgba(9, 9, 9, 0.6)',
      'border-color': 'rgba(234,231,232,1)',
      'dark-purple': 'rgba(75,47,130,1)',
      'red': 'rgba(243,20,28,1)',
      'main': 'rgba(32,180,222,1)',
      'light-red': 'rgb(241, 91, 96)',
      'light-red-100': 'rgb(247, 209, 210)',
      'dark-main': 'rgba(32,180,222,1)'
    },
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      light: {
        layout: {
          hoverOpacity: 0.8, //  this value is applied as opacity-[value] when the component is hovered
          boxShadow: {
            // shadow-small

            small:
              "0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
            // shadow-medium
            medium:
              "0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
            // shadow-large
            large:
              "0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
          },
        },
        colors: {
          primary: {
            DEFAULT: "rgba(32,180,222,1)",
            foreground: "#000000",
          },
        },
      },
      dark: {
        layout: {
          hoverOpacity: 0.9, //  this value is applied as opacity-[value] when the component is hovered
          boxShadow: {
            // shadow-small
            small:
              "0px 0px 5px 0px rgb(0 0 0 / 0.05), 0px 2px 10px 0px rgb(0 0 0 / 0.2), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
            // shadow-medium
            medium:
              "0px 0px 15px 0px rgb(0 0 0 / 0.06), 0px 2px 30px 0px rgb(0 0 0 / 0.22), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
            // shadow-large
            large:
              "0px 0px 30px 0px rgb(0 0 0 / 0.07), 0px 30px 60px 0px rgb(0 0 0 / 0.26), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
          },
        },
      },
    },
  }),],
}

