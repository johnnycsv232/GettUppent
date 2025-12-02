"use client";

import Link from "next/link";
import { Crown, MessageCircle, Mail, Instagram, MapPin, Phone, Clock } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ContactPage() {
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
            <Link href="/faq" className="text-gray-400 hover:text-white transition-colors font-medium uppercase tracking-wider text-sm">FAQ</Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors font-medium uppercase tracking-wider text-sm">About</Link>
          </nav>
          <Link href="/schedule?tier=pilot" className="hidden md:block">
            <MagneticButton>Book Now</MagneticButton>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D9AE43]/30 bg-[#D9AE43]/5 mb-6">
            <MessageCircle className="h-4 w-4 text-[#D9AE43]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D9AE43] font-oswald">
              Get In Touch
            </span>
          </div>
          <h1 className="font-oswald text-5xl md:text-7xl font-black uppercase mb-6">
            Contact <span className="text-[#D9AE43]">Us</span>
          </h1>
          <p className="text-xl text-gray-400 font-inter">
            Ready to own the night? Let's talk.
          </p>
        </div>
      </section>

      {/* Main CTA - SMS */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#D9AE43]/20 to-[#FF3C93]/20 border border-[#D9AE43]/30 rounded-2xl p-8 md:p-12 text-center">
            <Phone className="h-16 w-16 text-[#D9AE43] mx-auto mb-6" />
            <h2 className="font-oswald text-3xl md:text-4xl font-black uppercase mb-4">
              Fastest Way to Reach Us
            </h2>
            <p className="text-gray-300 text-lg mb-6 font-inter">
              Text '<span className="text-[#D9AE43] font-bold">VISIT</span>' to{' '}
              <span className="text-white font-semibold text-2xl">555-0199</span>
            </p>
            <p className="text-gray-400 text-sm font-inter">
              See us shoot live this Friday. Get an instant response.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options Grid */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div className="bg-[#1F1F24]/50 border border-white/10 rounded-2xl p-8">
            <Mail className="h-10 w-10 text-[#D9AE43] mb-4" />
            <h3 className="font-oswald text-xl font-black uppercase mb-2">Email</h3>
            <a 
              href="mailto:shoot@gettupp.com" 
              className="text-[#D9AE43] hover:text-white transition-colors font-inter"
            >
              shoot@gettupp.com
            </a>
            <p className="text-gray-500 text-sm mt-2 font-inter">
              Response within 24 hours
            </p>
          </div>

          {/* Instagram */}
          <div className="bg-[#1F1F24]/50 border border-white/10 rounded-2xl p-8">
            <Instagram className="h-10 w-10 text-[#FF3C93] mb-4" />
            <h3 className="font-oswald text-xl font-black uppercase mb-2">Instagram DM</h3>
            <a 
              href="https://instagram.com/mplsjohnnycage" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF3C93] hover:text-white transition-colors font-inter"
            >
              @mplsjohnnycage
            </a>
            <p className="text-gray-500 text-sm mt-2 font-inter">
              Usually responds same day
            </p>
          </div>

          {/* Location */}
          <div className="bg-[#1F1F24]/50 border border-white/10 rounded-2xl p-8">
            <MapPin className="h-10 w-10 text-[#D9AE43] mb-4" />
            <h3 className="font-oswald text-xl font-black uppercase mb-2">Coverage Area</h3>
            <p className="text-gray-300 font-inter">Minneapolis Metro</p>
            <p className="text-gray-500 text-sm mt-2 font-inter">
              North Loop • Downtown • Uptown • Northeast
            </p>
          </div>

          {/* Hours */}
          <div className="bg-[#1F1F24]/50 border border-white/10 rounded-2xl p-8">
            <Clock className="h-10 w-10 text-[#D9AE43] mb-4" />
            <h3 className="font-oswald text-xl font-black uppercase mb-2">Shoot Hours</h3>
            <p className="text-gray-300 font-inter">Thu-Sat: 9PM - 2AM</p>
            <p className="text-gray-500 text-sm mt-2 font-inter">
              Inquiries: Mon-Fri 10AM - 6PM
            </p>
          </div>
        </div>
      </section>

      {/* Book Direct CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-oswald text-3xl md:text-4xl font-black uppercase mb-6">
            Ready to <span className="text-[#D9AE43]">Skip the Chat</span>?
          </h2>
          <p className="text-gray-400 mb-8 font-inter">
            Book directly and lock in your Pilot Night. $345 gets you started.
          </p>
          <MagneticButton onClick={() => window.location.href = '/schedule?tier=pilot'}>
            Book Pilot Night Now
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
