/**
 * Utility functions for formatting and calculations
 */

export const formatNumber = (value: number, decimals: number = 6): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

export const formatDisplay = (value: number, decimals: number = 6): string => {
  const formatted = formatNumber(value, decimals);
  return formatted.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const calculateError = (approximate: number, exact: number): number => {
  if (exact === 0) return 0;
  return Math.abs((approximate - exact) / exact) * 100;
};

export const generateRange = (start: number, end: number, step: number): number[] => {
  const result: number[] = [];
  for (let i = start; i <= end; i += step) {
    result.push(parseFloat(i.toFixed(10)));
  }
  return result;
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

export const isValidNumber = (value: any): boolean => {
  const num = parseFloat(value);
  return !isNaN(num) && isFinite(num);
};

export const degreesToRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

export const radiansToDegrees = (radians: number): number => {
  return (radians * 180) / Math.PI;
};

export const calculateMean = (values: number[]): number => {
  if (values.length === 0) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
};

export const calculateStandardDeviation = (values: number[]): number => {
  if (values.length < 2) return 0;
  const mean = calculateMean(values);
  const squaredDiffs = values.map((val) => Math.pow(val - mean, 2));
  const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / (values.length - 1);
  return Math.sqrt(variance);
};

export const roundToNearest = (value: number, nearest: number): number => {
  return Math.round(value / nearest) * nearest;
};

export const isPrime = (num: number): boolean => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
};

export const factorial = (n: number): number => {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

export const combination = (n: number, r: number): number => {
  if (r > n || r < 0) return 0;
  if (r === 0 || r === n) return 1;
  return factorial(n) / (factorial(r) * factorial(n - r));
};

export const permutation = (n: number, r: number): number => {
  if (r > n || r < 0) return 0;
  return factorial(n) / factorial(n - r);
};