import webpack from "webpack";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Add these configurations to ignore TypeScript and ESLint errors during build
  typescript: {
    // This will ignore all TypeScript errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // This will ignore all ESLint errors during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
