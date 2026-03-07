import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = Fastify({ logger: true });

// Plugins - Allow all origins for development
await app.register(cors, { 
  origin: true,
  credentials: true 
});

await app.register(jwt, {
  secret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
});

// ============================================
// HEALTH
// ============================================

app.get('/health', async () => ({ status: 'ok' }));

// ============================================
// RECIPES
// ============================================

app.get('/api/recipes', async (request: any) => {
  const { cuisine, category, diet, search, limit = 20, offset = 0 } = request.query as any;
  
  const where: any = { status: 'published' };
  
  if (cuisine) where.cuisineId = cuisine;
  if (category) where.categoryId = category;
  if (diet) where.dietId = diet;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  return prisma.recipe.findMany({
    where,
    include: { cuisine: true, category: true },
    take: limit,
    skip: offset,
    orderBy: { publishedAt: 'desc' },
  });
});

app.get('/api/recipes/:slug', async (request: any) => {
  const { slug } = request.params;
  
  const recipe = await prisma.recipe.findUnique({
    where: { slug },
    include: { 
      cuisine: true, 
      category: true,
      ingredients: { orderBy: { orderIndex: 'asc' } },
      steps: { orderBy: { stepNumber: 'asc' } },
    },
  });

  if (!recipe) {
    throw { statusCode: 404, message: 'Recipe not found' };
  }

  const ratings = await prisma.rating.aggregate({
    where: { recipeId: recipe.id },
    _avg: { value: true },
    _count: true,
  });

  return { ...recipe, rating: ratings._avg.value, ratingCount: ratings._count };
});

// ============================================
// AUTH
// ============================================

app.post('/api/auth/register', async (request: any) => {
  const { email, username, password } = request.body;
  
  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });
  
  if (existing) {
    throw { statusCode: 400, message: 'Email or username already exists' };
  }

  const passwordHash = `hashed_${password}`;

  const user = await prisma.user.create({
    data: { email, username, passwordHash },
    select: { id: true, email: true, username: true },
  });

  const token = app.jwt.sign({ id: user.id });
  return { user, token };
});

app.post('/api/auth/login', async (request: any) => {
  const { email, password } = request.body;
  
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user) {
    throw { statusCode: 401, message: 'Invalid credentials' };
  }

  const valid = user.passwordHash === `hashed_${password}`;
  
  if (!valid) {
    throw { statusCode: 401, message: 'Invalid credentials' };
  }

  const token = app.jwt.sign({ id: user.id });
  return { 
    user: { id: user.id, email: user.email, username: user.username },
    token 
  };
});

// ============================================
// USER
// ============================================

app.get('/api/users/me', async (request: any) => {
  const user = request.user as any;
  
  return prisma.user.findUnique({
    where: { id: user.id },
    select: { id: true, email: true, username: true, displayName: true, avatarUrl: true },
  });
});

app.get('/api/users/saved', async (request: any) => {
  const user = request.user as any;
  
  return prisma.userSavedRecipe.findMany({
    where: { userId: user.id },
    include: { 
      recipe: { include: { cuisine: true, category: true } }
    },
  });
});

app.post('/api/users/saved/:recipeId', async (request: any) => {
  const user = request.user as any;
  const { recipeId } = request.params;

  return prisma.userSavedRecipe.upsert({
    where: { userId_recipeId: { userId: user.id, recipeId } },
    create: { userId: user.id, recipeId },
    update: {},
    include: { recipe: true },
  });
});

// ============================================
// CUISINES & CATEGORIES
// ============================================

app.get('/api/cuisines', async () => {
  return prisma.cuisine.findMany({
    include: { _count: { select: { recipes: { where: { status: 'published' } } } } },
  });
});

app.get('/api/categories', async () => {
  return prisma.category.findMany({
    include: { _count: { select: { recipes: { where: { status: 'published' } } } } },
  });
});

