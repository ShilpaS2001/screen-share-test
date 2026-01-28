/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' }, // Added 0% for a smoother loop
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        // This allows you to use 'animate-shimmer' as a standard class
        shimmer: 'shimmer 2s infinite',
      },
    },
  }, // Added the missing comma here
  plugins: [],
}