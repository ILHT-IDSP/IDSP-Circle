/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	darkMode: 'class', // Enable class-based dark mode
	theme: {
		extend: {
			colors: {
				'circles-dark-blue': 'var(--circles-dark-blue)',
				'circles-light-blue': 'var(--circles-light-blue)',
				'circles-dark': 'var(--circles-dark)',
				'circles-light': 'var(--circles-light)',
				'groovy-green': 'var(--groovy-green)',
				'groovy-red': 'var(--groovy-red)',
				// Theme colors for utility classes
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				primary: 'var(--primary)',
				'primary-hover': 'var(--primary-hover)',
				accent: 'var(--accent)',
				// Form input colors
				input: {
					DEFAULT: 'var(--input-background)',
					foreground: 'var(--input-text)',
				},
			},
			borderColor: {
				DEFAULT: 'var(--input-border)',
			},
			ringColor: {
				DEFAULT: 'var(--input-focus-ring)',
			},
		},
	},
	plugins: [],
};

export default config;
