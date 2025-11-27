'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Crown, Camera, Image, Calendar, Download, LogOut, RefreshCw, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface ClientData {
  id: string;
  name: string;
  email: string;
  tier: string;
  status: string;
}

interface ShootData {
  id: string;
  type: string;
  status: string;
  scheduledDate: string;
  location?: string;
  deliveredImages: number;
  totalImages: number;
}

export default function ClientPortalPage() {
  const { user, signOut, loading } = useAuth();
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [shoots, setShoots] = useState<ShootData[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (user) {
      fetchClientData();
    }
  }, [user]);

  async function fetchClientData() {
    if (!user) return;
    try {
      setLoadingData(true);
      const token = await user.getIdToken();
      
      // Fetch client by email
      const clientRes = await fetch(`/api/admin/clients?email=${user.email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (clientRes.ok) {
        const data = await clientRes.json();
        if (data.data && data.data.length > 0) {
          const client = data.data.find((c: ClientData) => c.email === user.email);
          if (client) {
            setClientData(client);
            
            // Fetch shoots for this client
            const shootsRes = await fetch(`/api/admin/shoots?clientId=${client.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (shootsRes.ok) {
              const shootsData = await shootsRes.json();
              setShoots(shootsData.data || []);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching client data:', error);
    } finally {
      setLoadingData(false);
    }
  }

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
        <div className="mb-12 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back{clientData ? `, ${clientData.name.split(' ')[0]}` : ''}! 👋
            </h1>
            <p className="text-gray-400">
              Access your photos, booking details, and account information.
            </p>
          </div>
          {clientData && (
            <div className="text-right">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-brand-gold/20 text-brand-gold">
                {clientData.tier} Client
              </span>
            </div>
          )}
        </div>

        {loadingData ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 text-brand-gold animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-white/5">
                <div className="p-3 bg-purple-500/20 rounded-xl w-fit mb-4">
                  <Camera className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Total Shoots</h3>
                <p className="text-3xl font-black text-white">{shoots.length}</p>
              </div>

              <div className="bg-gray-800/50 rounded-2xl p-6 border border-white/5">
                <div className="p-3 bg-blue-500/20 rounded-xl w-fit mb-4">
                  <Calendar className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Upcoming</h3>
                <p className="text-3xl font-black text-white">
                  {shoots.filter(s => ['scheduled', 'confirmed'].includes(s.status)).length}
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-2xl p-6 border border-white/5">
                <div className="p-3 bg-green-500/20 rounded-xl w-fit mb-4">
                  <Image className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Photos Delivered</h3>
                <p className="text-3xl font-black text-white">
                  {shoots.reduce((acc, s) => acc + s.deliveredImages, 0)}
                </p>
              </div>
            </div>

            {/* Shoots List */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-white mb-6">Your Sessions</h2>
              {shoots.length === 0 ? (
                <div className="bg-gray-800/50 rounded-2xl p-8 border border-white/5 text-center">
                  <Camera className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No shoots scheduled yet.</p>
                  <Link href="/schedule" className="inline-block mt-4 px-6 py-2 bg-brand-gold text-black font-bold rounded-lg">
                    Book Your First Shoot
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {shoots.map((shoot) => (
                    <div key={shoot.id} className="bg-gray-800/50 rounded-xl p-6 border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-lg font-bold text-white capitalize">{shoot.type} Session</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                            shoot.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                            shoot.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                            shoot.status === 'scheduled' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {shoot.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          {new Date(shoot.scheduledDate).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                          {shoot.location && ` • ${shoot.location}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{shoot.deliveredImages}/{shoot.totalImages}</p>
                        <p className="text-gray-500 text-sm">photos</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/schedule" className="bg-gray-800/50 rounded-2xl p-6 border border-white/5 hover:border-brand-gold/30 transition-colors group">
            <div className="p-3 bg-brand-gold/20 rounded-xl w-fit mb-4">
              <Calendar className="h-6 w-6 text-brand-gold" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Book New Session</h3>
            <p className="text-gray-400 text-sm mb-4">
              Schedule your next photo shoot.
            </p>
            <span className="text-brand-gold text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">Book Now →</span>
          </Link>

          <Link href="/shop" className="bg-gray-800/50 rounded-2xl p-6 border border-white/5 hover:border-brand-pink/30 transition-colors group">
            <div className="p-3 bg-brand-pink/20 rounded-xl w-fit mb-4">
              <Download className="h-6 w-6 text-brand-pink" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">GettUpp Girls Shop</h3>
            <p className="text-gray-400 text-sm mb-4">
              Check out our exclusive apparel collection.
            </p>
            <span className="text-brand-pink text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">Shop Now →</span>
          </Link>
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
