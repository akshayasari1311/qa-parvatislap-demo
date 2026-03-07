import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * React Compiler for automatic optimizations
   */
  reactCompiler: true,

  /**
   * Turbopack configuration (Next.js 16+ default bundler)
   * Empty config to acknowledge we want Turbopack with defaults
   */
  turbopack: {},

  /**
   * Experimental features for better bundling
   */
  experimental: {
    /**
     * Optimize package imports - reduces bundle size by only importing
     * what's actually used from these packages
     */
    optimizePackageImports: [
      "@/components",
      "@/hooks",
      "@/lib",
    ],
  },

  /**
   * Image optimization configuration
   */
  images: {
    // Enable modern image formats
    formats: ["image/avif", "image/webp"],
    // Allow specific quality values used by <Image quality={...} />
    // (Prevents "next-image-unconfigured-qualities" warnings)
    qualities: [70, 75, 100],
    // Use Next.js Image Optimization on Vercel (server runtime enabled).
    // Reduce image sizes for faster loading
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    // Disable static imports for more flexible image handling
    disableStaticImages: false,
  },

  /**
   * Production optimizations
   */
  poweredByHeader: false, // Remove X-Powered-By header
  compress: true, // Enable gzip compression
  async redirects() {
    return [
      {
        source: "/villa",
        destination: "/chalal/pulga/chojh/kheerganga/villa",
        permanent: true,
      },
      {
        source: "/cafe",
        destination: "/kasol/katagla/chojh/ghrahan/israeli/indian/food/pulga/cafe",
        permanent: true,
      },
      {
        source: "/hostel",
        destination: "/kasol/chalal/tosh/katagla/kheerganga/hostel",
        permanent: true,
      },
      {
        source: "/treks",
        destination: "/kasol/kheerganga/sarpass/tosh/kutla/pulga/kalga/treks",
        permanent: true,
      },
      {
        source: "/treks/:slug",
        destination: "/kasol/kheerganga/sarpass/tosh/kutla/pulga/kalga/treks/:slug",
        permanent: true,
      },
    ];
  },
  
  // NOTE: Do not use `output: "export"` on Vercel because the app uses Route Handlers
  // (e.g. `/api/reviews`) which require the server runtime.
};

export default nextConfig;
