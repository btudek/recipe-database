# Affiliate Model Future - Recipe Database

## Phase 4: Cookware + Affiliate Layer

*Note: This feature is architectured but NOT implemented in Phase 1.*

---

## Vision
Recommend quality cookware and ingredients used in recipes without invasive advertising.

---

## Guiding Principles

1. **Non-Invasive**: Never interrupt the cooking experience
2. **Clean**: No popups, no aggressive banners
3. **Optional**: User can ignore completely
4. **Contextual**: Only show relevant recommendations
5. **Quality First**: Recommend tools that actually help

---

## Implementation Options

### Option A: Contextual Recommendations
Show equipment under each recipe where relevant.

```
Recipe: Perfect Omelet
↓ 
Recommended Equipment:
- 8-inch non-stick pan (best for omelets)
- Spatula (silicone, heat resistant)
- Whisk (balloon, stainless)
```

### Option B: Shop Page
Dedicated shop section, linked from footer.

```
/shop
  /cookware
  /utensils
  /ingredients
```

### Option C: Amazon Associates
Traditional affiliate links.

```
[Buy on Amazon: $24.99] → Affiliate link
```

---

## Recommended Approach

**Hybrid Model**:
- Contextual recommendations (Option A) - Primary
- Clean shop page (Option B) - Secondary
- Amazon affiliate (Option C) - Supplement

---

## Display Locations

### Recipe Page
- **Desktop**: Right sidebar "Equipment Needed"
- **Mobile**: Bottom of ingredients section (collapsible)
- **Print**: Never show

### Homepage
- None (keep clean)

### Shop Page
- Full catalog with filters

---

## Data Model

### EquipmentRecommendation (Future)
```prisma
model EquipmentRecommendation {
  id          String   @id @default(cuid())
  
  // Optional link to recipe
  recipeId    String?
  
  // Optional link to category
  categoryId  String?
  
  name        String
  description String
  brand       String?
  
  // Affiliate
  amazonAsin  String?
  amazonLink  String?
  targetLink  String?  // Direct to brand
  
  // Display
  price       Decimal?
  imageUrl    String?
  
  // Metadata
  affiliate   Boolean  @default(false)
  priority    Int      @default(0)  // Higher = show first
  
  // Relations
  recipe      Recipe?  @relation(fields: [recipeId], references: [id])
  category    Category? @relation(fields: [categoryId], references: [id])
}
```

### Categories
```typescript
const EQUIPMENT_CATEGORIES = [
  "Cookware",      // Pots, pans
  "Bakeware",      // Sheets, dishes
  "Utensils",      // Spatulas, whisks
  "Knives",        // Cutlery
  "Appliances",    // Mixers, processors
  "Storage",       // Containers
  "Gadgets",       // Specialty tools
];
```

---

## Content Guidelines

### For Each Recommendation
- Why this tool matters
- What to look for (if buying elsewhere)
- Price range (not specific price - changes too often)

### Tone
- Helpful, not salesy
- "This helps because..." not "You must buy..."
- Alternatives acknowledged

### Examples
```
Good: "A wide spatula makes flipping delicate foods easier. 
       Look for one with a thin edge and heat-resistant handle."

Bad: "YOU NEED THIS SPATULA NOW!!! Only $19.99!!!"
```

---

## Revenue Model

### Amazon Associates
- Standard affiliate rates (1-10% depending on category)
- Tracking via Amazon tag

### Direct Partnerships
- Commission on sales
- Higher margins possible
- More work to establish

### Important Notes
- Disclose affiliate relationships
- Only recommend products we'd use ourselves
- Revenue secondary to user trust

---

## UI Mockup

### Recipe Page - Equipment Section

```markdown
## Equipment You'll Need

| Tool | Why It Helps | Buy |
|------|--------------|-----|
| 10" Skillet | Perfect size for 4 servings | [Amazon $35] |
| Silicone Spatula | Heat resistant, won't scratch | [Amazon $12] |
| Instant-Read Thermometer | Ensures perfect doneness | [Amazon $25] |

*These are affiliate links. We only recommend tools we use and trust.*
```

### Collapsed (Mobile)
```
Equipment (3 items) [▼ Expand]
```

---

## Technical Implementation

### Tracking
```typescript
// Track clicks (anonymized)
function trackAffiliateClick(productId: string, source: string) {
  analytics.track('affiliate_click', {
    product_id: productId,
    source: source,
    timestamp: new Date(),
  });
}
```

### Cookie Handling
- 24-hour attribution window
- No cross-site tracking
- GDPR compliant

---

## Revenue Allocation

| Use | Percentage |
|-----|------------|
| Operating costs | 30% |
| Content creation | 30% |
| Reserves | 20% |
| Owner/team | 20% |

---

## Future Enhancements

1. **Verified Reviews**: In-depth equipment reviews
2. **Gift Guides**: Curated gift lists
3. **Sales Tracking**: "This item is on sale now"
4. **User Submissions**: Users recommend their favorites
5. **Comparison Charts**: Side-by-side tool comparisons

---

## Phase 4 Timeline (Future)

- Month 1: Equipment database creation
- Month 2: Amazon Associates setup
- Month 3: UI development
- Month 4: Content writing (why each tool matters)
- Month 5: Beta with select recipes
- Month 6: Full rollout

---

## Competition Analysis

| Site | Approach | Strengths | Weaknesses |
|------|----------|-----------|-------------|
| Serious Eats | Editorial affiliate | Trust, quality | Heavy |
| AllRecipes | Amazon links | Simple | Generic |
| Bon Appétit | None | Clean | No revenue |
| NYT Cooking | Subscription | Recurring | Paywall |

**Our differentiator**: Contextual + helpful + clean

---

## Success Metrics

- Affiliate revenue: $1000/mo by end of Year 1
- Click-through rate: >2%
- User trust score: >4.5/5
- No negative feedback on recommendations
