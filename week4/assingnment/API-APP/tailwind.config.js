/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ec4899",   
          hover: "#db2777",    
          active: "#be185d",    
        },
      },
    },
  },
  plugins: [],
};
