'use client';

import { useState, useMemo } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import Slider from './ui/Slider';
import {
  rectangleMethodMidpoint,
  trapezoidalRule,
  simpsonsRule,
  gaussLegendreQuadrature,
} from '@/lib/numericalMethods';
import { formatDisplay, calculateError } from '@/lib/utils';
import { INTEGRATION_CONFIG } from '@/lib/constants';

const InteractiveSimulator = () => {
  const [lowerBound, setLowerBound] = useState(INTEGRATION_CONFIG.DEFAULT_A);
  const [upperBound, setUpperBound] = useState(INTEGRATION_CONFIG.DEFAULT_B);
  const [intervals, setIntervals] = useState(INTEGRATION_CONFIG.DEFAULT_INTERVALS);
  const [selectedMethod, setSelectedMethod] = useState('rectangle');

  // Test function: sin(x)
  const testFunc = (x: number) => Math.sin(x);

  const results = useMemo(() => {
    try {
      let result;
      switch (selectedMethod) {
        case 'rectangle':
          result = rectangleMethodMidpoint(testFunc, lowerBound, upperBound, intervals);
          break;
        case 'trapezoidal':
          result = trapezoidalRule(testFunc, lowerBound, upperBound, intervals);
          break;
        case 'simpson':
          result = simpsonsRule(testFunc, lowerBound, upperBound, intervals);
          break;
        case 'gauss':
          result = gaussLegendreQuadrature(testFunc, lowerBound, upperBound, 5);
          break;
        default:
          result = rectangleMethodMidpoint(testFunc, lowerBound, upperBound, intervals);
      }

      // Analytical solution: -cos(b) + cos(a)
      const exact = -Math.cos(upperBound) + Math.cos(lowerBound);
      const error = calculateError(result.value, exact);

      return {
        approximate: result.value,
        exact,
        error,
        method: result.method,
      };
    } catch (err) {
      return null;
    }
  }, [lowerBound, upperBound, intervals, selectedMethod]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Interactive Simulator</h2>

        <Card variant="outlined">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Input
              label="Lower Bound (a)"
              type="number"
              value={lowerBound}
              onChange={(e) => setLowerBound(parseFloat(e.target.value))}
              step="0.1"
            />
            <Input
              label="Upper Bound (b)"
              type="number"
              value={upperBound}
              onChange={(e) => setUpperBound(parseFloat(e.target.value))}
              step="0.1"
            />
          </div>

          <Slider
            label="Number of Intervals"
            value={intervals}
            onChange={setIntervals}
            min={INTEGRATION_CONFIG.MIN_INTERVALS}
            max={INTEGRATION_CONFIG.MAX_INTERVALS}
            step={INTEGRATION_CONFIG.STEP_INTERVALS}
          />

          <div className="mt-8 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Integration Method
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { id: 'rectangle', label: 'Rectangle' },
                { id: 'trapezoidal', label: 'Trapezoidal' },
                { id: 'simpson', label: "Simpson's" },
                { id: 'gauss', label: 'Gauss-Legendre' },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedMethod === method.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {results && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <p className="text-sm text-gray-600 mb-1">Approximate Result</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatDisplay(results.approximate)}
              </p>
            </Card>
            <Card>
              <p className="text-sm text-gray-600 mb-1">Exact Result</p>
              <p className="text-2xl font-bold text-green-600">
                {formatDisplay(results.exact)}
              </p>
            </Card>
            <Card>
              <p className="text-sm text-gray-600 mb-1">Error</p>
              <p className="text-2xl font-bold text-orange-600">
                {formatDisplay(results.error)}%
              </p>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default InteractiveSimulator;