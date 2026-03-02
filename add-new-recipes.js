const { Client } = require('pg');
const client = new Client({ host: 'db.ycwbumsmlikiquplkdln.supabase.co', port: 5432, database: 'postgres', user: 'postgres', password: process.env.DBPASS });

const recipes = [
  { title: 'Yakitori', slug: 'yakitori', description: 'Japanese grilled chicken skewers', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Tonkotsu Ramen', slug: 'tonkotsu-ramen', description: 'Rich pork bone broth ramen', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Okonomiyaki', slug: 'okonomiyaki', description: 'Japanese savory pancake', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Mochi Ice Cream', slug: 'mochi-ice-cream', description: 'Chewy rice cake with ice cream', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
  { title: 'Pork Belly Buns', slug: 'pork-belly-buns', description: 'Steamed buns with braised pork', cuisine_id: '8232ae82-2fa2-4f95-a9f1-bc7ddd817d28' },
  { title: 'Chicken Katsu', slug: 'chicken-katsu', description: 'Japanese fried chicken cutlet', cuisine_id: 'a3cb4471-db63-434e-a2e2-255242ffaca0' },
];

async function main() {
  await client.connect();
  for (const r of recipes) {
    const check = await client.query('SELECT id FROM recipe WHERE slug = $1', [r.slug]);
    if (check.rows.length === 0) {
      await client.query(
        'INSERT INTO recipe (title, slug, description, cuisine_id, published_at) VALUES ($1, $2, $3, $4, now())',
        [r.title, r.slug, r.description, r.cuisine_id]
      );
      console.log('Added:', r.title);
    }
  }
  await client.end();
}

main().catch(console.error);
