'use client';

import RecruiterSection from '@/components/RecruiterSection';
import Card from '@/components/ui/Card';
import { Users, Zap, Target } from 'lucide-react';

const AboutPage = () => {
  const team = [
    { name: 'Excellence', icon: Zap, desc: 'Delivering high-quality scientific computing solutions' },
    { name: 'Precision', icon: Target, desc: 'Accuracy and reliability in every calculation' },
    { name: 'Innovation', icon: Users, desc: 'Pushing boundaries in numerical analysis' },
  ];

  return (
    <>
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            We are a team of dedicated engineers and scientists creating premium platforms for
            scientific computing and numerical analysis.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {team.map((value, idx) => {
              const Icon = value.icon;
              return (
                <Card key={idx} variant="outlined">
                  <Icon className="w-8 h-8 text-blue-600 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{value.name}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      <RecruiterSection />
    </>
  );
};

export default AboutPage;