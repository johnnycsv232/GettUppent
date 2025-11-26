import { db } from './firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { KnowledgeNode, DomainArea, KnowledgeType } from '@/types/knowledge';

/**
 * 🧠 Knowledge Base - Firestore-Powered Intelligence Layer
 * 
 * All functions are async and fetch from Firestore.
 * No more fs module - fully serverless compatible!
 */

// Cache for performance (optional, clears on page refresh)
let cachedData: KnowledgeNode[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Get all knowledge nodes from Firestore
 */
export async function getAllKnowledge(): Promise<KnowledgeNode[]> {
    // Return cache if valid
    if (cachedData && Date.now() - cacheTimestamp < CACHE_TTL) {
        return cachedData;
    }

    try {
        const snapshot = await getDocs(collection(db, 'knowledge_base'));
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as KnowledgeNode[];
        
        // Update cache
        cachedData = data;
        cacheTimestamp = Date.now();
        
        return data;
    } catch (error) {
        console.error('Error fetching knowledge base:', error);
        return cachedData || []; // Return stale cache if available
    }
}

/**
 * Get knowledge nodes by domain area
 */
export async function getKnowledgeByDomain(domain: DomainArea): Promise<KnowledgeNode[]> {
    try {
        const q = query(
            collection(db, 'knowledge_base'),
            where('domain_area', '==', domain)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as KnowledgeNode[];
    } catch (error) {
        console.error('Error fetching by domain:', error);
        // Fallback to client-side filter
        const all = await getAllKnowledge();
        return all.filter(node => node.domain_area === domain);
    }
}

/**
 * Get knowledge nodes by type
 */
export async function getKnowledgeByType(type: KnowledgeType): Promise<KnowledgeNode[]> {
    try {
        const q = query(
            collection(db, 'knowledge_base'),
            where('knowledge_type', '==', type)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as KnowledgeNode[];
    } catch (error) {
        console.error('Error fetching by type:', error);
        const all = await getAllKnowledge();
        return all.filter(node => node.knowledge_type === type);
    }
}

/**
 * Search knowledge base by query string
 * Searches content, sub_topic, and tags
 */
export async function searchKnowledge(queryStr: string): Promise<KnowledgeNode[]> {
    // Firestore doesn't support full-text search natively
    // We'll do client-side filtering (consider Algolia for production scale)
    const all = await getAllKnowledge();
    const lowerQuery = queryStr.toLowerCase();
    
    return all.filter(node => 
        node.content.toLowerCase().includes(lowerQuery) || 
        node.sub_topic.toLowerCase().includes(lowerQuery) ||
        node.tags.toLowerCase().includes(lowerQuery)
    ).slice(0, 10); // Limit results
}

/**
 * Get offers and packages
 */
export async function getOffers(): Promise<KnowledgeNode[]> {
    const domain = await getKnowledgeByDomain('offers');
    return domain.filter(n => 
        n.knowledge_type === 'package' || n.knowledge_type === 'offer'
    );
}

/**
 * Get brand information
 */
export async function getBrandInfo(): Promise<KnowledgeNode[]> {
    return getKnowledgeByDomain('brand');
}

/**
 * Clear the cache (useful after migrations)
 */
export function clearKnowledgeCache(): void {
    cachedData = null;
    cacheTimestamp = 0;
}
