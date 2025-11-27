'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 text-center">
        <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-gray-300 mb-6">
          Thank you for your purchase. Your GettUpp session has been confirmed.
          We&apos;ll be in touch shortly with next steps.
        </p>

        {sessionId && (
          <p className="text-gray-500 text-sm mb-6">
            Reference: {sessionId.slice(0, 20)}...
          </p>
        )}

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Return Home
          </Link>
          
          <Link
            href="/portal"
            className="block w-full bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
          >
            Go to Client Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
