/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
          fontFamily: {
            sans: ['Lato', 'sans-serif'],
          },
          boxShadow: {
            'shadow-tiny': '0 1px 1px 0 rgba(0, 0, 0, 0.25)',
          },
        },
    },
    plugins: [],
};
