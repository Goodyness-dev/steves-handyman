/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        onyx: {
          950: '#030303',
          900: '#080808',
          850: '#0d0d0d',
          800: '#141414',
          700: '#1f1f1f',
          600: '#2e2e2e',
        },
        steel: {
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
        },
        craft: {
          amber: '#f59e0b',
          copper: '#ea580c',
          gold: '#eab308',
        },
        wood: {
          950: '#140c07',
          900: '#23150d',
          850: '#2e1c12',
          800: '#3d2616', // brand espresso brown (from HOME button in image)
          700: '#5c3826', // rich chestnut
          600: '#7a4522', // saddle wood
          500: '#965529', // timber brown
          400: '#b87333', // copper/bronze
          300: '#d49b6a', // light wood
          200: '#e8decb', // warm wood border
          100: '#f5eee6', // almond cream
          50:  '#faf6f0', // soft linen parchment
        }
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 40s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
