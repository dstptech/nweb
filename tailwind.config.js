/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(var(--tw-rotate))' },
          '50%': { transform: 'translate3d(0, -10px, 0) rotate(var(--tw-rotate))' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(8px, -6px, 0) scale(1.03)' },
        },
        shimmer: {
          '0%': { opacity: '0.55' },
          '50%': { opacity: '0.85' },
          '100%': { opacity: '0.55' },
        },
      },
      animation: {
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'float-slower': 'floatSlow 10s ease-in-out infinite',
        drift: 'drift 12s ease-in-out infinite',
        shimmer: 'shimmer 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
