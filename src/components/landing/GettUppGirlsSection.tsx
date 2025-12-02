'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TrendingUp, Instagram, Smartphone } from 'lucide-react';

export default function GettUppGirlsSection() {
  return (
    <section className="py-20 md:py-32 bg-brand-charcoal">
      <div className="max-w-6xl mx-auto px-4">
        {/* Announcement Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-pink/30 bg-brand-pink/10">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-brand-pink">
              Official Announcement
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-black uppercase">
            <span className="text-white">GETTUPP</span>
            <span className="pink-gradient-text">Girls</span>
          </h2>
        </div>

        {/* Trending Badge */}
        <div className="flex items-center justify-center gap-2 text-sm mb-6">
          <TrendingUp className="h-4 w-4 text-brand-gold" />
          <span className="text-brand-gold font-bold">TRENDING:</span>
          <span className="text-gray-400">🔥 47 SOLD THIS WEEK</span>
        </div>

        {/* Tagline */}
        <p className="text-center text-gray-400 uppercase tracking-[0.15em] text-sm mb-12 max-w-2xl mx-auto">
          The unofficial uniform for the girls who never wait in line.
        </p>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Main Image - Left */}
          <div className="relative aspect-[3/4] bg-gray-800 rounded-2xl overflow-hidden group">
            <Image
              src="/images/gettupp-girls-1.jpg"
              alt="GettUpp Girls Collection"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Overlay Text */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-2xl font-black text-brand-pink uppercase">"Too Hot To Get Down"</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Top Image */}
            <div className="relative flex-1 min-h-[200px] bg-gray-800 rounded-2xl overflow-hidden group">
              <Image
                src="/images/gettupp-girls-2.jpg"
                alt="GettUpp Girls Lifestyle"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Instagram Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
                <Instagram className="h-4 w-4 text-white" />
                <span className="text-xs font-bold text-white">@CLUBNOVA</span>
              </div>
            </div>

            {/* QR Feature Card */}
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-brand-pink/20 flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-brand-pink" />
              </div>
              <h3 className="text-brand-pink font-bold uppercase tracking-wider mb-2">QR Enabled</h3>
              <p className="text-gray-400 text-sm">
                Scan patch to view tonight's photos instantly.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="text-xs text-brand-gold font-bold uppercase tracking-wider mb-4">
            Drop 001 Live
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 gold-gradient-button px-8 py-4 rounded-lg font-bold uppercase tracking-wider hover:scale-105 transition-transform"
          >
            Shop The Collection <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="text-xs text-gray-500 uppercase tracking-wider mt-4">
            Worn by bottle girls at The Warehouse, Rabbit Hole, and Vanquish
          </p>
        </div>
      </div>
    </section>
  );
}
