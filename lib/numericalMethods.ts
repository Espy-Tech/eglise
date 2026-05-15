/**
 * Rectangle Method implementation for numerical integration
 * Supports left, right, and midpoint variants
 */

export type RectangleMethodType = 'left' | 'right' | 'midpoint';

export interface IntegrationResult {
  value: number;
  intervals: number;
  method: string;
  error?: number;
}

/**
 * Rectangle Method - Left endpoint
 */
export const rectangleMethodLeft = (
  func: (x: number) => number,
  a: number,
  b: number,
  n: number
): IntegrationResult => {
  const h = (b - a) / n;
  let sum = 0;

  for (let i = 0; i < n; i++) {
    const x = a + i * h;
    sum += func(x);
  }

  const result = h * sum;

  return {
    value: result,
    intervals: n,
    method: 'Rectangle (Left)',
  };
};

/**
 * Rectangle Method - Right endpoint
 */
export const rectangleMethodRight = (
  func: (x: number) => number,
  a: number,
  b: number,
  n: number
): IntegrationResult => {
  const h = (b - a) / n;
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    const x = a + i * h;
    sum += func(x);
  }

  const result = h * sum;

  return {
    value: result,
    intervals: n,
    method: 'Rectangle (Right)',
  };
};

/**
 * Rectangle Method - Midpoint
 */
export const rectangleMethodMidpoint = (
  func: (x: number) => number,
  a: number,
  b: number,
  n: number
): IntegrationResult => {
  const h = (b - a) / n;
  let sum = 0;

  for (let i = 0; i < n; i++) {
    const x = a + (i + 0.5) * h;
    sum += func(x);
  }

  const result = h * sum;

  return {
    value: result,
    intervals: n,
    method: 'Rectangle (Midpoint)',
  };
};

/**
 * Trapezoidal Rule
 */
export const trapezoidalRule = (
  func: (x: number) => number,
  a: number,
  b: number,
  n: number
): IntegrationResult => {
  const h = (b - a) / n;
  let sum = (func(a) + func(b)) / 2;

  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    sum += func(x);
  }

  const result = h * sum;

  return {
    value: result,
    intervals: n,
    method: 'Trapezoidal Rule',
  };
};

/**
 * Simpson's 1/3 Rule
 */
export const simpsonsRule = (
  func: (x: number) => number,
  a: number,
  b: number,
  n: number
): IntegrationResult => {
  const intervals = n % 2 === 0 ? n : n + 1;
  const h = (b - a) / intervals;
  
  let sum = func(a) + func(b);
  
  for (let i = 1; i < intervals; i += 2) {
    const x = a + i * h;
    sum += 4 * func(x);
  }
  
  for (let i = 2; i < intervals; i += 2) {
    const x = a + i * h;
    sum += 2 * func(x);
  }

  const result = (h / 3) * sum;

  return {
    value: result,
    intervals,
    method: "Simpson's 1/3 Rule",
  };
};

/**
 * Generic rectangle method wrapper
 */
export const rectangleMethod = (
  func: (x: number) => number,
  a: number,
  b: number,
  n: number,
  type: RectangleMethodType = 'midpoint'
): IntegrationResult => {
  switch (type) {
    case 'left':
      return rectangleMethodLeft(func, a, b, n);
    case 'right':
      return rectangleMethodRight(func, a, b, n);
    case 'midpoint':
    default:
      return rectangleMethodMidpoint(func, a, b, n);
  }
};

/**
 * Adaptive integration that refines the result
 */
export const adaptiveIntegration = (
  func: (x: number) => number,
  a: number,
  b: number,
  tolerance: number = 1e-6,
  maxIterations: number = 50
): IntegrationResult => {
  let n = 10;
  let prevResult = trapezoidalRule(func, a, b, n);
  
  for (let i = 0; i < maxIterations; i++) {
    n *= 2;
    const currentResult = trapezoidalRule(func, a, b, n);
    
    const error = Math.abs(currentResult.value - prevResult.value);
    if (error < tolerance) {
      return { ...currentResult, error };
    }
    
    prevResult = currentResult;
  }

  return { ...prevResult, error: tolerance };
};