"use client";
import { motion } from "framer-motion";
import { Clock, Eye, MapPin, Shield, CreditCard, FileCheck } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const proofChips = [
  { icon: Eye, text: "79.7K views (90 days)" },
  { icon: Clock, text: "24–72h delivery" },
  { icon: MapPin, text: "Minneapolis specialist" },
];

const trustStrip = [
  { icon: CreditCard, text: "Stripe Verified" },
  { icon: FileCheck, text: "Non-exclusive license" },
  { icon: Shield, text: "MN tax aligned" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Background with Gradient Overlay */}
      <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20" />
      </div>

      <div className="relative z-30 text-center px-4 max-w-5xl mx-auto">
        {/* Proof Chips */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {proofChips.map((chip, i) => (
            <div 
              key={i}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <chip.icon className="h-4 w-4 text-brandGold" />
              <span className="text-sm text-gray-300 font-medium">{chip.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tight font-oswald leading-[0.95]">
            We don't just post.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#BF953F] animate-shimmer bg-[length:200%_auto]">
              We pack venues.
            </span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light font-inter leading-relaxed"
        >
          Predictable, AI-enhanced nightlife content that drives bookings 
          <br className="hidden md:block"/>
          through <span className="text-white font-medium">speed</span>, <span className="text-white font-medium">consistency</span>, and <span className="text-white font-medium">measurable results</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <MagneticButton onClick={() => window.location.href = '/pilot-intake'} variant="gold">
            Start Pilot ($345)
          </MagneticButton>
          <button 
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 text-white font-bold uppercase tracking-wider border border-white/20 rounded-lg hover:bg-white/5 transition-all"
          >
            See Pricing
          </button>
        </motion.div>

        {/* Trust Strip */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap justify-center gap-6 text-xs text-gray-500"
        >
          {trustStrip.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <item.icon className="h-4 w-4 text-brandGold/60" />
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-brandGold rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
