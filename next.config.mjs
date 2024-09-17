/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: "lh3.googleusercontent.com",
          },
          {
            protocol: 'https',
            hostname: "platform-lookaside.fbsbx.com"
          }
        ],
      },
      env: {
        GOOGLE_PLACES_KEY: process.env.GOOGLE_PLACES_KEY,
      }
};

export default nextConfig;
