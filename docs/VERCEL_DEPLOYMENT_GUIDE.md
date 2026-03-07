# 🚀 Vercel Deployment Guide for Parvati's Lap

## Prerequisites

Before deploying, ensure you have:
- ✅ A Vercel account (sign up at https://vercel.com)
- ✅ Git installed on your machine
- ✅ Your project code ready
- ✅ All images placed in the correct folders

---

## Step 1: Prepare Your Project for Git (If Not Already Done)

### Configure Git (First Time Setup)

If this is your first time using Git on this computer, configure your identity:

```bash
# Set your Git username
git config --global user.name "Akshay Asari"

# Set your Git email (use your GitHub email)
git config --global user.email "your-email@example.com"

# Verify configuration
git config --global user.name
git config --global user.email
```

> **Note:** This is only needed once per computer. The `--global` flag applies these settings to all your Git projects.

### Initialize Git Repository

```bash
cd E:\_personal_project\web-site\parvatislap-next
git init
git add .
git commit -m "Initial commit: Parvati's Lap website ready for deployment"
```

### Push to GitHub (Recommended)

1. Create a new repository on GitHub: https://github.com/new
   - Repository name: `parvatislap-website` (or your preferred name)
   - Make it **Private** (recommended for production sites)
   - Do NOT initialize with README, .gitignore, or license

2. Link your local repository to GitHub:

```bash
git remote add origin https://github.com/YOUR_USERNAME/parvatislap-website.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**: https://vercel.com/new

2. **Import Git Repository**:
   - Click "Import Project"
   - Select "Import Git Repository"
   - Choose your GitHub repository: `parvatislap-website`
   - Click "Import"

3. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Environment Variables** (Click "Add" for each):

   | Key | Value | Description |
   |-----|-------|-------------|
   | `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Your Google Analytics 4 Measurement ID |
   | `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` | Your production domain |

   > **Where to get Google Analytics ID:**
   > 1. Go to https://analytics.google.com/
   > 2. Create a GA4 property for your website
   > 3. Copy the Measurement ID (format: G-XXXXXXXXXX)

5. **Click "Deploy"**:
   - Vercel will build and deploy your site
   - First deployment takes 2-5 minutes
   - You'll get a preview URL: `https://parvatislap-website.vercel.app`

---

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:

```bash
npm install -g vercel
```

2. **Login to Vercel**:

```bash
vercel login
```

3. **Deploy**:

```bash
cd E:\_personal_project\web-site\parvatislap-next
vercel
```

4. **Follow the prompts**:
   - Set up and deploy? **Y**
   - Which scope? **Your account**
   - Link to existing project? **N**
   - Project name? **parvatislap-website**
   - In which directory? **./` (press Enter)**
   - Auto-detected Next.js? **Y**
   - Override settings? **N**

5. **Add Environment Variables**:

```bash
vercel env add NEXT_PUBLIC_GA_ID
# Paste your Google Analytics ID when prompted

vercel env add NEXT_PUBLIC_SITE_URL
# Enter your domain: https://yourdomain.com
```

6. **Deploy to Production**:

```bash
vercel --prod
```

---

## Step 3: Configure Custom Domain (Optional)

### Add Your Own Domain

1. **In Vercel Dashboard**:
   - Go to your project → **Settings** → **Domains**
   - Click "Add Domain"
   - Enter your domain: `parvatislap.com` (or `www.parvatislap.com`)

2. **Update DNS Records** (at your domain registrar):

   **For Apex Domain (parvatislap.com):**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for DNS Propagation** (can take 1-48 hours):
   - Check status at: https://www.whatsmydns.net/

4. **SSL Certificate**: 
   - Vercel automatically provisions SSL certificates
   - Your site will be HTTPS within minutes after DNS propagates

---

## Step 4: Post-Deployment Checklist

### ✅ Verify Everything Works

- [ ] Visit your deployed URL
- [ ] Check all pages load correctly:
  - [ ] Home section
  - [ ] Hostel & Villa section
  - [ ] Cafe & Things To Do section
  - [ ] Reviews section
  - [ ] Views gallery
  - [ ] Contact form
- [ ] Test navigation smooth scrolling
- [ ] Check all images load
- [ ] Verify trek carousel auto-scrolls
- [ ] Test booking widget opens correctly
- [ ] Verify WhatsApp contact works
- [ ] Test Google Maps link in Contact
- [ ] Check dark/light mode toggle
- [ ] Test mobile responsiveness
- [ ] Verify Google Analytics is tracking (check Real-Time reports)

### ✅ SEO Setup

1. **Google Search Console**:
   - Go to https://search.google.com/search-console
   - Add property: `https://yourdomain.com`
   - Verify ownership using HTML tag method or DNS
   - Submit sitemap: `https://yourdomain.com/sitemap.xml`

2. **Google Analytics**:
   - Verify tracking is working in Real-Time reports
   - Set up conversion goals for booking clicks

3. **Update Structured Data**:
   - Test with Google Rich Results: https://search.google.com/test/rich-results
   - Verify Organization, LodgingBusiness, and Review schemas appear

---

## Step 5: Continuous Deployment

### Automatic Deployments

Every time you push to your GitHub repository, Vercel automatically:
- ✅ Builds your project
- ✅ Runs tests (if configured)
- ✅ Deploys to production
- ✅ Provides a preview URL

### Update Your Site

```bash
# Make changes to your code
git add .
git commit -m "Update trek images and descriptions"
git push origin main
```

Vercel will automatically deploy within 2-5 minutes!

### Preview Deployments

- Every branch gets its own preview URL
- Test changes before merging to main
- Share preview links with your team

---

## Step 6: Performance Optimization

### Vercel Edge Network

Your site is automatically deployed to Vercel's global Edge Network:
- ✅ **CDN**: Images and assets served from nearest location
- ✅ **Edge Functions**: Fast serverless functions
- ✅ **Automatic Compression**: Gzip and Brotli compression
- ✅ **HTTP/2 & HTTP/3**: Modern protocols for faster loading

### Analytics & Monitoring

1. **Vercel Analytics** (Recommended):
   - Go to Project → **Analytics** tab
   - Enable Vercel Analytics
   - Track Core Web Vitals, LCP, CLS, FID

2. **Vercel Speed Insights**:
   - Go to Project → **Speed Insights** tab
   - Enable Speed Insights
   - Monitor real-user performance metrics

---

## Troubleshooting

### Build Fails

**Error: "Module not found"**
```bash
# Ensure all dependencies are installed
npm install
npm run build
```

**Error: "Image optimization failed"**
- Check that all image paths in the code match actual files
- Verify image formats (JPEG, PNG, WebP)
- Ensure images are in `/public/images/` folder

### Git Push Fails

**Error: "Please tell me who you are"**
```bash
# Configure your Git identity
git config --global user.name "Akshay Asari"
git config --global user.email "your-email@example.com"

# Try push again
git push -u origin main
```

**Error: "Authentication failed" or "Permission denied"**
- Make sure you're using a Personal Access Token (not password)
- Get token from: https://github.com/settings/tokens
- Use token as password when prompted

**Alternative: Use GitHub Desktop**
- Download: https://desktop.github.com
- Easier authentication without command line

### Images Not Loading

1. Check image paths start with `/images/` (not `./images/`)
2. Verify images exist in `/public/images/` folder
3. Check file names match exactly (case-sensitive)
4. Clear Vercel cache: Project → Settings → Data Cache → Purge

### Environment Variables Not Working

1. Go to Project → **Settings** → **Environment Variables**
2. Verify variables are set for **Production**, **Preview**, and **Development**
3. Redeploy after adding/changing environment variables
4. Use `NEXT_PUBLIC_` prefix for client-side variables

### Custom Domain Not Working

1. Verify DNS records at your domain registrar
2. Wait for DNS propagation (use https://www.whatsmydns.net/)
3. Check domain settings in Vercel dashboard
4. Try adding both apex and www versions

---

## Support & Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Vercel Support**: https://vercel.com/support
- **Community Forum**: https://github.com/vercel/vercel/discussions

---

## Cost & Pricing

### Vercel Free Tier (Hobby)
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ HTTPS/SSL certificates
- ✅ Global CDN
- ✅ Automatic scaling
- ✅ Perfect for this project!

### Upgrade to Pro (Optional)
- **$20/month** per member
- 1 TB bandwidth
- Advanced analytics
- Password protection
- Larger build time limits

**For Parvati's Lap**: The Free tier should be sufficient unless you get extremely high traffic (10,000+ daily visitors).

---

## Next Steps After Deployment

1. ✅ **Add Blog Content**: 
   - Create trek guide blog posts in `/src/app/blog/`
   - Improves SEO for trek-related keywords

2. ✅ **Gather Reviews**:
   - Collect guest reviews
   - Update `/src/data/reviews.ts`
   - Improves trust and SEO

3. ✅ **Track Performance**:
   - Monitor Google Analytics
   - Check Vercel Speed Insights
   - Optimize based on data

4. ✅ **Update Images**:
   - Source high-quality trek images
   - Follow `IMAGE_SOURCING_GUIDE.md`
   - Optimize for web (compress to < 200 KB)

---

## 🎉 Congratulations!

Your Parvati's Lap website is now live on Vercel! 🏔️

**Share your site**:
- 📱 Social Media: Instagram, Facebook
- 🔗 Booking platforms: Update your links
- 📧 Email signature: Add your website URL
- 📍 Google Business Profile: Add website link

---

*For any issues or questions about the deployment, refer to this guide or check the Vercel documentation.*

