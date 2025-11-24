'use client';

import { useState, useEffect } from 'react';
import { KnowledgeNode, DomainArea, KnowledgeType } from '@/types/knowledge';
import { X, Save } from 'lucide-react';

interface KnowledgeFormProps {
    initialData?: KnowledgeNode | null;
    onSave: (data: Partial<KnowledgeNode>) => void;
    onCancel: () => void;
}

export function KnowledgeForm({ initialData, onSave, onCancel }: KnowledgeFormProps) {
    const [formData, setFormData] = useState<Partial<KnowledgeNode>>({
        domain_area: 'operations',
        knowledge_type: 'procedure',
        status: 'active',
        confidentiality: 'internal',
        relevance_score: 1.0,
        version: 1,
        ...initialData
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (field: keyof KnowledgeNode, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl bg-[#1A1A1D] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white">
                        {initialData ? 'Edit Knowledge Node' : 'New Knowledge Node'}
                    </h2>
                    <button onClick={onCancel} className="text-gray-400 hover:text-white">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Domain Area</label>
                            <select
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold/50 outline-none"
                                value={formData.domain_area}
                                onChange={e => handleChange('domain_area', e.target.value)}
                            >
                                {['analytics', 'automation', 'events', 'finance', 'legal', 'marketing', 'operations', 'offers', 'product', 'sales', 'brand', 'strategy'].map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Knowledge Type</label>
                            <select
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold/50 outline-none"
                                value={formData.knowledge_type}
                                onChange={e => handleChange('knowledge_type', e.target.value)}
                            >
                                {['metric_definition', 'procedure', 'checklist', 'policy', 'business_rule', 'principle', 'standard', 'schedule', 'package', 'offer', 'menu', 'script', 'best_practice', 'fact', 'insight', 'recommendation', 'SOP'].map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Sub Topic (Title)</label>
                        <input
                            type="text"
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold/50 outline-none"
                            value={formData.sub_topic || ''}
                            onChange={e => handleChange('sub_topic', e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Content</label>
                        <textarea
                            className="w-full h-32 bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold/50 outline-none resize-none"
                            value={formData.content || ''}
                            onChange={e => handleChange('content', e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Context (Optional)</label>
                        <textarea
                            className="w-full h-20 bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold/50 outline-none resize-none"
                            value={formData.context || ''}
                            onChange={e => handleChange('context', e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tags (Comma separated)</label>
                            <input
                                type="text"
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold/50 outline-none"
                                value={formData.tags || ''}
                                onChange={e => handleChange('tags', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Status</label>
                            <select
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold/50 outline-none"
                                value={formData.status}
                                onChange={e => handleChange('status', e.target.value)}
                            >
                                <option value="active">Active</option>
                                <option value="draft">Draft</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-black/20 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-6 py-3 rounded-lg text-sm font-bold text-gray-400 hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-3 rounded-lg bg-brand-gold text-black text-sm font-bold hover:bg-white transition-colors flex items-center gap-2"
                    >
                        <Save className="h-4 w-4" />
                        Save Changes
                    </button>
                </div>

            </div>
        </div>
    );
}
