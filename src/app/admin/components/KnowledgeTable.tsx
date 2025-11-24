'use client';

import { useState } from 'react';
import { KnowledgeNode } from '@/types/knowledge';
import { Edit, Trash2, Search, Filter } from 'lucide-react';

interface KnowledgeTableProps {
    data: KnowledgeNode[];
    onEdit: (node: KnowledgeNode) => void;
    onDelete: (id: string) => void;
}

export function KnowledgeTable({ data, onEdit, onDelete }: KnowledgeTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDomain, setFilterDomain] = useState<string>('all');

    const filteredData = data.filter(node => {
        const matchesSearch =
            node.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            node.sub_topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
            node.tags.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDomain = filterDomain === 'all' || node.domain_area === filterDomain;

        return matchesSearch && matchesDomain;
    });

    const domains = Array.from(new Set(data.map(n => n.domain_area)));

    return (
        <div className="space-y-4">
            {/* Controls */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search content..."
                        className="w-full bg-[#1A1A1D] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-gold/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <select
                        className="bg-[#1A1A1D] border border-white/10 rounded-lg pl-10 pr-8 py-2 text-sm text-white focus:outline-none focus:border-brand-gold/50 appearance-none"
                        value={filterDomain}
                        onChange={(e) => setFilterDomain(e.target.value)}
                    >
                        <option value="all">All Domains</option>
                        {domains.map(d => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#1A1A1D] border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-gray-400 font-medium">
                        <tr>
                            <th className="p-4">Topic / Content</th>
                            <th className="p-4">Domain</th>
                            <th className="p-4">Type</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredData.map(node => (
                            <tr key={node.id} className="hover:bg-white/5 transition-colors group">
                                <td className="p-4 max-w-md">
                                    <div className="font-bold text-white mb-1">{node.sub_topic}</div>
                                    <div className="text-gray-400 truncate">{node.content}</div>
                                </td>
                                <td className="p-4">
                                    <span className="px-2 py-1 rounded bg-white/5 text-xs text-gray-300 border border-white/10">
                                        {node.domain_area}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-400">{node.knowledge_type}</td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onEdit(node)}
                                            className="p-2 hover:bg-brand-gold/20 hover:text-brand-gold rounded-lg transition-colors"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(node.id)}
                                            className="p-2 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="text-xs text-gray-500 text-center">
                Showing {filteredData.length} of {data.length} items
            </div>
        </div>
    );
}
