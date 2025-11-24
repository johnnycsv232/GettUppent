'use client';

import { useState, useEffect } from 'react';
import { KnowledgeNode } from '@/types/knowledge';
import { KnowledgeTable } from './components/KnowledgeTable';
import { KnowledgeForm } from './components/KnowledgeForm';
import { BulkActions } from './components/BulkActions';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { Plus, RefreshCw, Download, Upload, BarChart3 } from 'lucide-react';

export default function AdminPage() {
    const [data, setData] = useState<KnowledgeNode[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentNode, setCurrentNode] = useState<KnowledgeNode | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [showAnalytics, setShowAnalytics] = useState(true);

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

    // Bulk operations
    const handleBulkDelete = async () => {
        if (!confirm(`Are you sure you want to delete ${selectedIds.length} nodes?`)) return;

        try {
            await Promise.all(
                selectedIds.map(id =>
                    fetch(`/api/admin/knowledge/${id}`, { method: 'DELETE' })
                )
            );
            setSelectedIds([]);
            fetchData();
        } catch (error) {
            console.error('Error bulk deleting', error);
            alert('Failed to delete some nodes');
        }
    };

    const handleBulkArchive = async () => {
        try {
            await Promise.all(
                selectedIds.map(id => {
                    const node = data.find(n => n.id === id);
                    if (!node) return Promise.resolve();
                    return fetch(`/api/admin/knowledge/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ...node, status: 'archived' }),
                    });
                })
            );
            setSelectedIds([]);
            fetchData();
        } catch (error) {
            console.error('Error bulk archiving', error);
            alert('Failed to archive some nodes');
        }
    };

    const handleBulkActivate = async () => {
        try {
            await Promise.all(
                selectedIds.map(id => {
                    const node = data.find(n => n.id === id);
                    if (!node) return Promise.resolve();
                    return fetch(`/api/admin/knowledge/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ...node, status: 'active' }),
                    });
                })
            );
            setSelectedIds([]);
            fetchData();
        } catch (error) {
            console.error('Error bulk activating', error);
            alert('Failed to activate some nodes');
        }
    };

    const handleExportSelected = () => {
        const selectedData = data.filter(node => selectedIds.includes(node.id));
        const dataStr = JSON.stringify(selectedData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `knowledge-export-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleExportAll = () => {
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `knowledge-full-export-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const importedData = JSON.parse(e.target?.result as string);
                if (!Array.isArray(importedData)) {
                    alert('Invalid file format. Expected an array of knowledge nodes.');
                    return;
                }

                // Import each node
                for (const node of importedData) {
                    await fetch('/api/admin/knowledge', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(node),
                    });
                }

                alert(`Successfully imported ${importedData.length} nodes!`);
                fetchData();
            } catch (error) {
                console.error('Error importing data', error);
                alert('Failed to import data. Please check the file format.');
            }
        };
        reader.readAsText(file);
        // Reset input
        event.target.value = '';
    };

    return (
        <main className="min-h-screen bg-[#080808] text-white p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <header className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="font-heading text-5xl font-bold text-white mb-2 bg-gradient-to-r from-brand-gold via-white to-brand-pink bg-clip-text text-transparent">
                            GettUpp CMS
                        </h1>
                        <p className="text-gray-500">Manage your business intelligence with power and precision.</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowAnalytics(!showAnalytics)}
                            className={`p-3 rounded-lg border transition-all ${showAnalytics
                                    ? 'bg-brand-gold/20 border-brand-gold text-brand-gold'
                                    : 'bg-[#1A1A1D] border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                                }`}
                            title="Toggle Analytics"
                        >
                            <BarChart3 className="h-5 w-5" />
                        </button>
                        <button
                            onClick={fetchData}
                            className="p-3 rounded-lg bg-[#1A1A1D] border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all"
                            title="Refresh"
                        >
                            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={handleExportAll}
                            className="px-4 py-3 rounded-lg bg-[#1A1A1D] border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all flex items-center gap-2"
                        >
                            <Download className="h-5 w-5" />
                            <span className="text-sm font-bold">Export</span>
                        </button>
                        <label className="px-4 py-3 rounded-lg bg-[#1A1A1D] border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all flex items-center gap-2 cursor-pointer">
                            <Upload className="h-5 w-5" />
                            <span className="text-sm font-bold">Import</span>
                            <input
                                type="file"
                                accept=".json"
                                onChange={handleImport}
                                className="hidden"
                            />
                        </label>
                        <button
                            onClick={handleCreate}
                            className="px-6 py-3 rounded-lg bg-gradient-to-r from-brand-gold to-yellow-500 text-black font-bold hover:shadow-[0_0_30px_rgba(217,174,67,0.4)] transition-all flex items-center gap-2"
                        >
                            <Plus className="h-5 w-5" />
                            New Node
                        </button>
                    </div>
                </header>

                {/* Analytics Dashboard */}
                {showAnalytics && data.length > 0 && (
                    <div className="mb-8 animate-fade-in">
                        <AnalyticsDashboard data={data} />
                    </div>
                )}

                {/* Main Content */}
                {isLoading && data.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-brand-gold border-t-transparent mb-4"></div>
                        <div className="text-gray-500">Loading knowledge base...</div>
                    </div>
                ) : data.length === 0 ? (
                    <div className="text-center py-20 glass-card rounded-2xl">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-2xl font-bold text-white mb-2">No Knowledge Nodes Yet</h3>
                        <p className="text-gray-500 mb-6">Start building your knowledge base by creating your first node.</p>
                        <button
                            onClick={handleCreate}
                            className="px-6 py-3 rounded-lg bg-gradient-to-r from-brand-gold to-yellow-500 text-black font-bold hover:shadow-[0_0_30px_rgba(217,174,67,0.4)] transition-all inline-flex items-center gap-2"
                        >
                            <Plus className="h-5 w-5" />
                            Create First Node
                        </button>
                    </div>
                ) : (
                    <KnowledgeTable
                        data={data}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        selectedIds={selectedIds}
                        onSelectionChange={setSelectedIds}
                    />
                )}

            </div>

            {/* Bulk Actions Bar */}
            <BulkActions
                selectedCount={selectedIds.length}
                onDelete={handleBulkDelete}
                onArchive={handleBulkArchive}
                onActivate={handleBulkActivate}
                onExport={handleExportSelected}
                onClear={() => setSelectedIds([])}
            />

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

