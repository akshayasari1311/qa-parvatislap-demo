import { Metadata } from "next";
import { getAggregateRating } from "@/data/reviews";

/**
 * SEO Configuration & Utilities
 * Centralized SEO settings for the application
 */

// Base site configuration
export const siteConfig = {
  name: "Parvati's Lap",
  title: "Parvati's Lap - Luxury Himalayan Hostel & Villa in Kasol",
  description:
    "Experience the best hostel and villa stay in Kasol, Himachal Pradesh. Located in Lapas Village with stunning mountain views, our property offers luxury accommodation, cafe, and access to trekking trails.",
  url: "https://parvatislap.com", // Update with actual domain
  ogImage: "/images/og-image.jpg", // Create this image
  keywords: [
    "Kasol hostel",
    "Kasol villa",
    "Parvati Valley",
    "Himachal Pradesh",
    "mountain resort",
    "Kheerganga trek",
    "Lapas Village",
    "Kasol accommodation",
    "Himalayan hostel",
    "luxury villa Kasol",
    "hostel in Parvati Valley",
    "Kasol hotels",
    "backpacker hostel Kasol",
    "Kasol stays",
  ],
  links: {
    booking: "https://live.ipms247.com/booking/book-rooms-parvatislaphostelcamps",
    whatsapp: "https://wa.me/919082229363",
    email: "mailto:parvatislap@gmail.com",
  },
  contact: {
    phone: "+91 908 222 9363",
    email: "parvatislap@gmail.com",
    address: "Lapas Village, Kasol, Parvati Valley, Himachal Pradesh, India",
  },
  geo: {
    latitude: 32.02959,
    longitude: 77.367433,
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61551650361876",
    instagram: "https://instagram.com/parvatis_lap",
    youtube: "https://youtube.com/shorts/F8MC3NGpUw0?si=y-NsCzuN0uHCIWoZ",
    twitter: "",
  },
  videos: {
    howToReach: {
      youtubeId: "F8MC3NGpUw0",
      url: "https://youtube.com/shorts/F8MC3NGpUw0",
      title: "How to Reach Parvati's Lap (Lapas Village, Kasol)",
      description:
        "Quick guide showing how to reach Parvati's Lap in Lapas Village near Kasol, Parvati Valley (Himachal Pradesh).",
    },
  },
  hours: {
    openingHours: "Mo-Su 00:00-24:00", // 24/7 availability
  },
};

function absoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Generate metadata for a page
 */
export function generateMetadata({
  title,
  description,
  keywords,
  image,
  path = "",
  type = "website",
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
  type?: "website" | "article";
}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  const pageImage = image || siteConfig.ogImage;
  const pageUrl = `${siteConfig.url}${path}`;
  const allKeywords = [...siteConfig.keywords, ...(keywords || [])];

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: allKeywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: pageUrl,
    },
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon.ico', sizes: '48x48' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        {
          rel: 'icon',
          url: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          rel: 'icon',
          url: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    manifest: '/site.webmanifest',
    openGraph: {
      type,
      locale: "en_US",
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: "@parvatislap", // Update with actual Twitter handle
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      // Add verification codes when available
      google: "", // Google Search Console
      yandex: "", // Yandex Webmaster
      // bing: "", // Bing Webmaster
    },
  };
}

