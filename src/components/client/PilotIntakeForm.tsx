"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

interface PilotIntakeFormProps {
  formId?: string;
  onSubmitSuccess?: () => void;
}

export default function PilotIntakeForm({ 
  formId = "YOUR_TALLY_FORM_ID", // Replace with actual Tally form ID
  onSubmitSuccess 
}: PilotIntakeFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load Tally embed script
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    script.onload = () => setIsLoading(false);
    document.body.appendChild(script);

    // Listen for Tally form submission
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "Tally.FormSubmitted") {
        setIsSubmitted(true);
        onSubmitSuccess?.();
        
        // Trigger confetti effect
        if (typeof window !== "undefined" && (window as any).confetti) {
          (window as any).confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#D9AE43", "#FCF6BA", "#FF3C93"],
          });
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      document.body.removeChild(script);
    };
  }, [onSubmitSuccess]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full max-w-2xl mx-auto"
    >
      {/* Nightlife Glass Container */}
      <div className="relative bg-[#1F1F24]/60 backdrop-blur-xl border border-[#D9AE43]/20 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D9AE43] to-transparent" />
        
        {/* Header */}
        <div className="p-8 pb-4 text-center border-b border-white/5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D9AE43]/10 border border-[#D9AE43]/30 mb-4">
            <Sparkles className="h-4 w-4 text-[#D9AE43]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D9AE43] font-oswald">
              Zero Commitment
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black uppercase font-oswald text-white mb-2">
            Start Your <span className="text-[#D9AE43]">Pilot Night</span>
          </h2>
          <p className="text-gray-400 font-inter text-sm">
            One night. $345. We prove our value or you walk.
          </p>
        </div>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-12 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-oswald">You're In!</h3>
              <p className="text-gray-400 mb-6 font-inter">
                We'll reach out within 24 hours to schedule your pilot shoot.
              </p>
              <MagneticButton onClick={() => window.location.href = "/services"}>
                <span className="flex items-center gap-2">
                  View Full Packages <ArrowRight className="h-4 w-4" />
                </span>
              </MagneticButton>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6"
            >
              {isLoading ? (
                <div className="h-[400px] flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-[#D9AE43] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <iframe
                  data-tally-src={`https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
                  loading="lazy"
                  width="100%"
                  height="400"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  title="Pilot Intake Form"
                  className="w-full"
                  style={{ 
                    background: "transparent",
                    minHeight: "400px"
                  }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer trust badges */}
        {!isSubmitted && (
          <div className="p-6 pt-0 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-[#D9AE43]" />
              No credit card required
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-[#D9AE43]" />
              24h response time
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-[#D9AE43]" />
              100% satisfaction guarantee
            </span>
          </div>
        )}
      </div>

      {/* Ambient glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-[#D9AE43]/10 via-transparent to-[#FF3C93]/10 blur-3xl -z-10 opacity-50" />
    </motion.div>
  );
}
