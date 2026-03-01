# Grocery Integration Future - Recipe Database

## Phase 3: Grocery Cart Integration

*Note: This feature is architectured but NOT implemented in Phase 1.*

---

## Vision
Allow users to automatically add recipe ingredients to their local grocery cart.

---

## User Flow

```
1. User views recipe
2. Clicks "Add to Grocery Cart"
3. Selects grocery provider (or uses default)
4. System maps ingredients to grocery products
5. User reviews cart
6. Complete purchase or export list
```

---

## Integration Architecture

### Pluggable Provider Layer

```
packages/shared/grocery/
├── index.ts          # Unified API
├── providers/
│   ├── instacart.ts
│   ├── walmart.ts
│   ├── kroger.ts
│   └── amazon-fresh.ts
├── mapper.ts         # Ingredient to product matching
└── types.ts
```

### Provider Interface

```typescript
interface GroceryProvider {
  name: string;
  
  // Search for products matching ingredient
  search(query: ProductQuery): Promise<Product[]>;
  
  // Check stock at location
  checkStock(productIds: string[], zipCode: string): Promise<StockStatus[]>;
  
  // Create cart with products
  createCart(items: CartItem[]): Promise<Cart>;
  
  // Generate checkout URL
  getCheckoutUrl(cartId: string): string;
  
  // Get substitutions for out-of-stock items
  getSubstitutions(productId: string): Promise<Product[]>;
}
```

---

## Implementation Strategies

### Strategy 1: Full API Integration (Ideal)
- Direct API access where available
- Real-time stock checking
- Full cart management

**Providers**:
- Instacart API (enterprise)
- Walmart API
- Kroger API

**Requirements**:
- API keys / OAuth
- Provider approval
- Integration development

### Strategy 2: Affiliate Links (Fallback)
- Generate search-based cart URLs
- Pre-filled search queries
- Affiliate revenue share

**Example**:
```
Walmart: https://www.walmart.com/search?q=ingredient+name
Instacart: https://www.instacart.com/store/search?q=ingredient
Amazon: https://www.amazon.com/s?k=ingredient+name
```

### Strategy 3: List Export
- Export ingredient list as:
  - CSV
  - Text list
  - Printable PDF
- User shops manually

---

## Ingredient Mapping

### Challenge
Recipe: "1 lb chicken breast"
Grocery: Hundreds of chicken products

### Solution: Smart Matching

```typescript
const UNIT_EQUIVALENTS = {
  "lb": ["pound", "pounds", "lb", "lbs"],
  "oz": ["ounce", "ounces", "oz"],
  "cup": ["cup", "cups"],
  // ...
};

const PRODUCT_TAGS = {
  "chicken breast": ["poultry", "chicken", "breast", "boneless"],
  "olive oil": ["oil", "olive oil", "extra virgin"],
  // ...
};

function matchIngredient(ingredient: string, products: Product[]): Product[] {
  // 1. Parse quantity + unit
  // 2. Extract ingredient name
  // 3. Match against product tags
  // 4. Rank by relevance
  // 5. Return top matches
}
```

---

## Data Model Extension

### GroceryIntegrationConfig (Future)
```prisma
model GroceryIntegrationConfig {
  id          String   @id @default(cuid())
  userId      String
  
  provider    String   // "instacart" | "walmart" | "kroger" | "amazon"
  
  // API credentials (encrypted)
  accessToken String?
  refreshToken String?
  expiresAt   DateTime?
  
  // User preferences
  defaultStore String?
  zipCode     String?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## UI Components

### Add to Cart Button
```
[🛒 Add to Grocery Cart]
```

### Cart Preview Modal
- List of ingredients
- Matched products (with prices)
- Substitutions for out-of-stock
- Total estimated cost

### Provider Selection
- First-time: Select default provider
- Settings: Change provider

---

## Stock Status Display

```
✓ In Stock (show price)
✕ Out of Stock → [Suggest Alternative]
~ Limited Stock (only X left)
```

---

## Error Handling

| Scenario | Handling |
|----------|----------|
| API down | Fall back to search links |
| No matches | Show "no products found" + manual search |
| Out of stock | Auto-suggest alternatives |
| Price changed | Show current price before checkout |

---

## Privacy

- Only send ingredient list to provider APIs
- Do not store shopping history
- Clear credentials on logout
- OAuth2 for secure token handling

---

## Future Enhancements

1. **Order History**: Remember past orders
2. **Price Alerts**: Notify when ingredients on sale
3. **Recipe Cost**: Calculate total recipe cost
4. **Smart Substitutions**: Learn user preferences
5. **Delivery Scheduling**: Pick delivery window
6. **Club Cards**: Support store loyalty programs

---

## Phase 3 Timeline (Future)

- Month 1: Provider research + API applications
- Month 2: Provider interface development
- Month 3: Integration + testing
- Month 4: Beta with select users
- Month 5: Full launch
