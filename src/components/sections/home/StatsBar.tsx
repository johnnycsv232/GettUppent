"use client";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function StatsBar() {
  return (
    <section className="py-20 border-y border-white/5 bg-surface/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <AnimatedCounter value={12} suffix="+" label="Partner Venues" />
        <AnimatedCounter value={79700} suffix="" label="Views Last 90 Days" />
        <AnimatedCounter value={99.2} suffix="%" label="On-Time Delivery" />
      </div>
    </section>
  );
}
