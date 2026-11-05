import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './supabase-image-loader.ts',
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cbkdglqdlhvasuryxgtq.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;