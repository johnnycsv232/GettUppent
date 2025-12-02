"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleExit = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };
    document.addEventListener("mouseleave", handleExit);
    return () => document.removeEventListener("mouseleave", handleExit);
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B0B0D]/80 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-full max-w-lg p-8 m-4 bg-[#1F1F24] border border-[#D9AE43]/30 rounded-2xl shadow-[0_0_50px_rgba(217,174,67,0.15)]"
        >
          <button 
            onClick={() => setIsVisible(false)} 
            className="absolute top-4 right-4 text-[#E6E6E6] hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2 font-oswald">Stop Shooting in the Dark</h2>
            <p className="text-[#E6E6E6]/80 mb-6 font-inter">
              Don't leave money on the table. Most Minneapolis venues waste <strong>$1.6k–$2.7k/mo</strong> on hourly shooters.
            </p>
            <div className="bg-[#0B0B0D] p-4 rounded-lg border border-[#333] mb-6">
              <p className="text-sm text-[#D9AE43] font-bold uppercase tracking-widest mb-1 font-oswald">Limited Pilot Offer</p>
              <p className="text-4xl font-bold text-white font-oswald">$345 <span className="text-lg font-normal text-[#E6E6E6] font-inter">/ first month</span></p>
              <ul className="text-sm text-left mt-4 space-y-2 text-[#E6E6E6] font-inter">
                <li>✓ 1 Full Nightlife Shoot (3-4h)</li>
                <li>✓ 30 AI-Enhanced Photos (Remini Workflow)</li>
                <li>✓ 72h Turnaround Guaranteed</li>
              </ul>
            </div>
            <MagneticButton onClick={() => window.location.href = '/schedule?tier=pilot'} className="w-full">
              Claim 1 of 3 Pilot Slots
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
