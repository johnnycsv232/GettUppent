'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Crown, CreditCard, Shield, CheckCircle, Loader2, ArrowRight } from 'lucide-react';

const PRODUCTS = {
  pilot: { name: 'Pilot Night', price: 345, description: 'One-time photography session - 30 photos, 72h delivery' },
  t1: { name: 'Tier 1 Retainer', price: 445, description: 'Monthly - 2 shoots, 60 photos' },
  t2: { name: 'Tier 2 Retainer', price: 695, description: 'Monthly - 4 shoots, 120 photos' },
  vip: { name: 'VIP Retainer', price: 995, description: 'Monthly - Unlimited shoots & photos' },
  // Apparel
  crop_fitted: { name: 'Fitted Crop Top', price: 38, description: 'GettUpp Girls signature fit' },
  crop_relaxed: { name: 'Relaxed Crop Top', price: 36, description: 'GettUpp Girls relaxed fit' },
  crop_bundle: { name: 'Crop Top Bundle (3)', price: 99, description: 'Mix and match any 3 tops' }
};

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product') as keyof typeof PRODUCTS;
  const clientId = searchParams.get('client');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const product = productId ? PRODUCTS[productId] : null;

  const handleCheckout = async () => {
    if (!productId) return;
    
    setIsLoading(true);
    setError(null);

    try {
      // Use public checkout for self-service, or admin checkout if clientId provided
      const endpoint = clientId ? '/api/checkout' : '/api/public-checkout';
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          tier: productId,
          clientId: clientId || undefined
        })
      });

      const data = await res.json();

      if (data.data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed. Please try again.');
      setIsLoading(false);
    }
  };

  if (!product) {
    return (
      <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">No Product Selected</h1>
          <p className="text-gray-400 mb-8">Please select a product or service to checkout.</p>
          <div className="flex flex-col gap-4">
            <Link
              href="/services"
              className="px-6 py-3 bg-brand-gold text-black font-bold rounded-lg hover:bg-brand-gold/90"
            >
              View Photography Services
            </Link>
            <Link
              href="/shop"
              className="px-6 py-3 bg-brand-pink text-white font-bold rounded-lg hover:bg-brand-pink/90"
            >
              Shop Apparel
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#080808]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tighter">
            <Crown className="h-6 w-6 text-brand-gold" />
            GETTUPP<span className="text-brand-gold">ENT</span>
          </Link>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Shield className="h-4 w-4" />
            Secure Checkout
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Order Summary */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h1 className="text-2xl font-black mb-6">Order Summary</h1>
          
          <div className="border-b border-white/10 pb-6 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-gray-400 text-sm mt-1">{product.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-brand-gold">${product.price}</div>
                {['t1', 't2', 'vip'].includes(productId) && (
                  <span className="text-gray-500 text-sm">/month</span>
                )}
              </div>
            </div>
          </div>

          {/* Features for service products */}
          {['pilot', 't1', 't2', 'vip'].includes(productId) && (
            <div className="space-y-3 mb-6">
              <p className="text-sm text-gray-400 uppercase tracking-wider">Includes:</p>
              <ul className="space-y-2">
                {productId === 'pilot' && (
                  <>
                    <li className="flex items-center gap-2 text-sm"><CheckCircle className="h-4 w-4 text-brand-gold" /> 1 On-Site Content Shoot</li>
                    <li className="flex items-center gap-2 text-sm"><CheckCircle className="h-4 w-4 text-brand-gold" /> 30 High-End Edited Photos</li>
                    <li className="flex items-center gap-2 text-sm"><CheckCircle className="h-4 w-4 text-brand-gold" /> 72h Delivery Guarantee</li>
                  </>
                )}
                {productId === 't1' && (
                  <>
                    <li className="flex items-center gap-2 text-sm"><CheckCircle className="h-4 w-4 text-brand-gold" /> 2 Shoots per Month</li>
                    <li className="flex items-center gap-2 text-sm"><CheckCircle className="h-4 w-4 text-brand-gold" /> 60 Edited Photos</li>
                    <li className="flex items-center gap-2 text-sm"><CheckCircle className="h-4 w-4 text-brand-gold" /> 72h Delivery</li>
                  </>
                )}
                {productId === 't2' && (
                  <>
                    <li className="flex items-center gap-2 text-sm"><CheckCircle className="h-4 w-4 text-brand-gold" /> 4 Shoots per Month</li>
                    <li className="flex items-center gap-2 text-sm"><CheckCircle className="h-4 w-4 text-brand-gold" /> 120 Edited Photos</li>
                    <li className="flex items-center gap-2 text-sm"><CheckCircle className="h-4 w-4 text-brand-gold" /> 48h Delivery</li>
                  </>
                )}
                {productId === 'vip' && (
                  <>
                    <li className="flex items-center gap-2 text-sm"><CheckCircle className="h-4 w-4 text-brand-gold" /> Unlimited Shoots</li>
                    <li className="flex items-center gap-2 text-sm"><CheckCircle className="h-4 w-4 text-brand-gold" /> Unlimited Photos</li>
                    <li className="flex items-center gap-2 text-sm"><CheckCircle className="h-4 w-4 text-brand-gold" /> 24h Delivery</li>
                  </>
                )}
              </ul>
            </div>
          )}

          {/* Total */}
          <div className="flex items-center justify-between py-4 border-t border-white/10">
            <span className="text-lg font-bold">Total</span>
            <span className="text-3xl font-black text-brand-gold">${product.price}</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full py-4 bg-brand-gold text-black font-black text-lg rounded-lg hover:bg-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <>
              <CreditCard className="h-6 w-6" />
              Proceed to Payment
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-6 mt-8 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            SSL Encrypted
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Powered by Stripe
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link href="/services" className="text-gray-400 hover:text-white transition-colors text-sm">
            ← Back to Services
          </Link>
        </div>
      </div>
    </main>
  );
}
