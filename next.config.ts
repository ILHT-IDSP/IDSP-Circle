import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['www.google.com', 'images.unsplash.com', 'a.espncdn.com', 'encrypted-tbn0.gstatic.com', 'bigboyburgers.bcitwebdeveloper.ca', 'randomuser.me' ], // Add the hostname here
	},

	webpack: config => {
		config.externals = [...config.externals, 'child_process'];
		return config;
	},
};

export default nextConfig;
