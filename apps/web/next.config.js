/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ycwbumsmlikiquplkdln.supabase.co',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
  },
  trailingSlash: true,
  // Enable compression
  compress: true,
  // Set output directory for Vercel monorepo
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: '.',
  },
};

module.exports = nextConfig;
