'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Crown, Camera, Image, Calendar, Download, LogOut, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface ClientData {
  name: string;
  tier: string;
  status: string;
}

interface ShootData {
  id: string;
  type: string;
  status: string;
  scheduledDate: string;
  totalImages: number;
  deliveredImages: number;
}

export default function ClientPortalDetailPage() {
  const params = useParams();
  const clientId = params.clientId as string;
  const { user, signOut, loading: authLoading } = useAuth();
  const [client, setClient] = useState<ClientData | null>(null);
  const [shoots, setShoots] = useState<ShootData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && clientId) {
      fetchClientData();
    }
  }, [user, clientId]);

  async function fetchClientData() {
    try {
      // In a real implementation, you would verify the user has access to this client
      // For now, this is a placeholder that shows the portal structure
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  if (authLoading || loading) {
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
            Access Denied
          </h1>
          
          <p className="text-gray-400 mb-6">
            Please log in to access your client portal.
          </p>

          <Link
            href={`/login?redirect=/portal/${clientId}`}
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
          <Link href="/portal" className="flex items-center gap-2 text-xl font-black tracking-tighter text-white">
            <Crown className="h-6 w-6 text-brand-gold" />
            <span>GETTUPP<span className="text-brand-gold">PORTAL</span></span>
          </Link>
          
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
        {/* Client Info */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-8 mb-8 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Client Portal</p>
              <h1 className="text-3xl font-bold text-white">
                {client?.name || 'Loading...'}
              </h1>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm mb-1">Package</p>
              <p className="text-xl font-semibold text-brand-gold uppercase">
                {client?.tier || 'VIP'}
              </p>
            </div>
          </div>
        </div>

        {/* Sessions / Shoots */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Your Sessions</h2>
          
          {shoots.length === 0 ? (
            <div className="bg-gray-800/50 rounded-xl p-8 border border-white/5 text-center">
              <Calendar className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">
                No sessions scheduled yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {shoots.map((shoot) => (
                <div key={shoot.id} className="bg-gray-800/50 rounded-xl p-6 border border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-500/20 rounded-xl">
                        <Camera className="h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white capitalize">{shoot.type} Session</p>
                        <p className="text-gray-400 text-sm">
                          {new Date(shoot.scheduledDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {shoot.status === 'delivered' ? (
                        <span className="inline-flex items-center gap-1.5 text-green-400">
                          <CheckCircle className="h-4 w-4" />
                          Delivered
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-yellow-400">
                          <Clock className="h-4 w-4" />
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Gallery Placeholder */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Your Gallery</h2>
          <div className="bg-gray-800/50 rounded-xl p-12 border border-white/5 text-center">
            <Image className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Gallery Coming Soon
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Once your photos are edited and approved, they will appear here for viewing and download.
            </p>
          </div>
        </div>

        {/* Downloads Placeholder */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Downloads</h2>
          <div className="bg-gray-800/50 rounded-xl p-8 border border-white/5 text-center">
            <Download className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">
              Your high-resolution downloads will be available here once your gallery is ready.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
