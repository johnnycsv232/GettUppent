'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Users, Play, Star, CheckCircle, Crown, Video, TrendingUp, Lock } from 'lucide-react';
import { useCMS } from '@/hooks/useCMS';
import LandingSkeleton from '@/components/LandingSkeleton';
import MobileNav from '@/components/MobileNav';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { content, loading } = useCMS();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (loading || !content) {
    return <LandingSkeleton />;
  }

  const { hero, pricing, portfolio } = content;

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden perspective-1000 font-sans selection:bg-brand-gold selection:text-black">

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tighter">
            <Crown className="h-6 w-6 text-brand-gold" />
            GETTUPP<span className="text-brand-gold">ENT</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/services" className="text-gray-400 hover:text-white transition-colors font-medium">Services</Link>
            <Link href="/gallery" className="text-gray-400 hover:text-white transition-colors font-medium">Gallery</Link>
            <Link href="/shop" className="text-gray-400 hover:text-brand-pink transition-colors font-medium">Shop</Link>
            <Link href="/schedule" className="text-gray-400 hover:text-white transition-colors font-medium">Book Now</Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-gray-400 hover:text-white transition-colors font-medium">Login</Link>
            <Link href="/register" className="px-4 py-2 bg-brand-gold text-black font-bold rounded-lg hover:bg-white transition-colors">
              Get Started
            </Link>
          </div>
          <MobileNav />
        </div>
      </header>

      {/* 3D Background Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: `perspective(500px) rotateX(60deg) translateY(${scrollY * 0.5}px) translateZ(-200px)`,
          transformOrigin: 'center top'
        }}
      />

      {/* Ambient Spotlights */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[120px] mix-blend-screen"
          style={{ transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)` }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-pink/10 rounded-full blur-[120px] mix-blend-screen"
          style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)` }}
        />
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20">

        {/* 3D Floating Title */}
        <div
          className="relative z-10 text-center transform-style-3d transition-transform duration-100 ease-out"
          style={{
            transform: `rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg)`
          }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-12 animate-fade-in backdrop-blur-md hover:bg-white/10 transition-colors cursor-default">
            <Crown className="h-4 w-4 text-brand-gold" />
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-brand-gold">Premier Nightlife Agency</span>
          </div>

          <h1 className="text-7xl md:text-[10rem] font-black mb-8 tracking-tighter leading-[0.8]">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">
              {hero.headline.split(' ').slice(0, 2).join(' ')}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-gold drop-shadow-[0_0_50px_rgba(255,215,0,0.4)]">
              {hero.headline.split(' ').slice(2).join(' ')}
            </span>
          </h1>

          <p className="text-xl md:text-3xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light whitespace-pre-line">
            {hero.subheadline}
          </p>

          {/* Social Proof Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <div className="px-6 py-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-brand-gold" />
              <div className="text-left">
                <div className="text-2xl font-black text-white leading-none">79.7K</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Views (90d)</div>
              </div>
            </div>
            <div className="px-6 py-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm flex items-center gap-3">
              <Users className="h-6 w-6 text-brand-pink" />
              <div className="text-left">
                <div className="text-2xl font-black text-white leading-none">32%</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Profile Lift</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href={hero.ctaLink}
              className="group relative px-10 py-5 bg-brand-gold text-black font-black text-xl uppercase tracking-wider clip-path-slant hover:scale-105 transition-transform shadow-[0_0_40px_rgba(217,174,67,0.4)]"
            >
              <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-3">
                {hero.ctaText} <Zap className="h-6 w-6 fill-current" />
              </span>
            </Link>
            <Link href="/admin" className="group flex items-center gap-3 px-10 py-5 border border-white/20 hover:bg-white/5 transition-colors uppercase tracking-wider font-bold text-xl backdrop-blur-sm">
              <Play className="h-6 w-6 text-brand-pink group-hover:scale-125 transition-transform" />
              View Work
            </Link>
          </div>
        </div>
      </section>

      {/* THE PILOT OFFER */}
      <section id="pilot" className="relative py-40 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-20">

            {/* Left: Copy */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-pink/10 border border-brand-pink/20 mb-6">
                <Lock className="h-4 w-4 text-brand-pink" />
                <span className="text-sm font-bold tracking-widest uppercase text-brand-pink">Invite Only</span>
              </div>
              <h2 className="text-6xl font-black mb-8 uppercase leading-none">
                The <span className="text-brand-pink">Pilot</span>
              </h2>
              <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
                Test the engine before you commit.
                <br />
                One week. Full production. <span className="text-white font-bold">Zero risk.</span>
              </p>
              <ul className="space-y-6 mb-12">
                {[
                  "1 On-Site Content Shoot",
                  "30 High-End Edited Photos",
                  "72h Delivery Turnaround",
                  "Social Strategy Audit"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-xl">
                    <CheckCircle className="h-6 w-6 text-brand-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="text-5xl font-black text-white mb-2">$345 <span className="text-xl text-gray-500 font-normal">/ One Time</span></div>
              <p className="text-sm text-gray-500 mb-8 uppercase tracking-widest">Limited to 3 Venues / Month</p>

              <Link
                href="/pilot-intake"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 border border-white/20 hover:bg-brand-pink hover:border-brand-pink hover:text-white transition-all duration-300 font-bold uppercase tracking-wider"
              >
                Claim Access <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Right: Visual Ticket */}
            <div className="flex-1 relative perspective-1000">
              <div
                className="relative bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 p-12 rounded-[2rem] transform-style-3d rotate-y-12 hover:rotate-y-0 transition-transform duration-700 shadow-2xl"
              >
                <div className="absolute inset-0 bg-brand-pink/5 rounded-[2rem]" />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-pink/20 rounded-full blur-3xl" />

                <div className="relative z-10 border-2 border-dashed border-white/10 p-8 rounded-xl">
                  <div className="flex justify-between items-start mb-12">
                    <Crown className="h-12 w-12 text-brand-pink" />
                    <div className="text-right">
                      <div className="text-sm text-gray-500 uppercase tracking-widest">Admit One</div>
                      <div className="text-2xl font-black text-white">VIP ACCESS</div>
                    </div>
                  </div>
                  <div className="text-8xl font-black text-white/10 mb-4">PILOT</div>
                  <div className="text-center">
                    <div className="inline-block px-4 py-1 bg-brand-pink text-black font-bold uppercase tracking-widest text-sm rounded-full">
                      Entry Offer
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RETAINER TIERS */}
      <section className="relative py-40 px-4 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <h2 className="text-5xl md:text-8xl font-black mb-8 uppercase">
              Full <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">Retainers</span>
            </h2>
            <p className="text-xl text-gray-400">Dominate your city with consistent, high-end content.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {pricing.map((plan, i) => (
              <div
                key={i}
                className={`group relative p-10 rounded-[2rem] border ${plan.isPopular ? 'border-brand-gold' : 'border-white/20'} bg-[#0A0A0A] transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl flex flex-col`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-8 py-2 bg-brand-gold text-black font-black uppercase tracking-widest text-sm rounded-full shadow-[0_0_30px_rgba(217,174,67,0.4)]">
                    Best Value
                  </div>
                )}

                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">TIER {i + 1}</div>
                <h3 className="text-3xl font-black mb-2 text-white uppercase">{plan.name}</h3>
                <p className="text-gray-400 mb-8 h-12">{plan.description}</p>

                <div className="mb-10 pb-10 border-b border-white/10">
                  <span className={`text-6xl font-black ${plan.isPopular ? 'text-brand-gold' : 'text-white'}`}>
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 font-bold">/mo</span>
                </div>

                <ul className="space-y-6 mb-12 flex-grow">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-300 font-medium">
                      <CheckCircle className={`h-5 w-5 mt-1 ${plan.isPopular ? 'text-brand-gold' : 'text-gray-600'}`} />
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/pilot-intake"
                  className={`block w-full text-center py-5 font-black uppercase tracking-widest transition-all duration-300 rounded-xl ${plan.isPopular
                    ? 'bg-brand-gold text-black hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]'
                    : 'bg-white/5 text-white hover:bg-white/20'
                    }`}
                >
                  {plan.ctaText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GETTUPP GIRLS & EDITING */}
      <section className="relative py-40 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-40">

          {/* GettUpp Girls Feature */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-20">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-pink/10 border border-brand-pink/20 mb-6">
                <Star className="h-4 w-4 text-brand-pink" />
                <span className="text-sm font-bold tracking-widest uppercase text-brand-pink">Merch Vertical</span>
              </div>
              <h2 className="text-6xl font-black mb-8 uppercase leading-none">
                GettUpp <span className="text-brand-pink">Girls</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                More than just models. A lifestyle brand.
                <br />
                Cross-promote your venue with our exclusive <span className="text-white font-bold">merch and influencer network</span>.
              </p>
              <button className="group flex items-center gap-4 text-brand-pink font-bold uppercase tracking-widest hover:text-white transition-colors">
                View Collection <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            <div className="flex-1 relative h-[600px] w-full">
              {/* Abstract representation of influencer grid */}
              <div className="absolute top-0 left-0 w-64 h-80 bg-[#1a1a1a] border border-white/10 rotate-[-6deg] rounded-2xl p-2 shadow-2xl z-10 hover:rotate-0 transition-transform duration-500 hover:z-50 hover:scale-110">
                <div className="w-full h-full bg-gray-800 rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-black text-4xl opacity-20">IMG 01</div>
                </div>
              </div>
              <div className="absolute top-20 right-10 w-64 h-80 bg-[#1a1a1a] border border-white/10 rotate-[12deg] rounded-2xl p-2 shadow-2xl z-20 hover:rotate-0 transition-transform duration-500 hover:z-50 hover:scale-110">
                <div className="w-full h-full bg-gray-800 rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-black text-4xl opacity-20">IMG 02</div>
                </div>
              </div>
              <div className="absolute bottom-0 left-20 w-64 h-80 bg-[#1a1a1a] border border-white/10 rotate-[-3deg] rounded-2xl p-2 shadow-2xl z-30 hover:rotate-0 transition-transform duration-500 hover:z-50 hover:scale-110">
                <div className="w-full h-full bg-gray-800 rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-black text-4xl opacity-20">IMG 03</div>
                </div>
              </div>
            </div>
          </div>

          {/* Editing Feature */}
          <div className="flex flex-col md:flex-row items-center gap-20">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <Video className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-bold tracking-widest uppercase text-blue-500">Post-Production</span>
              </div>
              <h2 className="text-6xl font-black mb-8 uppercase leading-none">
                Cinema <span className="text-blue-500">Grade</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Same-day turnarounds. 4K quality. Viral editing styles.
                <br />
                Our editors know exactly what stops the scroll on TikTok and Reels.
              </p>
              <button className="group flex items-center gap-4 text-blue-500 font-bold uppercase tracking-widest hover:text-white transition-colors">
                See Examples <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            <div className="flex-1 relative">
              <div className="aspect-video bg-[#111] rounded-3xl border border-white/10 overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                    <Play className="h-8 w-8 text-white fill-current" />
                  </div>
                </div>
                {/* Timeline UI Mockup */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-md border-t border-white/10 flex items-center px-6 gap-2">
                  <div className="h-8 w-1 bg-blue-500 rounded-full"></div>
                  <div className="h-1 flex-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-blue-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* PORTFOLIO GRID */}
      <section className="relative py-40 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-8xl font-black mb-8 uppercase">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Work</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolio.map((item, i) => (
              <div
                key={i}
                className={`group relative aspect-[4/5] bg-[#111] overflow-hidden cursor-pointer ${i === 1 || i === 4 ? 'md:translate-y-12' : ''}`}
              >
                <div className="absolute inset-0 bg-gray-800 transition-transform duration-700 group-hover:scale-110">
                  {/* Placeholder for actual image/video */}
                  <div className="w-full h-full flex items-center justify-center text-gray-700 font-black text-6xl opacity-20 uppercase">
                    {item.type}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-white font-bold text-xl uppercase tracking-wider mb-2">{item.title}</div>
                  <div className="text-brand-gold text-sm font-mono">VIEW PROJECT -&gt;</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-60 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-gold/10 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-7xl md:text-[8rem] font-black mb-12 leading-[0.8]">
            READY TO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-brand-gold animate-pulse">
              TAKE OVER?
            </span>
          </h2>

          <Link
            href="/pilot-intake"
            className="inline-flex items-center gap-6 px-16 py-8 bg-white text-black font-black text-3xl uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_80px_rgba(255,255,255,0.4)] transition-all duration-300 clip-path-slant"
          >
            Start Now <ArrowRight className="h-10 w-10" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/10 bg-[#020202] px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="text-2xl font-black tracking-tighter mb-4">
                GETTUPP<span className="text-brand-gold">ENT</span>
              </div>
              <p className="text-gray-500 text-sm max-w-xs">
                Premier nightlife photography for Minneapolis venues. 
                We don't just post. We pack venues.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Services</h4>
              <div className="flex flex-col gap-2 text-gray-500">
                <Link href="/services" className="hover:text-white transition-colors">Photography Packages</Link>
                <Link href="/schedule?tier=pilot" className="hover:text-white transition-colors">Pilot Night ($345)</Link>
                <Link href="/gallery" className="hover:text-white transition-colors">Photo Gallery</Link>
              </div>
            </div>

            {/* Shop */}
            <div>
              <h4 className="font-bold text-brand-pink mb-4 uppercase tracking-wider text-sm">GettUpp Girls</h4>
              <div className="flex flex-col gap-2 text-gray-500">
                <Link href="/shop" className="hover:text-brand-pink transition-colors">Apparel Catalog</Link>
              </div>
            </div>

            {/* Account */}
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Account</h4>
              <div className="flex flex-col gap-2 text-gray-500">
                <Link href="/login" className="hover:text-white transition-colors">Client Login</Link>
                <Link href="/register" className="hover:text-white transition-colors">Register</Link>
                <Link href="/portal" className="hover:text-white transition-colors">Client Dashboard</Link>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
            <div className="flex gap-6 text-sm font-bold uppercase tracking-widest text-gray-500">
              <a href="https://instagram.com/gettuppent" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href="https://tiktok.com/@gettuppent" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>
              <Link href="/admin" className="hover:text-brand-gold transition-colors">Staff Login</Link>
            </div>
            <div className="text-gray-600 text-xs uppercase tracking-widest">
              &copy; 2025 GettUpp ENT. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .clip-path-slant {
          clip-path: polygon(10% 0, 100% 0, 90% 100%, 0% 100%);
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
