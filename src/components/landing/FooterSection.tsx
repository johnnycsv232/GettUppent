'use client';

import Link from 'next/link';
import { Crown, Instagram, Twitter, Mail, MessageCircle, Shield } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="bg-brand-ink border-t border-white/10">
      {/* SMS Micro-CTA */}
      <div className="py-8 border-b border-white/10 bg-brand-charcoal/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-lg">
            <MessageCircle className="h-5 w-5 text-brand-gold" />
            <span className="text-gray-400">Still deciding?</span>
          </div>
          <p className="text-gray-300 mt-2">
            Text '<span className="text-brand-gold font-bold underline">VISIT</span>' to{' '}
            <span className="text-white font-semibold">555-0199</span> to see us shoot live this Friday.
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div>
              <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tighter mb-4">
                <Crown className="h-6 w-6 text-brand-gold" />
                GETTUPP<span className="text-brand-gold">ENT</span>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Premium nightlife photography for Minneapolis venues that want to own the night. 
                We don't just post—we pack venues.
              </p>
              
              {/* SMS Box */}
              <div className="p-4 rounded-lg border border-brand-gold/20 bg-brand-gold/5">
                <div className="flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-wider mb-2">
                  <MessageCircle className="h-4 w-4" />
                  Still Deciding?
                </div>
                <p className="text-gray-400 text-xs">
                  Text 'VISIT' to <span className="text-white font-semibold">555-0199</span> to see us shoot live this Friday.
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-4 mt-6">
                <a 
                  href="https://instagram.com/mplsjohnnycage" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-brand-gold transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://twitter.com/gettuppent" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-brand-gold transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="mailto:shoot@gettupp.com"
                  className="text-gray-500 hover:text-brand-gold transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Services</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/services" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Photography Packages
                  </Link>
                </li>
                <li>
                  <Link href="/pilot-intake?service=editing" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Editing-Only
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="text-gray-500 hover:text-brand-pink transition-colors text-sm">
                    Shop GettUpp Girls
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-500 hover:text-white transition-colors text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-500 hover:text-white transition-colors text-sm">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/terms" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cancellation" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Cancellation Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-xs uppercase tracking-wider">
              © 2025 GettUpp Ent. All Rights Reserved. • Minneapolis, MN
            </p>
            <div className="flex items-center gap-2 text-gray-600 text-xs">
              <Shield className="h-4 w-4" />
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
