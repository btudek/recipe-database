# Deployment Guide - Recipe Database

## Quick Deploy (Vercel + Render)

### Frontend (Vercel)

1. Push code to GitHub
2. Go to https://vercel.com
3. Import the `recipe-database` repo
4. Select `apps/web` as the project directory
5. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = your Render/Railway API URL
6. Deploy!

### Backend (Render/Railway)

**Option 1: Render**
1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repo
4. Root directory: `apps/api`
5. Build command: (empty)
6. Start command: `node dist/app.js`
7. Add environment variables:
   - `DATABASE_URL` = your PostgreSQL connection string
   - `JWT_SECRET` = random string
   - `PORT` = 8080
8. Deploy!

**Option 2: Railway**
1. Go to https://railway.app
2. Create new project
3. Add PostgreSQL
4. Add GitHub repo
5. Deploy!

### Database

Use one of:
- **Supabase** (free) - https://supabase.com
- **Neon** (free) - https://neon.tech
- **Railway** (free tier) - included with deployment

---

## Local Development

```bash
# Install dependencies
pnpm install

# Start PostgreSQL (Docker)
docker run --name recipe-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=recipe_db -p 5432:5432 -d postgres

# Set up .env
cp apps/api/.env.example apps/api/.env
# Edit DATABASE_URL

# Push schema
cd apps/api
npx prisma db push

# Seed data
npx tsx prisma/seed.ts
npx tsx prisma/seed3.ts

# Run
cd ../..
pnpm dev
```

---

## Environment Variables

### apps/api/.env
```
DATABASE_URL="postgresql://user:password@host:5432/recipe_db"
JWT_SECRET="your-random-secret"
PORT=8080
FRONTEND_URL="https://yourdomain.com"
```

### apps/web/.env.local
```
NEXT_PUBLIC_API_URL=https://your-api.onrender.com
```

---

## AdSense Setup

1. Get your AdSense publisher ID
2. Update in `apps/web/src/app/layout.tsx`
3. Create ad units in AdSense dashboard
4. Replace ad slot IDs in recipe page
