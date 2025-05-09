import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["www.google.com"], // Add the hostname here
    },

    webpack: (config) => {
        config.externals = [...config.externals, "child_process"];
        return config;
    },
};

export default nextConfig;
