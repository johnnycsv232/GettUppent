'use client';

import { useState, ChangeEvent } from 'react';
import { Search, Send } from 'lucide-react';
import { KnowledgeNode } from '@/types/knowledge';
import { AgentSelector } from './AgentSelector';
import { AGENTS } from '@/lib/agents';

interface Props {
  data: KnowledgeNode[];
}

export function KnowledgeSearch({ data }: Props) {
  const [query, setQuery] = useState('');
  const [selectedAgentId, setSelectedAgentId] = useState('closer');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, agentId: selectedAgentId }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <AgentSelector
        selectedAgentId={selectedAgentId}
        onSelect={setSelectedAgentId}
      />

      <div className="relative mb-8">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
        <input
          type="text"
          placeholder={`Ask ${AGENTS.find(a => a.id === selectedAgentId)?.name} a question...`}
          className="w-full rounded-xl border border-white/10 bg-brand-ink/50 pl-12 pr-12 py-4 text-white placeholder-gray-600 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold text-lg"
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="absolute right-2 top-2 p-2 rounded-lg bg-brand-gold/10 text-brand-gold hover:bg-brand-gold hover:text-black transition-colors disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 mt-2 text-sm animate-pulse">Consulting the oracle...</p>
        </div>
      )}

      {response && (
        <div className="bg-[#1A1A1D] border border-white/10 rounded-xl p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
              {response.content}
            </div>
          </div>

          {response.sources && response.sources.length > 0 && (
            <div className="mt-6 pt-4 border-t border-white/5">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Sources Referenced</p>
              <div className="flex flex-wrap gap-2">
                {response.sources.map((source: string, i: number) => (
                  <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400 border border-white/5">
                    {source}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
