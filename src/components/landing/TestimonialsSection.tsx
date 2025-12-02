'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  venue: string;
  venueInitials: string;
  metric: string;
  metricLabel: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "They don't just take photos—they track what works. Our table bookings are up 28% since we started.",
    name: "DJ Khrome",
    role: "Resident",
    venue: "Vanquish",
    venueInitials: "VQ",
    metric: "+28%",
    metricLabel: "Bookings",
    rating: 5,
  },
  {
    id: 2,
    quote: "First shoot with Johnny, we saw a 40% jump in door count that Friday. Second shoot, we beat our record.",
    name: "Marcus Chen",
    role: "GM",
    venue: "The Warehouse",
    venueInitials: "TW",
    metric: "+40%",
    metricLabel: "Door Count",
    rating: 5,
  },
  {
    id: 3,
    quote: "We tried three other content creators. They gave us 'pretty photos.' Johnny gave us packed Saturdays.",
    name: "Sarah Kim",
    role: "Marketing Director",
    venue: "Rabbit Hole",
    venueInitials: "RH",
    metric: "+35%",
    metricLabel: "Weekend Traffic",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 md:py-32 bg-brand-charcoal">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase text-center mb-16">
          VENUES <span className="gold-gradient-text">TRUST</span> THE ENGINE
        </h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-10 h-10 rounded-full border border-brand-gold/30 bg-brand-ink flex items-center justify-center text-brand-gold hover:bg-brand-gold/10 transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-10 h-10 rounded-full border border-brand-gold/30 bg-brand-ink flex items-center justify-center text-brand-gold hover:bg-brand-gold/10 transition-colors z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Testimonial Card */}
          <div className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Verified Badge */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-gold/30 bg-brand-gold/10">
                <CheckCircle className="h-4 w-4 text-brand-gold" />
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">Verified Venue Partner</span>
              </div>
            </div>

            {/* Quote Mark */}
            <div className="text-brand-gold/20 text-8xl font-serif absolute top-4 left-6">"</div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center pt-8">
              {/* Quote & Attribution */}
              <div className="flex-1">
                <blockquote className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-6">
                  "{current.quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  {/* Venue Logo */}
                  <div className="w-12 h-12 rounded-full bg-brand-gold/20 border border-brand-gold/30 flex items-center justify-center">
                    <span className="text-brand-gold font-bold text-sm">{current.venueInitials}</span>
                  </div>
                  <div>
                    <div className="text-white font-bold">{current.name}</div>
                    <div className="text-gray-400 text-sm">{current.role}, {current.venue}</div>
                  </div>
                </div>
              </div>

              {/* Metric & Rating */}
              <div className="text-center lg:text-right">
                <div className="text-5xl md:text-6xl font-black gold-gradient-text mb-1">
                  {current.metric}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider mb-3">
                  {current.metricLabel}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Verified Result</div>
                <div className="flex items-center justify-center lg:justify-end gap-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-brand-gold fill-brand-gold" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dot Navigation */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'w-8 bg-brand-gold' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
