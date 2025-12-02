'use client';

import Link from 'next/link';
import { Crown, Zap, Play, Clock, Camera } from 'lucide-react';

interface HeroSectionProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function HeroSection({ 
  headline = "OWN THE NIGHT",
  subheadline = "We don't just post. We pack venues.",
  ctaText = "Start The Pilot",
  ctaLink = "#pilot"
}: HeroSectionProps) {
  // Split headline for styling - first part white, "NIGHT" gold
  const headlineParts = headline.split(' ');
  const lastWord = headlineParts.pop() || 'NIGHT';
  const firstPart = headlineParts.join(' ');

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-20 bg-brand-ink">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-pink/5 rounded-full blur-[120px]" />
      </div>

      {/* Floating side text - VENUE */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <span className="text-white/10 text-sm font-bold tracking-[0.3em] uppercase writing-mode-vertical rotate-180" style={{ writingMode: 'vertical-rl' }}>
          VENUE
        </span>
      </div>

      {/* Floating side text - CLUB */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <span className="text-white/10 text-sm font-bold tracking-[0.3em] uppercase" style={{ writingMode: 'vertical-rl' }}>
          CLUB
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Premier Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/5 mb-8 animate-fade-in">
          <Crown className="h-4 w-4 text-brand-gold" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-brand-gold">
            Premier Nightlife Agency
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.9] mb-6 animate-fade-in-up">
          <span className="block text-white">{firstPart}</span>
          <span className="block gold-gradient-text">{lastWord}</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-2 animate-fade-in">
          {subheadline}
        </p>
        <p className="text-base sm:text-lg font-semibold text-white mb-10 animate-fade-in">
          Energy. Consistency. Measurable Results.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up">
          <Link
            href={ctaLink}
            className="gold-gradient-button px-8 py-4 rounded-lg text-base font-bold uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-transform"
          >
            {ctaText} <Zap className="h-5 w-5" />
          </Link>
          <Link
            href="/gallery"
            className="px-8 py-4 rounded-lg border border-brand-gold/40 text-white font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-brand-gold/10 transition-all"
          >
            View Work <Play className="h-5 w-5" />
          </Link>
        </div>

        {/* Trust Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-gray-400 animate-fade-in">
          <div className="flex items-center gap-2">
            <Crown className="h-4 w-4 text-brand-gold" />
            <span>Trusted by <span className="text-white font-semibold">12+</span> Minneapolis Venues</span>
          </div>
          <span className="hidden sm:inline text-brand-gold">•</span>
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4 text-brand-gold" />
            <span><span className="text-white font-semibold">500+</span> Shoots Completed</span>
          </div>
          <span className="hidden sm:inline text-brand-gold">•</span>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-brand-gold" />
            <span><span className="text-white font-semibold">99.2%</span> On-Time Record</span>
          </div>
        </div>
      </div>
    </section>
  );
}
