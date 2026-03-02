const supabaseUrl = 'https://ycwbumsmlikiquplkdln.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljd2J1bXNtbGlraXF1cGxrZGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MTI0NTEsImV4cCI6MjA4Nzk4ODQ1MX0.OssOxG4gz6pxkWkycsjJqA5cEM_IyxgjqB6JHP4PbhA';

const tables = [
  {
    name: 'cuisine',
    data: [
      { name: 'Italian', slug: 'italian' },
      { name: 'Mexican', slug: 'mexican' },
      { name: 'Japanese', slug: 'japanese' },
      { name: 'French', slug: 'french' },
      { name: 'Chinese', slug: 'chinese' },
      { name: 'Indian', slug: 'indian' }
    ]
  },
  {
    name: 'category',
    data: [
      { name: 'Dinner', slug: 'dinner' },
      { name: 'Lunch', slug: 'lunch' },
      { name: 'Breakfast', slug: 'breakfast' },
      { name: 'Desserts', slug: 'desserts' }
    ]
  }
];

async function createTable(tableName) {
  const response = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
    method: 'POST',
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=ignore-duplicates'
    },
    body: JSON.stringify({ id: '00000000-0000-0000-0000-000000000001', name: 'Temp', slug: 'temp' })
  });
  console.log(`${tableName}:`, response.status);
}

async function main() {
  for (const table of tables) {
    for (const item of table.data) {
      const response = await fetch(`${supabaseUrl}/rest/v1/${table.name}`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=ignore-duplicates'
        },
        body: JSON.stringify(item)
      });
      console.log(`${table.name}/${item.slug}:`, response.status);
    }
  }
}

main();
