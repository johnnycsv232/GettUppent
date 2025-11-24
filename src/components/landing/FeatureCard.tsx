'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: 'gold' | 'pink';
  delay?: number;
}

export function FeatureCard({ icon: Icon, title, desc, color, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10 }}
      className="glass-card p-8 rounded-sm h-full relative overflow-hidden group"
    >
      <div className={`absolute top-0 left-0 w-1 h-full ${color === 'pink' ? 'bg-brand-pink' : 'bg-brand-gold'} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
      <div className={`w-12 h-12 rounded-sm flex items-center justify-center mb-6 ${color === 'pink' ? 'bg-brand-pink/10 text-brand-pink' : 'bg-brand-gold/10 text-brand-gold'} group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={24} />
      </div>
      <h3 className="text-2xl font-oswald font-bold mb-3 uppercase group-hover:text-white transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}
