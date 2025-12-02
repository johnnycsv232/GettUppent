'use client';

import { useState, FormEvent } from 'react';
import { CheckCircle, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';

export default function PilotIntakePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      venue: formData.get('venue') as string,
      instagram: formData.get('instagram') as string,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string || '',
      status: 'Pending',
      qualificationScore: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    try {
      await addDoc(collection(db, 'leads'), data);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting lead:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-[#080808]">
        <PublicHeader />
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
          <div className="mb-6 rounded-full bg-green-500/20 p-6 text-green-400">
            <CheckCircle className="h-16 w-16" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-white mb-4">You're In The Queue!</h1>
          <p className="max-w-md text-lg text-gray-400 mb-8">
            We'll review your venue's profile and send the SOW & invoice within 12 hours if qualified.
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-black font-bold uppercase tracking-wider hover:bg-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
        <PublicFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808]">
      <PublicHeader />
      
      <div className="max-w-lg mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-pink/10 border border-brand-pink/20 mb-6">
            <Sparkles className="h-4 w-4 text-brand-pink" />
            <span className="text-sm font-bold tracking-widest uppercase text-brand-pink">Limited • 3 spots/month</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase">
            Claim Your <span className="text-brand-gold">Pilot</span>
          </h1>
          <p className="text-gray-400 text-lg">
            One night. $345. Zero commitment. See why venues trust GettUpp.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm">

          {/* Venue Details */}
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">Venue Name</label>
              <input
                name="venue"
                required
                type="text"
                placeholder="e.g. The Night Owl"
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3.5 text-white placeholder-gray-600 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold transition-colors"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">Instagram Handle</label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-gray-500">@</span>
                <input
                  name="instagram"
                  required
                  type="text"
                  placeholder="nightowl_mpls"
                  className="w-full rounded-xl border border-white/10 bg-black/50 pl-9 pr-4 py-3.5 text-white placeholder-gray-600 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold transition-colors"
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">We look for active venues with 1k+ followers.</p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">Your Name (Owner/Manager)</label>
              <input
                name="name"
                required
                type="text"
                placeholder="Johnny Cage"
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3.5 text-white placeholder-gray-600 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold transition-colors"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">Best Email</label>
              <input
                name="email"
                required
                type="email"
                placeholder="manager@venue.com"
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3.5 text-white placeholder-gray-600 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold transition-colors"
              />
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">Phone (Optional)</label>
              <input
                name="phone"
                type="tel"
                placeholder="(612) 555-0123"
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3.5 text-white placeholder-gray-600 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group mt-6 flex w-full items-center justify-center bg-brand-gold px-4 py-4 text-lg font-bold text-black uppercase tracking-wider transition-all hover:bg-white hover:shadow-[0_0_30px_rgba(217,174,67,0.4)] disabled:opacity-70"
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <>
                Claim My Pilot Spot
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-500 mt-4">
            By submitting, you agree to a $345 one-time pilot fee (invoiced after approval).
          </p>
        </form>
      </div>
      
      <PublicFooter />
    </main>
  );
}
