/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Outfit', 'sans-serif'], // Using Outfit for now, could switch to a display font later
      },
      colors: {
        void: "#000000",
        neon: {
          primary: "#ccff00", // Cyberpunk Yellow/Green
          secondary: "#ff003c", // Cyberpunk Red
          accent: "#00f3ff", // Cyan
        }
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shake": "shake 0.5s cubic-bezier(.36,.07,.19,.97) both",
      },
      keyframes: {
        shake: {
          "10%, 90%": { transform: "translate3d(-1px, 0, 0)" },
          "20%, 80%": { transform: "translate3d(2px, 0, 0)" },
          "30%, 50%, 70%": { transform: "translate3d(-4px, 0, 0)" },
          "40%, 60%": { transform: "translate3d(4px, 0, 0)" }
        }
      }
    },
  },
  plugins: [],
}
