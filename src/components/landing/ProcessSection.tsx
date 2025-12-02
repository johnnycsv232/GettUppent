"use client";

import { motion } from "framer-motion";
import { ClipboardList, Calendar, CreditCard, Camera, Sparkles, Send } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "30-Second Intake",
    description: "Venue name, IG handle, preferred night, phone/email.",
  },
  {
    number: "02",
    icon: Calendar,
    title: "Booking Confirmation",
    description: "Cal.com link with buffers. Pick your night.",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Autopay Setup",
    description: "Stripe autopay (ACH or card). Net-7 terms.",
  },
  {
    number: "04",
    icon: Camera,
    title: "Shoot Night",
    description: "We capture: Exterior, walk-in POV, DJ, dance floor, micro-interviews.",
  },
  {
    number: "05",
    icon: Sparkles,
    title: "AI Edit Pipeline",
    description: "Import → Preset → Remini → NanoBanana → Crop → Export.",
  },
  {
    number: "06",
    icon: Send,
    title: "Delivery",
    description: "Mini-gallery next morning. Full album by SLA. Monthly snapshot.",
  },
];

export default function ProcessSection() {
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
            What Happens When You <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#BF953F]">Click</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-inter">
            From intake to delivered content in 6 simple steps.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-6 rounded-2xl border border-white/10 bg-[#1F1F24]/50"
            >
              {/* Step number */}
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-[#D9AE43] flex items-center justify-center">
                <span className="text-black font-black text-sm font-oswald">{step.number}</span>
              </div>

              <div className="pt-4">
                <step.icon className="h-8 w-8 text-[#D9AE43] mb-4" />
                <h3 className="font-oswald text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 font-inter text-sm">{step.description}</p>
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
