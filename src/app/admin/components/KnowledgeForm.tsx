'use client';

import { useState, useEffect } from 'react';
import { KnowledgeNode, DomainArea, KnowledgeType } from '@/types/knowledge';
import { X, Save, Sparkles, AlertCircle } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';

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

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (field: keyof KnowledgeNode, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.sub_topic?.trim()) {
            newErrors.sub_topic = 'Title is required';
        }
        if (!formData.content?.trim()) {
            newErrors.content = 'Content is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSaving(true);
        try {
            await onSave(formData);
        } finally {
            setIsSaving(false);
        }
    };

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onCancel();
            } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                handleSubmit(e as any);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [formData]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="w-full max-w-4xl bg-[#1A1A1D] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slide-up">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-brand-gold/5 to-brand-pink/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-gold/10 rounded-lg">
                            <Sparkles className="h-5 w-5 text-brand-gold" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">
                                {initialData ? 'Edit Knowledge Node' : 'Create New Knowledge Node'}
                            </h2>
                            <p className="text-xs text-gray-500 mt-0.5">
                                {initialData ? `Editing: ${initialData.sub_topic}` : 'Add new knowledge to your database'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onCancel}
                        className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Primary Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                            <div className="h-px flex-1 bg-gradient-to-r from-brand-gold/50 to-transparent" />
                            Primary Information
                            <div className="h-px flex-1 bg-gradient-to-l from-brand-gold/50 to-transparent" />
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                    Domain Area *
                                </label>
                                <select
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                                    value={formData.domain_area}
                                    onChange={e => handleChange('domain_area', e.target.value)}
                                >
                                    {['analytics', 'automation', 'events', 'finance', 'legal', 'marketing', 'operations', 'offers', 'product', 'sales', 'brand', 'strategy'].map(d => (
                                        <option key={d} value={d} className="capitalize">{d}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                    Knowledge Type *
                                </label>
                                <select
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                                    value={formData.knowledge_type}
                                    onChange={e => handleChange('knowledge_type', e.target.value)}
                                >
                                    {['metric_definition', 'procedure', 'checklist', 'policy', 'business_rule', 'principle', 'standard', 'schedule', 'package', 'offer', 'menu', 'script', 'best_practice', 'fact', 'insight', 'recommendation', 'SOP'].map(t => (
                                        <option key={t} value={t} className="capitalize">{t.replace(/_/g, ' ')}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                    Status *
                                </label>
                                <select
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                                    value={formData.status}
                                    onChange={e => handleChange('status', e.target.value)}
                                >
                                    <option value="active">✓ Active</option>
                                    <option value="draft">📝 Draft</option>
                                    <option value="archived">📦 Archived</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                Title / Sub Topic *
                            </label>
                            <input
                                type="text"
                                className={`w-full bg-black/20 border ${errors.sub_topic ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-white focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all`}
                                value={formData.sub_topic || ''}
                                onChange={e => handleChange('sub_topic', e.target.value)}
                                placeholder="e.g., Weekly Sales Report Procedure"
                                required
                            />
                            {errors.sub_topic && (
                                <div className="flex items-center gap-2 mt-2 text-red-400 text-xs">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.sub_topic}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                            <div className="h-px flex-1 bg-gradient-to-r from-brand-pink/50 to-transparent" />
                            Content
                            <div className="h-px flex-1 bg-gradient-to-l from-brand-pink/50 to-transparent" />
                        </h3>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                Main Content * <span className="text-gray-600 normal-case">(Markdown supported)</span>
                            </label>
                            <RichTextEditor
                                value={formData.content || ''}
                                onChange={(value) => handleChange('content', value)}
                                placeholder="Enter your knowledge content here... You can use markdown formatting."
                                minHeight="h-48"
                            />
                            {errors.content && (
                                <div className="flex items-center gap-2 mt-2 text-red-400 text-xs">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.content}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                Context / Additional Notes
                            </label>
                            <RichTextEditor
                                value={formData.context || ''}
                                onChange={(value) => handleChange('context', value)}
                                placeholder="Add any additional context, background information, or notes..."
                                minHeight="h-24"
                            />
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
                            Metadata
                            <div className="h-px flex-1 bg-gradient-to-l from-blue-500/50 to-transparent" />
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                    Tags <span className="text-gray-600 normal-case">(comma separated)</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                                    value={formData.tags || ''}
                                    onChange={e => handleChange('tags', e.target.value)}
                                    placeholder="sales, weekly, report, automation"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                    Confidentiality
                                </label>
                                <select
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                                    value={formData.confidentiality}
                                    onChange={e => handleChange('confidentiality', e.target.value)}
                                >
                                    <option value="internal">🔒 Internal</option>
                                    <option value="public">🌐 Public</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-black/20 flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                        <kbd className="px-2 py-1 bg-white/5 rounded border border-white/10">Esc</kbd> to cancel •
                        <kbd className="px-2 py-1 bg-white/5 rounded border border-white/10 ml-2">Ctrl+S</kbd> to save
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            className="px-6 py-3 rounded-lg text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                            disabled={isSaving}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSaving}
                            className="px-6 py-3 rounded-lg bg-gradient-to-r from-brand-gold to-yellow-500 text-black text-sm font-bold hover:shadow-[0_0_30px_rgba(217,174,67,0.4)] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save className={`h-4 w-4 ${isSaving ? 'animate-spin' : ''}`} />
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
