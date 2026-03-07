import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { ClientLayout } from "@/components/layout/ClientLayout";
import { StructuredData, serializeStructuredData } from "@/components/seo/StructuredData";
import {
  generateHowToReachVideoSchema,
  generateMetadata,
  generateOrganizationSchema,
  generateContactPointSchema,
} from "@/lib/seo";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { generateReviewSchema } from "@/data/reviews";

/**
 * Font configuration using variable font for optimal loading
 * Variable fonts load all weights in a single file, reducing HTTP requests
 * 
 * Strategy 5: Using Inter variable font instead of multiple font files
 * - Single font file instead of 5+ separate files
 * - display: "swap" prevents invisible text during load
 * - preload: true ensures font loads early
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

/**
 * Root metadata for SEO
 * Using centralized SEO configuration with Open Graph, Twitter Cards, and structured data
 */
export const metadata: Metadata = generateMetadata({});
const organizationSchemaJson = serializeStructuredData(generateOrganizationSchema());
const reviewSchemaJson = serializeStructuredData(generateReviewSchema());
const howToReachVideoSchemaJson = serializeStructuredData(generateHowToReachVideoSchema());
const contactPointSchemaJson = serializeStructuredData(generateContactPointSchema());

/**
 * Root layout component (Server Component)
 * Provides the HTML shell and delegates client-side logic to ClientLayout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`theme-light ${inter.variable}`}>
      <head>
        {/* Organization Structured Data */}
        <StructuredData json={organizationSchemaJson} />
        
        {/* Review Structured Data */}
        <StructuredData json={reviewSchemaJson} />

        {/* Contact Point Structured Data */}
        <StructuredData json={contactPointSchemaJson} />

        {/* Video Structured Data (How to Reach) */}
        <StructuredData json={howToReachVideoSchemaJson} />

        {/* Strategy 7: Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* Preload hero video for faster LCP */}
        <link 
          rel="preload" 
          href="/media/_parvatislap_hero.mp4" 
          as="video" 
          type="video/mp4"
        />
        
        {/* Preload critical images */}
        <link 
          rel="preload" 
          href="/images/Parvati's Lap - Luxury Hostel & Villa - logo-updated.png" 
          as="image"
        />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://places.googleapis.com" />
        
        {/* Google Analytics */}
        <GoogleAnalytics />
      </head>
      <body className="font-system bg-primary text-primary transition-all duration-300">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
