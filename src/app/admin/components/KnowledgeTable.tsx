'use client';

import { useState } from 'react';
import { KnowledgeNode } from '@/types/knowledge';
import { Edit, Trash2, Search, Filter, Eye, CheckSquare, Square, SortAsc, SortDesc } from 'lucide-react';

interface KnowledgeTableProps {
    data: KnowledgeNode[];
    onEdit: (node: KnowledgeNode) => void;
    onDelete: (id: string) => void;
    selectedIds?: string[];
    onSelectionChange?: (ids: string[]) => void;
}

type SortField = 'sub_topic' | 'domain_area' | 'knowledge_type' | 'timestamp_added' | 'status';
type SortDirection = 'asc' | 'desc';

export function KnowledgeTable({ data, onEdit, onDelete, selectedIds = [], onSelectionChange }: KnowledgeTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDomain, setFilterDomain] = useState<string>('all');
    const [filterType, setFilterType] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [sortField, setSortField] = useState<SortField>('timestamp_added');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [previewNode, setPreviewNode] = useState<KnowledgeNode | null>(null);

    const filteredData = data.filter(node => {
        const matchesSearch =
            node.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            node.sub_topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
            node.tags.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDomain = filterDomain === 'all' || node.domain_area === filterDomain;
        const matchesType = filterType === 'all' || node.knowledge_type === filterType;
        const matchesStatus = filterStatus === 'all' || node.status === filterStatus;

        return matchesSearch && matchesDomain && matchesType && matchesStatus;
    });

    // Sort data
    const sortedData = [...filteredData].sort((a, b) => {
        let aVal: string | number = a[sortField] as string;
        let bVal: string | number = b[sortField] as string;

        if (sortField === 'timestamp_added') {
            aVal = new Date(aVal as string).getTime();
            bVal = new Date(bVal as string).getTime();
        }

        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const domains = Array.from(new Set(data.map(n => n.domain_area)));
    const types = Array.from(new Set(data.map(n => n.knowledge_type)));

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === sortedData.length) {
            onSelectionChange?.([]);
        } else {
            onSelectionChange?.(sortedData.map(n => n.id));
        }
    };

    const toggleSelect = (id: string) => {
        if (selectedIds.includes(id)) {
            onSelectionChange?.(selectedIds.filter(i => i !== id));
        } else {
            onSelectionChange?.([...selectedIds, id]);
        }
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            active: 'bg-green-500/20 text-green-400 border-green-500/30',
            draft: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            archived: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
        };
        const icons = {
            active: '✓',
            draft: '📝',
            archived: '📦',
        };
        return (
            <span className={`px-2 py-1 rounded text-xs border ${styles[status as keyof typeof styles]}`}>
                {icons[status as keyof typeof icons]} {status}
            </span>
        );
    };

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) return null;
        return sortDirection === 'asc' ?
            <SortAsc className="h-3 w-3 inline ml-1" /> :
            <SortDesc className="h-3 w-3 inline ml-1" />;
    };

    return (
        <div className="space-y-4">
            {/* Enhanced Controls */}
            <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search content, topics, tags..."
                        className="w-full bg-[#1A1A1D] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/20 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <select
                        className="bg-[#1A1A1D] border border-white/10 rounded-lg pl-10 pr-8 py-2.5 text-sm text-white focus:outline-none focus:border-brand-gold/50 appearance-none min-w-[140px]"
                        value={filterDomain}
                        onChange={(e) => setFilterDomain(e.target.value)}
                    >
                        <option value="all">All Domains</option>
                        {domains.map(d => (
                            <option key={d} value={d} className="capitalize">{d}</option>
                        ))}
                    </select>
                </div>
                <div className="relative">
                    <select
                        className="bg-[#1A1A1D] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-gold/50 appearance-none min-w-[140px]"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="all">All Types</option>
                        {types.map(t => (
                            <option key={t} value={t} className="capitalize">{t.replace(/_/g, ' ')}</option>
                        ))}
                    </select>
                </div>
                <div className="relative">
                    <select
                        className="bg-[#1A1A1D] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-gold/50 appearance-none min-w-[120px]"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#1A1A1D] border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-gray-400 font-medium">
                            <tr>
                                {onSelectionChange && (
                                    <th className="p-4 w-12">
                                        <button onClick={toggleSelectAll} className="text-gray-400 hover:text-white">
                                            {selectedIds.length === sortedData.length && sortedData.length > 0 ?
                                                <CheckSquare className="h-4 w-4" /> :
                                                <Square className="h-4 w-4" />
                                            }
                                        </button>
                                    </th>
                                )}
                                <th
                                    className="p-4 cursor-pointer hover:text-white transition-colors"
                                    onClick={() => handleSort('sub_topic')}
                                >
                                    Topic / Content <SortIcon field="sub_topic" />
                                </th>
                                <th
                                    className="p-4 cursor-pointer hover:text-white transition-colors"
                                    onClick={() => handleSort('domain_area')}
                                >
                                    Domain <SortIcon field="domain_area" />
                                </th>
                                <th
                                    className="p-4 cursor-pointer hover:text-white transition-colors"
                                    onClick={() => handleSort('knowledge_type')}
                                >
                                    Type <SortIcon field="knowledge_type" />
                                </th>
                                <th
                                    className="p-4 cursor-pointer hover:text-white transition-colors"
                                    onClick={() => handleSort('status')}
                                >
                                    Status <SortIcon field="status" />
                                </th>
                                <th
                                    className="p-4 cursor-pointer hover:text-white transition-colors"
                                    onClick={() => handleSort('timestamp_added')}
                                >
                                    Date <SortIcon field="timestamp_added" />
                                </th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {sortedData.map(node => (
                                <tr
                                    key={node.id}
                                    className={`hover:bg-white/5 transition-all group ${selectedIds.includes(node.id) ? 'bg-brand-gold/5' : ''}`}
                                >
                                    {onSelectionChange && (
                                        <td className="p-4">
                                            <button
                                                onClick={() => toggleSelect(node.id)}
                                                className="text-gray-400 hover:text-white"
                                            >
                                                {selectedIds.includes(node.id) ?
                                                    <CheckSquare className="h-4 w-4 text-brand-gold" /> :
                                                    <Square className="h-4 w-4" />
                                                }
                                            </button>
                                        </td>
                                    )}
                                    <td className="p-4 max-w-md">
                                        <div className="font-bold text-white mb-1">{node.sub_topic}</div>
                                        <div className="text-gray-400 truncate text-xs">{node.content}</div>
                                        {node.tags && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {node.tags.split(',').slice(0, 3).map((tag: string, i: number) => (
                                                    <span key={i} className="px-1.5 py-0.5 bg-white/5 rounded text-xs text-gray-500">
                                                        {tag.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded bg-white/5 text-xs text-gray-300 border border-white/10 capitalize">
                                            {node.domain_area}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-400 text-xs capitalize">
                                        {node.knowledge_type.replace(/_/g, ' ')}
                                    </td>
                                    <td className="p-4">
                                        {getStatusBadge(node.status)}
                                    </td>
                                    <td className="p-4 text-gray-500 text-xs">
                                        {new Date(node.timestamp_added).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => setPreviewNode(node)}
                                                className="p-2 hover:bg-blue-500/20 hover:text-blue-400 rounded-lg transition-colors"
                                                title="Preview"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => onEdit(node)}
                                                className="p-2 hover:bg-brand-gold/20 hover:text-brand-gold rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(node.id)}
                                                className="p-2 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-colors"
                                                title="Delete"
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
            </div>

            {/* Results Info */}
            <div className="flex items-center justify-between text-xs text-gray-500">
                <div>
                    Showing <span className="text-white font-bold">{sortedData.length}</span> of <span className="text-white font-bold">{data.length}</span> items
                    {selectedIds.length > 0 && (
                        <span className="ml-2">
                            • <span className="text-brand-gold font-bold">{selectedIds.length}</span> selected
                        </span>
                    )}
                </div>
                {(searchTerm || filterDomain !== 'all' || filterType !== 'all' || filterStatus !== 'all') && (
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setFilterDomain('all');
                            setFilterType('all');
                            setFilterStatus('all');
                        }}
                        className="text-brand-gold hover:text-white transition-colors"
                    >
                        Clear filters
                    </button>
                )}
            </div>

            {/* Preview Modal */}
            {previewNode && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setPreviewNode(null)}
                >
                    <div
                        className="w-full max-w-2xl bg-[#1A1A1D] border border-white/10 rounded-2xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">{previewNode.sub_topic}</h3>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400 capitalize">
                                        {previewNode.domain_area}
                                    </span>
                                    <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400 capitalize">
                                        {previewNode.knowledge_type.replace(/_/g, ' ')}
                                    </span>
                                    {getStatusBadge(previewNode.status)}
                                </div>
                            </div>
                            <button
                                onClick={() => setPreviewNode(null)}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="prose prose-invert max-w-none">
                            <div className="text-gray-300 whitespace-pre-wrap mb-4">{previewNode.content}</div>
                            {previewNode.context && (
                                <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                                    <div className="text-xs font-bold text-gray-500 uppercase mb-2">Context</div>
                                    <div className="text-gray-400 text-sm whitespace-pre-wrap">{previewNode.context}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
