"use client";
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export default function AnimatedCounter({ value, suffix = "", label }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 400 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = Intl.NumberFormat("en-US").format(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#1F1F24]/50 border border-[#E6E6E6]/10 backdrop-blur-md rounded-2xl">
      <div className="flex items-baseline space-x-1">
        <span ref={ref} className="text-4xl md:text-5xl font-bold text-[#D9AE43] tabular-nums font-oswald" />
        <span className="text-2xl md:text-3xl font-bold text-[#D9AE43]">{suffix}</span>
      </div>
      <p className="mt-2 text-sm font-medium text-[#E6E6E6]/80 uppercase tracking-widest font-inter">
        {label}
      </p>
    </div>
  );
}
