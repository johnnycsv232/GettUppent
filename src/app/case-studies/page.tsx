"use client";

import Link from "next/link";
import { Crown, TrendingUp, Users, DollarSign, ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const caseStudies = [
  {
    venue: "The Warehouse",
    location: "North Loop",
    initials: "TW",
    metric: 40,
    metricLabel: "Door Count Increase",
    quote: "First shoot with Johnny, we saw a 40% jump in door count that Friday. Second shoot, we beat our record.",
    contact: "Marcus Chen, GM",
    duration: "3 months",
    tier: "Weekend Warrior (T2)",
  },
  {
    venue: "Vanquish",
    location: "Downtown",
    initials: "VQ",
    metric: 28,
    metricLabel: "Table Bookings Up",
    quote: "They don't just take photos—they track what works. Our table bookings are up 28% since we started.",
    contact: "DJ Khrome, Resident",
    duration: "6 months",
    tier: "VIP Partner (T3)",
  },
  {
    venue: "Rabbit Hole",
    location: "Uptown",
    initials: "RH",
    metric: 35,
    metricLabel: "Weekend Traffic",
    quote: "We tried three other content creators. They gave us 'pretty photos.' Johnny gave us packed Saturdays.",
    contact: "Sarah Kim, Marketing Director",
    duration: "4 months",
    tier: "Weekend Warrior (T2)",
  },
];

export default function CaseStudiesPage() {
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
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors font-medium uppercase tracking-wider text-sm">About</Link>
          </nav>
          <Link href="/schedule?tier=pilot" className="hidden md:block">
            <MagneticButton>Book Now</MagneticButton>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D9AE43]/30 bg-[#D9AE43]/5 mb-6">
            <TrendingUp className="h-4 w-4 text-[#D9AE43]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D9AE43] font-oswald">
              Verified Results
            </span>
          </div>
          <h1 className="font-oswald text-5xl md:text-7xl font-black uppercase mb-6">
            Case <span className="text-[#D9AE43]">Studies</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-inter">
            Real venues. Real numbers. Real growth. See how Minneapolis venues are winning with GettUpp.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {caseStudies.map((study, index) => (
            <div 
              key={study.venue}
              className="bg-[#1F1F24]/50 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm"
            >
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                {/* Left: Venue Info + Quote */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#D9AE43]/20 border border-[#D9AE43]/30 flex items-center justify-center">
                      <span className="text-[#D9AE43] font-bold text-xl font-oswald">{study.initials}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white font-oswald">{study.venue}</h2>
                      <p className="text-gray-500 text-sm font-inter">{study.location} • {study.tier}</p>
                    </div>
                  </div>

                  <blockquote className="text-xl md:text-2xl text-gray-300 italic mb-6 leading-relaxed font-inter">
                    "{study.quote}"
                  </blockquote>

                  <p className="text-gray-500 text-sm font-inter">
                    — {study.contact} • Partner for {study.duration}
                  </p>
                </div>

                {/* Right: Metric */}
                <div className="lg:w-1/3 flex items-center justify-center">
                  <AnimatedCounter 
                    value={study.metric} 
                    suffix="%" 
                    label={study.metricLabel} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ROI Math Section */}
      <section className="py-20 px-4 bg-[#1F1F24]/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-oswald text-4xl md:text-5xl font-black uppercase mb-8">
            The <span className="text-[#D9AE43]">Math</span> Is Simple
          </h2>
          
          <div className="bg-[#0B0B0D] border border-[#D9AE43]/30 rounded-2xl p-8 md:p-12 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <div className="text-center">
                <div className="text-6xl md:text-7xl font-black text-white font-oswald">3</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider mt-2 font-inter">New Customers</div>
              </div>
              <div className="text-5xl font-black text-[#D9AE43]">=</div>
              <div className="text-center">
                <div className="text-6xl md:text-7xl font-black text-[#D9AE43] font-oswald">$995</div>
                <div className="text-sm text-[#D9AE43] uppercase tracking-wider mt-2 font-inter">Package Paid For</div>
              </div>
            </div>
            <p className="text-gray-400 mt-8 font-inter">
              Average venue LTV per customer: <span className="text-white font-semibold">$350</span>. 
              Your content brings 3+ new faces minimum.
            </p>
          </div>

          <MagneticButton onClick={() => window.location.href = '/schedule?tier=pilot'}>
            <span className="flex items-center gap-2">
              Start Your Case Study <ArrowRight className="h-5 w-5" />
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
