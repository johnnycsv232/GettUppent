import { db } from './firebase';
import { collection, writeBatch, doc, getDocs } from 'firebase/firestore';
import { KnowledgeNode } from '@/types/knowledge';

// Note: JSON data will be passed in from the client side
// This avoids build-time import issues with large JSON files

export interface MigrationLog {
    timestamp: string;
    type: 'info' | 'success' | 'error' | 'warning';
    message: string;
}

export interface MigrationResult {
    success: boolean;
    totalNodes: number;
    migratedNodes: number;
    skippedNodes: number;
    errors: number;
    logs: MigrationLog[];
    dryRun: boolean;
}

/**
 * 🧠 BRAIN TRANSPLANT: Migrate knowledge from JSON to Firestore
 * 
 * @param sourceData - The knowledge nodes to migrate (from JSON)
 * @param dryRun - If true, only logs what would happen without writing
 * @param onLog - Callback for real-time log updates
 */
export async function migrateKnowledgeBase(
    sourceData: KnowledgeNode[],
    dryRun: boolean = true,
    onLog?: (log: MigrationLog) => void
): Promise<MigrationResult> {
    const logs: MigrationLog[] = [];
    
    const addLog = (type: MigrationLog['type'], message: string) => {
        const log: MigrationLog = {
            timestamp: new Date().toISOString(),
            type,
            message
        };
        logs.push(log);
        onLog?.(log);
    };

    let migratedNodes = 0;
    let skippedNodes = 0;
    let errors = 0;

    try {
        const data = sourceData;
        const totalNodes = data.length;

        addLog('info', `🚀 Starting migration: ${totalNodes} nodes found in JSON`);
        addLog('info', `Mode: ${dryRun ? '🧪 DRY RUN (no writes)' : '⚡ LIVE MIGRATION'}`);

        if (dryRun) {
            addLog('warning', '⚠️ DRY RUN MODE - No data will be written to Firestore');
        }

        // Check existing data in Firestore
        const existingDocs = await getDocs(collection(db, 'knowledge_base'));
        const existingIds = new Set(existingDocs.docs.map(d => d.id));
        addLog('info', `📊 Found ${existingIds.size} existing nodes in Firestore`);

        // Firestore batch writes are limited to 500 operations
        const BATCH_SIZE = 450;
        let currentBatch = writeBatch(db);
        let batchCount = 0;
        let totalBatches = Math.ceil(data.length / BATCH_SIZE);

        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            
            // Use the existing ID from JSON as the document ID
            const docId = node.id;

            // Skip if already exists
            if (existingIds.has(docId)) {
                addLog('warning', `⏭️ Skipping ${docId} (already exists)`);
                skippedNodes++;
                continue;
            }

            // Prepare the document (remove id from data, it becomes the doc ID)
            const { id, ...nodeData } = node;
            
            if (!dryRun) {
                const docRef = doc(db, 'knowledge_base', docId);
                currentBatch.set(docRef, {
                    ...nodeData,
                    migrated_at: new Date().toISOString(),
                    __migration_source: 'brain_transplant_v1'
                });
            }

            migratedNodes++;
            batchCount++;

            // Commit batch when full
            if (batchCount >= BATCH_SIZE) {
                if (!dryRun) {
                    addLog('info', `💾 Committing batch ${Math.floor(i / BATCH_SIZE) + 1}/${totalBatches}...`);
                    await currentBatch.commit();
                    currentBatch = writeBatch(db);
                }
                batchCount = 0;
            }

            // Log progress every 50 nodes
            if ((i + 1) % 50 === 0) {
                addLog('info', `📝 Processed ${i + 1}/${totalNodes} nodes...`);
            }
        }

        // Commit remaining batch
        if (batchCount > 0 && !dryRun) {
            addLog('info', `💾 Committing final batch...`);
            await currentBatch.commit();
        }

        addLog('success', `✅ Migration ${dryRun ? 'simulation' : ''} complete!`);
        addLog('success', `📊 Results: ${migratedNodes} migrated, ${skippedNodes} skipped, ${errors} errors`);

        return {
            success: true,
            totalNodes: data.length,
            migratedNodes,
            skippedNodes,
            errors,
            logs,
            dryRun
        };

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        addLog('error', `❌ Migration failed: ${errorMessage}`);
        errors++;

        return {
            success: false,
            totalNodes: 0,
            migratedNodes,
            skippedNodes,
            errors,
            logs,
            dryRun
        };
    }
}

/**
 * Get count of nodes in Firestore knowledge_base
 */
export async function getKnowledgeBaseCount(): Promise<number> {
    const snapshot = await getDocs(collection(db, 'knowledge_base'));
    return snapshot.size;
}
