import { NextResponse } from 'next/server';
import { searchKnowledge } from '@/lib/knowledge';
import { getAgentById } from '@/lib/agents';

/**
 * 🤖 RAG Assistant API
 * 
 * Searches the Firestore knowledge base and returns relevant context.
 * In production, this would integrate with an LLM (e.g., Gemini, OpenAI).
 */
export async function POST(request: Request) {
    try {
        const { query, agentId } = await request.json();

        if (!query) {
            return NextResponse.json({ error: 'Query is required' }, { status: 400 });
        }

        // Default to 'closer' if no agent specified
        const agent = getAgentById(agentId) || getAgentById('closer')!;

        // 1. Search the Knowledge Base (now async - Firestore powered)
        const relevantNodes = await searchKnowledge(query);

        // Filter nodes to only include those in the agent's allowed domains
        const filteredNodes = relevantNodes.filter(node =>
            agent.allowedDomains.includes(node.domain_area)
        );

        // Fallback: If no nodes found in allowed domains, use top relevant nodes
        const nodesToUse = filteredNodes.length > 0 ? filteredNodes : relevantNodes.slice(0, 2);

        // 2. Construct the Context for the LLM
        const contextBlock = nodesToUse.map(node => `
[SOURCE: ${node.sub_topic} (${node.knowledge_type})]
CONTENT: ${node.content}
CONTEXT: ${node.context}
        `).join('\n---\n');

        // 3. Generate Response
        // TODO: Replace with actual LLM call (Gemini, OpenAI, etc.)
        const response = {
            role: 'assistant',
            content: nodesToUse.length > 0 
                ? `${agent.style.emoji} **${agent.name}**: I found ${nodesToUse.length} relevant knowledge points.\n\n${contextBlock}`
                : `${agent.style.emoji} **${agent.name}**: I couldn't find specific information about that in my knowledge base. Could you rephrase your question?`,
            sources: nodesToUse.map(n => n.sub_topic),
            agent: agent.id,
            context: {
                totalResults: relevantNodes.length,
                filteredResults: filteredNodes.length,
                agentDomains: agent.allowedDomains
            }
        };

        return NextResponse.json(response);

    } catch (error) {
        console.error('Assistant Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
