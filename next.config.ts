import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      // Add specific 404 redirects here once identified in GSC
      // {
      //   source: '/old-url',
      //   destination: '/new-url',
      //   permanent: true,
      // },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
