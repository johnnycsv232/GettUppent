"use client";

import Link from "next/link";
import Image from "next/image";
import { Crown, Instagram, CheckCircle, MapPin, Camera, Zap } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0B0B0D]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tighter font-oswald">
            <Crown className="h-6 w-6 text-[#D9AE43]" />
            GETTUPP<span className="text-[#D9AE43]">ENT</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/services" className="text-gray-400 hover:text-white transition-colors font-medium uppercase tracking-wider text-sm">Services</Link>
            <Link href="/gallery" className="text-gray-400 hover:text-white transition-colors font-medium uppercase tracking-wider text-sm">Gallery</Link>
            <Link href="/shop" className="text-gray-400 hover:text-[#FF3C93] transition-colors font-medium uppercase tracking-wider text-sm">Shop</Link>
          </nav>
          <Link href="/schedule?tier=pilot" className="hidden md:block">
            <MagneticButton>Book Now</MagneticButton>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D9AE43]/30 bg-[#D9AE43]/5 mb-6">
              <Camera className="h-4 w-4 text-[#D9AE43]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D9AE43] font-oswald">
                The Story
              </span>
            </div>
            <h1 className="font-oswald text-5xl md:text-7xl font-black uppercase mb-6">
              Meet <span className="text-[#D9AE43]">Johnny Cage</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-inter">
              The man behind the lens. Building Minneapolis's most reliable nightlife content engine.
            </p>
          </div>

          {/* Trust Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <AnimatedCounter value={12} suffix="+" label="Venues Served" />
            <AnimatedCounter value={500} suffix="+" label="Shoots Completed" />
            <AnimatedCounter value={99} suffix="%" label="On-Time Rate" />
          </div>
        </div>
      </section>

      {/* Johnny Cage Section */}
      <section className="py-20 px-4 bg-[#1F1F24]/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Image */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative">
                <div className="absolute -top-3 -left-3 w-12 h-12 border-l-2 border-t-2 border-[#D9AE43] rounded-tl-lg" />
                <div className="absolute -top-3 -right-3 w-12 h-12 border-r-2 border-t-2 border-[#D9AE43] rounded-tr-lg" />
                <div className="absolute -bottom-3 -left-3 w-12 h-12 border-l-2 border-b-2 border-[#D9AE43] rounded-bl-lg" />
                <div className="absolute -bottom-3 -right-3 w-12 h-12 border-r-2 border-b-2 border-[#D9AE43] rounded-br-lg" />
                
                <div className="aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="h-20 w-20 text-gray-700" />
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 bg-black/70 backdrop-blur-sm rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <MapPin className="h-3 w-3 text-[#D9AE43]" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Active: North Loop</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2">
              <div className="text-[#D9AE43] text-xs font-bold tracking-[0.3em] uppercase mb-4 font-oswald">
                The Face Behind GettUpp
              </div>
              <h2 className="font-oswald text-4xl md:text-5xl font-black uppercase leading-[0.9] mb-2">
                JOHNNY CAGE
              </h2>
              <p className="text-[#D9AE43] text-sm font-bold tracking-[0.2em] uppercase mb-6 font-oswald">
                You-Already-Know
              </p>

              <blockquote className="text-xl md:text-2xl text-gray-300 italic mb-6 leading-relaxed border-l-4 border-[#D9AE43] pl-6 font-inter">
                "I don't sell content. I deliver tracked RSVPs. If I don't move the numbers, don't keep me."
              </blockquote>

              <p className="text-gray-400 mb-8 leading-relaxed font-inter">
                Operating since 2024 across Warehouse District, North Loop, and Uptown. 
                Former promoter turned content strategist. I understand the nightlife game because I lived it.
                Every shoot is optimized for one thing: <span className="text-white font-semibold">packed venues</span>.
              </p>

              {/* Instagram Badge */}
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
                  <div className="text-white font-bold text-sm font-oswald">FOLLOW @MPLSJOHNNYCAGE</div>
                  <div className="text-white/70 text-xs font-inter">12.4K Followers • Live Updates</div>
                </div>
              </a>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-700 bg-gray-800/50">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-xs font-bold text-gray-400 font-inter">Stripe Verified</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-700 bg-gray-800/50">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-xs font-bold text-gray-400 font-inter">Insured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-oswald text-4xl md:text-5xl font-black uppercase mb-6">
            Ready to <span className="text-[#D9AE43]">Own The Night</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-8 font-inter">
            Start with a $345 Pilot Night. Zero risk. If you hate the photos, we reshoot free.
          </p>
          <MagneticButton onClick={() => window.location.href = '/schedule?tier=pilot'}>
            <span className="flex items-center gap-2">
              Book Pilot Night <Zap className="h-5 w-5" />
            </span>
          </MagneticButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 text-xs uppercase tracking-widest font-inter">
            © 2025 GettUpp Ent. Minneapolis, MN
          </p>
        </div>
      </footer>
    </div>
  );
}
