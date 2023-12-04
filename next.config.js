/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "r-xx.bstatic.com",
        protocol: "https",
      },
      {
        hostname: "cf.bstatic.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
