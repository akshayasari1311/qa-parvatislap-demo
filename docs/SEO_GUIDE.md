# SEO Implementation Guide

Complete guide for SEO configuration, metadata, structured data, and sitemap generation in Next.js 16.

---

## 📋 Overview

This application uses Next.js 16's App Router metadata API combined with:
- ✅ Centralized SEO configuration
- ✅ Dynamic metadata generation
- ✅ JSON-LD structured data (Schema.org)
- ✅ Automatic sitemap generation
- ✅ robots.txt configuration
- ✅ Open Graph & Twitter Cards
- ✅ SEO best practices

---

## 🗂️ File Structure

```
src/
├── lib/
│   └── seo.ts                    # SEO utilities & schema generators
└── components/
    └── seo/
        └── StructuredData.tsx    # JSON-LD component

public/
└── robots.txt                    # Robots configuration

next-sitemap.config.js            # Sitemap generation config
```

---

## 🎯 Core Configuration

### 1. **SEO Utilities** (`src/lib/seo.ts`)

Centralized configuration for all SEO settings:

```typescript
import { generateMetadata } from "@/lib/seo";

// Use in any page or layout
export const metadata = generateMetadata({
  title: "Accommodations",
  description: "Luxury rooms and villas in Kasol",
  keywords: ["kasol rooms", "villa"],
  path: "/accommodations",
});
```

**Available Functions:**

```typescript
// Generate page metadata
generateMetadata({ title, description, keywords, image, path, type })

// JSON-LD Schemas
generateOrganizationSchema()
generateBreadcrumbSchema(items)
generateAggregateRatingSchema(rating, reviewCount)
generateFAQSchema(faqs)
generateHotelRoomSchema(room)
```

---

## 📄 Page-Level SEO

### Root Layout (`app/layout.tsx`)

```typescript
import { generateMetadata, generateOrganizationSchema } from "@/lib/seo";
import { StructuredData } from "@/components/seo/StructuredData";

// Root metadata
export const metadata = generateMetadata({});

export default function RootLayout({ children }) {
  const organizationSchema = generateOrganizationSchema();
  
  return (
    <html lang="en">
      <head>
        <StructuredData data={organizationSchema} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Individual Pages

```typescript
// app/accommodations/page.tsx
import { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "Luxury Accommodations",
  description: "Choose from our range of comfortable stays in Kasol",
  keywords: ["kasol accommodation", "hostel rooms", "villa"],
  path: "/accommodations",
});

export default function AccommodationsPage() {
  return <div>...</div>;
}
```

### Dynamic Pages

```typescript
// app/rooms/[id]/page.tsx
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const room = await fetchRoom(params.id);
  
  return {
    title: `${room.name} | Parvati's Lap`,
    description: room.description,
    openGraph: {
      images: room.images,
    },
  };
}
```

---

## 🔖 Structured Data (Schema.org)

### Organization Schema

Already included in root layout:

```typescript
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Parvati's Lap",
  "address": { ... },
  "telephone": "+91 908 222 9363",
  "priceRange": "₹₹"
}
```

### Breadcrumbs

```typescript
import { StructuredData } from "@/components/seo/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/seo";

export default function AccommodationsPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Accommodations", url: "/accommodations" },
  ]);
  
  return (
    <>
      <StructuredData data={breadcrumbs} />
      {/* Page content */}
    </>
  );
}
```

### Reviews & Ratings

```typescript
import { generateAggregateRatingSchema } from "@/lib/seo";

const ratingSchema = generateAggregateRatingSchema(4.8, 127);
<StructuredData data={ratingSchema} />
```

### FAQ Schema

```typescript
import { generateFAQSchema } from "@/lib/seo";

const faqSchema = generateFAQSchema([
  {
    question: "Where is Parvati's Lap located?",
    answer: "We are located in Lapas Village, Kasol, Parvati Valley..."
  },
  // ... more FAQs
]);

<StructuredData data={faqSchema} />
```

### Hotel Room Schema

```typescript
import { generateHotelRoomSchema } from "@/lib/seo";

const roomSchema = generateHotelRoomSchema({
  name: "Meghbari Luxury Villa",
  description: "Exclusive private villa with glacier views",
  images: [...],
  beds: 4,
});

<StructuredData data={roomSchema} />
```

---

## 🗺️ Sitemap Generation

### Configuration (`next-sitemap.config.js`)

Sitemap is **automatically generated** after each build:

```bash
npm run build
# Generates:
# - public/sitemap.xml
# - public/robots.txt
```

### Customization

```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://parvatislap.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  
  // Custom priorities
  transform: async (config, path) => {
    if (path === '/') return { ...config, priority: 1.0 };
    if (path.includes('/accommodations')) return { ...config, priority: 0.9 };
    return config;
  },
};
```

### Manual Generation

```bash
npx next-sitemap
```

---

## 🤖 robots.txt

Located at `public/robots.txt`:

```txt
User-agent: *
Allow: /

Disallow: /api/
Disallow: /admin/

Sitemap: https://parvatislap.com/sitemap.xml
```

**Auto-generated** by next-sitemap with every build.

---

## 🌐 Open Graph & Twitter Cards

Automatically included in all pages via `generateMetadata()`:

### Open Graph Tags

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://parvatislap.com" />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
<meta property="og:site_name" content="Parvati's Lap" />
```

### Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

---

## 🎨 Creating OG Images

Create optimized Open Graph images:

**Required:** `public/images/og-image.jpg`
- Size: 1200x630px
- Format: JPG or PNG
- Max size: < 1MB
- Include: Logo, tagline, visually appealing

**Per-page images:**
```typescript
export const metadata = generateMetadata({
  title: "Meghbari Villa",
  image: "/images/rooms/villa-og.jpg",
});
```

