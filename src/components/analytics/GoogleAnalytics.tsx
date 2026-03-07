"use client";

import Script from "next/script";

/**
 * Google Analytics 4 Component
 * Add your GA4 Measurement ID to environment variables
 * NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
 */

interface GoogleAnalyticsProps {
  gaId?: string;
}

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const measurementId = gaId || process.env.NEXT_PUBLIC_GA_ID;

  // Don't render if no GA ID is provided
  if (!measurementId) {
    // console.warn("Google Analytics: No measurement ID provided");
    return null;
  }

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

/**
 * Track custom events
 * Usage: trackEvent('booking_click', { category: 'engagement' })
 */
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, string | number>
) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, parameters);
  }
};

/**
 * Track page views (for client-side navigation)
 */
export const trackPageView = (url: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
};

