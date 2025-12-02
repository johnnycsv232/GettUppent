"use client";

import { motion } from "framer-motion";
import { Zap, Clock, BarChart3, Camera } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const benefits = [
  {
    icon: Camera,
    title: "Energy",
    description: "Peak-hour reels and photos that look like your best night—every week.",
  },
  {
    icon: Clock,
    title: "Consistency",
    description: "Systemized capture + AI pipeline delivers on schedule, every time.",
  },
  {
    icon: BarChart3,
    title: "Measurable Results",
    description: "UTM-tracked posts, monthly snapshot, real venue metrics.",
  },
  {
    icon: Zap,
    title: "Delivery Speed",
    description: "T1/T2/T3 SLAs: 72h • 48h • 24h. We never miss.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-20 md:py-32 bg-[#0B0B0D]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white mb-4">
            What You Get & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#BF953F]">Why It Converts</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-inter">
            Time is the business. Every SOP protects your margin.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-6 rounded-2xl border border-white/10 bg-[#1F1F24]/50 hover:border-[#D9AE43]/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#D9AE43]/10 group-hover:bg-[#D9AE43]/20 transition-colors">
                  <benefit.icon className="h-6 w-6 text-[#D9AE43]" />
                </div>
                <div>
                  <h3 className="font-oswald text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 font-inter text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <MagneticButton onClick={() => window.location.href = '/pilot-intake'}>
            Start Pilot ($345)
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
