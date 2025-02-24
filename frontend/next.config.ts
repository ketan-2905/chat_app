import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "avatar.iran.liara.run",
              // Optionally, you can specify a port and pathname for more granular control
              // port: '',
              // pathname: '/public/**',
            },
          ], // Add the external domain here

          // Increase the timeout to 30 seconds (default is 10 seconds)
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [],
    formats: ["image/webp"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Add this line to increase the timeout
      },
};

export default nextConfig;
