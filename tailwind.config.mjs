/** @type {import('tailwindcss').Config} */
const config = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class", // Enable class-based dark mode
    theme: {
        extend: {
            colors: {
                "circles-dark-blue": "#0044CC",
                "circles-light-blue": "#689bff",
                "circles-dark": "#0e0e0e",
                "circles-light": "#f8f4ea",
                "groovy-green": "#14aa3e",
                "groovy-red": "#e8083e",
            },
            borderColor: {
                DEFAULT: "var(--input-border)",
            },
            ringColor: {
                DEFAULT: "var(--input-focus-ring)",
            },
        },
    },
    plugins: [],
};

export default config;
