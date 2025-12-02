"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (100vh)
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      
      if (scrollY > heroHeight * 0.8 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          {/* Gradient blur backdrop */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-transparent -top-8" />
          
          <div className="relative px-4 pb-6 pt-4">
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute -top-2 right-4 p-2 text-gray-500 hover:text-white"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Main CTA */}
            <button
              onClick={() => window.location.href = '/pilot-intake'}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#BF953F] via-[#D9AE43] to-[#BF953F] text-black font-black uppercase tracking-wider rounded-xl shadow-[0_0_30px_rgba(217,174,67,0.4)] active:scale-[0.98] transition-transform"
            >
              Start Pilot ($345)
              <ArrowRight className="h-5 w-5" />
            </button>

            {/* Reassurance */}
            <p className="text-center text-xs text-gray-500 mt-3">
              Delivery in 24–72h, guaranteed by ShotClock
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
