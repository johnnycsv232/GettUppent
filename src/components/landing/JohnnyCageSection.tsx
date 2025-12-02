'use client';

import Image from 'next/image';
import { Instagram, ExternalLink, CheckCircle, MapPin } from 'lucide-react';

export default function JohnnyCageSection() {
  return (
    <section className="py-20 md:py-32 bg-brand-ink">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left: Image with frame */}
          <div className="w-full lg:w-1/2 relative">
            {/* Gold corner brackets frame */}
            <div className="relative">
              {/* Top-left bracket */}
              <div className="absolute -top-3 -left-3 w-12 h-12 border-l-2 border-t-2 border-brand-gold rounded-tl-lg" />
              {/* Top-right bracket */}
              <div className="absolute -top-3 -right-3 w-12 h-12 border-r-2 border-t-2 border-brand-gold rounded-tr-lg" />
              {/* Bottom-left bracket */}
              <div className="absolute -bottom-3 -left-3 w-12 h-12 border-l-2 border-b-2 border-brand-gold rounded-bl-lg" />
              {/* Bottom-right bracket */}
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-r-2 border-b-2 border-brand-gold rounded-br-lg" />
              
              {/* Image */}
              <div className="aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden relative">
                <Image
                  src="/images/johnny-cage.jpg"
                  alt="Johnny Cage - Minneapolis Nightlife Photographer"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Active Location Badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 bg-black/70 backdrop-blur-sm rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <MapPin className="h-3 w-3 text-brand-gold" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Active: North Loop</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2">
            {/* Section Label */}
            <div className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
              Meet The Face
            </div>

            {/* Name */}
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-[0.9] mb-2">
              <span className="text-white">MOTHERFUCKEN</span>
              <br />
              <span className="text-white">J-CAGE</span>
            </h2>
            <p className="text-brand-gold text-sm font-bold tracking-[0.2em] uppercase mb-6">
              You-Already-Know
            </p>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-gray-300 italic mb-6 leading-relaxed">
              "I don't sell content. I deliver <span className="text-brand-gold font-semibold not-italic">tracked RSVPs</span>. 
              If I don't move the numbers, don't keep me."
            </blockquote>

            {/* Bio */}
            <p className="text-gray-400 mb-8 leading-relaxed">
              Operating since 2024 across Warehouse District, North Loop, and Uptown. 
              If it's happening in Minneapolis nightlife, we're there.
            </p>

            {/* Instagram Badge - High Fidelity */}
            <a
              href="https://www.instagram.com/mplsjohnnycage/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-lg hover:opacity-90 transition-opacity mb-6"
            >
              <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
                <Instagram className="w-5 h-5 text-pink-500" />
              </div>
              <div className="text-left">
                <div className="text-white font-bold text-sm">FOLLOW @MPLSJOHNNYCAGE</div>
                <div className="text-white/70 text-xs">12.4K Followers • Live Updates</div>
              </div>
              <ExternalLink className="w-4 h-4 text-white/70 ml-2" />
            </a>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-700 bg-gray-800/50">
                <span className="text-xs font-bold text-gray-400">@JCage_Mpls</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-700 bg-gray-800/50">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-xs font-bold text-gray-400">Stripe Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
