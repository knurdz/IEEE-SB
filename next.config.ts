import type { NextConfig } from "next";

const BASE_PATH = '/IEEE-SB-Static';

const nextConfig: NextConfig = {
  output: 'export',
  // Required for GitHub Pages: repo is served at knurdz.github.io/IEEE-SB
  basePath: BASE_PATH,
  // Expose basePath to client bundles (used by the custom image loader)
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    formats: ['image/avif', 'image/webp'],
  },
  // Optimization settings
  compress: true,
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false, // Reduce build size
};

export default nextConfig;
