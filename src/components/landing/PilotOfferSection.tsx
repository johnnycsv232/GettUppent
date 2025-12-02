'use client';

import Link from 'next/link';
import { Camera, CheckCircle, AlertTriangle, Zap } from 'lucide-react';

export default function PilotOfferSection() {
  return (
    <section id="pilot" className="py-20 md:py-32 bg-brand-ink">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Limited Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/5 mb-6">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-brand-gold">
            Limited Availability
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase mb-4">
          START WITH THE <span className="gold-gradient-text">PILOT</span>
        </h2>

        {/* Capacity Message - Authentic, not fake scarcity */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-12">
          <Camera className="h-4 w-4 text-brand-gold" />
          <span>Shooting <span className="text-white font-semibold">3 venues max/month</span> for quality</span>
        </div>

        {/* Offer Card */}
        <div className="glass-card rounded-2xl p-8 md:p-12 mb-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
            {/* Left: Price & Features */}
            <div className="flex-1 text-left">
              {/* Price */}
              <div className="mb-6">
                <span className="text-6xl md:text-7xl font-black gold-gradient-text">$345</span>
                <div className="inline-block ml-3 px-3 py-1 rounded border border-gray-600 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  One-Time
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4">
                {[
                  '1 Premium Shoot',
                  '30 Edited Photos',
                  '72h Delivery Guarantee',
                  'Full GettUpp Look',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-white">
                    <CheckCircle className="h-5 w-5 text-brand-gold flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: CTA Box */}
            <div className="w-full lg:w-auto">
              {/* Warning Badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 mb-4">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                  Limited to 3 / Month
                </span>
              </div>

              {/* CTA Button */}
              <Link
                href="/pilot-intake"
                className="block w-full gold-gradient-button px-8 py-4 rounded-lg text-center font-bold uppercase tracking-wider hover:scale-105 transition-transform"
              >
                <span className="flex items-center justify-center gap-2">
                  Claim Your Pilot <Zap className="h-5 w-5" />
                </span>
              </Link>

              {/* No Risk Text */}
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-3 text-center">
                No Subscription • No Risk
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <p className="text-sm text-gray-500 uppercase tracking-wider">
          No Subscription. No Commitment. Just Results.
        </p>
      </div>
    </section>
  );
}
