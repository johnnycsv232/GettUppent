"use client";
import { useState, useRef, useCallback } from "react";
import { MoveHorizontal, Sparkles, Camera } from "lucide-react";
import { motion } from "framer-motion";

export default function ComparisonSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    
    const { left, width } = containerRef.current.getBoundingClientRect();
    const position = ((clientX - left) / width) * 100;
    
    setSliderPosition(Math.min(100, Math.max(0, position)));
    setShowTooltip(false);
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(event.clientX);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(event.touches[0].clientX);
  };

  const startDragging = () => setIsDragging(true);
  const stopDragging = () => setIsDragging(false);

  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brandGold/10 border border-brandGold/30 mb-6">
            <Sparkles className="h-4 w-4 text-brandGold" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-brandGold font-oswald">
              Before & After
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 font-oswald">
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#BF953F]">
              GettUpp
            </span>{" "}
            Difference
          </h2>
          <p className="text-gray-400 font-inter">Drag to see raw vs. engineered content.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          ref={containerRef}
          className="relative w-full aspect-[4/5] md:aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize border border-white/10 select-none shadow-2xl"
          onMouseDown={startDragging}
          onTouchStart={startDragging}
          onMouseUp={stopDragging}
          onTouchEnd={stopDragging}
          onMouseLeave={stopDragging}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* AFTER Image (Background - Full) */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-brandGold/20 via-black to-brandPink/20 flex items-center justify-center"
          >
            {/* Placeholder gradient when no image */}
            <div className="absolute inset-0 bg-[url('/images/compare-after.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          
          {/* AFTER Label */}
          <div className="absolute top-6 right-6 bg-brandGold text-black font-bold px-4 py-2 rounded-full text-sm z-10 flex items-center gap-2 font-oswald">
            <Sparkles className="h-4 w-4" />
            GETTUPP ENGINEERED
          </div>

          {/* BEFORE Image (Clipped) */}
          <div 
            className="absolute inset-0 border-r-4 border-brandGold"
            style={{ 
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` 
            }}
          >
            {/* Placeholder gradient when no image */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
            <div className="absolute inset-0 bg-[url('/images/compare-before.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-black/30" />
            
            {/* BEFORE Label */}
            <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-md text-white border border-white/20 font-bold px-4 py-2 rounded-full text-sm flex items-center gap-2 font-oswald">
              <Camera className="h-4 w-4" />
              FREELANCER RAW
            </div>
          </div>

          {/* Draggable Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-brandGold z-20 shadow-[0_0_20px_rgba(217,174,67,0.5)]"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Handle Circle */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-brandGold rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(217,174,67,0.6)] hover:scale-110 transition-transform cursor-grab active:cursor-grabbing">
              <MoveHorizontal className="text-black w-6 h-6" />
            </div>
            
            {/* Tooltip */}
            {showTooltip && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-1/2 -translate-y-1/2 left-8 bg-white text-black text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap shadow-lg font-inter"
              >
                ← Drag Me →
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full border-8 border-transparent border-r-white" />
              </motion.div>
            )}
          </div>

          {/* Gradient overlay for depth */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        </motion.div>

        {/* Bottom caption */}
        <p className="text-center text-gray-600 text-sm mt-6 font-inter">
          Same shot. Same venue. Different results.
        </p>
      </div>
    </section>
  );
}
