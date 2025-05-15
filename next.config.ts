import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['www.google.com', 'scontent.fyvr1-1.fna.fbcdn.net', 'images.unsplash.com', 'a.espncdn.com', 'encrypted-tbn0.gstatic.com', 'bigboyburgers.bcitwebdeveloper.ca', 'randomuser.me', 'res.cloudinary.com'], // Add the hostname here
	},

	typescript: {
		// Skip type checking during build for faster builds
		ignoreBuildErrors: true,
	},

	eslint: {
		// Skip ESLint during build for faster builds
		ignoreDuringBuilds: true,
	},

	webpack: config => {
		config.externals = [...config.externals, 'child_process'];
		return config;
	},
};

export default nextConfig;
