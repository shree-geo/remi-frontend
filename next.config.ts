import { config } from "dotenv";
import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER, PHASE_TYPE } from "next/constants";

export default (phase: PHASE_TYPE): NextConfig => {
  const env = config({
    path:
      phase === PHASE_DEVELOPMENT_SERVER
        ? ".env.development"
        : ".env.production",
  }).parsed as {
    NEXT_PUBLIC_API_URL: string;
    JWT_SECRET: string;
  };
  const nextConfig: NextConfig = {
    async rewrites() {
      return [
        {
          source: "/api/v1/:path*/",
          destination: env.NEXT_PUBLIC_API_URL + ":path*/",
        },
      ];
    },
  };
  return nextConfig;
};
