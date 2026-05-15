'use client';

import { motion } from 'framer-motion';
import Card from './ui/Card';
import { COLORS } from '@/lib/constants';

const FormulaSection = () => {
  const methods = [
    {
      title: 'Rectangle Method',
      description: 'The simplest numerical integration method using rectangular approximation.',
      formula: '∫ f(x)dx ≈ Σ f(xᵢ) × Δx',
    },
    {
      title: 'Trapezoidal Rule',
      description: 'Improved accuracy by using trapezoids instead of rectangles.',
      formula: '∫ f(x)dx ≈ (h/2) × [f(x₀) + 2Σf(xᵢ) + f(xₙ)]',
    },
    {
      title: 'Simpson\'s Rule',
      description: 'High-precision method using parabolic interpolation.',
      formula: '∫ f(x)dx ≈ (h/3) × [f(x₀) + 4f(x₁) + 2f(x₂) + ...]',
    },
    {
      title: 'Gauss-Legendre Quadrature',
      description: 'Optimal node placement for maximum accuracy with fewer evaluations.',
      formula: '∫₋₁¹ f(x)dx ≈ Σ wᵢ × f(xᵢ)',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Integration Methods
          </h2>
          <p className="text-lg text-gray-600">
            Explore different numerical integration techniques and their mathematical foundations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {methods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card variant="elevated">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                <div
                  className="p-4 rounded-lg bg-gray-100 font-mono text-sm text-blue-600"
                >
                  {method.formula}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormulaSection;