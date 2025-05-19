import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.google.com',
			},
			{
				protocol: 'https',
				hostname: 'scontent.fyvr1-1.fna.fbcdn.net',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'a.espncdn.com',
			},
			{
				protocol: 'https',
				hostname: 'encrypted-tbn0.gstatic.com',
			},
			{
				protocol: 'https',
				hostname: 'bigboyburgers.bcitwebdeveloper.ca',
			},
			{
				protocol: 'https',
				hostname: 'randomuser.me',
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
		],
	},

	typescript: {
		ignoreBuildErrors: true,
	},

	eslint: {
		ignoreDuringBuilds: true,
	},

	webpack: config => {
		config.externals = [...config.externals, 'child_process'];
		return config;
	},
};

export default nextConfig;
