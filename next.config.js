/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['ipfs.io', 'gateway.pinata.cloud', 'arweave.net', 'ui-avatars.com'],
    unoptimized: true,
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    SIDESHIFT_API_KEY: process.env.SIDESHIFT_API_KEY,
    SIDESHIFT_API_SECRET: process.env.SIDESHIFT_API_SECRET,
    WALLET_CONNECT_PROJECT_ID: process.env.WALLET_CONNECT_PROJECT_ID,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@react-native-async-storage/async-storage': false,
      'pino-pretty': false,
    };
    return config;
  },
}

module.exports = nextConfig
