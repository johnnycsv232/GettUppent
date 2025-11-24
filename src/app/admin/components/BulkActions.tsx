'use client';

import { Trash2, Archive, CheckCircle, Download, X } from 'lucide-react';

interface BulkActionsProps {
    selectedCount: number;
    onDelete: () => void;
    onArchive: () => void;
    onActivate: () => void;
    onExport: () => void;
    onClear: () => void;
}

export function BulkActions({
    selectedCount,
    onDelete,
    onArchive,
    onActivate,
    onExport,
    onClear
}: BulkActionsProps) {
    if (selectedCount === 0) return null;

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
            <div className="bg-[#1A1A1D] border border-white/20 rounded-2xl shadow-2xl p-4 flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 border-r border-white/10">
                    <div className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
                    <span className="text-sm font-bold text-white">
                        {selectedCount} selected
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={onActivate}
                        className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors flex items-center gap-2 text-sm font-bold"
                    >
                        <CheckCircle className="h-4 w-4" />
                        Activate
                    </button>

                    <button
                        onClick={onArchive}
                        className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-colors flex items-center gap-2 text-sm font-bold"
                    >
                        <Archive className="h-4 w-4" />
                        Archive
                    </button>

                    <button
                        onClick={onExport}
                        className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors flex items-center gap-2 text-sm font-bold"
                    >
                        <Download className="h-4 w-4" />
                        Export
                    </button>

                    <button
                        onClick={onDelete}
                        className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors flex items-center gap-2 text-sm font-bold"
                    >
                        <Trash2 className="h-4 w-4" />
                        Delete
                    </button>
                </div>

                <button
                    onClick={onClear}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
