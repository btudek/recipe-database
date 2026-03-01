# Recipe Validation Engine - Recipe Database

## Overview
Every recipe must pass validation before publishing. This ensures quality, safety, and consistency.

---

## Validation Rules

### 1. Ingredient-Step Alignment

**Rule**: Every ingredient in the list must be referenced in at least one step.

**Check**:
```
For each ingredient:
  - Does step text contain ingredient name?
  - Are variations handled? (e.g., "salt" matches "kosher salt")
  
For each step:
  - Are all referenced ingredients in the ingredient list?
```

**Failure**:
- Ingredient listed but never used → Warning
- Ingredient used but not listed → Error (block publish)

### 2. Temperature Accuracy

**Rule**: All meat temperatures must be USDA-safe.

**Standards** (Internal Temp °F):
| Item | Safe Temp |
|------|-----------|
| Beef, Pork, Lamb (steaks, roasts) | 145°F + 3min rest |
| Ground meats | 160°F |
| Poultry (all) | 165°F |
| Fish | 145°F |
| Shellfish | 145°F |

**Check**:
```
For each step mentioning temperature:
  - Is it within safe range?
  - Is Fahrenheit and/or Celsius specified?
```

**Failure** → Error with suggestion

### 3. Time Realism

**Rule**: Cooking times must be realistic for the dish type.

**Checks**:
```
- Prep time: 5min - 2hrs
- Cook time: 5min - 8hrs
- Total time: reasonable for dish type

- Time must match technique:
  * Searing: 2-4 min per side
  * Roasting chicken: 20 min/lb @ 375°F
  * Boiling pasta: 8-12 min
```

**Failure** → Warning with explanation

### 4. Scaling Integrity

**Rule**: Scaling must not break ingredient logic.

**Checks**:
```
For scaling factor 0.25 to 10:
  - Does quantity round intelligently?
  - Are eggs handled? (minimum 1, fractional = whole + remainder)
  - Are "a pinch", "to taste" handled?
  - Does instruction still make sense?
  
Special cases:
  - Eggs: round up to nearest whole
  - Salt: scale proportionally  
  - Leavening: scale proportionally
  - Aromatics: scale proportionally
```

**Failure** → Block scaling factor or show warning

### 5. Duplicate Detection

**Rule**: No near-duplicate recipes.

**Check**:
```
- Title similarity > 80%
- Ingredient overlap > 90%
- Instruction similarity > 80%
```

**Failure** → Flag for review

### 6. Schema Validation

**Rule**: JSON-LD must be valid and complete.

**Checks**:
```
- All required fields present
- @type is "Recipe"
- name is non-empty
- image is array with at least one URL
- recipeIngredient is array
- recipeInstructions is array
- Dates are ISO 8601
-prepTime/cookTime are ISO 8601 duration
```

**Failure** → Block publish

### 7. Michelin Mode Consistency

**Rule**: When Michelin mode is ON, all steps must have enhanced notes.

**Check**:
```
For each step:
  - Does michelinNote exist?
  - Is it substantive? (> 20 chars)
  - Does it add value (not just repeats instruction)?
```

**Failure** → Warning (not blocking)

### 8. Unit Conversion

**Rule**: All conversions must be accurate.

**Checks**:
```
- US to Metric: accurate to 2 decimal places
- Metric to US: appropriate precision
- Kitchen-safe fractions (1/4, 1/3, 1/2, 2/3, 3/4)
- No 0.03 eggs
```

---

## Validation API

### Endpoint
```
POST /api/validate/recipe
Body: { recipeId: string }
Response: {
  valid: boolean,
  errors: ValidationError[],
  warnings: ValidationWarning[]
}
```

### ValidationError (blocks publish)
```json
{
  "type": "ingredient_missing | temp_unsafe | time_unrealistic | schema_invalid",
  "field": "step 3",
  "message": "Ingredient 'garlic' used in step 3 but not in ingredient list",
  "suggestion": "Add 3 cloves garlic to ingredient list"
}
```

### ValidationWarning (non-blocking)
```json
{
  "type": "ingredient_unused | michelin_empty | scaling_edge",
  "field": "ingredient: salt",
  "message": "Salt is listed but never explicitly used in steps"
}
```

---

## Validation Workflow

```
1. Author creates/edits recipe
   ↓
2. Author clicks "Submit for Review"
   ↓
3. Validation Engine runs all checks
   ↓
4. IF errors exist:
     - Show errors to author
     - Block publish
     - Allow re-submit after fixes
   ↓
5. IF only warnings:
     - Show warnings
     - Allow publish with acknowledgment
   ↓
6. IF clean:
     - Allow publish
     - Mark as validated
```

---

## Scheduled Validation

### Daily Cron Job
```
- Run validation on all published recipes
- Flag any that have degraded
- Notify admin of issues
- Recalculate for scaling factors
```

---

## Special Rules

### Eggs
- Minimum display: 1 egg
- Fractional eggs: Show as "X whole eggs + Y tbsp"
- For scaling < 1: Round up to 1

### "To Taste" Ingredients
- Salt, pepper, spices: Always "to taste"
- Don't scale numerically
- Show ratio reminder: "about 1/4 tsp per pound"

### Non-Linear Items
- "1 onion, diced": Scale quantity, not preparation
- "2 cloves garlic": Scale count

---

## Food Safety Constants

### USDA Safe Temperatures (°F)
```javascript
const SAFE_TEMPS = {
  beef_steak: 145,
  beef_ground: 160,
  pork_steak: 145,
  pork_ground: 160,
  lamb_steak: 145,
  lamb_ground: 160,
  poultry_any: 165,
  fish_any: 145,
  shellfish: 145,
  eggs_dishes: 160
}
```
