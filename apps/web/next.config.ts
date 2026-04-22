import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  transpilePackages: ["@innate/ui", "@innate/utils"],
  reactCompiler: true,
};

export default nextConfig;
