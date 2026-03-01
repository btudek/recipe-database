# Product Specification - Recipe Database

## Project Overview
- **Name**: Recipe Database
- **Type**: Full-stack content + commerce platform
- **Phase**: 1 (Core Web Platform)

## Core Vision
A production-grade global recipe platform with SEO dominance, portion scaling, user accounts, and future grocery/affiliate integration.

## Target Users
- Home cooks (beginner to advanced)
- Food enthusiasts
- Professional chefs seeking technique references

---

## Functional Requirements

### 1. Homepage
- Featured recipes carousel (6-12 items)
- Cuisine browse section
- Category browse section
- Trending recipes grid
- Global search bar
- User account quick access

### 2. Cuisine Pages
- Toggle between text list and photo grid views
- Recipe cards display:
  - AI-generated photo
  - Title
  - Rating (stars)
  - Total time
- Filter by:
  - Prep time
  - Difficulty
  - Dietary restrictions

### 3. Recipe Page (Mandatory Structure)
```
- H1 Title
- SEO Description (2-3 paragraphs)
- Yield (servings)
- Prep Time
- Cook Time  
- Total Time
- Ingredient List (precise quantities)
- Steps (each references quantities used)
- Portion Scaling Control
- Unit Toggle (US / Metric)
- Michelin Technique Mode Toggle (OFF default)
- Pro Tips
- Storage & Reheating Instructions
- Nutrition Panel
- Comments Section
- Ratings
- Related Recipes
```

### 4. Print View
- Clean, minimal layout
- No ads
- Optimized for paper
- Only essential content (title, ingredients, steps)

### 5. User System
- Account creation/login
- Save recipes to collection
- Duplicate recipe into "My Version"
- Edit personal copies
- Add personal notes
- Create private or public recipes
- Rate recipes (1-5 stars)
- Comment on recipes

### 6. Portion Scaling Engine
- Multipliers: 0.5x, 1x, 2x, 3x, custom input
- Base storage in metric units
- Dynamic US/Metric display conversion
- Intelligent rounding
- Special handling for eggs, partial items

### 7. Michelin Technique Mode
When enabled:
- Advanced chef techniques overlay
- Deglazing instructions
- Sauce reduction details
- Temperature precision guidance
- Plating recommendations
- Flavor layering commentary

---

## Non-Functional Requirements

### Performance
- Lighthouse score: 90+
- First Contentful Paint: <1.5s
- Time to Interactive: <3s

### SEO
- Google Recipe rich results compliant
- JSON-LD Recipe schema
- Breadcrumb schema
- Canonical tags
- Auto-generated sitemap
- Robots.txt

### Security
- HTTPS only
- SQL injection prevention (Prisma)
- XSS prevention
- CSRF protection
- Secure session management

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Alt text for all images

---

## Data Models

### Core Entities
- Recipe
- RecipeVersion
- User
- UserRecipe
- UserSavedRecipe
- Comment
- Rating
- Cuisine
- Category
- Ingredient
- Step

### Future (Architectural Only)
- EquipmentRecommendation
- GroceryIntegrationConfig

---

## API Endpoints (Phase 1)

### Recipes
- `GET /api/recipes` - List recipes
- `GET /api/recipes/:id` - Get recipe
- `POST /api/recipes` - Create recipe (admin)
- `PUT /api/recipes/:id` - Update recipe (admin)
- `DELETE /api/recipes/:id` - Delete recipe (admin)

### Users
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/users/me` - Current user
- `PUT /api/users/me` - Update profile

### User Recipes
- `GET /api/users/recipes` - User's recipes
- `POST /api/users/recipes` - Create user recipe
- `PUT /api/users/recipes/:id` - Update user recipe
- `DELETE /api/users/recipes/:id` - Delete user recipe

### Saved Recipes
- `GET /api/users/saved` - Saved recipes
- `POST /api/users/saved/:recipeId` - Save recipe
- `DELETE /api/users/saved/:recipeId` - Unsave recipe

### Comments & Ratings
- `GET /api/recipes/:id/comments` - Recipe comments
- `POST /api/recipes/:id/comments` - Add comment
- `POST /api/recipes/:id/rate` - Rate recipe

### Search
- `GET /api/search` - Full-text search

---

## UI/UX Guidelines

### Layout
- Max content width: 1200px
- Responsive breakpoints:
  - Mobile: <640px
  - Tablet: 640-1024px
  - Desktop: >1024px

### Typography
- Headings: Inter or system-ui
- Body: Inter or system-ui
- Recipe steps: 16px minimum

### Colors
- Primary: #2563EB (blue-600)
- Secondary: #059669 (emerald-600)
- Background: #FFFFFF / #F9FAFB
- Text: #111827 / #6B7280
- Error: #DC2626
- Success: #16A34A

### Spacing
- Base unit: 4px
- Common: 8px, 16px, 24px, 32px, 48px

---

## Monetization (Phase 1)

### AdSense Placements
- Desktop: Below title, mid-content, bottom
- Mobile: Sticky bottom, one inline after ingredients

### Rules
- Never exceed defined placements
- Prioritize user trust over RPM
- No invasive popups
- Clean, minimal approach

---

## Future Phases (Architectured)

### Phase 2: Mobile App
- React Native or Flutter
- Shared API
- Offline save
- Push notifications

### Phase 3: Grocery Integration
- Instacart/Walmart/Kroger API integration
- Cart auto-fill
- Stock status
- Substitution suggestions

### Phase 4: Affiliate Layer
- Non-invasive equipment recommendations
- Amazon/direct affiliate links
- White-labeled shop page
