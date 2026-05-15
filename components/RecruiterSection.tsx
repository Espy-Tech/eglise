'use client';

import Card from './ui/Card';
import Button from './ui/Button';
import { Users, Target, Award } from 'lucide-react';

const RecruiterSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Professional Excellence</h2>
            <p className="text-lg text-blue-100 mb-8">
              Our team consists of highly skilled software engineers and scientists dedicated to
              creating premium scientific computing solutions. We bring expertise in numerical
              analysis, web technologies, and high-performance computing.
            </p>
            <div className="space-y-4">
              {[
                { icon: Users, text: 'Expert Team of Engineers & Scientists' },
                { icon: Target, text: 'Precision & Accuracy Focused' },
                { icon: Award, text: 'Industry-Leading Solutions' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-4">
                    <Icon className="w-6 h-6 text-blue-300 flex-shrink-0" />
                    <span className="text-lg">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { number: '1000+', label: 'Integration Tests' },
              { number: '99.9%', label: 'Accuracy Rate' },
              { number: '50ms', label: 'Avg Computation' },
              { number: '∞', label: 'Scalability' },
            ].map((stat, idx) => (
              <Card key={idx} className="bg-white/10 border-blue-300 backdrop-blur">
                <p className="text-3xl font-bold text-white mb-2">{stat.number}</p>
                <p className="text-blue-100 text-sm">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruiterSection;