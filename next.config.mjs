/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        port: "", // You can leave this empty unless the URL uses a specific port.
        pathname: "/s/files/**", // This allows any image under /s/files/ on cdn.shopify.com
      },
    ],
  },
};

export default nextConfig;
