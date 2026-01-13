import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*/",
        destination: "http://45.117.153.120/api/v1/:path*/",
      },
    ];
  },
};

export default nextConfig;
