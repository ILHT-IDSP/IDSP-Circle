/** @type {import('tailwindcss').Config} */
const config = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "circles-dark-blue": "#0044cc",
                "circles-light-blue": "#689bff",
                "circles-dark": "#0e0e0e",
                "circles-light": "#f8f4ea",
                "groovy-green": "#14aa3e",
                "groovy-red": "#e8083e",
                "groovy-gray": "#737373",
            },
            borderRadius: {
                "full": "9999px",
                "lg": "1.25rem",
            },
            fontSize: {
                "sm": "0.875rem",
                "base": "1rem",
                "lg": "1.125rem",
                "xl": "1.25rem",
                "2xl": "1.5rem",
                "3xl": "1.875rem",
            },
        },
    },
    plugins: [],
};

export default config;
