# ✅ Pre-Deployment Checklist for Parvati's Lap

## Before You Deploy - Quick Checklist

### 1. Code Quality ✅
- [x] All components working without errors
- [x] No console errors in browser
- [x] All linter warnings reviewed
- [x] Build succeeds locally (`npm run build`)

### 2. Content & Media 📸
- [ ] All trek images sourced and placed in `/public/images/Trek/`
  - [ ] PinParvatiPass.jpg
  - [ ] JiwaNala.jpg
  - [ ] Grahan.jpg
  - [ ] SarPass.jpg
  - [ ] BhandakThach.jpg
  - [ ] SwajaniBiskeri.jpg
  - [ ] KheerGanga.jpg
  - [ ] SargiTrek.jpg
  - [ ] ShikoiHike.jpg
  - [ ] KasolExp.jpg
- [x] All accommodation images present
- [x] Cafe images present
- [x] Views gallery images present
- [x] Hero video present

### 3. Configuration Files 🔧
- [x] `package.json` with correct scripts
- [x] `next.config.ts` properly configured
- [x] `vercel.json` created
- [x] `.gitignore` includes `.env*`, `.next/`, `node_modules/`

### 4. Environment Variables 🔐
- [ ] Google Analytics 4 Measurement ID ready: `G-XXXXXXXXXX`
- [ ] Production domain URL decided
- [ ] Environment variables template ready

### 5. SEO Setup 🔍
- [x] Meta tags configured
- [x] Open Graph tags
- [x] Structured data (JSON-LD)
- [x] Sitemap generation configured
- [x] robots.txt present
- [ ] Google Analytics account created
- [ ] Google Search Console ready (after deployment)

### 6. Git Repository 📦
- [ ] Git initialized
- [ ] All files committed
- [ ] `.gitignore` working correctly
- [ ] GitHub repository created
- [ ] Code pushed to GitHub

### 7. Vercel Account 🚀
- [ ] Vercel account created (https://vercel.com)
- [ ] GitHub connected to Vercel
- [ ] Ready to import repository

### 8. Domain (Optional) 🌐
- [ ] Domain purchased
- [ ] Domain registrar access ready
- [ ] DNS management access

---

## Quick Commands to Run Before Deployment

```bash
# Navigate to project
cd E:\_personal_project\web-site\parvatislap-next

# Test build locally
npm run build

# Run production build locally to test
npm start

# Check for TypeScript errors
npm run lint
```

---

## Environment Variables to Set in Vercel

Copy these and have your values ready:

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## Post-Deployment Tasks

### Immediate (Within 1 Hour)
- [ ] Visit deployed URL and verify all pages work
- [ ] Test on mobile device
- [ ] Test booking widget
- [ ] Test contact form / WhatsApp integration
- [ ] Verify Google Maps link works
- [ ] Check dark/light mode toggle

### Within 24 Hours
- [ ] Add site to Google Search Console
- [ ] Submit sitemap to Google
- [ ] Test Google Analytics tracking
- [ ] Share with 2-3 friends for feedback
- [ ] Check site on different browsers (Chrome, Safari, Firefox, Edge)

### Within 1 Week
- [ ] Set up custom domain (if applicable)
- [ ] Monitor Vercel Analytics
- [ ] Check Google Analytics for first visitors
- [ ] Create blog content for treks
- [ ] Update social media links to new website
- [ ] Add website to booking platforms

### Within 1 Month
- [ ] Review site performance metrics
- [ ] Optimize images based on performance data
- [ ] Collect and add real guest reviews
- [ ] Update trek descriptions based on guest feedback
- [ ] Monitor and respond to Google reviews

---

## Critical Missing Items (Do This First!)

### 🚨 Missing Trek Images

You need to source and add these 10 trek images to `/public/images/Trek/`:

1. **PinParvatiPass.jpg** - Pin Parvati Pass
2. **JiwaNala.jpg** - Jiwa Nala stream
3. **Grahan.jpg** - Grahan village
4. **SarPass.jpg** - Sar Pass trek
5. **BhandakThach.jpg** - Bhandak Thach meadow
6. **SwajaniBiskeri.jpg** - Swajani-Bhandak-Biskeri trail
7. **KheerGanga.jpg** - Kheerganga hot springs
8. **SargiTrek.jpg** - Sargi trek viewpoint
9. **ShikoiHike.jpg** - Shikoi trails and villages
10. **KasolExp.jpg** - Kasol town/cafes

**Image Requirements:**
- Format: JPEG or WebP
- Size: Optimized for web (< 200 KB per image)
- Dimensions: At least 1200px wide
- Quality: High-quality, professional photos

**Refer to**: `IMAGE_SOURCING_GUIDE.md` for detailed instructions on where to find these images.

---

## Ready to Deploy? 🚀

If you've checked most of the boxes above, you're ready to deploy!

### Quick Start:

1. **If images are missing**: You can deploy now and add images later. The site will show image placeholders until you add them.

2. **Deploy immediately**:
   ```bash
   # Initialize Git
   git init
   git add .
   git commit -m "Ready for deployment"
   
   # Push to GitHub
   # (Create repo on GitHub first)
   git remote add origin https://github.com/YOUR_USERNAME/parvatislap-website.git
   git push -u origin main
   
   # Deploy to Vercel
   # Go to https://vercel.com/new and import your repository
   ```

3. **Follow**: `VERCEL_DEPLOYMENT_GUIDE.md` for detailed step-by-step instructions.

---

## Need Help?

- **Deployment Guide**: See `VERCEL_DEPLOYMENT_GUIDE.md`
- **Image Sourcing**: See `IMAGE_SOURCING_GUIDE.md`
- **SEO Setup**: See `SEO_IMPLEMENTATION_SUMMARY.md`
- **Vercel Support**: https://vercel.com/support

---

*Last Updated: November 2025*

