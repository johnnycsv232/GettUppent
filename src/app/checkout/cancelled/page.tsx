'use client';

import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function CheckoutCancelledPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 text-center">
        <div className="mx-auto w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
          <XCircle className="w-12 h-12 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          Payment Cancelled
        </h1>
        
        <p className="text-gray-300 mb-6">
          Your payment was not completed. No charges have been made to your account.
          If you encountered any issues, please don&apos;t hesitate to reach out.
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Return Home
          </Link>
          
          <Link
            href="/pilot-intake"
            className="block w-full bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
}
