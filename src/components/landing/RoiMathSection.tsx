'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function RoiMathSection() {
  return (
    <section className="py-20 md:py-32 bg-brand-charcoal">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Section Header */}
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase mb-12">
          THE MATH IS <span className="gold-gradient-text">SIMPLE</span>
        </h2>

        {/* ROI Card */}
        <div className="glass-card rounded-2xl p-8 md:p-12 mb-8 relative">
          {/* Verified Badge */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Verified Avg</span>
            </div>
          </div>

          {/* The Equation */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-8">
            {/* 3 */}
            <div className="text-center">
              <div className="text-6xl sm:text-7xl md:text-8xl font-black text-white">3</div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mt-2">New Customers</div>
            </div>

            {/* Equals */}
            <div className="text-4xl sm:text-5xl md:text-6xl font-black text-brand-gold">=</div>

            {/* $995 */}
            <div className="text-center">
              <div className="text-6xl sm:text-7xl md:text-8xl font-black gold-gradient-text">$995</div>
              <div className="text-sm font-bold text-brand-gold uppercase tracking-wider mt-2">Package Paid For</div>
            </div>
          </div>

          {/* Supporting Text */}
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-8">
            Average venue covers <span className="text-white font-semibold">$350/customer LTV</span>. 
            Your content brings <span className="text-white font-semibold">3+ new faces minimum</span>.
          </p>

          {/* Validation Note */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <CheckCircle className="h-4 w-4 text-gray-600" />
            <span>Average venue result based on 8 months of partnership data</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="#pilot"
          className="inline-flex items-center gap-2 gold-gradient-button px-8 py-4 rounded-lg text-base font-bold uppercase tracking-wider hover:scale-105 transition-transform"
        >
          See The ROI
        </Link>
      </div>
    </section>
  );
}
