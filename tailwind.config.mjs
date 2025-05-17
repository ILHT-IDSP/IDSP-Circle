/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class', // Enable class-based dark mode
	theme: {
		extend: {
			colors: {
				'circles-dark-blue': '#0044CC',
				'circles-light-blue': '#689bff',
				'circles-dark': '#0e0e0e',
				'circles-light': '#f8f4ea',
				'groovy-green': '#14aa3e',
				'groovy-red': '#e8083e',
			},
			borderColor: {
				DEFAULT: 'var(--input-border)',
			},
			ringColor: {
				DEFAULT: 'var(--input-focus-ring)',
			},
			keyframes: {
				'slide-up': {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' },
				},
				'fadeIn': {
					from: { opacity: '0', transform: 'translateY(10px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
			},
			animation: {
				'slide-up': 'slide-up 0.3s ease-out',
				'fadeIn': 'fadeIn 0.3s ease-out',
			},
		},
	},
	plugins: [],
};

export default config;
