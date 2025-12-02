"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

const NOTIFICATIONS = [
  { venue: "The Loop", action: "booked a Pilot Slot", location: "North Loop" },
  { venue: "First Avenue", action: "renewed T3 Subscription", location: "Downtown" },
  { venue: "Basement Bar", action: "claimed 2% ACH Discount", location: "North Loop" },
  { venue: "Up-Down", action: "scheduled a shoot", location: "Uptown" },
];

export default function LiveNotification() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    }, 12000);
    setTimeout(() => setVisible(true), 3000);
    setTimeout(() => setVisible(false), 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 20, x: "-50%" }}
          className="fixed bottom-6 left-1/2 md:left-6 md:translate-x-0 -translate-x-1/2 z-50 w-[90%] md:w-auto"
        >
          <div className="flex items-center gap-4 p-4 bg-[#0B0B0D]/90 border border-[#FF3C93]/30 backdrop-blur-xl rounded-lg shadow-2xl shadow-[#FF3C93]/10">
            <div className="h-10 w-10 bg-[#FF3C93]/20 rounded-full flex items-center justify-center border border-[#FF3C93]">
              <MapPin className="h-5 w-5 text-[#FF3C93]" />
            </div>
            <div>
              <p className="text-sm font-bold text-white font-oswald">
                {NOTIFICATIONS[index].venue} <span className="text-[#E6E6E6] font-normal font-inter">{NOTIFICATIONS[index].action}</span>
              </p>
              <p className="text-xs text-[#D9AE43] uppercase tracking-wide mt-0.5 font-inter">
                📍 {NOTIFICATIONS[index].location}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
