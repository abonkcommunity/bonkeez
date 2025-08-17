/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bonkee-blue': '#3b82f6',
        'bonkee-yellow': '#eab308',
        'bonkee-red': '#ef4444',
        'bonkee-pink': '#ec4899',
        'bonkee-purple': '#8b5cf6',
        'bonkee-green': '#10b981',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(16, 185, 129, 0.3)',
        'glow-lg': '0 0 40px rgba(16, 185, 129, 0.4)',
      }
    },
  },
  plugins: [],
  // WordPress compatibility
  important: false,
  prefix: '',
  corePlugins: {
    preflight: true,
  }
}
