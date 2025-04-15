import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src 'self' open.spotify.com *.spotify.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
