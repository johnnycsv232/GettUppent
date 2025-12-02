"use client";

import { useState } from "react";
import Link from "next/link";
import { Crown, HelpCircle, ChevronDown, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const faqs = [
  {
    question: "What if I hate the photos?",
    answer: "We reshoot free. No questions asked. If the quality doesn't meet your standards, we'll come back and redo the entire shoot at zero cost. We've never had to do this, but the guarantee stands."
  },
  {
    question: "How fast do I get my photos?",
    answer: "72 hours guaranteed for Pilot and T1. 48 hours for T2 (Weekend Warrior). 24-48 hours for T3 (VIP Partner). We've hit 99.2% on-time delivery since we started."
  },
  {
    question: "What's included in the Pilot?",
    answer: "1 full nightlife shoot (3-4 hours), 30 AI-enhanced photos with our Remini workflow, and 72-hour delivery. It's $345 one-time with zero subscription commitment. Think of it as a test drive."
  },
  {
    question: "Do you shoot video too?",
    answer: "Yes. T2 includes 2 Reels per month. T3 includes 3 Reels. We specialize in short-form content optimized for Instagram and TikTok algorithms."
  },
  {
    question: "What areas do you cover?",
    answer: "All of Minneapolis nightlife: Downtown, North Loop, Warehouse District, Uptown, Northeast. We route-batch our shoots for efficiency, which is how we keep prices lower than freelancers."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Monthly retainers are month-to-month after the first 3 months. We don't do long-term contracts because we believe in earning your business every month."
  },
  {
    question: "What if I already have a photographer?",
    answer: "We offer editing-only services. Send us your RAW photos and we'll apply our signature GettUpp look. $199/batch (30 photos) or $49/single."
  },
  {
    question: "How do I know this actually works?",
    answer: "We track RSVPs and door counts for our partner venues. On average, venues see a 28-40% increase in targeted traffic within 90 days. Check our case studies for verified results."
  },
];

function AccordionItem({ question, answer, isOpen, onClick }: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void;
}) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-bold text-white group-hover:text-[#D9AE43] transition-colors font-oswald">
          {question}
        </span>
        <ChevronDown 
          className={`h-5 w-5 text-[#D9AE43] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 leading-relaxed font-inter">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0B0B0D]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tighter font-oswald">
            <Crown className="h-6 w-6 text-[#D9AE43]" />
            GETTUPP<span className="text-[#D9AE43]">ENT</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/services" className="text-gray-400 hover:text-white transition-colors font-medium uppercase tracking-wider text-sm">Services</Link>
            <Link href="/case-studies" className="text-gray-400 hover:text-white transition-colors font-medium uppercase tracking-wider text-sm">Results</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors font-medium uppercase tracking-wider text-sm">Contact</Link>
          </nav>
          <Link href="/schedule?tier=pilot" className="hidden md:block">
            <MagneticButton>Book Now</MagneticButton>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D9AE43]/30 bg-[#D9AE43]/5 mb-6">
            <HelpCircle className="h-4 w-4 text-[#D9AE43]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D9AE43] font-oswald">
              Common Questions
            </span>
          </div>
          <h1 className="font-oswald text-5xl md:text-7xl font-black uppercase mb-6">
            FAQ
          </h1>
          <p className="text-xl text-gray-400 font-inter">
            Everything you need to know before booking.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-[#1F1F24]/50 border border-white/10 rounded-2xl p-8 md:p-12">
            <MessageCircle className="h-12 w-12 text-[#D9AE43] mx-auto mb-6" />
            <h2 className="font-oswald text-3xl font-black uppercase mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-400 mb-6 font-inter">
              Text 'VISIT' to <span className="text-white font-semibold">555-0199</span> to see us shoot live this Friday.
              Or hit us up on Instagram.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton onClick={() => window.location.href = '/contact'}>
                Contact Us
              </MagneticButton>
              <MagneticButton 
                variant="pink" 
                onClick={() => window.open('https://instagram.com/mplsjohnnycage', '_blank')}
              >
                DM on Instagram
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 text-xs uppercase tracking-widest font-inter">
            © 2025 GettUpp Ent. Minneapolis, MN
          </p>
        </div>
      </footer>
    </div>
  );
}
