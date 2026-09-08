/** @type {import('next').NextConfig} */

const nextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ["192.168.1.60", "10.224.52.173", "dev.orgatick.site"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "assets.orgatick.in", pathname: "/**" }],
  },
};

export default nextConfig;
