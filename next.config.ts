import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "img.freepik.com" }],
  },
};

export default nextConfig;
