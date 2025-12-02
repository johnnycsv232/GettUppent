'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Crown, ShoppingBag, Camera, Image, Calendar, User, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const NAV_LINKS = [
  { href: '/services', label: 'Services', icon: Camera },
  { href: '/gallery', label: 'Gallery', icon: Image },
  { href: '/shop', label: 'Shop', icon: ShoppingBag },
];

export default function PublicHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { items } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/95 backdrop-blur-xl border-b border-white/10 py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="group flex items-center gap-2 text-xl font-black tracking-tighter"
            >
              <Crown className="h-6 w-6 text-brand-gold group-hover:scale-110 transition-transform" />
              <span className="text-white">GETTUPP</span>
              <span className="text-brand-gold">ENT</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors ${
                    isActive(link.href)
                      ? 'text-brand-gold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-gold rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/schedule"
                className="group relative px-6 py-2.5 bg-brand-gold text-black text-sm font-bold uppercase tracking-wider overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(217,174,67,0.4)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Now
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-brand-gold transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-[#0A0A0A] border-l border-white/10 md:hidden transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link href="/" className="flex items-center gap-2 text-lg font-black">
              <Crown className="h-5 w-5 text-brand-gold" />
              <span className="text-white">GETTUPP</span>
              <span className="text-brand-gold">ENT</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Links */}
          <nav className="flex-1 p-6 space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-colors ${
                  isActive(link.href)
                    ? 'bg-brand-gold/10 text-brand-gold'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <link.icon className="h-5 w-5" />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
            
            <div className="h-px bg-white/10 my-4" />
            
            <Link
              href="/login"
              className="flex items-center gap-4 px-4 py-4 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="font-medium">Login</span>
            </Link>
          </nav>

          {/* Mobile CTA */}
          <div className="p-6 border-t border-white/10">
            <Link
              href="/schedule"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-brand-gold text-black font-bold uppercase tracking-wider hover:bg-brand-gold/90 transition-colors"
            >
              <Calendar className="h-5 w-5" />
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
}
