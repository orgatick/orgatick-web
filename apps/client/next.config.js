/** @type {import('next').NextConfig} */

const nextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ["192.168.1.60", "10.224.52.173"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "assets.orgatick.in", pathname: "/**" }],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "microphone=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
