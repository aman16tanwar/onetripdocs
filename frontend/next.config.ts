import type { NextConfig } from "next";

/**
 * 🎓 MENTOR NOTE: Next.js Configuration for Cloudflare Pages
 * ----------------------------------------------------------
 * Cloudflare Pages uses Edge Runtime, so we configure accordingly:
 * - No "standalone" output (Cloudflare handles this)
 * - Images use unoptimized or Cloudflare's image service
 */
const nextConfig: NextConfig = {
  // Strict mode helps catch bugs during development
  reactStrictMode: true,

  // Image optimization - Cloudflare handles this differently
  images: {
    unoptimized: true, // Or use Cloudflare Images in production
    remotePatterns: [
      // Add external image domains here if needed
      // { protocol: "https", hostname: "example.com" },
    ],
  },

  // Environment variables exposed to the browser
  env: {
    NEXT_PUBLIC_APP_NAME: "OneTripDocs",
  },

  // Disable x-powered-by header for security
  poweredByHeader: false,
};

export default nextConfig;
