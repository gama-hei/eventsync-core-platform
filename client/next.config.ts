import type { NextConfig } from "next";

const nextConfig: NextConfig = {


    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com', 
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com', 
      },
       {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },
};

export default nextConfig;
