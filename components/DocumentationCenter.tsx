'use client';

import Card from './ui/Card';
import Button from './ui/Button';
import { Download, FileText, Code } from 'lucide-react';

const DocumentationCenter = () => {
  const resources = [
    {
      title: 'API Documentation',
      description: 'Complete API reference for all numerical integration methods.',
      icon: FileText,
      file: 'api-docs.pdf',
    },
    {
      title: 'Mathematical Foundation',
      description: 'Deep dive into the mathematics behind numerical integration.',
      icon: FileText,
      file: 'math-foundation.pdf',
    },
    {
      title: 'Source Code',
      description: 'Access the complete source code of the integration methods.',
      icon: Code,
      file: 'source-code.zip',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Documentation & Resources
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive guides, API documentation, and downloadable resources to help you
            master numerical integration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {resources.map((resource, index) => {
            const IconComponent = resource.icon;
            return (
              <Card key={index} variant="outlined">
                <div className="flex items-start gap-4 mb-4">
                  <IconComponent className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{resource.description}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="primary"
                  className="w-full mt-4 justify-center gap-2"
                >
                  <Download size={16} />
                  Download
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Tutorials */}
        <div className="bg-gray-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Start Tutorials</h3>
          <div className="space-y-4">
            {[
              'Getting Started with Rectangle Method',
              'Comparing Integration Methods',
              'Advanced: Gauss-Legendre Quadrature',
            ].map((tutorial, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                <span className="text-gray-900 font-medium">{tutorial}</span>
                <Button size="sm" variant="ghost">
                  View
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentationCenter;