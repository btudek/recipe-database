const supabaseUrl = 'https://ycwbumsmlikiquplkdln.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljd2J1bXNtbGlraXF1cGxrZGxuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjQxMjQ1MSwiZXhwIjoyMDg3OTg4NDUxfQ.tSH1F-n1-bkfBE8ORWli_K6YZu_O8UqgyDEE9MIgFhc';

const headers = {
  'apikey': serviceKey,
  'Authorization': `Bearer ${serviceKey}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=minimal'
};

async function createTable(tableName, createSQL) {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query: createSQL })
    });
    console.log(`${tableName}:`, response.status, await response.text());
  } catch (e) {
    console.error(`${tableName} error:`, e.message);
  }
}

async function insertData(tableName, data) {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    console.log(`${tableName} insert:`, response.status);
  } catch (e) {
    console.error(`${tableName} insert error:`, e.message);
  }
}

async function main() {
  console.log('Creating tables...');
  
  // Create cuisine table
  await insertData('cuisine', { name: 'Italian', slug: 'italian' });
  await insertData('cuisine', { name: 'Mexican', slug: 'mexican' });
  await insertData('cuisine', { name: 'Japanese', slug: 'japanese' });
  await insertData('cuisine', { name: 'French', slug: 'french' });
  await insertData('cuisine', { name: 'Chinese', slug: 'chinese' });
  await insertData('cuisine', { name: 'Indian', slug: 'indian' });
  
  // Create category table
  await insertData('category', { name: 'Dinner', slug: 'dinner' });
  await insertData('category', { name: 'Lunch', slug: 'lunch' });
  await insertData('category', { name: 'Breakfast', slug: 'breakfast' });
  await insertData('category', { name: 'Desserts', slug: 'desserts' });
  
  console.log('Done!');
}

main();
