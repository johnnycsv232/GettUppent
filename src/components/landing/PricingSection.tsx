'use client';

import Link from 'next/link';
import { CheckCircle, Zap, Star, Clock, Camera, Film, Phone } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';

interface PricingTier {
  id: string;
  name: string;
  label: string;
  badge?: string;
  price: number;
  period?: string;
  shoots: number;
  photos: number;
  reels: number;
  delivery: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
  isPremium?: boolean;
  isInviteOnly?: boolean;
}

const tiers: PricingTier[] = [
  {
    id: 'pilot',
    name: 'Pilot Night',
    label: 'INVITE ONLY',
    badge: 'START HERE',
    price: 345,
    period: 'one-time',
    shoots: 1,
    photos: 30,
    reels: 0,
    delivery: '72h',
    features: [
      '1 Nightlife Shoot',
      '30 Edited Photos',
      '72h Delivery Guarantee',
      'Full Usage Rights',
      'No Commitment',
    ],
    ctaText: 'Start Pilot',
    isInviteOnly: true,
  },
  {
    id: 't1',
    name: 'Friday Nights',
    label: 'T1',
    price: 445,
    period: '/mo',
    shoots: 1,
    photos: 30,
    reels: 0,
    delivery: '72h',
    features: [
      '1 Shoot / Month',
      '30 Edited Photos',
      '72h Delivery',
      'Single-Venue Focus',
    ],
    ctaText: 'Book T1',
  },
  {
    id: 't2',
    name: 'Weekend Warrior',
    label: 'T2',
    badge: 'MOST POPULAR',
    price: 695,
    period: '/mo',
    shoots: 2,
    photos: 60,
    reels: 2,
    delivery: '48h',
    features: [
      '2 Shoots / Month',
      '60 Edited Photos + 2 Reels',
      '48h Delivery Guarantee',
      'Priority Scheduling',
      'Route-Batched Efficiency',
    ],
    ctaText: 'Book T2',
    isPopular: true,
  },
  {
    id: 'vip',
    name: 'VIP Partner',
    label: 'T3',
    badge: 'PREMIUM',
    price: 995,
    period: '/mo',
    shoots: 3,
    photos: 80,
    reels: 3,
    delivery: '24h',
    features: [
      '3 Shoots / Month',
      '80 Edited Photos + 3 Reels',
      '24h Express Delivery',
      'Monthly Strategy Call',
      'Priority Support',
    ],
    ctaText: 'Talk VIP',
    isPremium: true,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-[#0B0B0D]">
      <div className="max-w-7xl mx-auto px-4">
        {/* ROI Callout Box */}
        <div className="max-w-2xl mx-auto mb-12 p-6 rounded-xl border border-[#D9AE43]/30 bg-[#D9AE43]/5">
          <div className="flex items-center justify-center gap-2 text-[#D9AE43] text-sm font-bold uppercase tracking-wider mb-3 font-oswald">
            <Zap className="h-4 w-4" />
            Venue Math
          </div>
          <p className="text-center text-gray-300 font-inter">
            3 new customers @ $350 LTV = <span className="text-green-400 font-bold">$1,050</span>
          </p>
          <p className="text-center text-gray-400 text-sm mt-1 font-inter">
            Your VIP package ($995) pays for itself with just <span className="underline">3 new faces</span>.
          </p>
        </div>

        {/* Section Header */}
        <h2 className="font-oswald text-4xl sm:text-5xl md:text-6xl font-black uppercase text-center mb-6 text-white">
          Pricing That Matches <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#BF953F]">How Venues Run Weekends</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto font-inter">
          Time is the business. Every SOP protects your margin.
        </p>

        {/* Pricing Table - Desktop */}
        <div className="hidden lg:block overflow-x-auto mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-gray-400 font-oswald uppercase tracking-wider">Tier</th>
                <th className="text-center p-4 text-gray-400 font-oswald uppercase tracking-wider">Price</th>
                <th className="text-center p-4 text-gray-400 font-oswald uppercase tracking-wider">Shoots</th>
                <th className="text-center p-4 text-gray-400 font-oswald uppercase tracking-wider">Photos</th>
                <th className="text-center p-4 text-gray-400 font-oswald uppercase tracking-wider">Reels</th>
                <th className="text-center p-4 text-gray-400 font-oswald uppercase tracking-wider">Delivery</th>
                <th className="text-center p-4"></th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier) => (
                <tr 
                  key={tier.id} 
                  className={`border-b border-white/5 ${tier.isPopular ? 'bg-[#D9AE43]/5' : ''}`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {tier.badge && (
                        <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${
                          tier.isPopular ? 'bg-[#D9AE43] text-black' : 
                          tier.isInviteOnly ? 'bg-white/10 text-[#D9AE43] border border-[#D9AE43]/30' :
                          tier.isPremium ? 'bg-[#FF3C93]/20 text-[#FF3C93]' : 'bg-white/10 text-gray-400'
                        }`}>
                          {tier.badge}
                        </span>
                      )}
                      <div>
                        <div className="font-oswald font-bold text-white text-lg">{tier.name}</div>
                        <div className="text-xs text-gray-500">{tier.label}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`text-2xl font-black font-oswald ${tier.isPopular ? 'text-[#D9AE43]' : tier.isPremium ? 'text-[#FF3C93]' : 'text-white'}`}>
                      ${tier.price}
                    </span>
                    <span className="text-gray-500 text-sm">{tier.period}</span>
                  </td>
                  <td className="p-4 text-center text-white font-bold">{tier.shoots}</td>
                  <td className="p-4 text-center text-white font-bold">{tier.photos}</td>
                  <td className="p-4 text-center text-white font-bold">{tier.reels}</td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[#D9AE43] font-bold">
                      <Clock className="h-4 w-4" />
                      {tier.delivery}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <Link
                      href={tier.isPremium ? '/contact' : '/pilot-intake'}
                      className={`inline-block px-6 py-2 rounded-lg font-bold uppercase tracking-wider text-sm transition-all ${
                        tier.isPopular
                          ? 'bg-gradient-to-r from-[#BF953F] via-[#D9AE43] to-[#BF953F] text-black hover:scale-105'
                          : tier.isPremium
                            ? 'bg-[#FF3C93] text-white hover:bg-[#FF3C93]/90'
                            : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                      }`}
                    >
                      {tier.ctaText}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pricing Cards - Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl p-6 flex flex-col ${
                tier.isPopular 
                  ? 'border-2 border-[#D9AE43] bg-[#1F1F24] shadow-[0_0_30px_rgba(217,174,67,0.15)]' 
                  : tier.isPremium
                    ? 'border border-[#FF3C93]/30 bg-[#1F1F24]'
                    : 'border border-white/10 bg-[#1F1F24]'
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-oswald ${
                  tier.isPopular ? 'bg-[#D9AE43] text-black' : 
                  tier.isInviteOnly ? 'bg-white/10 text-[#D9AE43] border border-[#D9AE43]/30' :
                  tier.isPremium ? 'bg-[#FF3C93]/20 text-[#FF3C93]' : 'bg-white/10 text-gray-400'
                }`}>
                  {tier.badge}
                </div>
              )}

              {/* Name & Price */}
              <div className="mb-4 pt-2">
                <div className="text-xs text-gray-500 uppercase tracking-wider font-oswald">{tier.label}</div>
                <h3 className="font-oswald text-2xl font-black uppercase text-white">{tier.name}</h3>
                <div className="mt-2">
                  <span className={`text-4xl font-black font-oswald ${tier.isPopular ? 'text-[#D9AE43]' : tier.isPremium ? 'text-[#FF3C93]' : 'text-white'}`}>
                    ${tier.price}
                  </span>
                  <span className="text-gray-500">{tier.period}</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-white/5 rounded-lg">
                <div className="text-center">
                  <Camera className="h-4 w-4 mx-auto text-[#D9AE43] mb-1" />
                  <div className="text-white font-bold">{tier.shoots}</div>
                  <div className="text-xs text-gray-500">Shoots</div>
                </div>
                <div className="text-center">
                  <Film className="h-4 w-4 mx-auto text-[#D9AE43] mb-1" />
                  <div className="text-white font-bold">{tier.photos}</div>
                  <div className="text-xs text-gray-500">Photos</div>
                </div>
                <div className="text-center">
                  <Clock className="h-4 w-4 mx-auto text-[#D9AE43] mb-1" />
                  <div className="text-white font-bold">{tier.delivery}</div>
                  <div className="text-xs text-gray-500">Delivery</div>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6 flex-grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 text-sm font-inter">
                    <CheckCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${tier.isPopular ? 'text-[#D9AE43]' : tier.isPremium ? 'text-[#FF3C93]' : 'text-gray-600'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={tier.isPremium ? '/contact' : '/pilot-intake'}
                className={`block w-full text-center py-4 rounded-lg font-bold uppercase tracking-wider transition-all font-oswald ${
                  tier.isPopular
                    ? 'bg-gradient-to-r from-[#BF953F] via-[#D9AE43] to-[#BF953F] text-black hover:scale-105'
                    : tier.isPremium
                      ? 'bg-[#FF3C93] text-white hover:bg-[#FF3C93]/90'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                }`}
              >
                {tier.ctaText}
              </Link>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mt-12 p-6 rounded-xl border border-white/10 bg-white/5">
          <h3 className="font-oswald text-xl font-bold text-white mb-4 text-center">Add-Ons</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-white font-bold">Long 60s Video</div>
              <div className="text-[#D9AE43]">$199–$249</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold">Extra Shoot</div>
              <div className="text-[#D9AE43]">$275</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold">Extra Reel</div>
              <div className="text-[#D9AE43]">$149–$249</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold">Rush Delivery</div>
              <div className="text-[#D9AE43]">+$50–$100</div>
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="text-center mt-8 space-y-2">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <Star className="h-4 w-4 text-[#D9AE43]" />
            <span>Save ~2% when paying via ACH</span>
          </div>
          <p className="text-xs text-gray-600">
            Limited pilot availability (3 per month). All tiers include autopay via Stripe.
          </p>
        </div>
      </div>
    </section>
  );
}
