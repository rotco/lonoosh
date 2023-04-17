/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.superherodb.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
