"use client";
import { Check } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const TIERS = [
  {
    name: "Pilot Night",
    price: "345",
    desc: "One night to prove it. No commitment.",
    features: ["1 Nightlife Shoot", "30 Edited Photos", "72h Turnaround", "Full Rights"],
    cta: "Book Pilot",
    popular: false,
  },
  {
    name: "Weekend Warrior",
    price: "695",
    period: "/mo",
    desc: "Dominate the weekend feed.",
    features: ["2 Shoots / Month", "60 Photos + 2 Reels", "48h Priority Delivery", "Route Batching"],
    cta: "Start Subscription",
    popular: true,
  },
  {
    name: "VIP Partner",
    price: "995",
    period: "/mo",
    desc: "Full content ownership.",
    features: ["3 Shoots / Month", "90 Photos + 4 Reels", "24h Express Delivery", "Monthly Strategy Call"],
    cta: "Go VIP",
    popular: false,
  },
];

export default function PricingGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
      {TIERS.map((tier, i) => (
        <div 
          key={i} 
          className={`relative p-8 rounded-3xl border ${tier.popular ? 'border-brandGold bg-surface shadow-[0_0_30px_rgba(217,174,67,0.1)]' : 'border-white/10 bg-background'} flex flex-col`}
        >
          {tier.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brandGold text-black font-bold px-4 py-1 rounded-full text-sm uppercase font-oswald">
              Most Popular
            </div>
          )}
          <h3 className="text-2xl font-bold font-oswald mb-2 text-white">{tier.name}</h3>
          <div className="flex items-baseline mb-4">
            <span className="text-4xl font-bold text-white font-oswald">${tier.price}</span>
            {tier.period && <span className="text-gray-400 ml-1 font-inter">{tier.period}</span>}
          </div>
          <p className="text-gray-400 mb-8 h-12 font-inter">{tier.desc}</p>
          
          <ul className="space-y-4 mb-8 flex-1">
            {tier.features.map((f, j) => (
              <li key={j} className="flex items-center gap-3 text-sm text-gray-300 font-inter">
                <div className="bg-brandGold/20 p-1 rounded-full">
                  <Check className="w-3 h-3 text-brandGold" />
                </div>
                {f}
              </li>
            ))}
          </ul>

          <MagneticButton 
            variant={tier.popular ? "gold" : "pink"} 
            className="w-full text-sm"
            onClick={() => window.location.href = `/schedule?tier=${tier.name.toLowerCase().replace(' ', '-')}`}
          >
            {tier.cta}
          </MagneticButton>
        </div>
      ))}
    </div>
  );
}
