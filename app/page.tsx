'use client';

import HeroSection from '@/components/HeroSection';
import FormulaSection from '@/components/FormulaSection';
import InteractiveSimulator from '@/components/InteractiveSimulator';
import ChartsDashboard from '@/components/ChartsDashboard';
import RecruiterSection from '@/components/RecruiterSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FormulaSection />
      <ChartsDashboard />
      <InteractiveSimulator />
      <RecruiterSection />
    </>
  );
}
