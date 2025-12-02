'use client';

import Link from 'next/link';
import { Crown, Instagram, ExternalLink } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-black tracking-tighter mb-4">
              <Crown className="h-7 w-7 text-brand-gold" />
              <span className="text-white">GETTUPP</span>
              <span className="text-brand-gold">ENT</span>
            </Link>
            <p className="text-gray-500 max-w-sm mb-6">
              Premium nightlife photography for venues that want to own the night. 
              We don't just post—we pack venues.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/gettuppent" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-brand-pink hover:border-brand-pink/30 transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://tiktok.com/@gettuppent" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-brand-pink hover:border-brand-pink/30 transition-all"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/schedule?tier=pilot" className="text-gray-400 hover:text-white transition-colors">
                  Pilot Night
                </Link>
              </li>
              <li>
                <Link href="/schedule?tier=t1" className="text-gray-400 hover:text-white transition-colors">
                  Retainer Plans
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-white transition-colors">
                  Our Work
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Account</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-400 hover:text-white transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/portal" className="text-gray-400 hover:text-white transition-colors">
                  Client Portal
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} GettUpp ENT. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-600">
            <Link href="/login" className="hover:text-gray-400 transition-colors">
              Staff
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
