import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        customCaret: 'red',
        gradientColorFrom: '#4a28d3',
        gradientColorTo: '#292f77',
        mainColor: '#e3d8ff',
        c: '#b5b2c2ff',
        d: '#dadff7ff',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [tailwindScrollbarHide],
};
