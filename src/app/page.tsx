'use client';

import Link from 'next/link';
import { Crown } from 'lucide-react';
import { useCMS } from '@/hooks/useCMS';
import LandingSkeleton from '@/components/LandingSkeleton';
import MobileNav from '@/components/MobileNav';
import MagneticButton from '@/components/ui/MagneticButton';
import { Hero, StatsBar } from '@/components/sections/home';
import { RoiCalculator, ComparisonSlider } from '@/components/interactive';
import {
  JohnnyCageSection,
  ShotClockSection,
  TestimonialsSection,
  PilotOfferSection,
  PricingSection,
  GettUppGirlsSection,
  EditingOnlySection,
  GallerySection,
  FooterSection,
} from '@/components/landing';

export default function Home() {
  const { content, loading } = useCMS();

  if (loading || !content) {
    return <LandingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background text-white overflow-x-hidden font-sans selection:bg-brandGold selection:text-black">

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tighter font-oswald">
            <Crown className="h-6 w-6 text-brandGold" />
            GETTUPP<span className="text-brandGold">ENT</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/services" className="text-gray-400 hover:text-white transition-colors font-medium uppercase tracking-wider text-sm">Services</Link>
            <Link href="/gallery" className="text-gray-400 hover:text-white transition-colors font-medium uppercase tracking-wider text-sm">Gallery</Link>
            <Link href="/shop" className="text-gray-400 hover:text-brandPink transition-colors font-medium uppercase tracking-wider text-sm">Shop</Link>
            <Link href="/schedule" className="text-gray-400 hover:text-white transition-colors font-medium uppercase tracking-wider text-sm">Book Now</Link>
          </nav>
          
          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-gray-400 hover:text-white transition-colors font-medium uppercase tracking-wider text-sm">Login</Link>
            <MagneticButton onClick={() => window.location.href = '/register'}>
              Get Started
            </MagneticButton>
          </div>
          
          <MobileNav />
        </div>
      </header>

      {/* HERO SECTION - High Conversion */}
      <Hero />

      {/* STATS BAR - Animated Counters */}
      <StatsBar />

      {/* COMPARISON SLIDER - Before/After */}
      <ComparisonSlider />

      {/* ROI CALCULATOR - Interactive */}
      <RoiCalculator />

      {/* JOHNNY CAGE / MEET THE FACE */}
      <JohnnyCageSection />

      {/* SHOT CLOCK / DEADLINE SECTION */}
      <ShotClockSection />

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* PILOT OFFER */}
      <PilotOfferSection />

      {/* PRICING TIERS */}
      <PricingSection />

      {/* GETTUPP GIRLS */}
      <GettUppGirlsSection />

      {/* EDITING ONLY */}
      <EditingOnlySection />

      {/* GALLERY */}
      <GallerySection />

      {/* FOOTER */}
      <FooterSection />
    </div>
  );
}
