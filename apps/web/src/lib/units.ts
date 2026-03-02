// Unit Conversion Utilities
// All internal storage is in metric base units

export const UNIT_TYPES = {
  WEIGHT: 'weight',
  VOLUME: 'volume',
  COUNT: 'count',
} as const;

export type UnitType = typeof UNIT_TYPES[keyof typeof UNIT_TYPES];

// Base units for internal storage
export const BASE_UNITS: Record<UnitType, string> = {
  [UNIT_TYPES.WEIGHT]: 'g',
  [UNIT_TYPES.VOLUME]: 'ml',
  [UNIT_TYPES.COUNT]: 'item',
};

// Conversion constants
export const CONVERSIONS = {
  // Weight
  g_per_oz: 28.3495,
  g_per_lb: 453.592,
  g_per_kg: 1000,
  
  // Volume
  ml_per_cup: 236.588,
  ml_per_floz: 29.5735,
  ml_per_tbsp: 14.7868,
  ml_per_tsp: 4.92892,
  ml_per_l: 1000,
  ml_per_gal: 3785.41,
  
  // Temperature
  f_to_c: (f: number) => (f - 32) * 5/9,
  c_to_f: (c: number) => c * 9/5 + 32,
};

// US display units
export const US_UNITS: Record<string, { unit: string; type: UnitType; toBase: number }> = {
  oz: { unit: 'oz', type: UNIT_TYPES.WEIGHT, toBase: CONVERSIONS.g_per_oz },
  lb: { unit: 'lb', type: UNIT_TYPES.WEIGHT, toBase: CONVERSIONS.g_per_lb },
  cup: { unit: 'cup', type: UNIT_TYPES.VOLUME, toBase: CONVERSIONS.ml_per_cup },
  floz: { unit: 'fl oz', type: UNIT_TYPES.VOLUME, toBase: CONVERSIONS.ml_per_floz },
  tbsp: { unit: 'tbsp', type: UNIT_TYPES.VOLUME, toBase: CONVERSIONS.ml_per_tbsp },
  tsp: { unit: 'tsp', type: UNIT_TYPES.VOLUME, toBase: CONVERSIONS.ml_per_tsp },
  gallon: { unit: 'gal', type: UNIT_TYPES.VOLUME, toBase: CONVERSIONS.ml_per_gal },
  quart: { unit: 'qt', type: UNIT_TYPES.VOLUME, toBase: CONVERSIONS.ml_per_cup * 4 },
  pint: { unit: 'pt', type: UNIT_TYPES.VOLUME, toBase: CONVERSIONS.ml_per_cup * 2 },
};

export const METRIC_UNITS: Record<string, { unit: string; type: UnitType; toBase: number }> = {
  g: { unit: 'g', type: UNIT_TYPES.WEIGHT, toBase: 1 },
  kg: { unit: 'kg', type: UNIT_TYPES.WEIGHT, toBase: CONVERSIONS.g_per_kg },
  mg: { unit: 'mg', type: UNIT_TYPES.WEIGHT, toBase: 0.001 },
  ml: { unit: 'ml', type: UNIT_TYPES.VOLUME, toBase: 1 },
  l: { unit: 'L', type: UNIT_TYPES.VOLUME, toBase: CONVERSIONS.ml_per_l },
};

// Detect unit type from string
export function detectUnitType(unit: string): UnitType {
  const u = unit.toLowerCase();
  if (['g', 'kg', 'mg', 'oz', 'lb', 'pound'].includes(u)) return UNIT_TYPES.WEIGHT;
  if (['ml', 'l', 'cup', 'cups', 'tbsp', 'tsp', 'floz', 'fl oz', 'gallon', 'quart', 'pint'].includes(u)) return UNIT_TYPES.VOLUME;
  return UNIT_TYPES.COUNT;
}

