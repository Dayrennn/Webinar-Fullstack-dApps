/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // fallback supaya Next.js build di Vercel aman
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
      crypto: false,
      stream: false,
    };
    return config;
  },
};

module.exports = nextConfig;
