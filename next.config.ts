import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // O three.js publica ESM moderno que o bundler precisa transpilar.
  transpilePackages: ["three"],
};

export default nextConfig;
