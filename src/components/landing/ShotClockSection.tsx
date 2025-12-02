'use client';

import Link from 'next/link';
import { Camera, Clock } from 'lucide-react';

export default function ShotClockSection() {
  return (
    <section className="py-16 md:py-20 bg-brand-ink border-t border-b border-white/5">
      <div className="max-w-3xl mx-auto px-4 text-center">
        {/* Main Headline - Text Only, No Cards */}
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase mb-6">
          NEVER MISS A <span className="gold-gradient-text">DEADLINE</span>
        </h2>

        {/* Simple Body Text */}
        <p className="text-lg md:text-xl text-gray-300 mb-4">
          72-hour guaranteed turnaround.
        </p>
        <p className="text-base md:text-lg text-gray-400 mb-8">
          Automated notifications. Portal tracking.
        </p>

        {/* Live Status Line */}
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
          <Camera className="h-4 w-4 text-brand-gold" />
          <span>
            Last delivery: <span className="text-white">2 hours ago</span> • 
            Next shoot: <span className="text-brand-gold">Tonight 11PM</span>
          </span>
        </div>

        {/* Single Stat */}
        <p className="text-base text-gray-400 mb-8">
          <span className="text-brand-gold font-bold">99.2%</span> on-time delivery since 2024
        </p>

        {/* CTA */}
        <Link
          href="/portal"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-brand-gold/40 text-white font-bold uppercase tracking-wider text-sm hover:bg-brand-gold/10 transition-all"
        >
          <Clock className="h-4 w-4" />
          View Delivery Proof
        </Link>
      </div>
    </section>
  );
}
