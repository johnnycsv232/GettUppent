"use client";

import Link from 'next/link';
import { Camera, Clock, Zap, Users, ArrowRight } from 'lucide-react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import { PricingGrid } from '@/components/sections/services';
import MagneticButton from '@/components/ui/MagneticButton';

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-white">
      <PublicHeader />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brandGold/10 border border-brandGold/20 mb-6">
          <Camera className="h-4 w-4 text-brandGold" />
          <span className="text-sm font-bold tracking-widest uppercase text-brandGold font-oswald">Photography Services</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase font-oswald">
          Simple <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#BF953F]">Pricing</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 font-inter">
          No hidden fees. Pause or cancel anytime. Start with a $345 pilot.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <Clock className="h-4 w-4 text-brandGold" />
            <span className="font-inter">24-72h Delivery</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <Zap className="h-4 w-4 text-brandGold" />
            <span className="font-inter">≤2.3 min/photo edit</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <Users className="h-4 w-4 text-brandGold" />
            <span className="font-inter">Minneapolis Venues</span>
          </div>
        </div>
      </section>

      {/* Pricing Grid - High Conversion Component */}
      <section className="py-20 px-6 bg-surface/50">
        <PricingGrid />
      </section>

      {/* Why Us Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black uppercase mb-6 font-oswald">
            Why We <span className="text-brandGold">Never Miss</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 font-inter">
            Most photographers are artists. <span className="text-white font-bold">We are an operations company.</span>
          </p>
          
          <div className="bg-surface border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-brandGold font-oswald">The ShotClock</h3>
            <p className="text-gray-300 mb-6 font-inter">
              Our internal SLA monitor triggers <span className="text-yellow-400">Amber Alert at T-12h</span> and{' '}
              <span className="text-red-400">Red Alert at T-2h</span>, ensuring we never miss deadlines.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-brandGold/20 rounded-full text-brandGold font-mono font-bold">
              <Zap className="h-5 w-5" />
              KPI: ≤2.3 min/photo edit time
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Objection Handling */}
      <section className="py-20 px-6 bg-surface/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black uppercase mb-12 text-center font-oswald">Common Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-background border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2 font-oswald">"We already have a photographer."</h3>
              <p className="text-gray-400 font-inter">
                We're not just photographers; we're a content engine with guaranteed 24–72h delivery, 
                eliminating freelance inconsistency.
              </p>
            </div>
            
            <div className="bg-background border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2 font-oswald">"Your pricing is high."</h3>
              <p className="text-gray-400 font-inter">
                It breaks down to $9–12 per post. We sell predictable ROI and eliminate freelance inconsistency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-black uppercase mb-6 font-oswald">
          Ready to <span className="text-brandGold">Take Over?</span>
        </h2>
        <p className="text-gray-400 mb-8 font-inter">Start with a $345 pilot night. Zero commitment.</p>
        <MagneticButton onClick={() => window.location.href = '/schedule?tier=pilot'}>
          <span className="flex items-center gap-3">
            Book Your Pilot <ArrowRight className="h-5 w-5" />
          </span>
        </MagneticButton>
      </section>

      <PublicFooter />
    </main>
  );
}
