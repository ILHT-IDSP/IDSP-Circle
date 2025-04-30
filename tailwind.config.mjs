// filepath: c:\Users\BCIT\IDSP\IDSP-Circle\tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				'circles-dark-blue': '#0044CC',
				'circles-light-blue': '#689BFF',
				'circles-dark': '#0E0E0E',
				'circles-light': '#F8F4EA',
				'groovy-green': '#14AA3E',
				'groovy-red' : '#E8083E'
			},
		},
	},
	plugins: [],
};

export default config;
