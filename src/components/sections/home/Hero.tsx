"use client";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Gradient Overlay */}
      <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20" />
      </div>

      <div className="relative z-30 text-center px-4 max-w-5xl mx-auto mt-[-5vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-brandGold font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base font-inter">
            Minneapolis Nightlife Operations
          </h2>
          <h1 className="text-6xl md:text-9xl font-black text-white mb-6 tracking-tighter uppercase font-oswald leading-[0.9]">
            Own The <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#BF953F] animate-shimmer bg-[length:200%_auto]">
              Night
            </span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light font-inter"
        >
          We don't just post. We pack venues. <br className="hidden md:block"/>
          The only content engine with a 72h delivery guarantee.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <MagneticButton onClick={() => window.location.href = '/schedule?tier=pilot'} variant="gold">
            Start Pilot ($345)
          </MagneticButton>
          <MagneticButton onClick={() => window.location.href = '/case-studies'} variant="pink">
            View Results
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
