import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // Optionally restrict to specific paths:
        // pathname: '/dbbith3y3/**', // Your Cloudinary cloud name
      },
    ],
  },
  async rewrites() {
    return [
        {
            source: '/metrics',
            destination: '/api/metrics',
        },
    ];
},

};

export default nextConfig;
