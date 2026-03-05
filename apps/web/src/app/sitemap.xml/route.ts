import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://therecipedatabase.net';
  
  const staticPages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/cuisines', priority: '0.9', changefreq: 'weekly' },
    { path: '/categories', priority: '0.9', changefreq: 'weekly' },
    { path: '/search', priority: '0.8', changefreq: 'weekly' },
    { path: '/favorites', priority: '0.7', changefreq: 'weekly' },
    { path: '/shopping-list', priority: '0.7', changefreq: 'weekly' },
    { path: '/login', priority: '0.6', changefreq: 'monthly' },
    { path: '/register', priority: '0.6', changefreq: 'monthly' },
    { path: '/profile', priority: '0.6', changefreq: 'monthly' },
    { path: '/my-recipes', priority: '0.7', changefreq: 'weekly' },
    { path: '/recently-viewed', priority: '0.6', changefreq: 'daily' },
  ];

  // Popular cuisine pages for static sitemap
  const popularCuisines = [
    'italian', 'mexican', 'chinese', 'japanese', 'indian', 
    'french', 'thai', 'american', 'mediterranean', 'korean'
  ];

  // Popular categories for static sitemap
  const popularCategories = [
    'breakfast', 'lunch', 'dinner', 'desserts', 'appetizers',
    'soups', 'salads', 'baking', 'snacks', 'drinks'
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page.path}/</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.path}/"/>
  </url>`).join('')}
  ${popularCuisines.map(cuisine => `
  <url>
    <loc>${baseUrl}/cuisine/${cuisine}/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/cuisine/${cuisine}/"/>
  </url>`).join('')}
  ${popularCategories.map(category => `
  <url>
    <loc>${baseUrl}/categories?category=${category}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/categories?category=${category}"/>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
