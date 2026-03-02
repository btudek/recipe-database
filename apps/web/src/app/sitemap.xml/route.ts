import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://web-tau-weld-69.vercel.app';
  
  const staticPages = [
    '',
    '/cuisines',
    '/categories',
    '/search',
    '/favorites',
    '/shopping-list',
    '/login',
    '/register',
    '/profile',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page}/</loc>
    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