/**
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationSchema() {
  const aggregateRating = getAggregateRating();
  const sameAs = [
    siteConfig.social.facebook,
    siteConfig.social.instagram,
    siteConfig.social.youtube,
    siteConfig.social.twitter,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: "en-IN",
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: absoluteUrl("/images/Parvati's Lap - Luxury Hostel & Villa - logo-updated.png"),
        sameAs,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: siteConfig.contact.phone,
            email: siteConfig.contact.email,
            availableLanguage: ["en", "hi"],
            areaServed: "IN",
          },
        ],
      },
      {
        "@type": ["LodgingBusiness", "Hostel"],
        "@id": `${siteConfig.url}/#lodging`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        mainEntityOfPage: siteConfig.url,
        image: absoluteUrl(siteConfig.ogImage),
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Lapas Village, Manikaran Rd",
          addressLocality: "Kasol",
          addressRegion: "Himachal Pradesh",
          postalCode: "175105",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude,
        },
        hasMap: `https://www.google.com/maps?q=${siteConfig.geo.latitude},${siteConfig.geo.longitude}`,
        areaServed: [
          { "@type": "Place", name: "Kasol" },
          { "@type": "Place", name: "Parvati Valley" },
          { "@type": "AdministrativeArea", name: "Himachal Pradesh" },
          { "@type": "Country", name: "India" },
        ],
        openingHours: siteConfig.hours.openingHours,
        priceRange: "INR 300-7000+ per night",
        currenciesAccepted: "INR",
        paymentAccepted: ["Cash", "UPI", "Card"],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: aggregateRating.rating,
          reviewCount: aggregateRating.count,
          bestRating: 5,
          worstRating: 1,
        },
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "Mountain View", value: true },
          { "@type": "LocationFeatureSpecification", name: "Cafe", value: true },
          { "@type": "LocationFeatureSpecification", name: "Trek Access", value: true },
          { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
          { "@type": "LocationFeatureSpecification", name: "Bonfire", value: true },
          { "@type": "LocationFeatureSpecification", name: "Outdoor Seating", value: true },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Accommodations",
          itemListElement: [
            { "@type": "Offer", name: "Meghbari Luxury Villa", url: siteConfig.links.booking, priceCurrency: "INR" },
            { "@type": "Offer", name: "4 Beds Wood Room", url: siteConfig.links.booking, priceCurrency: "INR" },
            { "@type": "Offer", name: "3 Beds Attic Room", url: siteConfig.links.booking, priceCurrency: "INR" },
            { "@type": "Offer", name: "4 Beds Balcony Room", url: siteConfig.links.booking, priceCurrency: "INR" },
            { "@type": "Offer", name: "4 Beds Hemp Room", url: siteConfig.links.booking, priceCurrency: "INR" },
            { "@type": "Offer", name: "14 Beds Stone Room (Dormitory)", url: siteConfig.links.booking, priceCurrency: "INR" },
          ],
        },
        potentialAction: {
          "@type": "ReserveAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: siteConfig.links.booking,
            actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
          },
          result: { "@type": "LodgingReservation" },
        },
      },
      {
        "@type": "Restaurant",
        "@id": `${siteConfig.url}/#cafe`,
        name: "ADHIKARA Cafe - Parvati's Lap",
        servesCuisine: ["Indian", "Himachali", "Cafe"],
        url: absoluteUrl("/kasol/katagla/chojh/ghrahan/israeli/indian/food/pulga/cafe"),
        isPartOf: { "@id": `${siteConfig.url}/#lodging` },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Lapas Village, Manikaran Rd",
          addressLocality: "Kasol",
          addressRegion: "Himachal Pradesh",
          postalCode: "175105",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude,
        },
      },
    ],
  };
}

/**
 * Generate VideoObject schema (Google video rich results / AI understanding)
 * Used for the "How to Reach" YouTube video linked in the Contact section.
 */
export function generateHowToReachVideoSchema() {
  const video = siteConfig.videos.howToReach;
  const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}`;
  const thumbnailUrl = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: [thumbnailUrl],
    embedUrl,
    contentUrl: video.url,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/Parvati's Lap - Luxury Hostel & Villa - logo-updated.png`,
      },
    },
    potentialAction: {
      "@type": "SeekToAction",
      target: `${video.url}?t={seek_to_second_number}`,
      "startOffset-input": "required name=seek_to_second_number",
    },
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

/**
 * Generate review aggregate schema
 */
export function generateAggregateRatingSchema(rating: number, reviewCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue: rating,
    bestRating: "5",
    worstRating: "1",
    ratingCount: reviewCount,
  };
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate hotel room schema
 */
