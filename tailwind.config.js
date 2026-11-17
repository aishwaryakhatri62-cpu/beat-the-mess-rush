/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0c1a2d',
          800: '#142D4E',
          700: '#1c3b66',
          600: '#254d82',
          100: '#e6edf7',
          50: '#f0f5fc',
        },
        brand: {
          navy: '#142D4E',
          blue: '#2563EB',
          orange: '#F97316',
          green: '#16A34A',
          amber: '#D97706',
          red: '#DC2626',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
