/** @type {import('next').NextConfig} */
import { BASE_PATH } from "./lib/basePath.mjs";

const nextConfig = {
  output: "export",
  basePath: BASE_PATH,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
