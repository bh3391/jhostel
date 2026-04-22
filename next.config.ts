import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Daftarkan Cloudinary juga
        pathname: '**',
      },
      // Jika Anda punya domain lain, tambahkan di sini
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
