export type DomainArea = 
  | 'analytics'
  | 'automation'
  | 'events'
  | 'finance'
  | 'legal'
  | 'marketing'
  | 'operations'
  | 'offers'
  | 'product'
  | 'sales'
  | 'brand'
  | 'strategy';

export type KnowledgeType =
  | 'metric_definition'
  | 'procedure'
  | 'checklist'
  | 'policy'
  | 'business_rule'
  | 'principle'
  | 'standard'
  | 'schedule'
  | 'package'
  | 'offer'
  | 'menu'
  | 'script'
  | 'best_practice'
  | 'fact'
  | 'insight'
  | 'recommendation'
  | 'SOP';

export interface KnowledgeNode {
  id: string;
  legacy_id: string | null;
  domain_area: DomainArea;
  sub_topic: string;
  knowledge_type: KnowledgeType;
  content: string;
  context: string;
  source_reference: string;
  timestamp_added: string;
  relevance_score: number;
  tags: string; // Comma-separated string
  owner: string;
  status: 'active' | 'archived' | 'draft';
  confidentiality: 'internal' | 'public';
  review_date: string;
  system_of_record: string;
  dependencies: string | null;
  kpi: string | null;
  automation_linked: string | null;
  version: number | string;
  __source_file: string;
}
