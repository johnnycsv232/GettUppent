'use client';

import { motion } from 'framer-motion';

interface MetricItemProps {
  value: string;
  label: string;
  delay?: number;
}

export function MetricItem({ value, label, delay = 0 }: MetricItemProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="text-center group cursor-default"
    >
      <div className="text-4xl font-oswald font-bold text-white group-hover:text-brand-gold transition-colors duration-300 transform group-hover:scale-110">{value}</div>
      <div className="text-xs font-bold uppercase tracking-widest text-gray-600 group-hover:text-brand-pink transition-colors duration-300">{label}</div>
    </motion.div>
  );
}
