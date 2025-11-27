'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { CreditCard, Search, Filter, ExternalLink, DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Invoice, InvoiceStatus } from '@/types';

export default function InvoicesPage() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'all'>('all');

  useEffect(() => {
    fetchInvoices();
  }, [user]);

  async function fetchInvoices() {
    if (!user) return;
    
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const res = await fetch('/api/admin/invoices', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) throw new Error('Failed to fetch invoices');
      
      const data = await res.json();
      setInvoices(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load invoices');
    } finally {
      setLoading(false);
    }
  }

  const filteredInvoices = invoices.filter(invoice => {
    return statusFilter === 'all' || invoice.status === statusFilter;
  });

  const statusColors: Record<InvoiceStatus, string> = {
    draft: 'bg-gray-500/20 text-gray-400',
    sent: 'bg-blue-500/20 text-blue-400',
    paid: 'bg-green-500/20 text-green-400',
    cancelled: 'bg-red-500/20 text-red-400',
    refunded: 'bg-orange-500/20 text-orange-400',
  };

  const statusIcons: Record<InvoiceStatus, React.ReactNode> = {
    draft: <Clock className="h-4 w-4" />,
    sent: <ExternalLink className="h-4 w-4" />,
    paid: <CheckCircle className="h-4 w-4" />,
    cancelled: <XCircle className="h-4 w-4" />,
    refunded: <DollarSign className="h-4 w-4" />,
  };

  // Calculate totals
  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === 'sent').reduce((sum, i) => sum + i.amount, 0);

  function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
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
            <CreditCard className="h-6 w-6 text-brand-gold" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Invoices</h1>
            <p className="text-gray-400">Track payments and revenue</p>
          </div>
        </div>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl p-6 border border-green-500/20">
          <div className="flex items-center gap-2 text-green-400 mb-2">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Collected</span>
          </div>
          <p className="text-3xl font-bold text-white">${totalPaid.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-6 border border-blue-500/20">
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <Clock className="h-5 w-5" />
            <span className="text-sm font-medium">Pending</span>
          </div>
          <p className="text-3xl font-bold text-white">${totalPending.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl p-6 border border-purple-500/20">
          <div className="flex items-center gap-2 text-purple-400 mb-2">
            <DollarSign className="h-5 w-5" />
            <span className="text-sm font-medium">Total Invoices</span>
          </div>
          <p className="text-3xl font-bold text-white">{invoices.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as InvoiceStatus | 'all')}
            className="bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-brand-gold"
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="paid">Paid</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {/* Invoices Table */}
      <div className="bg-gray-800/50 rounded-xl border border-white/5 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 text-gray-400 font-medium">Invoice</th>
              <th className="text-left p-4 text-gray-400 font-medium">Description</th>
              <th className="text-left p-4 text-gray-400 font-medium">Amount</th>
              <th className="text-left p-4 text-gray-400 font-medium">Status</th>
              <th className="text-left p-4 text-gray-400 font-medium">Created</th>
              <th className="text-left p-4 text-gray-400 font-medium">Paid</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No invoices found
                </td>
              </tr>
            ) : (
              filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <p className="font-mono text-sm text-gray-300">
                      {invoice.id.slice(0, 8)}...
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-white">{invoice.description}</p>
                    <p className="text-sm text-gray-500 uppercase">{invoice.tier}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-white">${invoice.amount.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 uppercase">{invoice.currency}</p>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[invoice.status]}`}>
                      {statusIcons[invoice.status]}
                      {invoice.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400 text-sm">
                    {formatDate(invoice.createdAt)}
                  </td>
                  <td className="p-4 text-gray-400 text-sm">
                    {invoice.paidAt ? formatDate(invoice.paidAt) : '-'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