---

## ✅ SEO Checklist

### Pre-Launch

- [ ] Update `siteUrl` in `next-sitemap.config.js`
- [ ] Create `/public/images/og-image.jpg` (1200x630px)
- [ ] Update actual GPS coordinates in organization schema
- [ ] Add social media URLs in `siteConfig.social`
- [ ] Configure Google Analytics (add `gtag` script)
- [ ] Set up Google Search Console
- [ ] Set up Bing Webmaster Tools
- [ ] Add verification codes to `metadata.verification`

### Content Optimization

- [ ] Unique title for each page (50-60 characters)
- [ ] Unique description for each page (150-160 characters)
- [ ] Relevant keywords for each page
- [ ] Alt text for all images
- [ ] Internal linking between pages
- [ ] Mobile-friendly design (✅ already responsive)

### Technical SEO

- [ ] HTTPS enabled
- [ ] Fast page load times
- [ ] Sitemap submitted to search engines
- [ ] Robots.txt accessible
- [ ] Structured data validated (Google Rich Results Test)
- [ ] Core Web Vitals optimized
- [ ] Canonical URLs set

---

## 🔧 Testing & Validation

### Structured Data Testing

**Google Rich Results Test:**
```
https://search.google.com/test/rich-results
```
Test URL: `https://parvatislap.com`

**Schema Markup Validator:**
```
https://validator.schema.org/
```

### Open Graph Testing

**Facebook Sharing Debugger:**
```
https://developers.facebook.com/tools/debug/
```

**Twitter Card Validator:**
```
https://cards-dev.twitter.com/validator
```

### SEO Analysis Tools

- **Google Search Console** - Monitor search performance
- **Bing Webmaster Tools** - Bing search insights
- **Lighthouse** - Performance & SEO audit (Chrome DevTools)
- **Screaming Frog** - Technical SEO crawler
- **Ahrefs / SEMrush** - Comprehensive SEO analysis

---

## 📊 Analytics Integration

### Google Analytics 4

Add to `app/layout.tsx`:

```typescript
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Event Tracking

Already implemented in `BookingWidget.tsx`:

```typescript
if (typeof window !== "undefined" && (window as any).gtag) {
  (window as any).gtag("event", "booking_click", {
    event_category: "engagement",
    event_label: "booking_widget",
    value: 1,
  });
}
```

---

## 🚀 Deployment Checklist

### Before Deploy:

1. Update `.env` or deployment environment variables:
   ```
   SITE_URL=https://parvatislap.com
   ```

2. Build and test locally:
   ```bash
   npm run build
   npm run start
   ```

3. Verify sitemap generated:
   ```
   http://localhost:3000/sitemap.xml
   ```

4. Check robots.txt:
   ```
   http://localhost:3000/robots.txt
   ```

### After Deploy:

1. Submit sitemap to Google Search Console
2. Submit sitemap to Bing Webmaster Tools
3. Verify structured data with Rich Results Test
4. Test Open Graph tags with Facebook Debugger
5. Monitor Core Web Vitals
6. Set up Google Analytics goals
7. Enable search console email notifications

---

## 📈 Monitoring & Maintenance

### Weekly Tasks:
- Check Google Search Console for errors
- Monitor Core Web Vitals
- Review top queries and pages
- Check for indexing issues

### Monthly Tasks:
- Analyze search performance trends
- Update content based on search queries
- Check for broken links
- Review and update meta descriptions
- Add new FAQs based on customer questions

### Quarterly Tasks:
- Comprehensive SEO audit
- Update structured data as needed
- Refresh OG images
- Review and optimize underperforming pages
- Competitor analysis

---

## 🎓 Best Practices

1. **Title Tags:**
   - Keep under 60 characters
   - Include main keyword
   - Make it compelling
   - Use pipe "|" or dash "—" as separator

2. **Meta Descriptions:**
   - 150-160 characters
   - Include call-to-action
   - Use active voice
   - Include target keywords naturally

3. **Structured Data:**
   - Use specific schema types
   - Include as much detail as possible
   - Keep data accurate and up-to-date
   - Test regularly

4. **Images:**
   - Always include alt text
   - Use descriptive file names
   - Optimize file sizes
   - Use WebP format when possible

5. **Internal Linking:**
   - Link to related content
   - Use descriptive anchor text
   - Create logical site hierarchy
   - Fix broken links promptly

---

## 🐛 Troubleshooting

### Sitemap not generating?
```bash
# Check postbuild script runs
npm run build

# Manual generation
npx next-sitemap

# Verify config
cat next-sitemap.config.js
```

### Structured data errors?
- Validate with Google Rich Results Test
- Check for missing required fields
- Ensure URLs are absolute (include domain)
- Verify JSON syntax

### Pages not indexed?
- Check robots.txt allows crawling
- Submit sitemap to Search Console
- Verify noindex tag not present
- Check for server errors (5xx)
- Ensure pages are linked from homepage

---

## 📚 Resources

- **Next.js Metadata API:** https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- **Schema.org:** https://schema.org/
- **Google Search Central:** https://developers.google.com/search
- **next-sitemap:** https://github.com/iamvishnusankar/next-sitemap

---

## 🎯 Summary

The SEO implementation is production-ready with:
- ✅ Centralized configuration
- ✅ Dynamic metadata generation
- ✅ Comprehensive structured data
- ✅ Automatic sitemap generation
- ✅ Open Graph & Twitter Cards
- ✅ Analytics tracking ready
- ✅ Mobile-optimized
- ✅ Best practices followed

**All you need to do:**
1. Update `siteUrl` in config
2. Create OG image
3. Add social media links
4. Configure Google Analytics
5. Deploy and submit to search engines!







