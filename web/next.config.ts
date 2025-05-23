import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Add support for Sanity Studio
  transpilePackages: ['sanity'],
  
  // Add content security policy for Sanity Studio
  async headers() {
    return [
      {
        source: '/studio/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://cdn.sanity.io; font-src 'self'; connect-src 'self' https://api.sanity.io;"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
