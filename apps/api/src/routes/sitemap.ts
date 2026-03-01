import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const recipes = await prisma.recipe.findMany({
    where: { status: 'published' },
    select: { slug: true, updatedAt: true },
  });

  const baseUrl = 'https://recipedatabase.com';

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/cuisines</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/categories</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  ${recipes.map(recipe => `
  <url>
    <loc>${baseUrl}/recipe/${recipe.slug}</loc>
    <lastmod>${recipe.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  `).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
