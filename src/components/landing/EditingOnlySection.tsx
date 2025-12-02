'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Palette } from 'lucide-react';

export default function EditingOnlySection() {
  return (
    <section className="py-20 md:py-32 bg-brand-ink">
      <div className="max-w-5xl mx-auto px-4">
        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-800/50">
            <Palette className="h-4 w-4 text-brand-gold" />
            <span className="text-sm text-gray-300">124 Batches Edited</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-800/50">
            <Star className="h-4 w-4 text-brand-gold fill-brand-gold" />
            <span className="text-sm text-gray-300">4.9/5 Rating</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase mb-4">
            ALREADY SHOOTING?
            <br />
            <span className="text-white">WE'LL </span>
            <span className="gold-gradient-text">POLISH</span>
            <span className="text-white"> IT</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Send us your RAW photos. Get the GettUpp look in 72h.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Before/After Image */}
          <div className="relative aspect-square bg-gray-800 rounded-2xl overflow-hidden">
            <Image
              src="/images/editing-before-after.jpg"
              alt="Before and After Editing Example"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {/* Original Badge */}
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded bg-black/70 backdrop-blur-sm">
              <span className="text-xs font-bold text-white uppercase">Original</span>
            </div>
            {/* Slider Handle Mockup */}
            <div className="absolute right-1/3 top-0 bottom-0 w-1 bg-brand-gold flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center shadow-lg">
                <div className="flex gap-0.5">
                  <div className="w-0.5 h-3 bg-black rounded-full" />
                  <div className="w-0.5 h-3 bg-black rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Batch Pricing Card */}
          <div className="glass-card rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Flat Rate</span>
            </div>
            
            <div className="mb-4">
              <span className="text-5xl font-black text-white">$199</span>
              <span className="text-gray-500 text-lg">/ batch</span>
            </div>

            <div className="space-y-3 mb-6 flex-grow">
              <p className="text-white font-semibold">30 RAW Photos</p>
              <p className="text-gray-400 text-sm">AI + Manual Polish</p>
              <p className="text-gray-400 text-sm">72h Turnaround</p>
            </div>

            <Link
              href="/pilot-intake?service=editing-batch"
              className="block w-full text-center py-3 rounded-lg gold-gradient-button font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform"
            >
              Start Batch
            </Link>
          </div>

          {/* Single Photo Card */}
          <div className="glass-card rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">/ Single</span>
            </div>
            
            <div className="mb-4">
              <span className="text-5xl font-black text-white">$49</span>
              <span className="text-gray-500 text-lg">/ single</span>
            </div>

            <div className="space-y-3 mb-6 flex-grow">
              <p className="text-white font-semibold">1 RAW Photo</p>
              <p className="text-gray-400 text-sm">Same 72h Turnaround</p>
              <p className="text-brand-gold text-sm font-semibold">Perfect for testing</p>
            </div>

            <Link
              href="/pilot-intake?service=editing-single"
              className="block w-full text-center py-3 rounded-lg border border-white/20 text-white font-bold uppercase tracking-wider text-sm hover:bg-white/10 transition-all"
            >
              Test 1 Photo
            </Link>
          </div>
        </div>

        {/* DM CTA */}
        <p className="text-center text-sm text-gray-500">
          DM 'EDIT' to start instantly
        </p>
      </div>
    </section>
  );
}
