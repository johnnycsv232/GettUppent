'use client';

import { AGENTS } from '@/lib/agents';
import { motion } from 'framer-motion';

interface Props {
    selectedAgentId: string;
    onSelect: (id: string) => void;
}

export function AgentSelector({ selectedAgentId, onSelect }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {AGENTS.map((agent) => {
                const isSelected = selectedAgentId === agent.id;
                return (
                    <motion.button
                        key={agent.id}
                        onClick={() => onSelect(agent.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-4 rounded-xl border text-left transition-all duration-300 ${isSelected
                                ? 'bg-brand-gold/10 border-brand-gold'
                                : 'bg-white/5 border-white/10 hover:border-white/20'
                            }`}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{agent.style.emoji}</span>
                            <div>
                                <h3 className={`font-oswald font-bold uppercase ${isSelected ? 'text-brand-gold' : 'text-white'}`}>
                                    {agent.name}
                                </h3>
                                <p className="text-xs text-gray-400">{agent.role}</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            {agent.description}
                        </p>

                        {isSelected && (
                            <div className="absolute -top-2 -right-2">
                                <span className="relative flex h-4 w-4">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-gold"></span>
                                </span>
                            </div>
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}
