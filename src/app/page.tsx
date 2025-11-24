'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, BarChart3, ShieldCheck, ArrowRight, Play, Instagram, Image as ImageIcon, ArrowUpRight } from 'lucide-react';

// Extracted Components
import { PricingCard } from '@/components/landing/PricingCard';
import { FeatureCard } from '@/components/landing/FeatureCard';
import { PortfolioTile } from '@/components/landing/PortfolioTile';
import { MetricItem } from '@/components/landing/MetricItem';
import { MagneticButton } from '@/components/landing/MagneticButton';
import { RevealText } from '@/components/landing/RevealText';

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <a href={href} className="relative group">
      <span className="hover:text-brand-gold transition-colors duration-300">{children}</span>
      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
    </a>
  );
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax Transforms
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const textY = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-brand-pink selection:text-white font-sans overflow-x-hidden">
      
      {/* NAV BAR */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-[#080808]/90 backdrop-blur-md border-brand-gold/10 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-1 select-none group cursor-pointer">
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="flex items-center"
             >
               <span className="font-oswald font-bold text-3xl tracking-tight text-gold-metallic relative">
                 GETTUPP
                 <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-100"></span>
               </span>
               <span className="font-oswald font-bold text-3xl tracking-tight text-neon-pink ml-1">ENT</span>
             </motion.div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400 tracking-wide uppercase">
            <NavLink href="#method">The Method</NavLink>
            <NavLink href="#work">Work</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <Link href="/shop" className="hover:text-brand-pink transition-colors font-bold relative group">
              GettUpp Girls
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-pink transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/ops" className="hover:text-brand-gold transition-colors">Login</Link>
          </div>

          <MagneticButton>
            <Link href="/pilot-intake" className="relative overflow-hidden bg-white text-black px-8 py-3 rounded-sm font-oswald font-bold text-lg uppercase tracking-wide group">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Book Pilot</span>
              <div className="absolute inset-0 bg-brand-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
          </MagneticButton>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#080808]">
        {/* Grunge Texture Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]"></div>
        
        <motion.div style={{ y: heroY }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse"></motion.div>
        <motion.div style={{ y: heroY }} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-pink/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></motion.div>
        
        <motion.div 
          style={{ y: textY, opacity: opacityHero }}
          className="max-w-7xl mx-auto px-6 relative z-10 text-center"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded border border-brand-gold/30 bg-brand-gold/5 text-brand-gold text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
            Minneapolis / St. Paul
          </motion.div>
          
          <h1 className="font-oswald font-bold text-7xl md:text-9xl leading-[0.9] mb-8 tracking-tighter perspective-1000">
            <RevealText text="OWN THE" delay={0.4} className="text-gold-metallic block" />
            <RevealText text="NIGHT." delay={0.8} className="text-white block" />
          </h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            Flaky freelancers kill momentum. We are a predictable content engine. 
            <span className="text-white font-semibold block mt-2">AI-Enhanced. 24-72h Delivery. Profit Focused.</span>
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/pilot-intake" className="w-full sm:w-auto group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-gold to-brand-pink rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-brand-gold hover:bg-white text-black px-10 py-4 rounded-sm font-oswald font-bold text-xl uppercase tracking-wide transition-all flex items-center justify-center gap-2 ring-1 ring-white/10">
                Start Your Pilot <ArrowRight size={24} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            <button className="w-full sm:w-auto px-10 py-4 rounded-sm border-2 border-gray-800 hover:border-brand-pink text-gray-300 hover:text-brand-pink font-oswald font-bold text-xl uppercase tracking-wide transition-colors flex items-center justify-center gap-2 group">
              <Play size={20} className="fill-current group-hover:scale-110 transition-transform" /> View Showreel
            </button>
          </motion.div>

          {/* Metrics Strip */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="mt-24 border-t border-white/10 pt-10 flex flex-wrap justify-center gap-12 md:gap-24"
          >
            <MetricItem value="79.7K" label="90d Views" delay={1.7} />
            <MetricItem value="32%" label="Profile Lift" delay={1.8} />
            <MetricItem value="24h" label="Avg Turnaround" delay={1.9} />
          </motion.div>
        </motion.div>
      </section>

      {/* METHODOLOGY */}
      <section id="method" className="py-24 bg-[#111111] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:flex justify-between items-end">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <h2 className="text-brand-gold font-oswald font-bold tracking-widest text-sm uppercase mb-2">The System</h2>
              <h3 className="text-5xl md:text-6xl font-oswald font-bold uppercase tracking-tighter text-white">Time is the Business.</h3>
            </motion.div>
            <motion.p 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-400 max-w-md mt-6 md:mt-0 font-light border-l-2 border-brand-pink pl-4"
            >
              We don't just take pictures. We run a logistical operation optimized for speed, volume, and ROI.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Zap}
              title="Speed as a Feature"
              desc="Standard delivery in 48 hours. VIPs get 24h. We use an AI-enhanced pipeline (Remini + NanoBanana) to process bulk edits faster than any freelancer."
              color="gold"
              delay={0}
            />
            <FeatureCard 
              icon={BarChart3}
              title="Measurable ROI"
              desc="We track performance. Our mission is to drive table leads and door revenue. If the content doesn't move the needle, we don't expect you to keep us."
              color="pink"
              delay={0.2}
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="Zero Flakiness"
              desc="Automated scheduling, backup shooters, and a 3-2-1 data redundancy policy. We treat your brand assets with enterprise-grade security."
              color="gold"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* FOUNDER PHILOSOPHY (Johnny Cage) */}
      <section className="py-20 bg-black relative overflow-hidden border-y border-[#2A2A2E]">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC45IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIxIi8+PC9zdmc+')]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2"
            >
              <h2 className="font-oswald font-bold text-6xl md:text-8xl uppercase leading-none text-[#FF4500] tracking-tighter mb-4 drop-shadow-[2px_2px_0px_#FFF]">
                JOHNNY<br/>CAGE
              </h2>
              <div className="h-2 w-24 bg-white mb-6"></div>
              <p className="font-oswald text-2xl text-white uppercase tracking-widest mb-2">You Already Know.</p>
              <p className="text-gray-400 text-sm max-w-md leading-relaxed">
                We don't do "polite" coverage. We capture the sweat, the bass, and the blurred lines of a packed room. This isn't wedding photography. It's nightlife documentation with an attitude.
              </p>
            </motion.div>
            <motion.div 
              initial={{ rotate: -5, opacity: 0 }}
              whileInView={{ rotate: -2, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="w-full md:w-1/2 border-4 border-white p-2 bg-[#FF4500] transform -rotate-2 shadow-[10px_10px_0px_rgba(255,255,255,0.1)]"
            >
              <div className="bg-black p-8 text-center">
                <h3 className="font-oswald font-bold text-4xl text-white uppercase mb-2">No Excuses.</h3>
                <h3 className="font-oswald font-bold text-4xl text-[#FF4500] uppercase">Just Content.</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="work" className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-oswald font-bold text-white uppercase tracking-tight">Recent Work</h2>
              <div className="h-1 w-full bg-brand-gold mt-2"></div>
            </motion.div>
            <a href="#" className="text-brand-gold hover:text-white text-sm font-bold flex items-center gap-2 transition-colors uppercase tracking-widest group">
              View Full Gallery <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-1 h-[600px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 relative group overflow-hidden bg-gray-900 cursor-pointer"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,#2a2a2a_25%,#333_25%,#333_50%,#2a2a2a_50%,#2a2a2a_75%,#333_75%,#333_100%)] bg-[length:20px_20px] opacity-60 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-105 transform"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-oswald font-bold text-4xl text-white uppercase tracking-widest border-2 border-white px-4 py-2 mix-blend-overlay group-hover:bg-white group-hover:text-black transition-colors duration-300">Club Energy</span>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-brand-gold text-xs font-bold tracking-widest uppercase mb-1">The Loop</p>
                <h3 className="text-2xl font-oswald font-bold uppercase">Saturday Night Prime</h3>
              </div>
            </motion.div>
            
            <PortfolioTile title="Cocktail Detail" color="pink" delay={0.1} />
            <PortfolioTile title="DJ Set" color="blue" delay={0.2} />
            <PortfolioTile title="Crowd" color="gold" delay={0.3} />
            <PortfolioTile title="VIP" color="red" delay={0.4} />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-5xl font-oswald font-bold mb-4 uppercase text-white"
            >
              Transparent Pricing
            </motion.h2>
            <div className="w-20 h-1 bg-brand-pink mx-auto mb-6"></div>
            <p className="text-gray-400">No hidden creative fees. No "usage rights" upsells. Just a flat monthly subscription.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 items-start perspective-1000">
            <PricingCard 
              tier="The Pilot"
              price="345"
              isPilot={true}
              desc="Test the engine. One night, full throttle."
              features={["1 Shoot (2-3 hours)", "30 Edited Photos", "72h Turnaround", "Full Usage Rights", "Autopay Required"]}
              action="/pilot-intake"
              delay={0}
            />
            <PricingCard 
              tier="Tier 1"
              price="445"
              desc="Consistent weekly photo coverage."
              features={["1 Shoot / Month", "30 Edited Photos", "72h Turnaround", "Monthly Reporting", "Cancel Anytime"]}
              action="/contact"
              delay={0.1}
            />
            <PricingCard 
              tier="Tier 2"
              price="695"
              recommended={true}
              desc="Coverage for your two biggest nights."
              features={["2 Shoots / Month", "60 Edited Photos", "2 Reels (15-30s)", "48h Priority Turnaround", "Route Batched Logic"]}
              action="/contact"
              delay={0.2}
            />
            <PricingCard 
              tier="Tier 3"
              price="995"
              desc="Total domination. Own the feed."
              features={["3 Shoots / Month", "80 Edited Photos", "3 Reels (High Polish)", "24h Rush Delivery", "Monthly Strategy Call"]}
              action="/contact"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* EDITING ONLY UPSELL */}
      <section id="editing" className="py-24 bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-r from-[#111] to-[#080808] border border-brand-pink/30 p-12 rounded-sm overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/10 blur-[80px] pointer-events-none group-hover:bg-brand-pink/20 transition-all duration-700"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 mb-6">
                  <span className="font-oswald font-bold text-4xl text-gold-metallic italic tracking-tighter transform -skew-x-6">GETT UPP</span>
                  <span className="font-oswald font-bold text-4xl text-neon-pink italic tracking-tighter transform -skew-x-6">GIRLS</span>
                  <span className="ml-2 px-2 py-1 bg-white text-black text-xs font-bold uppercase">Style Edit</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-oswald font-bold mb-6 uppercase text-white">Already have a shooter?</h2>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed font-light border-l-4 border-brand-gold pl-6">
                  We offer an <span className="text-white font-bold">Editing-Only</span> package. 
                  Send us up to 30 RAWs. We apply our signature look—perfect skin, corrected club lighting, and high-energy color grading.
                </p>
                
                <div className="flex gap-8 mb-8">
                  <div>
                    <h4 className="text-brand-gold font-oswald font-bold text-xl uppercase">The Spec</h4>
                    <p className="text-sm text-gray-400">30 Photos, Color + Retouch</p>
                  </div>
                  <div>
                    <h4 className="text-brand-gold font-oswald font-bold text-xl uppercase">The Speed</h4>
                    <p className="text-sm text-gray-400">72h Guaranteed SLA</p>
                  </div>
                </div>

                <button className="bg-brand-pink text-white px-10 py-4 rounded-sm font-oswald font-bold text-xl uppercase hover:bg-white hover:text-brand-pink transition-colors shadow-[4px_4px_0px_#fff] hover:shadow-[6px_6px_0px_rgba(255,255,255,0.5)] hover:-translate-y-1 transform duration-200">
                  Get Edited ($199)
                </button>
              </div>
              
              <div className="flex-1 w-full">
                <div className="relative aspect-video bg-gray-800 rounded-sm overflow-hidden border-2 border-brand-gold/20 shadow-2xl group/slider">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 bg-gray-900 flex items-center justify-center border-r border-brand-gold/50">
                      <span className="text-gray-600 font-oswald font-bold text-2xl uppercase">RAW</span>
                    </div>
                    <div className="w-1/2 bg-gradient-to-br from-brand-pink/20 to-[#080808] flex items-center justify-center">
                      <span className="text-gold-metallic font-oswald font-bold text-2xl uppercase">Polished</span>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 left-1/2 w-0.5 bg-brand-gold cursor-ew-resize flex items-center justify-center shadow-[0_0_15px_#FFD700] group-hover/slider:left-[60%] transition-all duration-1000 ease-in-out">
                    <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-black shadow-lg">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/10 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
               <div className="flex items-center gap-1 mb-6 select-none">
                  <span className="font-oswald font-bold text-2xl tracking-tight text-brand-gold">GETTUPP</span>
                  <span className="font-oswald font-bold text-2xl tracking-tight text-brand-pink">ENT</span>
               </div>
               <p className="text-gray-500 max-w-sm mb-6 text-sm leading-relaxed">
                  The unofficial uniform for the girls who never wait in line. 
                  Nightlife documentation with an attitude.
               </p>
               <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-brand-pink hover:bg-white/10 transition-all">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-brand-gold hover:bg-white/10 transition-all">
                    <ImageIcon size={18} />
                  </a>
               </div>
            </div>

            <div>
              <h4 className="text-white font-oswald font-bold uppercase mb-6 tracking-wider">Company</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-brand-gold transition-colors">About Johnny Cage</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">Vision & Mission</a></li>
                <li><Link href="/shop" className="hover:text-brand-gold transition-colors">GettUpp Girls <span className="text-[10px] bg-brand-pink text-white px-1.5 py-0.5 rounded ml-1 font-bold">NEW</span></Link></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-oswald font-bold uppercase mb-6 tracking-wider">Support</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-brand-gold transition-colors">Client Portal</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">MN Tax Info</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 uppercase tracking-wider">
            <p>&copy; 2025 GettUpp ENT LLC. All rights reserved.</p>
            <p className="max-w-md text-right hidden md:block">
              Services rendered as creative promotional services.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
