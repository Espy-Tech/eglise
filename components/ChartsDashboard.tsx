'use client';

import { useMemo } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Card from './ui/Card';
import { rectangleMethodMidpoint, trapezoidalRule, simpsonsRule } from '@/lib/numericalMethods';
import { CHART_CONFIG } from '@/lib/constants';

const ChartsDashboard = () => {
  const testFunc = (x: number) => Math.sin(x);
  const a = 0;
  const b = Math.PI;

  // Convergence chart data
  const convergenceData = useMemo(() => {
    const methods = [
      { name: 'Rectangle', func: rectangleMethodMidpoint },
      { name: 'Trapezoidal', func: trapezoidalRule },
      { name: "Simpson's", func: simpsonsRule },
    ];

    const exact = -Math.cos(b) + Math.cos(a); // Analytical solution
    const intervals = [10, 50, 100, 200, 500, 1000];

    return intervals.map((n) => {
      const point: any = { intervals: n };
      methods.forEach((method) => {
        const result = method.func(testFunc, a, b, n);
        point[method.name] = Math.abs(result.value - exact);
      });
      return point;
    });
  }, []);

  // Function visualization data
  const functionData = useMemo(() => {
    const data = [];
    for (let x = 0; x <= Math.PI; x += Math.PI / 20) {
      data.push({
        x: parseFloat(x.toFixed(4)),
        'f(x) = sin(x)': Math.sin(x),
      });
    }
    return data;
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Analytics & Visualizations</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Convergence Chart */}
          <Card variant="elevated">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Convergence Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={convergenceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="intervals" />
                <YAxis scale="log" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Rectangle" stroke="#FF6B35" />
                <Line type="monotone" dataKey="Trapezoidal" stroke="#00D9FF" />
                <Line type="monotone" dataKey="Simpson's" stroke="#0066FF" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Function Visualization */}
          <Card variant="elevated">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Function Visualization</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={functionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" type="number" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="f(x) = sin(x)"
                  stroke="#0066FF"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ChartsDashboard;