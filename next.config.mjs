/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jhxtohkjwg0z7s7m.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
