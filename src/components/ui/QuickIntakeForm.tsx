"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, Loader2, Shield, Clock, X } from "lucide-react";

interface QuickIntakeFormProps {
  onClose?: () => void;
  variant?: "modal" | "inline";
}

export default function QuickIntakeForm({ onClose, variant = "inline" }: QuickIntakeFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    venue: "",
    instagram: "",
    name: "",
    email: "",
    phone: "",
    preferredNight: "",
  });

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.venue && formData.instagram) {
      setStep(2);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to API
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tier: "pilot",
          source: "quick-intake",
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerClass = variant === "modal" 
    ? "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    : "";

  return (
    <div className={containerClass}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`relative w-full max-w-md bg-[#1F1F24]/95 backdrop-blur-xl border border-[#D9AE43]/20 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.5)] overflow-hidden ${variant === "modal" ? "" : ""}`}
      >
        {/* Close button for modal */}
        {variant === "modal" && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white z-10"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D9AE43] to-transparent" />

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 font-oswald">You're In!</h3>
              <p className="text-gray-400 mb-4 font-inter">
                We'll confirm your pilot within 24 hours.
              </p>
              <p className="text-xs text-gray-500">
                Check your email for next steps.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <div className="p-6 pb-4 text-center">
                <h2 className="text-xl font-black uppercase font-oswald text-white mb-1">
                  Lock Your Night in <span className="text-[#D9AE43]">30 Seconds</span>
                </h2>
                <p className="text-sm text-gray-400 font-inter">
                  {step === 1 ? "Just 2 fields to start" : "Almost there!"}
                </p>
              </div>

              {/* Progress */}
              <div className="px-6 mb-4">
                <div className="flex gap-2">
                  <div className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-[#D9AE43]" : "bg-white/10"}`} />
                  <div className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-[#D9AE43]" : "bg-white/10"}`} />
                </div>
              </div>

              {/* Step 1: Venue Info */}
              {step === 1 && (
                <form onSubmit={handleStep1Submit} className="p-6 pt-2 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Venue Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      placeholder="The Night Owl"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:border-[#D9AE43] focus:outline-none focus:ring-1 focus:ring-[#D9AE43] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Instagram Handle
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                      <input
                        type="text"
                        required
                        value={formData.instagram}
                        onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                        placeholder="nightowl_mpls"
                        className="w-full bg-black/50 border border-white/10 rounded-xl pl-9 pr-4 py-3.5 text-white placeholder-gray-600 focus:border-[#D9AE43] focus:outline-none focus:ring-1 focus:ring-[#D9AE43] transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#BF953F] via-[#D9AE43] to-[#BF953F] text-black font-black uppercase tracking-wider rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform"
                  >
                    Continue
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </form>
              )}

              {/* Step 2: Contact Info */}
              {step === 2 && (
                <form onSubmit={handleFinalSubmit} className="p-6 pt-2 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Johnny Cage"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:border-[#D9AE43] focus:outline-none focus:ring-1 focus:ring-[#D9AE43] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="manager@venue.com"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:border-[#D9AE43] focus:outline-none focus:ring-1 focus:ring-[#D9AE43] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Phone <span className="text-gray-600">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(612) 555-0123"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:border-[#D9AE43] focus:outline-none focus:ring-1 focus:ring-[#D9AE43] transition-colors"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-3 text-gray-400 hover:text-white transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#BF953F] via-[#D9AE43] to-[#BF953F] text-black font-black uppercase tracking-wider rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          Claim My Pilot
                          <ArrowRight className="h-5 w-5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Trust badges */}
              <div className="px-6 pb-6 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Shield className="h-3 w-3 text-[#D9AE43]" />
                  No spam
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-[#D9AE43]" />
                  24h response
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
