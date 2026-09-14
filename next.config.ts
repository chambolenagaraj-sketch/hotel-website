import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  trailingSlash: true,
  // basePath: '/your-repo-name', // uncomment if not using a custom domain or user page
};

export default nextConfig;
