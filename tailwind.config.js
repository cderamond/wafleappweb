/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#07140e',
        surface: '#0d2218',
        'surface-light': '#143224',
        primary: {
          DEFAULT: '#22c55e',
          hover: '#16a34a',
          light: '#4ade80',
          dark: '#15803d',
        },
        muted: '#94a3b8',
        border: 'rgba(255, 255, 255, 0.08)',
        'border-light': 'rgba(255, 255, 255, 0.15)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 25px -5px rgba(34, 197, 94, 0.3)',
        card: '0 8px 30px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
