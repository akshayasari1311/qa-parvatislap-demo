/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://parvatislap.com',
  generateRobotsTxt: false,
  generateIndexSitemap: false, // Set to true if you have many pages
  
  // Sitemap generation options
  exclude: [
    '/api/*',
    '/admin/*',
    '/robots.txt',
    '/sitemap.xml',
    '/ai.txt',
    '/llms.txt',
    '/accommodations', // legacy/alias - canonical is /hostel-villa
    '/villa',
    '/cafe',
    '/hostel',
    '/treks',
    '/treks/*',
  ],
  
  // Robots.txt options
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/api/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      // Add additional sitemaps if needed
      // 'https://parvatislap.com/server-sitemap.xml',
    ],
  },
  
  // Change frequency and priority
  changefreq: 'weekly',
  priority: 0.7,
  
  // Transform function to customize each URL
  transform: async (config, path) => {
    // Custom priority for specific pages
    let priority = config.priority;
    let changefreq = config.changefreq;
    
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.includes('/hostel-villa')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.includes('/contact')) {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (path.includes('/faq')) {
      priority = 0.6;
      changefreq = 'monthly';
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};







