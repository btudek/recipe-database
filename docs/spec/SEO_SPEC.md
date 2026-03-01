# SEO Specification - Recipe Database

## Overview
Recipe Database must achieve SEO dominance through structured data, content quality, and technical excellence.

---

## Schema Markup (Mandatory)

### JSON-LD Recipe Schema
Every recipe page MUST include:
```json
{
  "@context": "https://schema.org/",
  "@type": "Recipe",
  "name": "Recipe Title",
  "image": ["https://..."],
  "author": {
    "@type": "Organization",
    "name": "Recipe Database"
  },
  "datePublished": "2026-03-01",
  "description": "SEO description...",
  "prepTime": "PT15M",
  "cookTime": "PT30M",
  "totalTime": "PT45M",
  "recipeYield": "4 servings",
  "recipeCategory": "Dessert",
  "recipeCuisine": "Italian",
  "keywords": "pasta, italian, easy",
  "nutrition": {
    "@type": "NutritionInformation",
    "calories": "450 calories"
  },
  "recipeIngredient": [
    "2 cups flour",
    "1 cup sugar"
  ],
  "recipeInstructions": [
    {
      "@type": "HowToStep",
      "text": "Step 1 text...",
      "position": 1
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "ratingCount": "127"
  },
  "recipeRating": {
    "@type": "Rating",
    "ratingValue": "5"
  }
}
```

### Breadcrumb Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://recipedatabase.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Italian",
      "item": "https://recipedatabase.com/cuisine/italian"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Pasta"
    }
  ]
}
```

### FAQ Schema
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can I freeze this recipe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, this recipe freezes well for up to 3 months..."
      }
    }
  ]
}
```

---

## Keyword Strategy

### Per-Recipe Keywords
- **Primary Keyword**: Main dish name (e.g., "Chicken Parmesan")
- **Secondary Keywords** (5-10):
  - Cuisine name
  - Difficulty level
  - Cooking method
  - Meal type (dinner, lunch)
  - Dietary tags
  - Occasion

### Content Depth Requirements
- Pillar dishes: 1500+ words
- Standard recipes: 800-1200 words
- Quick recipes: 500-800 words

### FAQ Section
Every recipe must include:
- Can I make this ahead?
- Can I freeze leftovers?
- What can I substitute for [ingredient]?
- How long does it keep?
- Can I double the recipe?

---

## Technical SEO

### URL Structure
```
/                      - Homepage
/cuisine/[name]        - Cuisine page
/category/[name]      - Category page
/recipe/[slug]        - Recipe page
/search               - Search results
```

### Canonical URLs
- Self-referencing canonical on every page
- HTTPS only

### Sitemap
- Auto-generated from database
- Priority levels:
  - Homepage: 1.0
  - Cuisine/Category: 0.9
  - Recipes: 0.8
  - Static pages: 0.7

### Robots.txt
```
User-agent: *
Allow: /
Sitemap: https://recipedatabase.com/sitemap.xml
```

### Performance Targets
- Lighthouse Performance: 90+
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1
- First Input Delay: <100ms

---

## Internal Linking

### Required Links
- Related recipes (at least 3 per recipe)
- Cuisine index page
- Category index page
- Homepage footer links

### Anchor Text Rules
- Use descriptive anchor text
- Include keywords naturally
- Avoid "click here"

---

## Image SEO

### Requirements
- Descriptive filename (chicken-parmesan.jpg)
- Alt text required (e.g., "Golden baked Chicken Parmesan with melted mozzarella")
- WebP format preferred
- Lazy loading enabled
- Responsive srcset

---

## Content Rules

### Original Content Only
- Never scrape or republish copyrighted recipes
- All recipes must be original
- Structurally improved versions OK
- Measurement consistency required
- Ingredient-step alignment required

### Duplicate Prevention
- Canonical tags prevent self-duplication
- Unique titles for each recipe
- No thin content pages

---

## Mobile SEO

### Requirements
- Responsive design mandatory
- Mobile-first indexing compliant
- Touch-friendly navigation
- Readable without zoom
- Fast tap interactions
