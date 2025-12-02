'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Users, Plus, Search, Filter, ExternalLink, Mail, Phone, Instagram } from 'lucide-react';
import { Client, ClientStatus, ClientTier } from '@/types';

export default function ClientsPage() {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ClientStatus | 'all'>('all');
  const [showConvertModal, setShowConvertModal] = useState(false);

  useEffect(() => {
    fetchClients();
  }, [user]);

  async function fetchClients() {
    if (!user) return;
    
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const res = await fetch('/api/admin/clients', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) throw new Error('Failed to fetch clients');
      
      const data = await res.json();
      setClients(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load clients');
    } finally {
      setLoading(false);
    }
  }

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors: Record<ClientStatus, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    active: 'bg-green-500/20 text-green-400',
    completed: 'bg-blue-500/20 text-blue-400',
    cancelled: 'bg-red-500/20 text-red-400',
    past_due: 'bg-orange-500/20 text-orange-400',
  };

  const tierColors: Record<ClientTier, string> = {
    pilot: 'bg-purple-500/20 text-purple-400',
    t1: 'bg-blue-500/20 text-blue-400',
    t2: 'bg-cyan-500/20 text-cyan-400',
    vip: 'bg-amber-500/20 text-amber-400',
  };

  async function handleGenerateInvoice(clientId: string, tier: ClientTier) {
    if (!user) return;
    
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ clientId, tier }),
      });

      if (!res.ok) throw new Error('Failed to generate checkout link');

      const data = await res.json();
      if (data.data?.url) {
        window.open(data.data.url, '_blank');
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to generate invoice');
    }
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
            <Users className="h-6 w-6 text-brand-gold" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Clients</h1>
            <p className="text-gray-400">Manage paying customers</p>
          </div>
        </div>
        <button
          onClick={() => setShowConvertModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-brand-gold text-black font-semibold rounded-lg hover:bg-brand-gold/90 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Convert Lead
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        {['pending', 'active', 'completed', 'cancelled'].map((status) => {
          const count = clients.filter(c => c.status === status).length;
          return (
            <div key={status} className="bg-gray-800/50 rounded-xl p-4 border border-white/5">
              <p className="text-gray-400 text-sm capitalize">{status}</p>
              <p className="text-2xl font-bold text-white">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ClientStatus | 'all')}
            className="bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-brand-gold"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
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

      {/* Clients Table */}
      <div className="bg-gray-800/50 rounded-xl border border-white/5 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 text-gray-400 font-medium">Client</th>
              <th className="text-left p-4 text-gray-400 font-medium">Contact</th>
              <th className="text-left p-4 text-gray-400 font-medium">Tier</th>
              <th className="text-left p-4 text-gray-400 font-medium">Status</th>
              <th className="text-left p-4 text-gray-400 font-medium">Paid</th>
              <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No clients found
                </td>
              </tr>
            ) : (
              filteredClients.map((client) => (
                <tr key={client.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <p className="font-medium text-white">{client.name}</p>
                    <p className="text-sm text-gray-500">{client.source}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <a href={`mailto:${client.email}`} className="text-gray-400 hover:text-white">
                        <Mail className="h-4 w-4" />
                      </a>
                      {client.phone && (
                        <a href={`tel:${client.phone}`} className="text-gray-400 hover:text-white">
                          <Phone className="h-4 w-4" />
                        </a>
                      )}
                      {client.instagram && (
                        <a
                          href={`https://instagram.com/${client.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white"
                        >
                          <Instagram className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${tierColors[client.tier]}`}>
                      {client.tier}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[client.status]}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="p-4 text-white">
                    ${client.amountPaid.toFixed(2)}
                  </td>
                  <td className="p-4">
                    {client.status === 'pending' && (
                      <button
                        onClick={() => handleGenerateInvoice(client.id, client.tier)}
                        className="flex items-center gap-1 text-brand-gold hover:text-brand-gold/80 text-sm font-medium"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Send Invoice
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Convert Lead Modal */}
      {showConvertModal && (
        <ConvertLeadModal
          onClose={() => setShowConvertModal(false)}
          onSuccess={() => {
            setShowConvertModal(false);
            fetchClients();
          }}
        />
      )}
    </div>
  );
}

// Convert Lead Modal Component
function ConvertLeadModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const { user } = useAuth();
  const [leads, setLeads] = useState<{ id: string; name: string; email: string }[]>([]);
  const [selectedLead, setSelectedLead] = useState('');
  const [tier, setTier] = useState<ClientTier>('pilot');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    if (!user) return;
    
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/admin/leads?status=qualified', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !selectedLead) return;

    try {
      setSubmitting(true);
      const lead = leads.find(l => l.id === selectedLead);
      if (!lead) return;

      const token = await user.getIdToken();
      const res = await fetch('/api/admin/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          tier,
          leadId: lead.id,
          source: 'lead_conversion',
        }),
      });

      if (!res.ok) throw new Error('Failed to convert lead');
      onSuccess();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to convert lead');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-white/10">
        <h2 className="text-xl font-bold text-white mb-4">Convert Lead to Client</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Select Lead
            </label>
            {loading ? (
              <p className="text-gray-500">Loading leads...</p>
            ) : leads.length === 0 ? (
              <p className="text-gray-500">No qualified leads available</p>
            ) : (
              <select
                value={selectedLead}
                onChange={(e) => setSelectedLead(e.target.value)}
                className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white"
                required
              >
                <option value="">Select a lead...</option>
                {leads.map((lead) => (
                  <option key={lead.id} value={lead.id}>
                    {lead.name} ({lead.email})
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Service Tier
            </label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value as ClientTier)}
              className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white"
            >
              <option value="pilot">Pilot - $345</option>
              <option value="t1">Tier 1 - $445/mo</option>
              <option value="t2">Tier 2 - $695/mo</option>
              <option value="vip">VIP - $995/mo</option>
            </select>
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
              disabled={submitting || !selectedLead}
              className="flex-1 px-4 py-2 bg-brand-gold text-black font-semibold rounded-lg hover:bg-brand-gold/90 disabled:opacity-50"
            >
              {submitting ? 'Converting...' : 'Convert to Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
