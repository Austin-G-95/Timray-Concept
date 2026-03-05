import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    formats: ['image/webp'],
    deviceSizes: [640, 828, 1200],
    imageSizes: [64, 128, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
    ],
  },
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['react-icons'],
  },
};

export default nextConfig;
