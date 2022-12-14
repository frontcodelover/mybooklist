/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["firebasestorage.googleapis.com", "books.google.com"],
  },
};

module.exports = nextConfig;
