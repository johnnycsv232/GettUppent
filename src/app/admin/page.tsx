'use client';

import { useState, useEffect } from 'react';
import { KnowledgeNode } from '@/types/knowledge';
import { KnowledgeTable } from './components/KnowledgeTable';
import { KnowledgeForm } from './components/KnowledgeForm';
import { Plus, Database, RefreshCw } from 'lucide-react';

export default function AdminPage() {
    const [data, setData] = useState<KnowledgeNode[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentNode, setCurrentNode] = useState<KnowledgeNode | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/knowledge');
            const json = await res.json();
            setData(json);
        } catch (error) {
            console.error('Failed to fetch data', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = () => {
        setCurrentNode(null);
        setIsEditing(true);
    };

    const handleEdit = (node: KnowledgeNode) => {
        setCurrentNode(node);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this node?')) return;

        try {
            const res = await fetch(`/api/admin/knowledge/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchData();
            } else {
                alert('Failed to delete node');
            }
        } catch (error) {
            console.error('Error deleting node', error);
        }
    };

    const handleSave = async (formData: Partial<KnowledgeNode>) => {
        try {
            let res;
            if (currentNode) {
                // Update
                res = await fetch(`/api/admin/knowledge/${currentNode.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            } else {
                // Create
                res = await fetch('/api/admin/knowledge', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            }

            if (res.ok) {
                setIsEditing(false);
                fetchData();
            } else {
                alert('Failed to save data');
            }
        } catch (error) {
            console.error('Error saving data', error);
        }
    };

    return (
        <main className="min-h-screen bg-[#080808] text-white p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <header className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="font-heading text-4xl font-bold text-white mb-2">
                            GettUpp <span className="text-brand-gold">CMS</span>
                        </h1>
                        <p className="text-gray-500">Manage your business intelligence.</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={fetchData}
                            className="p-3 rounded-lg bg-[#1A1A1D] border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all"
                        >
                            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={handleCreate}
                            className="px-6 py-3 rounded-lg bg-brand-gold text-black font-bold hover:bg-white transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(217,174,67,0.2)] hover:shadow-[0_0_30px_rgba(217,174,67,0.4)]"
                        >
                            <Plus className="h-5 w-5" />
                            New Node
                        </button>
                    </div>
                </header>

                {/* Stats Strip */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-[#1A1A1D] border border-white/10 p-6 rounded-xl">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-2 bg-brand-pink/10 rounded-lg text-brand-pink">
                                <Database className="h-6 w-6" />
                            </div>
                            <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Total Nodes</span>
                        </div>
                        <div className="text-4xl font-bold text-white">{data.length}</div>
                    </div>
                    {/* Add more stats here later */}
                </div>

                {/* Main Content */}
                {isLoading && data.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">Loading knowledge base...</div>
                ) : (
                    <KnowledgeTable
                        data={data}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}

            </div>

            {/* Modal */}
            {isEditing && (
                <KnowledgeForm
                    initialData={currentNode}
                    onSave={handleSave}
                    onCancel={() => setIsEditing(false)}
                />
            )}
        </main>
    );
}
