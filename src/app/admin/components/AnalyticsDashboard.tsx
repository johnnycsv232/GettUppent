'use client';

import { KnowledgeNode } from '@/types/knowledge';
import { TrendingUp, Database, Clock, Tag, CheckCircle } from 'lucide-react';
import { useMemo } from 'react';

interface AnalyticsDashboardProps {
    data: KnowledgeNode[];
}

export function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
    const stats = useMemo(() => {
        const domainCounts = data.reduce((acc, node) => {
            acc[node.domain_area] = (acc[node.domain_area] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const typeCounts = data.reduce((acc, node) => {
            acc[node.knowledge_type] = (acc[node.knowledge_type] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const statusCounts = data.reduce((acc, node) => {
            acc[node.status] = (acc[node.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const recentNodes = [...data]
            .sort((a, b) => new Date(b.timestamp_added).getTime() - new Date(a.timestamp_added).getTime())
            .slice(0, 5);

        const topDomains = Object.entries(domainCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5);

        const topTypes = Object.entries(typeCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5);

        return {
            total: data.length,
            active: statusCounts.active || 0,
            draft: statusCounts.draft || 0,
            archived: statusCounts.archived || 0,
            topDomains,
            topTypes,
            recentNodes,
        };
    }, [data]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Nodes */}
            <div className="glass-card p-6 rounded-xl group hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-brand-gold/10 rounded-lg text-brand-gold">
                        <Database className="h-6 w-6" />
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stats.total}</div>
                <div className="text-sm text-gray-400 font-medium">Total Nodes</div>
            </div>

            {/* Active Nodes */}
            <div className="glass-card p-6 rounded-xl group hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-500/10 rounded-lg text-green-400">
                        <CheckCircle className="h-6 w-6" />
                    </div>
                    <div className="text-xs text-gray-500">
                        {stats.total > 0 ? ((stats.active / stats.total) * 100).toFixed(0) : 0}%
                    </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stats.active}</div>
                <div className="text-sm text-gray-400 font-medium">Active</div>
            </div>

            {/* Draft Nodes */}
            <div className="glass-card p-6 rounded-xl group hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-400">
                        <Clock className="h-6 w-6" />
                    </div>
                    <div className="text-xs text-gray-500">
                        {stats.total > 0 ? ((stats.draft / stats.total) * 100).toFixed(0) : 0}%
                    </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stats.draft}</div>
                <div className="text-sm text-gray-400 font-medium">Drafts</div>
            </div>

            {/* Top Domain */}
            <div className="glass-card p-6 rounded-xl group hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-brand-pink/10 rounded-lg text-brand-pink">
                        <Tag className="h-6 w-6" />
                    </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1 capitalize">
                    {stats.topDomains[0]?.[0] || 'N/A'}
                </div>
                <div className="text-sm text-gray-400 font-medium">
                    Top Domain ({stats.topDomains[0]?.[1] || 0} nodes)
                </div>
            </div>

            {/* Domain Distribution */}
            <div className="glass-card p-6 rounded-xl md:col-span-2">
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Domain Distribution</h3>
                <div className="space-y-3">
                    {stats.topDomains.map(([domain, count]) => {
                        const percentage = (count / stats.total) * 100;
                        return (
                            <div key={domain}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-white capitalize">{domain}</span>
                                    <span className="text-xs text-gray-500">{count} ({percentage.toFixed(0)}%)</span>
                                </div>
                                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-brand-gold to-brand-pink transition-all duration-500"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Type Distribution */}
            <div className="glass-card p-6 rounded-xl md:col-span-2">
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Knowledge Types</h3>
                <div className="space-y-3">
                    {stats.topTypes.map(([type, count]) => {
                        const percentage = (count / stats.total) * 100;
                        return (
                            <div key={type}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-white capitalize">{type.replace(/_/g, ' ')}</span>
                                    <span className="text-xs text-gray-500">{count} ({percentage.toFixed(0)}%)</span>
                                </div>
                                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}


