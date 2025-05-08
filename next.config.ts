import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["www.google.com"], // Add the hostname here
    },
};

export default nextConfig;
