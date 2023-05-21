/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
                'xs-h': {'raw': '(max-height: 699px)'}
            },
            fontFamily: {
                sans: ["Lato", "sans-serif"],
            },
            boxShadow: {
                "shadow-tiny": "0 1px 1px 0 rgba(0, 0, 0, 0.25)",
                "shadow-md": "0 2px 1px 0 rgba(0, 0, 0, 0.25)",
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
                "18": "4.5rem",
                "22": "5.5rem",
                "23": "5.75rem",
                "26": "6.5rem",
            },
            height: {
                "18": "4.5rem",
                "34": "8.5rem",
                "38": "9.5rem",
                "76": "19rem",
            },
            padding: {
                "18": "4.5rem",
                "34": "8.5rem",
            },
            colors: {
                // couleur action base (bg-red-900): hsl(0, 62.8, 30.6)
                "red-hover": "hsl(0, 62.8%, 35%)",
                // "red-hover": "hsl(0, 62.8%, 25%)",
                // couleur fond base (bg-red-50): hsl(0, 85.7, 97.3)
                "rose-hover": "hsl(0, 100%, 100%)",
                // "rose-hover": "hsl(0, 85.7%, 95%)",
            },
            blur: {
                "xs": "3px"
            }
        },
    },
    corePlugins: {
        // Hide scrollbar track
        scrollbar: ({ addBase }) => {
            addBase({
                "::-webkit-scrollbar-track": { display: "none" },
            });
        },
    },
};
