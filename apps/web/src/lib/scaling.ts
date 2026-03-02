import { 
  toBaseMetric, 
  toUS, 
  toMetricDisplay, 
  smartRound, 
  detectUnitType,
  UNIT_TYPES,
  formatEggs 
} from './units';

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  notes?: string;
}

export interface ScaledIngredient extends Ingredient {
  scaledQuantity: number;
  displayQuantity: string;
  displayUnit: string;
}

export type UnitSystem = 'us' | 'metric';

export const SCALE_FACTORS = [0.5, 1, 2, 3] as const;
export type ScaleFactor = typeof SCALE_FACTORS[number] | 'custom';

export interface ScalingOptions {
  factor: number;
  system: UnitSystem;
  originalYield: number;
  targetYield: number;
}

// Special handling for certain ingredients
const SPECIAL_INGREDIENTS: Record<string, { round: boolean; minDisplay: number }> = {
  egg: { round: true, minDisplay: 1 },
  eggs: { round: true, minDisplay: 1 },
  garlic: { round: true, minDisplay: 1 },
  onion: { round: true, minDisplay: 1 },
  scallion: { round: true, minDisplay: 1 },
  shallot: { round: true, minDisplay: 1 },
  'egg white': { round: true, minDisplay: 1 },
  'egg yolk': { round: true, minDisplay: 1 },
};

// Ingredients that should never be scaled below minimum
const MIN_QUANTITIES: Record<string, number> = {
  salt: 0.25, // tsp
  pepper: 0.125, // tsp
  'baking powder': 0.25, // tsp
  'baking soda': 0.125, // tsp
  yeast: 0.25, // tsp
};

function isSpecialIngredient(name: string): boolean {
  const lower = name.toLowerCase().trim();
  return Object.keys(SPECIAL_INGREDIENTS).some(special => 
    lower === special || lower.includes(special)
  );
}

function isEgg(name: string): boolean {
  const lower = name.toLowerCase().trim();
  return lower === 'egg' || lower === 'eggs' || 
         lower === 'egg white' || lower === 'egg yolk' ||
         lower === 'egg whites' || lower === 'egg yolks';
}

function shouldUseMinimum(name: string, quantity: number): number {
  const lower = name.toLowerCase().trim();
  const min = MIN_QUANTITIES[lower];
  if (min && quantity < min) {
    return min;
  }
  return quantity;
}

// Scale a single ingredient
export function scaleIngredient(
  ingredient: Ingredient,
  options: ScalingOptions
): ScaledIngredient {
  const { factor, system, originalYield, targetYield } = options;
  
  // Calculate actual scale factor from yield
  const actualFactor = targetYield / originalYield;
  const scaledQuantity = ingredient.quantity * actualFactor;
  
  // Convert to base metric
  const baseMetric = toBaseMetric(scaledQuantity, ingredient.unit);
  const unitType = detectUnitType(ingredient.unit);
  
  // Get display value based on unit system
  let displayQuantity: number;
  let displayUnit: string;
  
  if (system === 'us') {
    const us = toUS(baseMetric, unitType);
    displayQuantity = smartRound(us.value, unitType);
    displayUnit = us.unit;
  } else {
    const metric = toMetricDisplay(baseMetric, unitType);
    displayQuantity = smartRound(metric.value, unitType);
    displayUnit = metric.unit;
  }
  
  // Special handling for eggs
  if (isEgg(ingredient.name)) {
    return {
      ...ingredient,
      scaledQuantity,
      displayQuantity: formatEggs(actualFactor * ingredient.quantity),
      displayUnit: '',
    };
  }
  
  // Apply minimums for special ingredients
  if (isSpecialIngredient(ingredient.name)) {
    const special = SPECIAL_INGREDIENTS[ingredient.name.toLowerCase()];
    if (special && displayQuantity < special.minDisplay) {
      displayQuantity = special.minDisplay;
    }
  }
  
  // Ensure minimum quantities
  const withMin = shouldUseMinimum(ingredient.name, displayQuantity);
  displayQuantity = Math.max(displayQuantity, withMin);
  
  return {
    ...ingredient,
    scaledQuantity,
    displayQuantity: String(displayQuantity),
    displayUnit,
  };
}

// Scale all ingredients in a recipe
export function scaleRecipe(
  ingredients: Ingredient[],
  options: ScalingOptions
): ScaledIngredient[] {
  return ingredients.map(ing => scaleIngredient(ing, options));
}

// Calculate display string for scaled ingredient
export function formatScaledIngredient(scaled: ScaledIngredient): string {
  const qty = scaled.displayQuantity;
  const unit = scaled.displayUnit;
  const notes = scaled.notes ? `, ${scaled.notes}` : '';
  
  // Handle count items without units
  if (!unit) {
    return `${qty} ${scaled.name}${notes}`;
  }
  
  // Format with unit
  return `${qty} ${unit} ${scaled.name}${notes}`;
}

// Validate scaling factor
export function isValidScaleFactor(factor: number): boolean {
  return factor >= 0.25 && factor <= 10;
}

// Calculate target yield from scale factor
export function calculateYield(originalYield: number, factor: number): number {
  return Math.round(originalYield * factor);
}
