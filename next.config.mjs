/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: "/api/:path*", // Any request to /api/* will be redirected to Strapi
          destination: "http://localhost:1337/api/:path*",
        },
      ];
    },
  };
  
  export default nextConfig;
  