// Convert any unit to base metric
export function toBaseMetric(quantity: number, unit: string): number {
  const u = unit.toLowerCase();
  
  // Already metric
  if (u === 'g') return quantity;
  if (u === 'kg') return quantity * CONVERSIONS.g_per_kg;
  if (u === 'mg') return quantity * 0.001;
  if (u === 'ml') return quantity;
  if (u === 'l') return quantity * CONVERSIONS.ml_per_l;
  
  // US to metric
  if (u === 'oz') return quantity * CONVERSIONS.g_per_oz;
  if (u === 'lb') return quantity * CONVERSIONS.g_per_lb;
  if (u === 'cup' || u === 'cups') return quantity * CONVERSIONS.ml_per_cup;
  if (u === 'tbsp') return quantity * CONVERSIONS.ml_per_tbsp;
  if (u === 'tsp' || u === 'teaspoon') return quantity * CONVERSIONS.ml_per_tsp;
  if (u === 'fl oz' || u === 'floz') return quantity * CONVERSIONS.ml_per_floz;
  if (u === 'gallon' || u === 'gal') return quantity * CONVERSIONS.ml_per_gal;
  if (u === 'quart' || u === 'qt') return quantity * CONVERSIONS.ml_per_cup * 4;
  if (u === 'pint' || u === 'pt') return quantity * CONVERSIONS.ml_per_cup * 2;
  
  // Count items
  return quantity;
}

// Convert base metric to US
export function toUS(quantityInBase: number, type: UnitType): { value: number; unit: string } {
  if (type === UNIT_TYPES.WEIGHT) {
    if (quantityInBase >= CONVERSIONS.g_per_lb) {
      return { value: quantityInBase / CONVERSIONS.g_per_lb, unit: 'lb' };
    }
    return { value: quantityInBase / CONVERSIONS.g_per_oz, unit: 'oz' };
  }
  
  if (type === UNIT_TYPES.VOLUME) {
    if (quantityInBase >= CONVERSIONS.ml_per_gal) {
      return { value: quantityInBase / CONVERSIONS.ml_per_gal, unit: 'gal' };
    }
    if (quantityInBase >= CONVERSIONS.ml_per_cup) {
      return { value: quantityInBase / CONVERSIONS.ml_per_cup, unit: 'cup' };
    }
    if (quantityInBase >= CONVERSIONS.ml_per_tbsp) {
      return { value: quantityInBase / CONVERSIONS.ml_per_tbsp, unit: 'tbsp' };
    }
    return { value: quantityInBase / CONVERSIONS.ml_per_tsp, unit: 'tsp' };
  }
  
  return { value: quantityInBase, unit: '' };
}

// Convert base metric to metric display
export function toMetricDisplay(quantityInBase: number, type: UnitType): { value: number; unit: string } {
  if (type === UNIT_TYPES.WEIGHT) {
    if (quantityInBase >= 1000) {
      return { value: quantityInBase / 1000, unit: 'kg' };
    }
    return { value: Math.round(quantityInBase), unit: 'g' };
  }
  
  if (type === UNIT_TYPES.VOLUME) {
    if (quantityInBase >= 1000) {
      return { value: quantityInBase / 1000, unit: 'L' };
    }
    return { value: Math.round(quantityInBase), unit: 'ml' };
  }
  
  return { value: quantityInBase, unit: '' };
}

// Smart rounding for display
export function smartRound(value: number, type: UnitType): number {
  if (type === UNIT_TYPES.WEIGHT) {
    if (value >= 100) return Math.round(value);
    if (value >= 10) return Math.round(value * 10) / 10;
    return Math.round(value * 100) / 100;
  }
  
  if (type === UNIT_TYPES.VOLUME) {
    if (value >= 100) return Math.round(value);
    if (value >= 10) return Math.round(value * 10) / 10;
    return Math.round(value * 100) / 100;
  }
  
  return Math.round(value * 100) / 100;
}

// Handle eggs specially
export function formatEggs(quantity: number): string {
  const whole = Math.floor(quantity);
  const fraction = quantity - whole;
  
  if (fraction === 0) return `${whole} egg${whole !== 1 ? 's' : ''}`;
  if (whole === 0) {
    if (fraction <= 0.25) return '1 egg white';
    if (fraction <= 0.5) return '1 egg yolk';
    return '1 egg';
  }
  
  // Mixed: "2 eggs + 1 tbsp"
  return `${whole} egg${whole !== 1 ? 's' : ''}`;
}
