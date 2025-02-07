/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    const webpack = require("webpack");
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    // Prevent 'window is not defined' errors
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      child_process: false,
    };
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
  // Typescript and ESLint configurations
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Add these to handle SSR/CSR properly
  output: "standalone",
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  // Prevent prerendering issues
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    // Remove console.logs in production
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Handle browser APIs properly
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: "secret",
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: "/static",
  },
};

module.exports = nextConfig;