export function generateHotelRoomSchema(room: {
  name: string;
  description: string;
  images: string[];
  beds: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: room.name,
    description: room.description,
    image: room.images.map((img) => `${siteConfig.url}${img}`),
    bed: {
      "@type": "BedDetails",
      numberOfBeds: room.beds,
    },
  };
}

/**
 * Generate Contact Point schema with all contact methods
 * Includes phone, email, mailing address, and alternative contact methods
 */
export function generateContactPointSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization-contact`,
    name: siteConfig.name,
    url: siteConfig.url,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        areaServed: [
          { "@type": "Place", name: "Kasol" },
          { "@type": "Place", name: "Parvati Valley" },
          { "@type": "Country", name: "India" },
        ],
        availableLanguage: ["en", "hi"],
      },
    ],
  };
}

/**
 * Generate Organization Contact Info schema
 * Enhanced contact information with multiple methods and locations
 */
export function generateOrganizationContactSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lapas Village, Manikaran Rd",
      addressLocality: "Kasol",
      addressRegion: "Himachal Pradesh",
      postalCode: "175105",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      hoursAvailable: "Mo-Su 00:00-24:00",
      availableLanguage: ["en-IN", "hi"],
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.youtube,
    ].filter(Boolean),
  };
}

/**
 * Generate Local Business schema with complete contact details
 * Optimized for "Best Cafe in Kasol" and location searches
 */
export function generateLocalBusinessContactSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}#local-business`,
    name: siteConfig.name,
    description: "Luxury Hostel & Villa with Mountain-Top Cafe in Kasol, Parvati Valley",
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/Parvati's Lap - Luxury Hostel & Villa - logo-updated.png`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lapas Village, Manikaran Rd",
      addressLocality: "Kasol",
      addressRegion: "Himachal Pradesh",
      postalCode: "175105",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.02959,
      longitude: 77.367433,
    },
    // Operating hours
    hoursOfOperation: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "24:00",
    },
    // Online presence
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.youtube,
    ].filter(Boolean),
  };
}

export function generateTreksCollectionSchema(
  items: Array<{ slug: string; title: string; tagline: string; imageSrc?: string }>,
  listUrlPath: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteConfig.url}${listUrlPath}#trek-list`,
    name: "Parvati Valley Treks from Kasol",
    description:
      "Collection of trek guides in and around Parvati Valley including Kheerganga, Sar Pass, Grahan, Chalal, Rasol, Malana-Waichin, and more.",
    numberOfItems: items.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteConfig.url}${listUrlPath}/${item.slug}`,
      item: {
        "@type": "TouristTrip",
        name: item.title,
        description: item.tagline,
        image: item.imageSrc ? absoluteUrl(item.imageSrc) : undefined,
        provider: { "@id": `${siteConfig.url}/#lodging` },
        tripOrigin: {
          "@type": "Place",
          name: "Kasol, Parvati Valley, Himachal Pradesh, India",
        },
      },
    })),
  };
}

export function generateTrekDetailSchema(data: {
  slug: string;
  title: string;
  subtitle: string;
  description?: string;
  imageSrc?: string;
  canonicalPath: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${siteConfig.url}${data.canonicalPath}#trip`,
    name: data.title,
    description: data.description ?? data.subtitle,
    image: data.imageSrc ? [absoluteUrl(data.imageSrc)] : undefined,
    url: `${siteConfig.url}${data.canonicalPath}`,
    provider: { "@id": `${siteConfig.url}/#lodging` },
    tripOrigin: {
      "@type": "Place",
      name: "Kasol, Parvati Valley, Himachal Pradesh, India",
      geo: {
        "@type": "GeoCoordinates",
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude,
      },
    },
    itinerary: {
      "@type": "Place",
      name: "Parvati Valley and nearby trekking routes",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Kullu district, Himachal Pradesh, India",
      },
    },
    touristType: ["Adventure travelers", "Trekking", "Mountain hiking"],
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: siteConfig.links.booking,
      seller: { "@id": `${siteConfig.url}/#lodging` },
    },
    mainEntityOfPage: `${siteConfig.url}${data.canonicalPath}`,
  };
}



