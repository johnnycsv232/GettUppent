"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { Calculator, TrendingUp } from "lucide-react";

function AnimatedValue({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 400 });
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(Math.floor(latest));
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
}

export default function RoiCalculator() {
  const [covers, setCovers] = useState(150);
  const [revenue, setRevenue] = useState(0);
  
  // Logic: 5% lift in covers from content → $35 avg spend → annualized
  useEffect(() => {
    const weeklyLift = covers * 0.05; // 5% lift from content
    const annualRev = weeklyLift * 35 * 52; // $35 avg spend × 52 weeks
    setRevenue(Math.floor(annualRev));
  }, [covers]);

  const roi = Math.round((revenue / 11940) * 100); // Based on VIP tier ($995/mo × 12)

  return (
    <section className="py-24 bg-surface border-y border-white/5 relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brandGold/50 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brandGold/10 border border-brandGold/30 mb-6">
            <Calculator className="h-4 w-4 text-brandGold" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-brandGold font-oswald">
              Interactive ROI
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-2 font-oswald">
            Calculate Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#BF953F]">
              ROI
            </span>
          </h2>
          <p className="text-gray-400 mb-12 max-w-lg mx-auto font-inter">
            See exactly how much revenue proper nightlife content generates.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-black border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative"
        >
          {/* Input Section */}
          <div className="mb-12">
            <label className="block text-sm font-bold text-brandGold uppercase tracking-widest mb-4 font-oswald">
              Avg. Weekend Covers (Per Night)
            </label>
            <div className="relative max-w-xs mx-auto">
              <input
                type="number"
                value={covers}
                onChange={(e) => setCovers(Math.max(0, Number(e.target.value)))}
                className="w-full bg-surface border-b-2 border-white/20 text-center text-4xl font-bold py-4 focus:border-brandGold focus:outline-none transition-colors text-white font-oswald"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold font-inter">PPL</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="1000" 
              value={covers} 
              onChange={(e) => setCovers(Number(e.target.value))}
              className="w-full mt-8 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brandGold [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(217,174,67,0.5)]"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-2 font-inter">
              <span>50</span>
              <span>500</span>
              <span>1,000</span>
            </div>
          </div>

          {/* Results Section */}
          <div className="grid md:grid-cols-2 gap-8 items-center bg-surface/50 rounded-2xl p-8 border border-white/5">
            <div className="text-left space-y-2">
              <p className="text-gray-400 text-sm font-inter">Conservative Estimate</p>
              <h3 className="text-xl font-bold text-white font-oswald">Annual Revenue Lift</h3>
              <p className="text-xs text-gray-500 font-inter">Based on 5% traffic lift, $35 Avg Spend</p>
            </div>
            
            <div className="text-right">
              <div className="text-5xl md:text-6xl font-black text-brandGold font-oswald tracking-tight">
                $<AnimatedValue value={revenue} />
              </div>
              <div className="text-green-500 text-sm font-bold mt-2 flex justify-end items-center gap-1 font-inter">
                <TrendingUp className="h-4 w-4" />
                <span>{roi}% ROI on VIP Tier</span>
              </div>
            </div>
          </div>

          {/* Bottom CTA hint */}
          <p className="text-gray-600 text-xs mt-6 font-inter">
            VIP Tier: $995/mo = $11,940/yr • Your projected return: ${revenue.toLocaleString()}/yr
          </p>
        </motion.div>
      </div>
    </section>
  );
}
