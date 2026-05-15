/**
 * Analytical solutions and exact integration methods
 * Includes Gauss-Legendre quadrature for high-precision calculations
 */

/**
 * Gauss-Legendre quadrature nodes and weights
 */
export const gaussLegendreNodes = {
  1: { nodes: [0.0], weights: [2.0] },
  2: {
    nodes: [-0.5773502691896257, 0.5773502691896257],
    weights: [1.0, 1.0],
  },
  3: {
    nodes: [-0.7745966692414834, 0.0, 0.7745966692414834],
    weights: [0.5555555555555556, 0.8888888888888888, 0.5555555555555556],
  },
  4: {
    nodes: [-0.8617953335222007, -0.3399810435848563, 0.3399810435848563, 0.8617953335222007],
    weights: [0.3478548451374639, 0.6521451548625461, 0.6521451548625461, 0.3478548451374639],
  },
  5: {
    nodes: [-0.9061798459386640, -0.5384693101056831, 0.0, 0.5384693101056831, 0.9061798459386640],
    weights: [0.2369268850561891, 0.4786286704993665, 0.5688888888888889, 0.4786286704993665, 0.2369268850561891],
  },
};

export interface GaussQuadratureResult {
  value: number;
  order: number;
  method: string;
}

/**
 * Gauss-Legendre Quadrature (transforms [-1,1] interval to [a,b])
 */
export const gaussLegendreQuadrature = (
  func: (x: number) => number,
  a: number,
  b: number,
  order: number = 5
): GaussQuadratureResult => {
  const data = gaussLegendreNodes[order as keyof typeof gaussLegendreNodes];
  
  if (!data) {
    throw new Error(`Gauss-Legendre order ${order} not supported. Use 1-5.`);
  }

  const c = (b - a) / 2;
  const d = (a + b) / 2;

  let result = 0;
  for (let i = 0; i < data.nodes.length; i++) {
    const x = c * data.nodes[i] + d;
    result += data.weights[i] * func(x);
  }

  return {
    value: c * result,
    order,
    method: `Gauss-Legendre (Order ${order})`,
  };
};

/**
 * Analytical solution for common integrals
 */
export const analyticalSolutions = {
  powerFunction: (n: number, a: number, b: number): number => {
    if (n === -1) {
      return Math.log(Math.abs(b / a));
    }
    return (Math.pow(b, n + 1) - Math.pow(a, n + 1)) / (n + 1);
  },

  sine: (a: number, b: number): number => {
    return -Math.cos(b) + Math.cos(a);
  },

  cosine: (a: number, b: number): number => {
    return Math.sin(b) - Math.sin(a);
  },

  exponential: (a: number, b: number): number => {
    return Math.exp(b) - Math.exp(a);
  },

  reciprocal: (a: number, b: number): number => {
    if (a <= 0 || b <= 0) {
      throw new Error('Arguments must be positive for reciprocal integral');
    }
    return Math.log(b / a);
  },

  squareRoot: (a: number, b: number): number => {
    return (2 / 3) * (Math.pow(b, 1.5) - Math.pow(a, 1.5));
  },

  arctangent: (a: number, b: number): number => {
    return Math.atan(b) - Math.atan(a);
  },
};

/**
 * Get analytical solution if available
 */
export const getAnalyticalSolution = (
  functionType: string,
  a: number,
  b: number
): number | null => {
  const solution = analyticalSolutions[functionType as keyof typeof analyticalSolutions];
  
  if (solution) {
    try {
      return solution(a, b);
    } catch {
      return null;
    }
  }
  
  return null;
};

/**
 * Common test functions for integration
 */
export const testFunctions = {
  quadratic: (x: number) => x * x,
  sine: (x: number) => Math.sin(x),
  cosine: (x: number) => Math.cos(x),
  exponential: (x: number) => Math.exp(x),
  arctangent: (x: number) => 1 / (1 + x * x),
  squareRoot: (x: number) => Math.sqrt(Math.abs(x)),
  reciprocal: (x: number) => (x !== 0 ? 1 / x : 0),
  gaussian: (x: number) => Math.exp(-(x * x)),
};

/**
 * Calculate relative error
 */
export const calculateRelativeError = (
  approximate: number,
  exact: number
): number => {
  if (exact === 0) return 0;
  return Math.abs((approximate - exact) / exact) * 100;
};