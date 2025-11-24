'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Check } from 'lucide-react';
import React from 'react';

interface PricingCardProps {
  tier: string;
  price: string;
  desc: string;
  features: string[];
  recommended?: boolean;
  isPilot?: boolean;
  action: string;
  delay?: number;
}

export function PricingCard({ tier, price, desc, features, recommended, isPilot, action, delay = 0 }: PricingCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 200);
    y.set(yPct * 200);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col p-8 rounded-sm border transition-all duration-300 ${recommended ? 'bg-[#111] border-brand-gold shadow-[0_0_30px_rgba(255,215,0,0.15)] z-10' : 'bg-[#080808] border-white/10 hover:border-brand-pink/50'}`}
    >
      {recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-gold text-black font-oswald text-sm font-bold px-4 py-1 uppercase tracking-widest skew-x-[-10deg] shadow-lg">
          Most Popular
        </div>
      )}
      {isPilot && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-pink text-white font-oswald text-sm font-bold px-4 py-1 uppercase tracking-widest skew-x-[-10deg] shadow-lg">
          Limited: 3/Mo
        </div>
      )}
      
      <div className="mb-8 border-b border-white/10 pb-8 transform translate-z-10">
        <h3 className="text-2xl font-oswald font-bold text-white uppercase tracking-wide mb-2">{tier}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-oswald font-bold text-white tracking-tight">${price}</span>
          <span className="text-gray-500 font-oswald text-sm uppercase">{isPilot ? '/one-time' : '/mo'}</span>
        </div>
        <p className="text-gray-400 text-sm mt-4 leading-relaxed font-light">{desc}</p>
      </div>

      <div className="flex-1 space-y-4 mb-8 transform translate-z-10">
        {features.map((feat: string, i: number) => (
          <div key={i} className="flex items-start gap-3 text-sm text-gray-300 group/item">
            <Check size={16} className={`${recommended ? "text-brand-gold" : "text-gray-600"} shrink-0 mt-0.5 group-hover/item:text-brand-pink transition-colors`} />
            <span className="uppercase tracking-wide text-xs font-bold group-hover/item:text-white transition-colors">{feat}</span>
          </div>
        ))}
      </div>

      <Link href={action} className={`w-full py-4 rounded-sm font-oswald font-bold text-lg uppercase tracking-wide text-center transition-all transform hover:scale-105 ${recommended ? 'bg-brand-gold text-black hover:bg-white shadow-[0_0_20px_rgba(255,215,0,0.3)]' : 'bg-white/5 text-white hover:bg-brand-pink hover:text-white'}`}>
        {isPilot ? 'Apply for Pilot' : 'Select Plan'}
      </Link>
    </motion.div>
  );
}
