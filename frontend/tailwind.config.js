/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Includes all JavaScript, TypeScript, and JSX/TSX files in src
    "./public/index.html",        // Ensures HTML files in public are scanned
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#63b3ed',  // Lighter shade of blue
          DEFAULT: '#3182ce', // Main blue color
          dark: '#2c5282',   // Darker shade
        },
        secondary: {
          light: '#805ad5',  // Lighter shade of purple
          DEFAULT: '#6b46c1', // Main purple color
          dark: '#553c9a',   // Darker shade
        },
      },
      fontFamily: {
        sans: ['Inter', 'Sans-Serif'], // Use "Inter" font
        heading: ['Roboto', 'Sans-Serif'], // Add another custom font
      },
      spacing: {
        72: '18rem', // Add custom spacing
        84: '21rem',
        96: '24rem',
      },
    },
  },
  plugins: [],
};
