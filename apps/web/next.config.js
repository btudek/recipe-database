/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'ycwbumsmlikiquplkdln.supabase.co'],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
