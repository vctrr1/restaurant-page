import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "img.freepik.com" }],
    domains: ["u9a6wmr3as.ufs.sh", "png.pngtree.com"],
  },
};

export default nextConfig;
