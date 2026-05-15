'use client';

import Card from '@/components/ui/Card';
import { BookOpen, Lightbulb, BarChart3 } from 'lucide-react';

const MethodologyPage = () => {
  const methods = [
    {
      name: 'Rectangle Method',
      description: 'The simplest and most intuitive numerical integration method.',
      icon: BarChart3,
      details: [
        'Divides the integration area into rectangles',
        'Supports left, right, and midpoint variants',
        'Lower accuracy but easy to understand',
        'Best for: Educational purposes and rough estimates',
      ],
    },
    {
      name: 'Trapezoidal Rule',
      description: 'Improves accuracy by using trapezoids instead of rectangles.',
      icon: BookOpen,
      details: [
        'Uses trapezoids to approximate area',
        'Better accuracy than rectangle method',
        'Linear interpolation between points',
        'Best for: Smooth, continuous functions',
      ],
    },
    {
      name: 'Simpson\'s Rule',
      description: 'High-precision method using parabolic interpolation.',
      icon: Lightbulb,
      details: [
        'Uses quadratic (parabolic) interpolation',
        'Requires even number of intervals',
        'Significantly more accurate than trapezoidal',
        'Best for: Smooth functions requiring high accuracy',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Methodology</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          Explore the mathematical foundations and implementation details of different numerical
          integration methods.
        </p>

        <div className="space-y-8">
          {methods.map((method, idx) => {
            const IconComponent = method.icon;
            return (
              <Card key={idx} variant="elevated">
                <div className="flex items-start gap-4 mb-4">
                  <IconComponent className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{method.name}</h2>
                    <p className="text-gray-600">{method.description}</p>
                  </div>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-12">
                  {method.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MethodologyPage;