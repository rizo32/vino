/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "sans-serif"],
      },
      boxShadow: {
        "shadow-tiny": "0 1px 1px 0 rgba(0, 0, 0, 0.25)",
        "shadow-tiny-inset": "inset 0 1px 1px 0 rgba(0, 0, 0, 0.25)",
      },
      margin: {
        "vh-2": "2vh",
        "vh-3": "3vh",
        "vh-4": "4vh",
        "vh-5": "5vh",
        "vh-10": "10vh",
        "vh-15": "15vh",
        "vh-20": "20vh",
      },
      colors: {
        // couleur action base (bg-red-900): hsl(0, 62.8, 30.6)
        "red-hover": "hsl(0, 62.8%, 25%)",
        // couleur fond base (bg-red-50): hsl(0, 85.7, 97.3)
        "rose-hover": "hsl(0, 85.7%, 95%)",
      },
    },
  },
  plugins: [],
};
