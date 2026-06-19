/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'ui-sans-serif'],
      },
      colors: {
        'dark-deep': '#0B1120',
        'dark-primary': '#111827',
        'dark-secondary': '#1E293B',
        'accent-emerald': '#10B981',
        'accent-blue': '#3B82F6',
        'accent-orange': '#F59E0B',
        'accent-red': '#EF4444',
      },
      borderRadius: {
        'xl': '1rem',
      },
      boxShadow: {
        'subtle': '0 6px 18px rgba(2, 6, 23, 0.6)',
      },
    },
  },
  plugins: [],
}
