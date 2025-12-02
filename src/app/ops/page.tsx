'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, orderBy, Timestamp } from 'firebase/firestore';
import { Clock, AlertTriangle, TrendingUp, FileText, Zap, ChevronRight, Users, Calendar, DollarSign, Loader2 } from 'lucide-react';
import { KnowledgeNode } from '@/types/knowledge';
import Link from 'next/link';
import AuthGuard from '@/components/AuthGuard';

interface Lead {
    id: string;
    venue: string;
    status: string;
    createdAt: Timestamp;
}

interface Shoot {
    id: string;
    venue: string;
    date: Timestamp;
    status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
    tier: string;
}

export default function OpsDashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [shoots, setShoots] = useState<Shoot[]>([]);
    const [knowledge, setKnowledge] = useState<KnowledgeNode[]>([]);
    const [loading, setLoading] = useState(true);

    // Real-time listeners for Firestore
    useEffect(() => {
        // Leads listener
        const leadsQuery = query(
            collection(db, 'leads'),
            orderBy('createdAt', 'desc')
        );
        const unsubLeads = onSnapshot(leadsQuery, (snapshot) => {
            const leadsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Lead[];
            setLeads(leadsData);
        });

        // Shoots listener (if collection exists)
        const shootsQuery = query(collection(db, 'shoots'));
        const unsubShoots = onSnapshot(shootsQuery, (snapshot) => {
            const shootsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Shoot[];
            setShoots(shootsData);
        }, () => {
            // Collection might not exist yet, that's okay
            setShoots([]);
        });

        // Knowledge base (for procedures)
        const knowledgeQuery = query(collection(db, 'knowledge_base'));
        const unsubKnowledge = onSnapshot(knowledgeQuery, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as KnowledgeNode[];
            setKnowledge(data);
            setLoading(false);
        }, () => {
            setLoading(false);
        });

        return () => {
            unsubLeads();
            unsubShoots();
            unsubKnowledge();
        };
    }, []);

    // Derived data
    const pendingLeads = leads.filter(l => l.status === 'Pending').length;
    const qualifiedLeads = leads.filter(l => l.status === 'Qualified').length;
    const bookedLeads = leads.filter(l => l.status === 'Booked').length;
    
    const shotClockRule = knowledge.find(n => n.sub_topic === 'connectsphere_shotclock');
    const editKpi = knowledge.find(n => n.sub_topic === 'edit_minutes_per_photo');
    
    const recentSops = knowledge
        .filter(n => n.domain_area === 'operations' && 
            (n.knowledge_type === 'procedure' || n.knowledge_type === 'checklist'))
        .slice(0, 4);

    // Calculate pipeline value (simple estimate)
    const pipelineValue = qualifiedLeads * 445 + bookedLeads * 695;

    if (loading) {
        return (
            <AuthGuard>
                <main className="min-h-screen bg-[#0B0B0D] flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
                </main>
            </AuthGuard>
        );
    }

    return (
        <AuthGuard>
            <main className="min-h-screen bg-[#0B0B0D] p-8">
            <header className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div>
                    <h1 className="font-heading text-3xl font-bold text-white">Ops Command</h1>
                    <p className="text-gray-500">Real-time Operations Dashboard • Live Data</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-xs font-bold text-green-400">LIVE</span>
                    </span>
                </div>
            </header>

            {/* Stats Row */}
            <div className="grid gap-4 md:grid-cols-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <Users className="h-5 w-5 text-yellow-500" />
                        <span className="text-xs text-gray-500">PENDING</span>
                    </div>
                    <div className="text-3xl font-black text-white">{pendingLeads}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="h-5 w-5 text-purple-500" />
                        <span className="text-xs text-gray-500">QUALIFIED</span>
                    </div>
                    <div className="text-3xl font-black text-white">{qualifiedLeads}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <Calendar className="h-5 w-5 text-green-500" />
                        <span className="text-xs text-gray-500">BOOKED</span>
                    </div>
                    <div className="text-3xl font-black text-white">{bookedLeads}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <DollarSign className="h-5 w-5 text-brand-gold" />
                        <span className="text-xs text-gray-500">PIPELINE</span>
                    </div>
                    <div className="text-3xl font-black text-brand-gold">${pipelineValue.toLocaleString()}</div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                
                {/* WIDGET: RECENT LEADS */}
                <div className="rounded-2xl border border-white/10 bg-[#1A1A1D] p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-bold text-white flex items-center">
                            <Users className="mr-2 h-5 w-5 text-brand-pink" />
                            Recent Leads
                        </h3>
                        <Link href="/admin/leads" className="text-xs text-brand-gold hover:underline">View All</Link>
                    </div>
                    <div className="space-y-3">
                        {leads.slice(0, 4).map(lead => (
                            <div key={lead.id} className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                                <span className="text-sm text-gray-300">{lead.venue}</span>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                    lead.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                    lead.status === 'Qualified' ? 'bg-purple-500/20 text-purple-400' :
                                    lead.status === 'Booked' ? 'bg-green-500/20 text-green-400' :
                                    'bg-gray-500/20 text-gray-400'
                                }`}>
                                    {lead.status}
                                </span>
                            </div>
                        ))}
                        {leads.length === 0 && (
                            <p className="text-sm text-gray-500 text-center py-4">No leads yet</p>
                        )}
                    </div>
                </div>

                {/* WIDGET: SHOTCLOCK STATUS */}
                <div className="rounded-2xl border border-white/10 bg-[#1A1A1D] p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-bold text-white flex items-center">
                            <Clock className="mr-2 h-5 w-5 text-brand-pink" />
                            ShotClock Monitor
                        </h3>
                        <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-bold text-green-400">ACTIVE</span>
                    </div>
                    <div className="space-y-4">
                        {shoots.length > 0 ? shoots.slice(0, 2).map(shoot => (
                            <div key={shoot.id} className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                                <span className="text-sm text-gray-300">{shoot.venue} ({shoot.tier})</span>
                                <span className="font-mono font-bold text-brand-gold">
                                    {shoot.status === 'scheduled' ? 'UPCOMING' : shoot.status.toUpperCase()}
                                </span>
                            </div>
                        )) : (
                            <p className="text-sm text-gray-500 text-center py-4">No active shoots</p>
                        )}
                    </div>
                    {shotClockRule && (
                        <div className="mt-4 border-t border-white/10 pt-4">
                            <p className="text-xs text-gray-500">
                                <span className="font-bold text-gray-400">Rule:</span> {shotClockRule.content}
                            </p>
                        </div>
                    )}
                </div>

                {/* WIDGET: KPI TRACKER */}
                <div className="rounded-2xl border border-white/10 bg-[#1A1A1D] p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-bold text-white flex items-center">
                            <TrendingUp className="mr-2 h-5 w-5 text-brand-gold" />
                            Efficiency Metrics
                        </h3>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-4xl font-bold text-white">1.8</span>
                        <span className="mb-1 text-sm text-gray-400">min/photo</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div className="h-full w-[70%] bg-brand-gold"></div>
                    </div>
                    {editKpi && (
                        <p className="mt-2 text-xs text-green-400">
                            Currently beating target ({editKpi.content.split(';')[0]})
                        </p>
                    )}
                </div>

                {/* WIDGET: QUICK ACTIONS */}
                <div className="rounded-2xl border border-white/10 bg-[#1A1A1D] p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-bold text-white flex items-center">
                            <Zap className="mr-2 h-5 w-5 text-blue-400" />
                            Quick Actions
                        </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Link href="/admin/leads" className="flex flex-col items-center justify-center rounded-xl bg-white/5 p-4 hover:bg-white/10 transition-colors">
                            <Users className="mb-2 h-6 w-6 text-gray-400" />
                            <span className="text-xs font-semibold text-gray-300">Leads</span>
                        </Link>
                        <Link href="/admin/content" className="flex flex-col items-center justify-center rounded-xl bg-white/5 p-4 hover:bg-white/10 transition-colors">
                            <FileText className="mb-2 h-6 w-6 text-gray-400" />
                            <span className="text-xs font-semibold text-gray-300">Content</span>
                        </Link>
                        <Link href="/admin/knowledge" className="flex flex-col items-center justify-center rounded-xl bg-white/5 p-4 hover:bg-white/10 transition-colors">
                            <AlertTriangle className="mb-2 h-6 w-6 text-brand-pink" />
                            <span className="text-xs font-semibold text-gray-300">Knowledge</span>
                        </Link>
                        <Link href="/admin/migrate" className="flex flex-col items-center justify-center rounded-xl bg-white/5 p-4 hover:bg-white/10 transition-colors">
                            <Zap className="mb-2 h-6 w-6 text-purple-400" />
                            <span className="text-xs font-semibold text-gray-300">Migrate</span>
                        </Link>
                    </div>
                </div>

                {/* SECTION: RECENT SOPs */}
                <div className="col-span-full mt-6 lg:col-span-2">
                    <h3 className="mb-4 text-lg font-bold text-white">Active Procedures</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {recentSops.length > 0 ? recentSops.map(sop => (
                            <div key={sop.id} className="group cursor-pointer rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-white/20 hover:bg-white/5">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-brand-gold">{sop.sub_topic.replace(/_/g, ' ')}</span>
                                    <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-white" />
                                </div>
                                <p className="mt-1 text-sm text-gray-400">{sop.context}</p>
                            </div>
                        )) : (
                            <p className="text-sm text-gray-500 col-span-2 text-center py-8">
                                No procedures found. Run migration to import knowledge base.
                            </p>
                        )}
                    </div>
                </div>
            </div>
            </main>
        </AuthGuard>
    );
}
