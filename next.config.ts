/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination:
        process.env.NODE_ENV === "development"
          ? "http://localhost:8000/api/:path*"  // Flask in dev
          : "/api/:path*",                      // Flask in production (handled by Vercel)
    },
  ],
};

module.exports = nextConfig;