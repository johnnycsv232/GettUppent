'use client';

import { motion } from 'framer-motion';

interface PortfolioTileProps {
  title: string;
  color: 'pink' | 'blue' | 'gold' | 'red';
  delay?: number;
}

export function PortfolioTile({ title, color, delay = 0 }: PortfolioTileProps) {
  const gradient = color === 'pink' ? 'bg-gradient-to-br from-brand-pink/20' : color === 'blue' ? 'bg-gradient-to-tl from-blue-900/40' : color === 'gold' ? 'bg-gradient-to-tr from-brand-gold/20' : 'bg-gradient-to-br from-red-900/40';
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative group overflow-hidden bg-gray-800 border border-white/5 cursor-pointer"
    >
      <div className={`absolute inset-0 ${gradient} to-black opacity-50 group-hover:opacity-80 transition-opacity duration-500`}></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-oswald font-bold text-lg text-gray-600 uppercase tracking-wider group-hover:text-white transition-colors duration-300 z-10 relative">
          {title}
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
        </span>
      </div>
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-brand-${color === 'gold' ? 'gold' : 'pink'} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`}></div>
    </motion.div>
  );
}
