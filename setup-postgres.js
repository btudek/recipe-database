const { Client } = require('pg');

const client = new Client({
  host: 'db.ycwbumsmlikiquplkdln.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'ChristTheKing1$'
});

async function main() {
  try {
    await client.connect();
    console.log('Connected to database!');
    
    // Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS cuisine (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL
      )
    `);
    console.log('Created cuisine table');
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS category (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL
      )
    `);
    console.log('Created category table');
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS recipe (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        prep_time INT DEFAULT 0,
        cook_time INT DEFAULT 0,
        total_time INT DEFAULT 0,
        yield INT DEFAULT 4,
        cuisine_id UUID REFERENCES cuisine(id),
        category_id UUID REFERENCES category(id),
        image_url TEXT,
        status TEXT DEFAULT 'draft',
        published_at TIMESTAMP
      )
    `);
    console.log('Created recipe table');
    
    // Insert sample data
    const cuisines = [
      { name: 'Italian', slug: 'italian' },
      { name: 'Mexican', slug: 'mexican' },
      { name: 'Japanese', slug: 'japanese' },
      { name: 'French', slug: 'french' },
      { name: 'Chinese', slug: 'chinese' },
      { name: 'Indian', slug: 'indian' }
    ];
    
    for (const c of cuisines) {
      await client.query(
        'INSERT INTO cuisine (name, slug) VALUES ($1, $2) ON CONFLICT (slug) DO NOTHING',
        [c.name, c.slug]
      );
    }
    console.log('Inserted cuisines');
    
    const categories = [
      { name: 'Dinner', slug: 'dinner' },
      { name: 'Lunch', slug: 'lunch' },
      { name: 'Breakfast', slug: 'breakfast' },
      { name: 'Desserts', slug: 'desserts' }
    ];
    
    for (const c of categories) {
      await client.query(
        'INSERT INTO category (name, slug) VALUES ($1, $2) ON CONFLICT (slug) DO NOTHING',
        [c.name, c.slug]
      );
    }
    console.log('Inserted categories');
    
    const recipes = [
      { slug: 'spaghetti-carbonara', title: 'Spaghetti Carbonara', description: 'Classic Italian pasta', prep_time: 15, cook_time: 20, total_time: 35, yield: 4, status: 'published' },
      { slug: 'chicken-tacos', title: 'Chicken Tacos', description: 'Mexican tacos', prep_time: 20, cook_time: 15, total_time: 35, yield: 6, status: 'published' },
      { slug: 'sushi-rolls', title: 'Sushi Rolls', description: 'Japanese sushi', prep_time: 30, cook_time: 10, total_time: 40, yield: 4, status: 'published' },
      { slug: 'beef-bourguignon', title: 'Beef Bourguignon', description: 'French stew', prep_time: 30, cook_time: 180, total_time: 210, yield: 8, status: 'published' },
      { slug: 'pad-thai', title: 'Pad Thai', description: 'Thai noodles', prep_time: 15, cook_time: 10, total_time: 25, yield: 2, status: 'published' },
      { slug: 'margherita-pizza', title: 'Margherita Pizza', description: 'Italian pizza', prep_time: 20, cook_time: 15, total_time: 35, yield: 4, status: 'published' },
      { slug: 'chocolate-lava-cake', title: 'Chocolate Lava Cake', description: 'Chocolate dessert', prep_time: 10, cook_time: 12, total_time: 22, yield: 4, status: 'published' }
    ];
    
    for (const r of recipes) {
      await client.query(
        'INSERT INTO recipe (slug, title, description, prep_time, cook_time, total_time, yield, status, published_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) ON CONFLICT (slug) DO NOTHING',
        [r.slug, r.title, r.description, r.prep_time, r.cook_time, r.total_time, r.yield, r.status]
      );
    }
    console.log('Inserted recipes');
    
    console.log('\n✅ Database setup complete!');
    
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.end();
  }
}

main();
