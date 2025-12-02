'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, Zap, ArrowRight } from 'lucide-react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';

// Static product data for GettUpp Girls
const PRODUCTS = [
  { id: 'crop_fitted', name: 'Fitted Crop Top', price: 38, bestseller: true },
  { id: 'crop_relaxed', name: 'Relaxed Crop Top', price: 36, bestseller: false },
  { id: 'crop_bundle', name: 'Crop Bundle (3)', price: 99, bestseller: false },
  { id: 'hoodie', name: 'Oversized Hoodie', price: 65, bestseller: false },
  { id: 'bodysuit', name: 'Logo Bodysuit', price: 48, bestseller: false },
  { id: 'shorts', name: 'Biker Shorts', price: 32, bestseller: false },
];

const SLOGANS = [
  "She's Not Basic",
  "Main Character Energy", 
  "We Don't Do Boring"
];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0D] text-white">
      <PublicHeader />
      
      {/* HEADER ANNOUNCEMENT */}
      <div className="bg-brand-pink text-white py-3 text-center text-xs font-bold tracking-widest uppercase">
        Official Launch • Q4 2025 • Limited Drops
      </div>

      {/* HERO */}
      <div className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-pink/20 blur-[100px] rounded-full pointer-events-none" />
        
        <h1 className="font-heading text-6xl md:text-8xl font-bold text-white mb-4 relative z-10">
          GETTUPP <span className="text-brand-pink">GIRLS</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto relative z-10">
          The unofficial uniform for the nightlife elite.
        </p>

        {/* Slogans ticker (simulated) */}
        <div className="mt-12 flex flex-wrap justify-center gap-3 relative z-10">
          {SLOGANS.map((slogan, i) => (
            <span key={i} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-bold uppercase tracking-wide text-brand-gold">
              "{slogan}"
            </span>
          ))}
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="container mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-2xl font-bold">The Collection</h2>
          <span className="text-sm text-gray-500">v1.0 Release</span>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group relative bg-[#121214] rounded-xl border border-white/5 overflow-hidden hover:border-brand-pink/50 transition-colors">
              {/* Image Placeholder */}
              <div className="aspect-[4/5] bg-gradient-to-b from-gray-800 to-black flex items-center justify-center relative">
                <div className="text-center opacity-30 group-hover:opacity-50 transition-opacity">
                  <span className="block text-6xl font-heading font-bold text-white">GU</span>
                  <span className="block text-6xl font-heading font-bold text-brand-pink">GIRLS</span>
                </div>
                {/* Badge */}
                {product.bestseller && <div className="absolute top-4 left-4 bg-brand-gold text-black text-xs font-bold px-2 py-1 uppercase">Best Seller</div>}
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-lg text-white mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-4">Premium fitted cut. QR-enabled.</p>
                <div className="flex items-center justify-between">
                  <span className="text-brand-gold font-mono font-bold">${product.price.toFixed(2)}</span>
                  <Link 
                    href={`/checkout?product=${product.id}`}
                    className="p-2 rounded-full bg-white text-black hover:bg-brand-pink hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INFO / CONTEXT */}
      <div className="border-t border-white/10 bg-white/[0.02] py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-heading text-3xl font-bold text-white mb-6">Not Just Merch. <br/><span className="text-brand-pink">It's a Network.</span></h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Every GettUpp Girls piece comes with a discrete QR patch that connects you to the night's photo gallery. 
              Designed for bottle girls, bartenders, and the life of the party.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm text-white">
                <Zap className="w-4 h-4 text-brand-gold" /> High-Margin
              </div>
              <div className="flex items-center gap-2 text-sm text-white">
                <Star className="w-4 h-4 text-brand-gold" /> Exclusive
              </div>
            </div>
          </div>
          <div className="p-8 rounded-2xl border border-white/10 bg-black">
            <h4 className="text-xs font-bold text-gray-500 uppercase mb-4">Premium Quality</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• High-quality cotton blend</li>
              <li>• Signature embroidered logo</li>
              <li>• QR gallery link on tag</li>
              <li>• Limited edition drops</li>
            </ul>
          </div>
        </div>
      </div>

      <PublicFooter />
    </main>
  );
}
