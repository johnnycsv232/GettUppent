import fs from 'fs';
import path from 'path';
import { KnowledgeNode, DomainArea, KnowledgeType } from '@/types/knowledge';

declare var process: {
  cwd: () => string;
};

// We assume the JSON file is in the project root
const DATA_FILE_PATH = path.join(process.cwd(), 'GETTUPP_MASTER_UNIFIED_Q4_2025_FULL_with_GettUpp_Girls.json');

let cachedData: KnowledgeNode[] | null = null;

export function getAllKnowledge(): KnowledgeNode[] {
  if (cachedData) return cachedData;

  try {
    const fileContents = fs.readFileSync(DATA_FILE_PATH, 'utf8');
    const data = JSON.parse(fileContents) as KnowledgeNode[];
    // Filter out any potential invalid records if needed, or just return
    cachedData = data;
    return data;
  } catch (error) {
    console.error('Error reading knowledge base:', error);
    return [];
  }
}

export function getKnowledgeByDomain(domain: DomainArea): KnowledgeNode[] {
  const all = getAllKnowledge();
  return all.filter(node => node.domain_area === domain);
}

export function getKnowledgeByType(type: KnowledgeType): KnowledgeNode[] {
  const all = getAllKnowledge();
  return all.filter(node => node.knowledge_type === type);
}

export function searchKnowledge(query: string): KnowledgeNode[] {
  const all = getAllKnowledge();
  const lowerQuery = query.toLowerCase();
  return all.filter(node => 
    node.content.toLowerCase().includes(lowerQuery) || 
    node.sub_topic.toLowerCase().includes(lowerQuery) ||
    node.tags.toLowerCase().includes(lowerQuery)
  );
}

// Specific getters for MVP A (Public Site)
export function getOffers() {
  return getKnowledgeByDomain('offers').filter(n => n.knowledge_type === 'package' || n.knowledge_type === 'offer');
}

export function getBrandInfo() {
  return getKnowledgeByDomain('brand');
}
