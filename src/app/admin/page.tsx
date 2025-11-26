'use client';

import { useState, useEffect } from 'react';
import { KnowledgeNode } from '@/types/knowledge';
import { KnowledgeTable } from './components/KnowledgeTable';
import { KnowledgeForm } from './components/KnowledgeForm';
import { BulkActions } from './components/BulkActions';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { Plus, RefreshCw, Download, Upload, BarChart3 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminPage() {
    const { user, loading: authLoading } = useAuth();
    const [data, setData] = useState<KnowledgeNode[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentNode, setCurrentNode] = useState<KnowledgeNode | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [showAnalytics, setShowAnalytics] = useState(true);

    const fetchData = async () => {
        console.log('[fetchData] Starting, user:', user, 'authLoading:', authLoading);
        setIsLoading(true);
        try {
            if (!user) {
                console.error('[fetchData] No authenticated user');
                setData([]);
                setIsLoading(false);
                return;
            }
            console.log('[fetchData] Getting ID token...');
            const token = await user.getIdToken();
            console.log('[fetchData] Got token, length:', token?.length);
            const res = await fetch('/api/admin/knowledge', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('[fetchData] Response status:', res.status);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const json = await res.json();
            if (Array.isArray(json)) {
                setData(json);
            } else {
                console.error('Data is not an array:', json);
                setData([]);
            }
        } catch (error) {
            console.error('Failed to fetch data', error);
            setData([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading && user) {
            fetchData();
        }
    }, [authLoading, user]);

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

            if (!user) return;
            const token = await user.getIdToken();
            const res = await fetch(`/api/admin/knowledge/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
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

            if (!user) return;
            const token = await user.getIdToken();

            let res;
            if (currentNode) {
                // Update
                res = await fetch(`/api/admin/knowledge/${currentNode.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(formData),
                });
            } else {
                // Create
                res = await fetch('/api/admin/knowledge', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
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

            if (!user) return;
            const token = await user.getIdToken();

            await Promise.all(
                selectedIds.map(id =>
                    fetch(`/api/admin/knowledge/${id}`, {
                        method: 'DELETE',
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
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

            if (!user) return;
            const token = await user.getIdToken();

            await Promise.all(
                selectedIds.map(id => {
                    const node = data.find(n => n.id === id);
                    if (!node) return Promise.resolve();
                    return fetch(`/api/admin/knowledge/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
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

            if (!user) return;
            const token = await user.getIdToken();

            await Promise.all(
                selectedIds.map(id => {
                    const node = data.find(n => n.id === id);
                    if (!node) return Promise.resolve();
                    return fetch(`/api/admin/knowledge/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
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

                if (!user) {
                    alert('Not authenticated');
                    return;
                }
                const token = await user.getIdToken();

                const importedData = JSON.parse(e.target?.result as string);
                if (!Array.isArray(importedData)) {
                    alert('Invalid file format. Expected an array of knowledge nodes.');
                    return;
                }

                // Import each node
                for (const node of importedData) {
                    await fetch('/api/admin/knowledge', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
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
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Knowledge Base</h1>
                    <p className="text-gray-400 mt-1">{data.length} nodes • The Brain of GettUpp OS</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowAnalytics(!showAnalytics)}
                        className={`p-2 rounded-lg transition-colors ${showAnalytics ? 'bg-[#D4AF37] text-black' : 'bg-[#1a1a1a] text-gray-400 hover:text-white'}`}
                        title="Toggle Analytics"
                    >
                        <BarChart3 size={20} />
                    </button>
                    <button
                        onClick={fetchData}
                        className="p-2 bg-[#1a1a1a] rounded-lg hover:bg-[#2a2a2a] transition-colors"
                        title="Refresh"
                    >
                        <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
                    </button>
                    <button
                        onClick={handleExportAll}
                        className="p-2 bg-[#1a1a1a] rounded-lg hover:bg-[#2a2a2a] transition-colors"
                        title="Export All"
                    >
                        <Download size={20} />
                    </button>
                    <label className="p-2 bg-[#1a1a1a] rounded-lg hover:bg-[#2a2a2a] transition-colors cursor-pointer" title="Import">
                        <Upload size={20} />
                        <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                    </label>
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#b8962f] transition-colors"
                    >
                        <Plus size={20} />
                        Add Node
                    </button>
                </div>
            </div>

            {/* Analytics Dashboard */}
            {showAnalytics && <AnalyticsDashboard data={data} />}

            {/* Bulk Actions */}
            {selectedIds.length > 0 && (
                <BulkActions
                    selectedCount={selectedIds.length}
                    onDelete={handleBulkDelete}
                    onArchive={handleBulkArchive}
                    onActivate={handleBulkActivate}
                    onExport={handleExportSelected}
                    onClear={() => setSelectedIds([])}
                />
            )}

            {/* Knowledge Table */}
            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <RefreshCw size={32} className="animate-spin text-[#D4AF37]" />
                </div>
            ) : (
                <KnowledgeTable
                    data={data}
                    selectedIds={selectedIds}
                    onSelectionChange={setSelectedIds}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {/* Edit/Create Modal */}
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
