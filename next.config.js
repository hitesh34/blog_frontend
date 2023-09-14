/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      // ... other rewrites
      {
        source: '/blog/:slug/comments',
        destination: '/CommentsPage',
      },
    ];
  },
};

module.exports = nextConfig;
