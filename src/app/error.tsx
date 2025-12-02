'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0B0D] px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-black text-white mb-4 font-oswald uppercase">
          Something Went Wrong
        </h1>
        <p className="text-gray-400 mb-8 font-inter">
          We hit an unexpected error. Don't worry, our team has been notified.
        </p>

        {/* Error Details (development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-left">
            <p className="text-xs text-red-400 font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-gray-500 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D9AE43] text-black font-bold uppercase tracking-wider rounded-lg hover:bg-[#FCF6BA] transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-bold uppercase tracking-wider rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </div>

        {/* Support Link */}
        <p className="mt-8 text-sm text-gray-600">
          Need help?{' '}
          <a href="mailto:shoot@gettupp.com" className="text-[#D9AE43] hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
