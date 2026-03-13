/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'coral-400': '#E76F6F',
        'coral-500': '#C95555',
        'coral-100': '#FAE0E0',
        'coral-300': '#F0A0A0',
        'teal': '#4F8F84',
        'teal-light': '#7ABDB4',
        'teal-dark': '#3A6B62',
        'enterprise-mid': '#1E2330',
        'enterprise-grey': '#6B7280',
        'enterprise-dark': '#0F1117',
      },
      fontFamily: {
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
        'dm': ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        'enterprise': '0 4px 24px rgba(0,0,0,0.08)',
        'coral-md': '0 8px 24px rgba(231,111,111,0.3)',
        'coral-lg': '0 16px 40px rgba(231,111,111,0.35)',
        'teal-md': '0 8px 24px rgba(79,143,132,0.3)',
      },
    },
  },
  plugins: [],
}