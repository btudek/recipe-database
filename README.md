# Recipe Database

A production-grade global recipe platform built with Next.js, Fastify, PostgreSQL, and Prisma.

## Features

- 🍳 **Recipe Management**: Create, scale, and customize recipes
- 📐 **Portion Scaling**: Scale recipes from 0.5x to 3x with automatic unit conversion
- 👨‍🍳 **Michelin Mode**: Toggle professional chef techniques
- 🔄 **Unit Conversion**: US/Metric toggle
- 🔍 **SEO Optimized**: JSON-LD schema, rich results
- 👤 **User Accounts**: Save, rate, and comment on recipes
- 🖨️ **Print View**: Clean, ad-free printing

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Backend**: Fastify, Node.js, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Search**: PostgreSQL Full-Text Search

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- pnpm (recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/recipe-database.git
cd recipe-database
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

4. Update `.env` files with your database URL:
```
DATABASE_URL="postgresql://user:password@localhost:5432/recipe_db"
JWT_SECRET="your-secret-key"
FRONTEND_URL="http://localhost:3000"
```

5. Generate Prisma client and push schema:
```bash
pnpm db:generate
pnpm db:push
```

6. Seed the database (optional):
```bash
pnpm db:seed
```

7. Start development servers:
```bash
pnpm dev
```

- Frontend: http://localhost:3000
- API: http://localhost:3001

## Project Structure

```
recipe-database/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Fastify API
├── packages/
│   ├── schema/       # Prisma schema
│   └── shared/       # Shared utilities (scaling, units)
├── docs/
│   └── spec/         # Product specifications
└── ops/
    ├── infra/        # Infrastructure config
    └── runbooks/    # Operational runbooks
```

## API Endpoints

### Recipes
- `GET /api/recipes` - List recipes
- `GET /api/recipes/:slug` - Get recipe
- `GET /api/search?q=` - Search recipes

### Auth
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login

### User
- `GET /api/users/me` - Current user
- `GET /api/users/saved` - Saved recipes
- `POST /api/users/saved/:id` - Save recipe

## Deployment

### Vercel (Frontend)
```bash
cd apps/web
vercel deploy
```

### Fly.io / Render (API)
```bash
cd apps/api
fly deploy
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT
