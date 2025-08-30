
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        'bonkee-blue': '#4A90E2',
        'bonkee-yellow': '#F5D800',
        'bonkee-red': '#E74C3C',
        'bonkee-purple': '#9B59B6',
        'bonkee-green': '#2ECC71',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(139, 69, 19, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(139, 69, 19, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
