'use client';

import { useState, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, MapPin, User, Phone, Mail, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';

type TierKey = 'pilot' | 't1' | 't2' | 'vip';

const TIERS: Record<TierKey, { name: string; price: string; duration: string }> = {
  pilot: { name: 'Pilot Night', price: '$345', duration: '1 session' },
  t1: { name: 'Tier 1', price: '$445/mo', duration: '2 sessions/month' },
  t2: { name: 'Tier 2', price: '$695/mo', duration: '4 sessions/month' },
  vip: { name: 'VIP', price: '$995/mo', duration: 'Unlimited sessions' }
};

export default function SchedulePage() {
  const searchParams = useSearchParams();
  const tierParam = searchParams.get('tier') as keyof typeof TIERS || 'pilot';
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState<{
    tier: TierKey;
    venueName: string;
    contactName: string;
    email: string;
    phone: string;
    preferredDate: string;
    preferredTime: string;
    location: string;
    notes: string;
  }>({
    tier: (tierParam as TierKey) || 'pilot',
    venueName: '',
    contactName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    location: '',
    notes: ''
  });

  const selectedTier = TIERS[formData.tier];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to public booking API
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.venueName,
          contactName: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          source: 'website_schedule',
          tier: formData.tier,
          notes: `Preferred Date: ${formData.preferredDate}\nPreferred Time: ${formData.preferredTime}\nLocation: ${formData.location}\n\n${formData.notes}`
        })
      });

      if (res.ok) {
        setIsComplete(true);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      alert('Failed to submit booking request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center p-6">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-black mb-4">Booking Request Received!</h1>
          <p className="text-gray-400 mb-8">
            We'll confirm your {selectedTier.name} session within 24 hours. 
            Check your email at <span className="text-white">{formData.email}</span> for confirmation.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold text-black font-bold rounded-lg hover:bg-brand-gold/90"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <PublicHeader />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step >= s ? 'bg-brand-gold text-black' : 'bg-white/10 text-gray-500'
              }`}>
                {step > s ? <CheckCircle className="h-4 w-4" /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-brand-gold' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Select Package */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-black mb-2">Select Your Package</h1>
                <p className="text-gray-400">Choose the service tier that fits your venue</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(TIERS).map(([key, tier]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFormData({ ...formData, tier: key as TierKey })}
                    className={`p-6 rounded-xl border text-left transition-all ${
                      formData.tier === key
                        ? 'border-brand-gold bg-brand-gold/10'
                        : 'border-white/10 bg-white/5 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-lg">{tier.name}</span>
                      {formData.tier === key && <CheckCircle className="h-5 w-5 text-brand-gold" />}
                    </div>
                    <div className="text-2xl font-black text-brand-gold mb-1">{tier.price}</div>
                    <p className="text-gray-500 text-sm">{tier.duration}</p>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full mt-8 py-4 bg-brand-gold text-black font-bold rounded-lg hover:bg-brand-gold/90 flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Step 2: Venue & Contact Info */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-black mb-2">Venue Information</h1>
                <p className="text-gray-400">Tell us about your venue and how to reach you</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" /> Venue Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.venueName}
                    onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-gold"
                    placeholder="e.g. Skyline Lounge"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <User className="inline h-4 w-4 mr-1" /> Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-gold"
                    placeholder="John Smith"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Mail className="inline h-4 w-4 mr-1" /> Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-gold"
                      placeholder="you@venue.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Phone className="inline h-4 w-4 mr-1" /> Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-gold"
                      placeholder="(612) 555-0123"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!formData.venueName || !formData.contactName || !formData.email}
                  className="flex-1 py-4 bg-brand-gold text-black font-bold rounded-lg hover:bg-brand-gold/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Schedule Preferences */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-black mb-2">Schedule Your Session</h1>
                <p className="text-gray-400">When works best for your venue?</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" /> Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Clock className="inline h-4 w-4 mr-1" /> Preferred Time
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold"
                    >
                      <option value="">Select a time...</option>
                      <option value="8pm">8:00 PM</option>
                      <option value="9pm">9:00 PM</option>
                      <option value="10pm">10:00 PM</option>
                      <option value="11pm">11:00 PM</option>
                      <option value="12am">12:00 AM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" /> Venue Address
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-gold"
                    placeholder="123 Main St, Minneapolis, MN"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-gold resize-none"
                    placeholder="Any special requests or information we should know..."
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-8">
                <h3 className="font-bold mb-4">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Package</span>
                    <span className="font-bold">{selectedTier.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price</span>
                    <span className="font-bold text-brand-gold">{selectedTier.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Venue</span>
                    <span>{formData.venueName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contact</span>
                    <span>{formData.email}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.preferredDate}
                  className="flex-1 py-4 bg-brand-gold text-black font-bold rounded-lg hover:bg-brand-gold/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Submit Booking <CheckCircle className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
      
      <PublicFooter />
    </main>
  );
}