app.get('/api/diets', async () => {
  return prisma.diet.findMany({
    include: { _count: { select: { recipes: { where: { status: 'published' } } } } },
  });
});

// ============================================
// SEARCH
// ============================================

app.get('/api/search', async (request: any) => {
  const { q, limit = 20 } = request.query;

  if (!q) return [];

  return prisma.recipe.findMany({
    where: {
      status: 'published',
      OR: [
        { title: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ],
    },
    include: { cuisine: true },
    take: limit,
  });
});

// ============================================
// SITEMAP
// ============================================

app.get('/sitemap.xml', async () => {
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

  return sitemap;
});

// ============================================
// RATINGS & COMMENTS
// ============================================

app.post('/api/recipes/:id/rate', async (request: any) => {
  const user = request.user as any;
  const { id: recipeId } = request.params;
  const { value } = request.body as { value: number };

  if (!user) {
    throw { statusCode: 401, message: 'Must be logged in' };
  }

  if (value < 1 || value > 5) {
    throw { statusCode: 400, message: 'Rating must be 1-5' };
  }

  return prisma.rating.upsert({
    where: { userId_recipeId: { userId: user.id, recipeId } },
    create: { userId: user.id, recipeId, value },
    update: { value },
  });
});

app.get('/api/recipes/:id/comments', async (request: any) => {
  const { id: recipeId } = request.params;

  return prisma.comment.findMany({
    where: { recipeId, isApproved: true, isDeleted: false },
    include: { user: { select: { username: true, avatarUrl: true } } },
    orderBy: { createdAt: 'desc' },
  });
});

app.post('/api/recipes/:id/comments', async (request: any) => {
  const user = request.user as any;
  const { id: recipeId } = request.params;
  const { content } = request.body as { content: string };

  if (!user) {
    throw { statusCode: 401, message: 'Must be logged in' };
  }

  return prisma.comment.create({
    data: {
      userId: user.id,
      recipeId,
      content,
    },
    include: { user: { select: { username: true, avatarUrl: true } } },
  });
});

// ============================================
// SAVE RECIPE
// ============================================

app.post('/api/recipes/:id/save', async (request: any) => {
  const user = request.user as any;
  const { id: recipeId } = request.params;

  if (!user) {
    throw { statusCode: 401, message: 'Must be logged in' };
  }

  return prisma.userSavedRecipe.upsert({
    where: { userId_recipeId: { userId: user.id, recipeId } },
    create: { userId: user.id, recipeId },
    update: {},
    include: { recipe: true },
  });
});

app.delete('/api/recipes/:id/save', async (request: any) => {
  const user = request.user as any;
  const { id: recipeId } = request.params;

  if (!user) {
    throw { statusCode: 401, message: 'Must be logged in' };
  }

  return prisma.userSavedRecipe.delete({
    where: { userId_recipeId: { userId: user.id, recipeId } },
  });
});

// ============================================
// CUISINE PAGE
// ============================================

app.get('/api/cuisine/:slug', async (request: any) => {
  const { slug } = request.params;

  const cuisine = await prisma.cuisine.findUnique({
    where: { slug },
  });

  if (!cuisine) {
    throw { statusCode: 404, message: 'Cuisine not found' };
  }

  const recipes = await prisma.recipe.findMany({
    where: { cuisineId: cuisine.id, status: 'published' },
    include: { cuisine: true, category: true },
  });

  return { cuisine, recipes };
});

// ============================================
// CATEGORY PAGE
// ============================================

app.get('/api/category/:slug', async (request: any) => {
  const { slug } = request.params;

  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    throw { statusCode: 404, message: 'Category not found' };
  }

  const recipes = await prisma.recipe.findMany({
    where: { categoryId: category.id, status: 'published' },
    include: { cuisine: true, category: true },
  });

  return { category, recipes };
});

// ============================================
// START
// ============================================

const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3001');
    await app.listen({ port, host: '0.0.0.0' });
    console.log(`API server running on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
