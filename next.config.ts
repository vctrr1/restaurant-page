import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "img.freepik.com" },
      { hostname: "u9a6wmr3as.ufs.sh" },
      { hostname: "png.pngtree.com" },
    ],
  },
};

export default nextConfig;
