module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}', './api/**/*.{ts,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        bgDeep: '#0B1120',
        bgPrimary: '#111827',
        bgSecondary: '#1E293B',
        emerald: '#10B981',
        blueAccent: '#3B82F6',
        orangeAccent: '#F59E0B',
        redAccent: '#EF4444',
      },
      borderRadius: {
        xl: '1rem',
      },
      boxShadow: {
        subtle: '0 6px 18px rgba(2,6,23,0.6)',
      },
    },
  },
  plugins: [],
}
