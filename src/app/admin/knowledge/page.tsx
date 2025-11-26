'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { Search, Filter, Edit2, Trash2, Eye, X, Save, Loader2, BookOpen, RefreshCw } from 'lucide-react';
import { KnowledgeNode, DomainArea } from '@/types/knowledge';

const DOMAIN_COLORS: Record<DomainArea, string> = {
    analytics: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    automation: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    events: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    finance: 'bg-green-500/10 text-green-400 border-green-500/20',
    legal: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    marketing: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    operations: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    offers: 'bg-brand-gold/10 text-brand-gold border-brand-gold/20',
    product: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    sales: 'bg-red-500/10 text-red-400 border-red-500/20',
    brand: 'bg-brand-pink/10 text-brand-pink border-brand-pink/20',
    strategy: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
};

const DOMAINS: DomainArea[] = [
    'analytics', 'automation', 'events', 'finance', 'legal',
    'marketing', 'operations', 'offers', 'product', 'sales', 'brand', 'strategy'
];

export default function KnowledgePage() {
    const [nodes, setNodes] = useState<KnowledgeNode[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [domainFilter, setDomainFilter] = useState<DomainArea | 'all'>('all');
    const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [editedNode, setEditedNode] = useState<KnowledgeNode | null>(null);
    const [saving, setSaving] = useState(false);

    // Fetch nodes from Firestore
    const fetchNodes = async () => {
        setLoading(true);
        try {
            const snapshot = await getDocs(collection(db, 'knowledge_base'));
            const data = snapshot.docs.map(docSnap => ({
                id: docSnap.id,
                ...docSnap.data()
            })) as KnowledgeNode[];
            setNodes(data);
        } catch (error) {
            console.error('Error fetching knowledge base:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNodes();
    }, []);

    // Filter nodes
    const filteredNodes = nodes.filter(node => {
        const matchesSearch = searchQuery === '' || 
            node.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            node.sub_topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
            node.tags.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesDomain = domainFilter === 'all' || node.domain_area === domainFilter;
        
        return matchesSearch && matchesDomain;
    });

    // Group by domain for stats
    const domainCounts = nodes.reduce((acc, node) => {
        acc[node.domain_area] = (acc[node.domain_area] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Handle save
    const handleSave = async () => {
        if (!editedNode) return;
        
        setSaving(true);
        try {
            const docRef = doc(db, 'knowledge_base', editedNode.id);
            const { id, ...updateData } = editedNode;
            await updateDoc(docRef, { ...updateData, updated_at: new Date().toISOString() });
            
            // Update local state
            setNodes(nodes.map(n => n.id === editedNode.id ? editedNode : n));
            setSelectedNode(editedNode);
            setEditMode(false);
        } catch (error) {
            console.error('Error saving node:', error);
            alert('Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    // Handle delete
    const handleDelete = async (nodeId: string) => {
        if (!confirm('Are you sure you want to delete this knowledge node?')) return;
        
        try {
            await deleteDoc(doc(db, 'knowledge_base', nodeId));
            setNodes(nodes.filter(n => n.id !== nodeId));
            setSelectedNode(null);
        } catch (error) {
            console.error('Error deleting node:', error);
            alert('Failed to delete node');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2">Knowledge Base</h1>
                    <p className="text-gray-400">{nodes.length} nodes • The Brain of GettUpp OS</p>
                </div>
                <button
                    onClick={fetchNodes}
                    disabled={loading}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
                >
                    <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {/* Domain Stats */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setDomainFilter('all')}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border transition-colors ${
                        domainFilter === 'all' 
                            ? 'bg-white text-black border-white' 
                            : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30'
                    }`}
                >
                    All ({nodes.length})
                </button>
                {DOMAINS.map(domain => (
                    <button
                        key={domain}
                        onClick={() => setDomainFilter(domain)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border transition-colors ${
                            domainFilter === domain
                                ? DOMAIN_COLORS[domain]
                                : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30'
                        }`}
                    >
                        {domain} ({domainCounts[domain] || 0})
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search by content, topic, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-brand-gold focus:outline-none"
                />
            </div>

            {/* Results Grid */}
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
                </div>
            ) : filteredNodes.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No knowledge nodes found</p>
                    <p className="text-sm">Try adjusting your search or filter</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredNodes.map(node => (
                        <div
                            key={node.id}
                            onClick={() => {
                                setSelectedNode(node);
                                setEditMode(false);
                            }}
                            className="bg-white/5 border border-white/10 rounded-xl p-4 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all group"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase border ${DOMAIN_COLORS[node.domain_area]}`}>
                                    {node.domain_area}
                                </span>
                                <span className="text-xs text-gray-600 font-mono">{node.knowledge_type}</span>
                            </div>
                            
                            <h3 className="font-bold text-white mb-2 line-clamp-1">{node.sub_topic}</h3>
                            <p className="text-sm text-gray-400 line-clamp-2 mb-3">{node.content}</p>
                            
                            <div className="flex flex-wrap gap-1">
                                {node.tags.split(',').slice(0, 3).map((tag, i) => (
                                    <span key={i} className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-500">
                                        {tag.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Detail Modal */}
            {selectedNode && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedNode(null)}>
                    <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase border ${DOMAIN_COLORS[editMode ? editedNode?.domain_area || selectedNode.domain_area : selectedNode.domain_area]}`}>
                                    {editMode ? editedNode?.domain_area : selectedNode.domain_area}
                                </span>
                                <span className="text-sm text-gray-500">{editMode ? editedNode?.knowledge_type : selectedNode.knowledge_type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {editMode ? (
                                    <>
                                        <button
                                            onClick={() => setEditMode(false)}
                                            className="p-2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            disabled={saving}
                                            className="flex items-center gap-2 px-4 py-2 bg-brand-gold text-black font-bold rounded-lg"
                                        >
                                            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                setEditedNode({ ...selectedNode });
                                                setEditMode(true);
                                            }}
                                            className="p-2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            <Edit2 className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(selectedNode.id)}
                                            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => setSelectedNode(null)}
                                            className="p-2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)] space-y-4">
                            {editMode && editedNode ? (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Sub Topic</label>
                                        <input
                                            type="text"
                                            value={editedNode.sub_topic}
                                            onChange={(e) => setEditedNode({ ...editedNode, sub_topic: e.target.value })}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Content</label>
                                        <textarea
                                            value={editedNode.content}
                                            onChange={(e) => setEditedNode({ ...editedNode, content: e.target.value })}
                                            rows={5}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none resize-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Context</label>
                                        <textarea
                                            value={editedNode.context}
                                            onChange={(e) => setEditedNode({ ...editedNode, context: e.target.value })}
                                            rows={3}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none resize-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Tags (comma-separated)</label>
                                        <input
                                            type="text"
                                            value={editedNode.tags}
                                            onChange={(e) => setEditedNode({ ...editedNode, tags: e.target.value })}
                                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-4">{selectedNode.sub_topic}</h2>
                                        <p className="text-gray-300 whitespace-pre-wrap">{selectedNode.content}</p>
                                    </div>
                                    
                                    {selectedNode.context && (
                                        <div className="bg-white/5 rounded-xl p-4">
                                            <h4 className="text-sm font-bold text-gray-400 mb-2">Context</h4>
                                            <p className="text-gray-300">{selectedNode.context}</p>
                                        </div>
                                    )}
                                    
                                    <div className="flex flex-wrap gap-2">
                                        {selectedNode.tags.split(',').map((tag, i) => (
                                            <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-400">
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t border-white/10">
                                        <div>
                                            <span className="text-gray-500">Owner:</span>
                                            <span className="text-white ml-2">{selectedNode.owner}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Status:</span>
                                            <span className="text-white ml-2">{selectedNode.status}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Source:</span>
                                            <span className="text-white ml-2">{selectedNode.source_reference}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Version:</span>
                                            <span className="text-white ml-2">{selectedNode.version}</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
