/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#1a2332', light: '#2a3a4e' },
        cream: { DEFAULT: '#f5f0e8', dark: '#e8e0d0' },
        amber: { DEFAULT: '#c8933e', light: '#d4a854' },
        slate: '#64748b',
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
