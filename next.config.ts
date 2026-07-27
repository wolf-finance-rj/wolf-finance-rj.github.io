import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/wolf-finance",
  images: { unoptimized: true },
};

export default nextConfig;
