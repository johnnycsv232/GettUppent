'use client';

import { useState, useEffect } from 'react';
import { Database, Play, AlertTriangle, CheckCircle, Terminal, RefreshCw, FileJson } from 'lucide-react';
import { migrateKnowledgeBase, getKnowledgeBaseCount, MigrationLog, MigrationResult } from '@/lib/migrate-knowledge';
import { KnowledgeNode } from '@/types/knowledge';

// Import JSON data directly in client component
import knowledgeData from '../../../../GETTUPP_MASTER_UNIFIED_Q4_2025_FULL_with_GettUpp_Girls.json';

export default function MigratePage() {
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState<MigrationLog[]>([]);
    const [result, setResult] = useState<MigrationResult | null>(null);
    const [firestoreCount, setFirestoreCount] = useState<number | null>(null);
    const [dryRun, setDryRun] = useState(true);

    const sourceCount = (knowledgeData as KnowledgeNode[]).length;

    // Fetch Firestore count on mount
    useEffect(() => {
        async function fetchCount() {
            try {
                const count = await getKnowledgeBaseCount();
                setFirestoreCount(count);
            } catch (error) {
                console.error('Error fetching count:', error);
            }
        }
        fetchCount();
    }, [result]); // Refresh after migration

    const handleMigration = async () => {
        if (!dryRun && !confirm('⚠️ WARNING: This will write data to Firestore. Continue?')) {
            return;
        }

        setLoading(true);
        setLogs([]);
        setResult(null);

        try {
            const migrationResult = await migrateKnowledgeBase(
                knowledgeData as KnowledgeNode[],
                dryRun,
                (log) => setLogs(prev => [...prev, log])
            );
            setResult(migrationResult);
        } catch (error) {
            console.error('Migration error:', error);
            setLogs(prev => [...prev, {
                timestamp: new Date().toISOString(),
                type: 'error',
                message: `Migration failed: ${error instanceof Error ? error.message : 'Unknown error'}`
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                    <Database className="h-8 w-8 text-purple-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tight">
                        Brain Transplant
                    </h1>
                    <p className="text-gray-400">
                        Migrate knowledge base from JSON to Firestore
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-400 text-sm font-medium">Source JSON</span>
                        <FileJson className="h-5 w-5 text-brand-gold opacity-50" />
                    </div>
                    <div className="text-4xl font-black text-white">{sourceCount}</div>
                    <div className="text-sm text-gray-500 mt-1">nodes in JSON file</div>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-400 text-sm font-medium">Firestore</span>
                        <Database className="h-5 w-5 text-purple-500 opacity-50" />
                    </div>
                    <div className="text-4xl font-black text-white">
                        {firestoreCount !== null ? firestoreCount : '...'}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">nodes in knowledge_base</div>
                </div>
            </div>

            {/* Migration Controls */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                    <AlertTriangle className="h-6 w-6 text-yellow-500 shrink-0 mt-1" />
                    <div className="space-y-4 flex-1">
                        <div>
                            <h3 className="text-xl font-bold text-white">Migration Options</h3>
                            <p className="text-gray-400 mt-2">
                                This will batch-import all knowledge nodes from the JSON file into Firestore.
                                Existing documents with matching IDs will be skipped.
                            </p>
                        </div>

                        {/* Dry Run Toggle */}
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={dryRun}
                                onChange={(e) => setDryRun(e.target.checked)}
                                className="w-5 h-5 rounded border-white/20 bg-white/5 text-brand-gold focus:ring-brand-gold"
                            />
                            <span className="text-white font-medium">Dry Run Mode</span>
                            <span className="text-sm text-gray-500">
                                (simulation only, no data written)
                            </span>
                        </label>

                        <div className="flex gap-3">
                            <button
                                onClick={handleMigration}
                                disabled={loading}
                                className={`px-6 py-3 font-bold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                                    dryRun 
                                        ? 'bg-yellow-600 hover:bg-yellow-500 text-black'
                                        : 'bg-red-600 hover:bg-red-500 text-white'
                                }`}
                            >
                                {loading ? (
                                    <RefreshCw className="h-5 w-5 animate-spin" />
                                ) : (
                                    <Play className="h-5 w-5" />
                                )}
                                {loading ? 'Running...' : dryRun ? 'Run Dry Test' : 'Run Live Migration'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Summary */}
            {result && (
                <div className={`p-6 rounded-2xl border ${
                    result.success 
                        ? 'bg-green-500/10 border-green-500/20' 
                        : 'bg-red-500/10 border-red-500/20'
                }`}>
                    <div className="flex items-center gap-3 mb-4">
                        {result.success ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                            <AlertTriangle className="h-6 w-6 text-red-500" />
                        )}
                        <h3 className={`text-xl font-bold ${result.success ? 'text-green-400' : 'text-red-400'}`}>
                            {result.dryRun ? 'Dry Run Complete' : 'Migration Complete'}
                        </h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-white">{result.totalNodes}</div>
                            <div className="text-sm text-gray-500">Total Nodes</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-400">{result.migratedNodes}</div>
                            <div className="text-sm text-gray-500">Migrated</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-yellow-400">{result.skippedNodes}</div>
                            <div className="text-sm text-gray-500">Skipped</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-red-400">{result.errors}</div>
                            <div className="text-sm text-gray-500">Errors</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Live Logs Console */}
            <div className="bg-black border border-white/10 rounded-2xl overflow-hidden font-mono text-sm shadow-2xl">
                <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">Migration Logs</span>
                    {loading && <RefreshCw className="h-3 w-3 animate-spin text-brand-gold ml-auto" />}
                </div>
                <div className="p-4 h-80 overflow-y-auto space-y-1">
                    {logs.length === 0 && (
                        <span className="text-gray-700 italic">Ready to start...</span>
                    )}
                    {logs.map((log, i) => (
                        <div
                            key={i}
                            className={`${
                                log.type === 'error' ? 'text-red-400' :
                                log.type === 'success' ? 'text-green-400' :
                                log.type === 'warning' ? 'text-yellow-400' :
                                'text-gray-300'
                            }`}
                        >
                            <span className="text-gray-600 text-xs">
                                [{new Date(log.timestamp).toLocaleTimeString()}]
                            </span>{' '}
                            {log.message}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
