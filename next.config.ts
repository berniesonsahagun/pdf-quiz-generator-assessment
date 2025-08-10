import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    if (!isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        "pdfjs-dist/build/pdf.worker.min.mjs":
          "pdfjs-dist/build/pdf.worker.min.mjs",
      });
    }
    return config;
  },
};

export default nextConfig;
