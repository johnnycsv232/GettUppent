"use client";

import { motion } from "framer-motion";
import { TrendingUp, Eye, Clock, CheckCircle, Quote } from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import MagneticButton from "@/components/ui/MagneticButton";

const stats = [
  { value: 79700, label: "Views (90 Days)", suffix: "" },
  { value: 32, label: "Profile Visit Lift", suffix: "%" },
  { value: 99, label: "On-Time Delivery", suffix: "%" },
];

const testimonials = [
  {
    quote: "Delivery in 24–48h, every time.",
    venue: "The Night Owl",
    role: "Owner",
  },
  {
    quote: "Our Friday content started driving table inquiries.",
    venue: "Skyline Lounge",
    role: "Manager",
  },
];

export default function ProofSection() {
  return (
    <section className="py-20 md:py-32 bg-[#0B0B0D] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white mb-4">
            Proof That Moves <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#BF953F]">Decisions</span>
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8 rounded-2xl border border-white/10 bg-[#1F1F24]/50"
            >
              <div className="text-5xl md:text-6xl font-black text-[#D9AE43] font-oswald mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} label="" />
              </div>
              <div className="text-gray-400 font-inter">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-[#D9AE43]/20 bg-[#D9AE43]/5"
            >
              <Quote className="h-8 w-8 text-[#D9AE43]/40 mb-4" />
              <p className="text-xl text-white font-medium mb-4 font-inter">"{testimonial.quote}"</p>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#D9AE43]/20 flex items-center justify-center">
                  <span className="text-[#D9AE43] font-bold text-sm">{testimonial.venue[0]}</span>
                </div>
                <div>
                  <div className="text-white font-bold font-oswald">{testimonial.venue}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logo Strip Placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-6 font-oswald">Trusted by Minneapolis Venues</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-50">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-24 h-12 rounded bg-white/5 flex items-center justify-center">
                <span className="text-gray-600 text-xs">Logo {i}</span>
              </div>
            ))}
          </div>
        </motion.div>

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
