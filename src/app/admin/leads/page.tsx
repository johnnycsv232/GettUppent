'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { RefreshCw, Search, Filter, MoreHorizontal, Phone, Mail, Calendar, DollarSign, Users, MessageSquare, UserPlus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ClientTier } from '@/types';

interface Lead {
    id: string;
    venue: string;
    instagram: string;
    name: string;
    email: string;
    phone?: string;
    eventType?: string;
    expectedAttendees?: number;
    budget?: number;
    message?: string;
    status: 'Pending' | 'Contacted' | 'Qualified' | 'Booked' | 'Declined';
    qualificationScore: number;
    createdAt: Timestamp;
}

const STATUS_COLORS = {
    Pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    Contacted: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    Qualified: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    Booked: 'bg-green-500/10 text-green-500 border-green-500/20',
    Declined: 'bg-red-500/10 text-red-500 border-red-500/20',
};

export default function LeadsPage() {
    const { user } = useAuth();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [convertingId, setConvertingId] = useState<string | null>(null);
    const [showConvertModal, setShowConvertModal] = useState(false);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

    useEffect(() => {
        const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const leadsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Lead[];
            setLeads(leadsData);
            setIsLoading(false);
        }, (err) => {
            console.error("Error fetching leads:", err);
            setError("Failed to load leads. Check console for details.");
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleStatusChange = async (leadId: string, newStatus: string) => {
        try {
            const leadRef = doc(db, 'leads', leadId);
            await updateDoc(leadRef, {
                status: newStatus,
                updatedAt: Timestamp.now()
            });
        } catch (err) {
            console.error("Error updating status:", err);
            alert("Failed to update status");
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="h-12 bg-white/5 rounded-xl animate-pulse" />
                <div className="h-64 bg-white/5 rounded-xl animate-pulse" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2">Leads</h1>
                    <p className="text-gray-400">Manage and track your incoming venue requests.</p>
                </div>
                <div className="flex gap-3">
                    <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors">
                        <RefreshCw className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Stats Row (Placeholder) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Leads', value: leads.length, icon: Users },
                    { label: 'Pending', value: leads.filter(l => l.status === 'Pending').length, icon: Calendar },
                    { label: 'Pipeline Value', value: '$' + leads.reduce((acc, curr) => acc + (curr.budget || 0), 0).toLocaleString(), icon: DollarSign },
                    { label: 'Conversion Rate', value: '0%', icon: RefreshCw },
                ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-400 text-sm font-medium">{stat.label}</span>
                            <stat.icon className="h-5 w-5 text-brand-gold opacity-50" />
                        </div>
                        <div className="text-3xl font-black text-white">{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Leads Table */}
            <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Venue / Contact</th>
                                <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Details</th>
                                <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                                <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Score</th>
                                <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
                                <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {leads.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-gray-500">
                                        No leads found. Drive traffic to /pilot-intake!
                                    </td>
                                </tr>
                            ) : (
                                leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-6">
                                            <div className="font-bold text-white text-lg">{lead.venue}</div>
                                            <div className="text-sm text-brand-gold mb-1">@{lead.instagram.replace('@', '')}</div>
                                            <div className="text-sm text-gray-500">{lead.name}</div>
                                        </td>
                                        <td className="p-6">
                                            <div className="space-y-1 text-sm text-gray-400">
                                                <div className="flex items-center gap-2">
                                                    <Mail className="h-3 w-3" /> {lead.email}
                                                </div>
                                                {lead.phone && (
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="h-3 w-3" /> {lead.phone}
                                                    </div>
                                                )}
                                                {lead.budget && (
                                                    <div className="flex items-center gap-2 text-green-400">
                                                        <DollarSign className="h-3 w-3" /> ${lead.budget}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <select
                                                value={lead.status}
                                                onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border bg-transparent cursor-pointer outline-none ${STATUS_COLORS[lead.status] || 'text-gray-500 border-gray-500/20'}`}
                                            >
                                                {Object.keys(STATUS_COLORS).map(status => (
                                                    <option key={status} value={status} className="bg-[#111] text-gray-300">
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-full bg-white/10 rounded-full h-2 w-16">
                                                    <div
                                                        className="bg-brand-gold h-2 rounded-full"
                                                        style={{ width: `${Math.min(lead.qualificationScore, 100)}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-bold text-white">{lead.qualificationScore}</span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-sm text-gray-500">
                                            {lead.createdAt?.toDate().toLocaleDateString()}
                                            <div className="text-xs opacity-50">{lead.createdAt?.toDate().toLocaleTimeString()}</div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                {(lead.status === 'Qualified' || lead.status === 'Booked') && (
                                                    <button
                                                        onClick={() => {
                                                            setSelectedLead(lead);
                                                            setShowConvertModal(true);
                                                        }}
                                                        className="flex items-center gap-1 px-3 py-1.5 bg-brand-gold/20 text-brand-gold rounded-lg text-xs font-bold hover:bg-brand-gold/30 transition-colors"
                                                    >
                                                        <UserPlus className="h-3 w-3" />
                                                        Convert
                                                    </button>
                                                )}
                                                <button className="p-2 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors">
                                                    <MoreHorizontal className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Convert Lead Modal */}
            {showConvertModal && selectedLead && (
                <ConvertLeadModal
                    lead={selectedLead}
                    onClose={() => {
                        setShowConvertModal(false);
                        setSelectedLead(null);
                    }}
                    onSuccess={() => {
                        setShowConvertModal(false);
                        setSelectedLead(null);
                        // Refresh leads to show updated status
                        window.location.reload();
                    }}
                />
            )}
        </div>
    );
}

// Convert Lead Modal Component
function ConvertLeadModal({ lead, onClose, onSuccess }: { lead: Lead; onClose: () => void; onSuccess: () => void }) {
    const { user } = useAuth();
    const [tier, setTier] = useState<ClientTier>('pilot');
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!user) return;

        try {
            setSubmitting(true);
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
                    phone: lead.phone,
                    instagram: lead.instagram,
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
            <div className="bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl">
                <h2 className="text-2xl font-black text-white mb-2">Convert to Client</h2>
                <p className="text-gray-400 mb-6">Create a paying client from this lead</p>

                <div className="bg-white/5 rounded-xl p-4 mb-6">
                    <p className="font-bold text-white">{lead.name}</p>
                    <p className="text-sm text-gray-400">{lead.email}</p>
                    <p className="text-sm text-brand-gold">@{lead.instagram?.replace('@', '')}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Service Tier
                        </label>
                        <select
                            value={tier}
                            onChange={(e) => setTier(e.target.value as ClientTier)}
                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none"
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
                            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 px-4 py-3 bg-brand-gold text-black font-bold rounded-lg hover:bg-brand-gold/90 disabled:opacity-50 transition-colors"
                        >
                            {submitting ? 'Converting...' : 'Convert to Client'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
