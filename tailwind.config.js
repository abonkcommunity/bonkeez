
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
        'bonkee-blue': '#4dabf7',
        'bonkee-yellow': '#ffd93d',
        'bonkee-red': '#ff6b6b',
        'bonkee-purple': '#9775fa',
        'bonkee-green': '#6bcf7f',
        'bonkee-pink': '#ff6b9d',
        'bonkee-orange': '#ff8c42',
        'bonkee-magenta': '#f06292',
        'bonkee-lavender': '#ce93d8',
        'bonkee-fuchsia': '#e91e63',
        'bonkee-lime': '#cddc39',
        'bonkee-cyan': '#26c6da',
        'bonkee-rose': '#f48fb1',
        'bonkee-mint': '#a5d6a7',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'rainbow-pulse': 'rainbow-pulse 3s ease infinite',
        'kawaii-bounce': 'kawaii-bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) rotate(1deg)' },
          '50%': { transform: 'translateY(-20px) rotate(0deg)' },
          '75%': { transform: 'translateY(-10px) rotate(-1deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(255, 107, 157, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 217, 61, 0.7), 0 0 40px rgba(107, 207, 127, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(77, 171, 247, 0.6)' },
        },
        'rainbow-pulse': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'kawaii-bounce': {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
