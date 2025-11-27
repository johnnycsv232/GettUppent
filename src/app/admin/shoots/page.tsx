'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Camera, Plus, Search, Filter, Calendar, Clock, MapPin, User } from 'lucide-react';
import { Shoot, ShootStatus, ShootType } from '@/types';

export default function ShootsPage() {
  const { user } = useAuth();
  const [shoots, setShoots] = useState<Shoot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<ShootStatus | 'all'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchShoots();
  }, [user]);

  async function fetchShoots() {
    if (!user) return;
    
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const res = await fetch('/api/admin/shoots', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) throw new Error('Failed to fetch shoots');
      
      const data = await res.json();
      setShoots(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load shoots');
    } finally {
      setLoading(false);
    }
  }

  async function updateShootStatus(shootId: string, newStatus: ShootStatus) {
    if (!user) return;
    
    try {
      const token = await user.getIdToken();
      const res = await fetch(`/api/admin/shoots/${shootId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update shoot');
      
      fetchShoots();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update shoot');
    }
  }

  const filteredShoots = shoots.filter(shoot => {
    return statusFilter === 'all' || shoot.status === statusFilter;
  });

  const statusColors: Record<ShootStatus, string> = {
    scheduled: 'bg-blue-500/20 text-blue-400',
    confirmed: 'bg-cyan-500/20 text-cyan-400',
    in_progress: 'bg-yellow-500/20 text-yellow-400',
    completed: 'bg-green-500/20 text-green-400',
    delivered: 'bg-purple-500/20 text-purple-400',
    cancelled: 'bg-red-500/20 text-red-400',
  };

  const typeLabels: Record<ShootType, string> = {
    pilot: 'Pilot Session',
    standard: 'Standard',
    premium: 'Premium',
    vip: 'VIP Experience',
  };

  function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  function formatTime(date: Date | string) {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-gold/20 rounded-xl">
            <Camera className="h-6 w-6 text-brand-gold" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Shoots</h1>
            <p className="text-gray-400">Schedule and manage photo sessions</p>
          </div>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-brand-gold text-black font-semibold rounded-lg hover:bg-brand-gold/90 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Schedule Shoot
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-6 gap-4">
        {(['scheduled', 'confirmed', 'in_progress', 'completed', 'delivered', 'cancelled'] as ShootStatus[]).map((status) => {
          const count = shoots.filter(s => s.status === status).length;
          return (
            <div key={status} className="bg-gray-800/50 rounded-xl p-4 border border-white/5">
              <p className="text-gray-400 text-xs capitalize">{status.replace('_', ' ')}</p>
              <p className="text-xl font-bold text-white">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ShootStatus | 'all')}
            className="bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-brand-gold"
          >
            <option value="all">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="confirmed">Confirmed</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {/* Shoots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredShoots.length === 0 ? (
          <div className="col-span-full p-8 text-center text-gray-500 bg-gray-800/50 rounded-xl">
            No shoots found
          </div>
        ) : (
          filteredShoots.map((shoot) => (
            <div key={shoot.id} className="bg-gray-800/50 rounded-xl border border-white/5 overflow-hidden">
              <div className="p-4 border-b border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-brand-gold">
                    {typeLabels[shoot.type]}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[shoot.status]}`}>
                    {shoot.status.replace('_', ' ')}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    {formatDate(shoot.scheduledDate)}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="h-4 w-4 text-gray-500" />
                    {formatTime(shoot.scheduledDate)} ({shoot.duration} min)
                  </div>
                  {shoot.location && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      {shoot.location}
                    </div>
                  )}
                  {shoot.photographerName && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <User className="h-4 w-4 text-gray-500" />
                      {shoot.photographerName}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-4 bg-gray-900/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400 text-sm">Deliverables</span>
                  <span className="text-white text-sm font-medium">
                    {shoot.deliveredImages} / {shoot.totalImages}
                  </span>
                </div>
                
                {/* Status Update Buttons */}
                <div className="flex gap-2">
                  {shoot.status === 'scheduled' && (
                    <button
                      onClick={() => updateShootStatus(shoot.id, 'confirmed')}
                      className="flex-1 px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-medium hover:bg-cyan-500/30"
                    >
                      Confirm
                    </button>
                  )}
                  {shoot.status === 'confirmed' && (
                    <button
                      onClick={() => updateShootStatus(shoot.id, 'in_progress')}
                      className="flex-1 px-3 py-1.5 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm font-medium hover:bg-yellow-500/30"
                    >
                      Start
                    </button>
                  )}
                  {shoot.status === 'in_progress' && (
                    <button
                      onClick={() => updateShootStatus(shoot.id, 'completed')}
                      className="flex-1 px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/30"
                    >
                      Complete
                    </button>
                  )}
                  {shoot.status === 'completed' && (
                    <button
                      onClick={() => updateShootStatus(shoot.id, 'delivered')}
                      className="flex-1 px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-medium hover:bg-purple-500/30"
                    >
                      Mark Delivered
                    </button>
                  )}
                  {!['cancelled', 'delivered'].includes(shoot.status) && (
                    <button
                      onClick={() => updateShootStatus(shoot.id, 'cancelled')}
                      className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Shoot Modal */}
      {showCreateModal && (
        <CreateShootModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchShoots();
          }}
        />
      )}
    </div>
  );
}

// Create Shoot Modal Component
function CreateShootModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const { user } = useAuth();
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
  const [formData, setFormData] = useState({
    clientId: '',
    type: 'pilot' as ShootType,
    scheduledDate: '',
    scheduledTime: '',
    location: '',
    notes: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    if (!user) return;
    
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/admin/clients?status=active', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.ok) {
        const data = await res.json();
        setClients(data.data || []);
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !formData.clientId || !formData.scheduledDate) return;

    try {
      setSubmitting(true);
      const scheduledDateTime = new Date(`${formData.scheduledDate}T${formData.scheduledTime || '10:00'}`);
      
      const token = await user.getIdToken();
      const res = await fetch('/api/admin/shoots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          clientId: formData.clientId,
          type: formData.type,
          scheduledDate: scheduledDateTime.toISOString(),
          location: formData.location || undefined,
          notes: formData.notes || undefined,
        }),
      });

      if (!res.ok) throw new Error('Failed to schedule shoot');
      onSuccess();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to schedule shoot');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-white/10">
        <h2 className="text-xl font-bold text-white mb-4">Schedule New Shoot</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Client</label>
            {loading ? (
              <p className="text-gray-500">Loading clients...</p>
            ) : (
              <select
                value={formData.clientId}
                onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white"
                required
              >
                <option value="">Select a client...</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Session Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as ShootType })}
              className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white"
            >
              <option value="pilot">Pilot (1 hour)</option>
              <option value="standard">Standard (2 hours)</option>
              <option value="premium">Premium (3 hours)</option>
              <option value="vip">VIP (Full day)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Date</label>
              <input
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Time</label>
              <input
                type="time"
                value={formData.scheduledTime}
                onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Studio, outdoor location, etc."
              className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Special requests, reminders..."
              rows={3}
              className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !formData.clientId}
              className="flex-1 px-4 py-2 bg-brand-gold text-black font-semibold rounded-lg hover:bg-brand-gold/90 disabled:opacity-50"
            >
              {submitting ? 'Scheduling...' : 'Schedule Shoot'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
