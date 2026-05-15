'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from './ui/Button';
import { COLORS } from '@/lib/constants';

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-white">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ background: COLORS.gradientDark }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
        >
          Numerical Integration
          <br />
          <span style={{ color: COLORS.primary }}>Made Scientific</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Explore cutting-edge numerical integration techniques with interactive simulations,
          real-time analytics, and comprehensive educational resources.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/analytics">
            <Button size="lg" variant="primary" className="w-full sm:w-auto">
              Start Exploring
            </Button>
          </Link>
          <Link href="/methodology">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Learn More
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;