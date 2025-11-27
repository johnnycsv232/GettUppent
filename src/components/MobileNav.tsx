'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Crown, ChevronRight } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  highlight?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Shop', href: '/shop', highlight: true },
  { label: 'Book Now', href: '/schedule' },
  { label: 'Login', href: '/login' },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-400 hover:text-white transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#0a0a0a] border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-2 text-xl font-black tracking-tighter">
            <Crown className="h-6 w-6 text-brand-gold" />
            <span className="text-white">GETTUPP<span className="text-brand-gold">ENT</span></span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-6">
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                    item.highlight
                      ? 'bg-brand-pink/10 text-brand-pink hover:bg-brand-pink/20'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="font-medium">{item.label}</span>
                  <ChevronRight className="h-5 w-5 opacity-50" />
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="block w-full py-4 px-6 bg-brand-gold text-black font-bold text-center rounded-xl hover:bg-white transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
          <p className="text-gray-500 text-xs text-center">
            © 2025 GettUpp Entertainment
          </p>
        </div>
      </div>
    </div>
  );
}
