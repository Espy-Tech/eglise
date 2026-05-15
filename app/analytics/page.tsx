'use client';

import ChartsDashboard from '@/components/ChartsDashboard';
import InteractiveSimulator from '@/components/InteractiveSimulator';

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Analytics Dashboard</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Real-time analysis, convergence studies, and performance metrics for numerical integration
          methods.
        </p>
      </div>
      <ChartsDashboard />
      <InteractiveSimulator />
    </div>
  );
};

export default AnalyticsPage;