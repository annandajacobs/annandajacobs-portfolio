/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",

  basePath: "/annandajacobs-portfolio",

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;