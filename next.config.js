// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
      domains: [
          'tadesse-food-ordering.s3.amazonaws.com',
          'lh3.googleusercontent.com'
      ],
  },
};

module.exports = nextConfig;

  