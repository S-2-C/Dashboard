/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["orlandosydney.com"],
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
