/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transform: ['hover', 'focus'],
      transitionProperty: {
        'height': 'height'
      },
    },
  },
  variants: {
    extend: {
      scale: ['active'],
      rotate: ['active'],
    },
  },
  plugins: [],
};
