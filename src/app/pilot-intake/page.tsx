'use client';

import { useState, FormEvent } from 'react';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function PilotIntakePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-brand-ink px-6 text-center">
        <div className="mb-6 rounded-full bg-green-500/10 p-4 text-green-500">
          <CheckCircle className="h-12 w-12" />
        </div>
        <h1 className="font-heading text-4xl font-bold text-white">Application Received</h1>
        <p className="mt-4 max-w-md text-lg text-gray-400">
          We've secured your place in the queue. We'll review your venue's profile and send the SOW & Pilot invoice within 12 hours if qualified.
        </p>
        <Link href="/" className="mt-8 text-brand-gold hover:underline">
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-ink px-6 py-24">
      <div className="mx-auto max-w-lg">
        
        <div className="mb-10 text-center">
          <span className="mb-4 inline-block rounded-full bg-brand-pink/20 px-3 py-1 text-xs font-bold tracking-wide text-brand-pink uppercase">
            Pilot Program • Q4 2025
          </span>
          <h1 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Claim Your Pilot Spot
          </h1>
          <p className="mt-4 text-gray-400">
            Get a full production shoot ($345 one-time) to test the GettUpp engine. No subscription required yet.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          
          {/* Venue Details */}
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">Venue Name</label>
              <input 
                required 
                type="text" 
                placeholder="e.g. The Night Owl"
                className="w-full rounded-lg border border-white/10 bg-brand-ink/50 px-4 py-3 text-white placeholder-gray-600 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">Instagram Handle</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-gray-500">@</span>
                <input 
                  required 
                  type="text" 
                  placeholder="nightowl_mpls"
                  className="w-full rounded-lg border border-white/10 bg-brand-ink/50 pl-8 pr-4 py-3 text-white placeholder-gray-600 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">We look for active venues with 1k+ followers.</p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">Your Name (Owner/Manager)</label>
              <input 
                required 
                type="text" 
                placeholder="Johnny Cage"
                className="w-full rounded-lg border border-white/10 bg-brand-ink/50 px-4 py-3 text-white placeholder-gray-600 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">Best Email</label>
              <input 
                required 
                type="email" 
                placeholder="manager@venue.com"
                className="w-full rounded-lg border border-white/10 bg-brand-ink/50 px-4 py-3 text-white placeholder-gray-600 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="group mt-8 flex w-full items-center justify-center rounded-lg bg-brand-gold px-4 py-4 text-lg font-bold text-brand-ink transition-all hover:bg-brand-gold/90 disabled:opacity-70"
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <>
                Submit Application
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-500">
            By submitting, you agree to our <span className="underline decoration-gray-600 underline-offset-2">Pilot Terms</span>.
            <br/>Limited availability (3 spots/mo).
          </p>
        </form>
      </div>
    </main>
  );
}
