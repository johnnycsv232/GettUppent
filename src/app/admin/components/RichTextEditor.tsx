'use client';

import { useState, useRef } from 'react';
import {
    Bold, Italic, List, ListOrdered, Link, Code,
    Quote, Heading1, Heading2, Eye, Edit3
} from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    minHeight?: string;
}

export function RichTextEditor({ value, onChange, placeholder, minHeight = 'h-32' }: RichTextEditorProps) {
    const [isPreview, setIsPreview] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const insertMarkdown = (before: string, after: string = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end);
        const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);

        onChange(newText);

        // Restore focus and selection
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, end + before.length);
        }, 0);
    };

    const formatButtons = [
        { icon: Bold, action: () => insertMarkdown('**', '**'), label: 'Bold' },
        { icon: Italic, action: () => insertMarkdown('*', '*'), label: 'Italic' },
        { icon: Heading1, action: () => insertMarkdown('# '), label: 'H1' },
        { icon: Heading2, action: () => insertMarkdown('## '), label: 'H2' },
        { icon: List, action: () => insertMarkdown('- '), label: 'List' },
        { icon: ListOrdered, action: () => insertMarkdown('1. '), label: 'Numbered List' },
        { icon: Quote, action: () => insertMarkdown('> '), label: 'Quote' },
        { icon: Code, action: () => insertMarkdown('`', '`'), label: 'Code' },
        { icon: Link, action: () => insertMarkdown('[', '](url)'), label: 'Link' },
    ];

    const renderMarkdown = (text: string) => {
        // Simple markdown rendering
        let html = text
            .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mb-2">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-2">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-3">$1</h1>')
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
            .replace(/`(.*?)`/g, '<code class="bg-black/40 px-1 rounded text-brand-gold">$1</code>')
            .replace(/^- (.*$)/gim, '<li class="ml-4">• $1</li>')
            .replace(/^\d+\. (.*$)/gim, '<li class="ml-4">$1</li>')
            .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-brand-gold/30 pl-4 italic text-gray-400">$1</blockquote>')
            .replace(/\n/g, '<br />');

        return html;
    };

    return (
        <div className="border border-white/10 rounded-lg overflow-hidden bg-black/20">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-2 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-1">
                    {formatButtons.map((btn, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={btn.action}
                            className="p-2 hover:bg-white/10 rounded transition-colors text-gray-400 hover:text-white"
                            title={btn.label}
                        >
                            <btn.icon className="h-4 w-4" />
                        </button>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={() => setIsPreview(!isPreview)}
                    className={`flex items-center gap-2 px-3 py-1 rounded text-xs font-bold transition-colors ${isPreview
                            ? 'bg-brand-gold text-black'
                            : 'bg-white/10 text-gray-400 hover:text-white'
                        }`}
                >
                    {isPreview ? <Edit3 className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    {isPreview ? 'Edit' : 'Preview'}
                </button>
            </div>

            {/* Content Area */}
            {isPreview ? (
                <div
                    className={`p-3 text-white ${minHeight} overflow-y-auto prose prose-invert max-w-none`}
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
                />
            ) : (
                <textarea
                    ref={textareaRef}
                    className={`w-full ${minHeight} bg-transparent p-3 text-white focus:outline-none resize-none`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                />
            )}
        </div>
    );
}
