import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  experimental: {
    cpus: 1, // one build worker instead of several
    staticGenerationMaxConcurrency: 1, // prerender one page at a time
    staticGenerationRetryCount: 3, // retry a page if it fails
  },
};

export default nextConfig;