# Data Model - Recipe Database

## Database: PostgreSQL
## ORM: Prisma

---

## Core Entities

### User
```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  username     String   @unique
  passwordHash String
  displayName  String?
  avatarUrl    String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  // Relations
  savedRecipes  UserSavedRecipe[]
  userRecipes   UserRecipe[]
  comments      Comment[]
  ratings       Rating[]
}
```

### Recipe (Canonical)
```prisma
model Recipe {
  id              String   @id @default(cuid())
  slug            String   @unique
  title           String
  description     String   @db.Text
  seoDescription  String?  @db.Text
  
  // Times (in minutes)
  prepTime        Int
  cookTime        Int
  totalTime       Int?
  yield           Int      // servings
  
  // Categorization
  cuisineId       String
  categoryId      String
  
  // SEO
  primaryKeyword  String?
  metaTitle      String?
  metaDescription String?
  
  // Content
  proTips         String?  @db.Text
  storageInfo    String?  @db.Text
  nutrition      Json?    // { calories, protein, carbs, fat, fiber }
  
  // Status
  status          String   @default("draft") // draft, published
  publishedAt    DateTime?
  
  // Timestamps
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  // Relations
  cuisine         Cuisine       @relation(fields: [cuisineId], references: [id])
  category        Category      @relation(fields: [categoryId], references: [id])
  ingredients     Ingredient[]
  steps           RecipeStep[]
  versions        RecipeVersion[]
  savedBy         UserSavedRecipe[]
  comments        Comment[]
  ratings         Rating[]
  userRecipes     UserRecipe[]
  relatedFrom     RecipeRelated[] @relation("RecipeRelatedFrom")
  relatedTo       RecipeRelated[] @relation("RecipeRelatedTo")
}
```

### RecipeVersion
```prisma
model RecipeVersion {
  id              String   @id @default(cuid())
  recipeId        String
  versionNumber   Int
  
  // Snapshot fields
  title           String
  description     String  @db.Text
  ingredients     Json    // Serialized ingredient list
  steps           Json    // Serialized steps
  
  createdAt      DateTime @default(now())
  
  // Relations
  recipe          Recipe  @relation(fields: [recipeId], references: [id])
}
```

### Cuisine
```prisma
model Cuisine {
  id          String   @id @default(cuid())
  name        String   @unique
  slug        String   @unique
  description String?
  imageUrl    String?
  
  recipes     Recipe[]
}
```

### Category
```prisma
model Category {
  id          String   @id @default(cuid())
  name        String   @unique
  slug        String   @unique
  description String?
  imageUrl    String?
  
  recipes     Recipe[]
}
```

### Ingredient
```prisma
model Ingredient {
  id              String   @id @default(cuid())
  recipeId        String
  name            String
  quantity        Float    // Base metric quantity
  unit            String   // Base unit (g, ml, tsp, etc.)
  notes           String?  // "finely chopped", "room temperature"
  orderIndex      Int
  
  // Relations
  recipe          Recipe   @relation(fields: [recipeId], references: [id])
}
```

### RecipeStep
```prisma
model RecipeStep {
  id              String   @id @default(cuid())
  recipeId        String
  stepNumber      Int
  instruction     String   @db.Text
  
  // Optional: reference ingredients used in this step
  ingredientRefs  String?  // JSON array of ingredient names
  
  // Michelin mode additions
  michelinNote    String?  @db.Text
  
  // Relations
  recipe          Recipe   @relation(fields: [recipeId], references: [id])
}
```

### RecipeRelated
```prisma
model RecipeRelated {
  id          String   @id @default(cuid())
  fromRecipeId String
  toRecipeId   String
  
  fromRecipe  Recipe   @relation("RecipeRelatedFrom", fields: [fromRecipeId], references: [id])
  toRecipe    Recipe   @relation("RecipeRelatedTo", fields: [toRecipeId], references: [id])

  @@unique([fromRecipeId, toRecipeId])
}
```

---

## User-Generated Content

### UserRecipe
```prisma
model UserRecipe {
  id              String   @id @default(cuid())
  userId          String
  sourceRecipeId  String?  // If duplicated from canonical
  
  title           String
  description     String?  @db.Text
  isPublic        Boolean  @default(false)
  isPublished    Boolean  @default(false)
  
  // Flexible ingredient/step storage
  ingredients     Json     // Array of { name, quantity, unit, notes }
  steps           Json     // Array of { stepNumber, instruction }
  
  notes           String?  @db.Text
  
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  
  // Relations
  user            User     @relation(fields: [userId], references: [id])
  sourceRecipe    Recipe?  @relation(fields: [sourceRecipeId], references: [id])
}
```

### UserSavedRecipe
```prisma
model UserSavedRecipe {
  id          String   @id @default(cuid())
  userId      String
  recipeId    String
  savedAt     DateTime @default(now())
  
  // Relations
  user        User     @relation(fields: [userId], references: [id])
  recipe      Recipe   @relation(fields: [recipeId], references: [id])
  
  @@unique([userId, recipeId])
}
```

### Comment
```prisma
model Comment {
  id          String   @id @default(cuid())
  userId      String
  recipeId    String
  content     String   @db.Text
  
  // Moderation
  isApproved  Boolean  @default(true)
  isDeleted   Boolean  @default(false)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  user        User     @relation(fields: [userId], references: [id])
  recipe      Recipe   @relation(fields: [recipeId], references: [id])
}
```

### Rating
```prisma
model Rating {
  id          String   @id @default(cuid())
  userId      String
  recipeId    String
  value       Int      // 1-5
  
  createdAt   DateTime @default(now())
  
  // Relations
  user        User     @relation(fields: [userId], references: [id])
  recipe      Recipe   @relation(fields: [recipeId], references: [id])
  
  @@unique([userId, recipeId])
}
```

---

## Future Entities (Phase 2-4)

### EquipmentRecommendation
```prisma
model EquipmentRecommendation {
  id          String   @id @default(cuid())
  recipeId    String?
  categoryId  String?
  
  name        String
  description String
  amazonLink  String?
  imageUrl    String?
  affiliate   Boolean  @default(false)
  
  // Relations
  recipe      Recipe?  @relation(fields: [recipeId], references: [id])
}
```

### GroceryIntegrationConfig
```prisma
model GroceryIntegrationConfig {
  id          String   @id @default(cuid())
  userId      String
  
  provider    String   // "instacart", "walmart", "kroger"
  config      Json     // Encrypted API credentials
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## Unit Conversion Reference

### Base Units (Internal Storage)
| Type | Base Unit |
|------|-----------|
| Weight | grams (g) |
| Volume | milliliters (ml) |
| Count | items |

### Display Units
| Base | US | Metric |
|------|-----|--------|
| g | oz | g |
| ml | cups / fl oz | ml |
| kg | lb | kg |
| ml | tbsp | ml |
| ml | tsp | ml |

### Conversion Rules
- 1 oz = 28.35g
- 1 lb = 453.6g
- 1 cup = 236.6ml
- 1 tbsp = 14.8ml
- 1 tsp = 4.9ml
- 1 fl oz = 29.6ml

---

## Indexes

```prisma
// Recipe indexes
@@index([cuisineId])
@@index([categoryId])
@@index([status, publishedAt])
@@index([slug])

// Search
@@index([title])
@@index([description])

// User content
@@index([userId])
@@index([userId, isPublic])
```

---

## Enums

```prisma
enum RecipeStatus {
  draft
  published
  archived
}

enum UnitSystem {
  us
  metric
}
```
