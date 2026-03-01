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
  const { cuisine, category, search, limit = 20, offset = 0 } = request.query as any;
  
  const where: any = { status: 'published' };
  
  if (cuisine) where.cuisineId = cuisine;
  if (category) where.categoryId = category;
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
