'use client';

import { useAuth } from '@/context/AuthContext';
import { Crown, Camera, Image, Calendar, Download, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function ClientPortalPage() {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10">
          <div className="mx-auto w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center mb-6">
            <Crown className="w-8 h-8 text-brand-gold" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-4">
            Client Portal
          </h1>
          
          <p className="text-gray-400 mb-6">
            Please log in to access your deliverables and booking information.
          </p>

          <Link
            href="/login?redirect=/portal"
            className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-white/10 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-black tracking-tighter text-white">
            <Crown className="h-6 w-6 text-brand-gold" />
            <span>GETTUPP<span className="text-brand-gold">PORTAL</span></span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-400">{user.email}</span>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-3 py-1.5 text-gray-400 hover:text-white transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-400">
            Access your photos, booking details, and account information.
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-white/5 hover:border-brand-gold/30 transition-colors">
            <div className="p-3 bg-purple-500/20 rounded-xl w-fit mb-4">
              <Image className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">My Gallery</h3>
            <p className="text-gray-400 text-sm mb-4">
              View and download your edited photos from past sessions.
            </p>
            <span className="text-brand-gold text-sm font-medium">Coming Soon →</span>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-6 border border-white/5 hover:border-brand-gold/30 transition-colors">
            <div className="p-3 bg-blue-500/20 rounded-xl w-fit mb-4">
              <Calendar className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">My Bookings</h3>
            <p className="text-gray-400 text-sm mb-4">
              View upcoming sessions and booking history.
            </p>
            <span className="text-brand-gold text-sm font-medium">Coming Soon →</span>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-6 border border-white/5 hover:border-brand-gold/30 transition-colors">
            <div className="p-3 bg-green-500/20 rounded-xl w-fit mb-4">
              <Download className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Downloads</h3>
            <p className="text-gray-400 text-sm mb-4">
              Access high-resolution downloads and digital assets.
            </p>
            <span className="text-brand-gold text-sm font-medium">Coming Soon →</span>
          </div>
        </div>

        {/* Recent Activity / Placeholder */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-white/5 text-center">
          <Camera className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Your content is being prepared
          </h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Once your shoot is complete and edited, your photos will appear here. 
            You&apos;ll receive an email notification when they&apos;re ready to view and download.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-500 text-sm">
          <p>Need help? Contact us at support@gettupp.com</p>
        </div>
      </footer>
    </div>
  );
}
