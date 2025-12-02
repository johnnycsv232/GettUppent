'use client';

import Link from 'next/link';
import { CheckCircle, Zap, Star } from 'lucide-react';

interface PricingTier {
  name: string;
  label: string;
  badge?: string;
  price: number;
  savings: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
  isPremium?: boolean;
}

const tiers: PricingTier[] = [
  {
    name: 'Friday Nights',
    label: 'STARTER',
    badge: 'ENTRY LEVEL',
    price: 445,
    savings: 'SAVE $1,200/YR VS FREELANCERS',
    features: [
      '1 Shoot / Month',
      '30 Edited Photos',
      '72h Delivery',
      'Single-Venue Focus',
    ],
    ctaText: 'Start Friday Nights',
    isPopular: false,
  },
  {
    name: 'Weekend Warrior',
    label: 'GROWTH',
    badge: 'MOST POPULAR',
    price: 695,
    savings: 'SAVE $2,340/YR VS FREELANCERS',
    features: [
      '2 Shoots / Month',
      '60 Edited Photos + 2 Reels',
      '48h Delivery Guarantee',
      'Priority Scheduling',
      'Route-Batched Efficiency',
    ],
    ctaText: 'Go Weekend Warrior',
    isPopular: true,
  },
  {
    name: 'VIP Partner',
    label: 'EMPIRE',
    badge: 'PREMIUM',
    price: 995,
    savings: 'SAVE $4,500/YR VS AGENCY',
    features: [
      '3 Shoots / Month',
      '80 Edited Photos + 3 Reels',
      '24-48h Delivery',
      'Full Creative Team',
      'Monthly Strategy Call',
    ],
    ctaText: 'Become VIP',
    isPremium: true,
  },
];

export default function PricingSection() {
  return (
    <section className="py-20 md:py-32 bg-brand-ink">
      <div className="max-w-7xl mx-auto px-4">
        {/* ROI Callout Box */}
        <div className="max-w-2xl mx-auto mb-12 p-6 rounded-xl border border-brand-gold/30 bg-brand-gold/5">
          <div className="flex items-center justify-center gap-2 text-brand-gold text-sm font-bold uppercase tracking-wider mb-3">
            <Zap className="h-4 w-4" />
            Venue Math
          </div>
          <p className="text-center text-gray-300">
            3 new customers @ $350 LTV = <span className="text-green-400 font-bold">$1,050</span>
          </p>
          <p className="text-center text-gray-400 text-sm mt-1">
            Your T3 package ($995) pays for itself with just <span className="underline">3 new faces</span>.
          </p>
        </div>

        {/* Section Header */}
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase text-center mb-16">
          PICK YOUR <span className="gold-gradient-text">POWER LEVEL</span>
        </h2>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-6 lg:p-8 flex flex-col ${
                tier.isPopular 
                  ? 'border-2 border-brand-gold bg-brand-charcoal md:-mt-4 md:mb-4 shadow-gold-lg' 
                  : tier.isPremium
                    ? 'border border-brand-pink/30 bg-brand-charcoal'
                    : 'border border-white/10 bg-brand-charcoal'
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  tier.isPopular 
                    ? 'bg-brand-gold text-black' 
                    : tier.isPremium
                      ? 'bg-brand-pink/20 text-brand-pink border border-brand-pink/30'
                      : 'bg-white/10 text-gray-400 border border-white/20'
                }`}>
                  {tier.badge}
                </div>
              )}

              {/* Label */}
              <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                tier.isPremium ? 'text-brand-pink' : 'text-gray-500'
              }`}>
                {tier.label}
              </div>

              {/* Name */}
              <h3 className="font-display text-2xl lg:text-3xl font-black uppercase text-white mb-4">
                {tier.name}
              </h3>

              {/* Price */}
              <div className="mb-2">
                <span className={`text-5xl lg:text-6xl font-black ${
                  tier.isPopular 
                    ? 'gold-gradient-text' 
                    : tier.isPremium 
                      ? 'text-brand-pink'
                      : 'text-white'
                }`}>
                  ${tier.price}
                </span>
                <span className="text-gray-500 text-lg">/mo</span>
              </div>

              {/* Savings */}
              <div className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-6 px-3 py-1.5 rounded bg-brand-gold/10 inline-block w-fit">
                {tier.savings}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                    <CheckCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                      tier.isPopular 
                        ? 'text-brand-gold' 
                        : tier.isPremium 
                          ? 'text-brand-pink'
                          : 'text-gray-600'
                    }`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/pilot-intake"
                className={`block w-full text-center py-4 rounded-lg font-bold uppercase tracking-wider transition-all ${
                  tier.isPopular
                    ? 'gold-gradient-button hover:scale-105'
                    : tier.isPremium
                      ? 'bg-brand-pink text-white hover:bg-brand-pink/90'
                      : 'bg-white/5 text-white border border-white/20 hover:bg-white/10'
                }`}
              >
                {tier.ctaText}
              </Link>
            </div>
          ))}
        </div>

        {/* ACH Savings Note */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <Star className="h-4 w-4 text-brand-gold" />
            <span>Save 2% when paying via ACH</span>
          </div>
        </div>
      </div>
    </section>
  );
}
