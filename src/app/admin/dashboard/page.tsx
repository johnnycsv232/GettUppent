'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  DollarSign, Users, Camera, TrendingUp, Calendar, 
  ArrowUpRight, ArrowDownRight, RefreshCw 
} from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';
import Link from 'next/link';

interface DashboardStats {
  totalRevenue: number;
  monthlyRevenue: number;
  totalClients: number;
  activeClients: number;
  totalShoots: number;
  pendingShoots: number;
  totalLeads: number;
  conversionRate: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    if (user) fetchDashboardData();
  }, [user]);

  async function fetchDashboardData() {
    if (!user) return;
    
    try {
      setLoading(true);
      const token = await user.getIdToken();
      
      // Fetch all data in parallel
      const [clientsRes, shootsRes, leadsRes] = await Promise.all([
        fetch('/api/admin/clients', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/shoots', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/leads', { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      const clientsData = clientsRes.ok ? await clientsRes.json() : { data: [] };
      const shootsData = shootsRes.ok ? await shootsRes.json() : { data: [] };
      const leadsData = leadsRes.ok ? await leadsRes.json() : { data: { leads: [] } };

      const clients = clientsData.data || [];
      const shoots = shootsData.data || [];
      const leads = leadsData.data?.leads || leadsData.leads || [];

      // Calculate stats
      const totalRevenue = clients.reduce((acc: number, c: any) => acc + (c.amountPaid || 0), 0);
      const thisMonth = new Date().getMonth();
      const monthlyRevenue = clients
        .filter((c: any) => new Date(c.createdAt).getMonth() === thisMonth)
        .reduce((acc: number, c: any) => acc + (c.amountPaid || 0), 0);

      const bookedLeads = leads.filter((l: any) => l.status === 'Booked').length;
      const conversionRate = leads.length > 0 
        ? Math.round((bookedLeads / leads.length) * 100) 
        : 0;

      setStats({
        totalRevenue,
        monthlyRevenue,
        totalClients: clients.length,
        activeClients: clients.filter((c: any) => c.status === 'active').length,
        totalShoots: shoots.length,
        pendingShoots: shoots.filter((s: any) => ['scheduled', 'confirmed'].includes(s.status)).length,
        totalLeads: leads.length,
        conversionRate,
      });

      // Recent activity (combine and sort)
      const activities = [
        ...clients.slice(0, 3).map((c: any) => ({ 
          type: 'client', 
          title: `New client: ${c.name}`,
          date: c.createdAt,
          tier: c.tier 
        })),
        ...leads.slice(0, 3).map((l: any) => ({ 
          type: 'lead', 
          title: `Lead: ${l.venue || l.name}`,
          date: l.createdAt,
          status: l.status 
        })),
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
      
      setRecentActivity(activities);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 text-brand-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Dashboard</h1>
          <p className="text-gray-400">Welcome to GettUpp OS</p>
        </div>
        <button 
          onClick={fetchDashboardData}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={`$${(stats?.totalRevenue || 0).toLocaleString()}`}
          subtitle="All time"
          icon={DollarSign}
          color="green"
        />
        <StatsCard
          title="This Month"
          value={`$${(stats?.monthlyRevenue || 0).toLocaleString()}`}
          subtitle="Revenue"
          icon={TrendingUp}
          color="blue"
        />
        <StatsCard
          title="Active Clients"
          value={stats?.activeClients || 0}
          subtitle={`of ${stats?.totalClients || 0} total`}
          icon={Users}
          color="purple"
        />
        <StatsCard
          title="Pending Shoots"
          value={stats?.pendingShoots || 0}
          subtitle={`of ${stats?.totalShoots || 0} total`}
          icon={Camera}
          color="gold"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-white/5">
          <h3 className="text-gray-400 text-sm font-medium mb-4">Lead Conversion</h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-black text-white">{stats?.conversionRate || 0}%</p>
              <p className="text-gray-500 text-sm">{stats?.totalLeads || 0} total leads</p>
            </div>
            <div className="h-16 w-24 flex items-end gap-1">
              {[30, 50, 40, 70, 60, 80, stats?.conversionRate || 50].map((h, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-brand-gold/20 rounded-t"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-6 border border-white/5">
          <h3 className="text-gray-400 text-sm font-medium mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Link 
              href="/admin/leads"
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <span className="text-white font-medium">View Leads</span>
              <ArrowUpRight className="h-4 w-4 text-gray-400" />
            </Link>
            <Link 
              href="/admin/shoots"
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <span className="text-white font-medium">Schedule Shoot</span>
              <ArrowUpRight className="h-4 w-4 text-gray-400" />
            </Link>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-6 border border-white/5">
          <h3 className="text-gray-400 text-sm font-medium mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.length === 0 ? (
              <p className="text-gray-500 text-sm">No recent activity</p>
            ) : (
              recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'client' ? 'bg-green-400' : 'bg-yellow-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate">{activity.title}</p>
                    <p className="text-gray-500 text-xs">
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Tier Distribution */}
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-white/5">
        <h3 className="text-white font-bold mb-6">Revenue by Tier (Pricing)</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { tier: 'Pilot', price: '$345', color: 'bg-purple-500' },
            { tier: 'Tier 1', price: '$445/mo', color: 'bg-blue-500' },
            { tier: 'Tier 2', price: '$695/mo', color: 'bg-cyan-500' },
            { tier: 'VIP', price: '$995/mo', color: 'bg-brand-gold' },
          ].map((item) => (
            <div key={item.tier} className="text-center">
              <div className={`h-2 ${item.color} rounded-full mb-3`} />
              <p className="text-white font-bold">{item.tier}</p>
              <p className="text-gray-500 text-sm">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
