import { NextResponse } from 'next/server';
import { searchKnowledge } from '@/lib/knowledge';
import { getAgentById } from '@/lib/agents';

export async function POST(request: Request) {
  try {
    const { query, agentId } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Default to 'closer' if no agent specified
    const agent = getAgentById(agentId) || getAgentById('closer')!;

    // 1. Search the Knowledge Base
    // In a real app, we would filter by agent.allowedDomains here
    // For now, we'll search everything but prioritize relevant domains in the prompt
    const relevantNodes = searchKnowledge(query);

    // Filter nodes to only include those in the agent's allowed domains
    // This makes the agent more focused
    const filteredNodes = relevantNodes.filter(node =>
      agent.allowedDomains.includes(node.domain_area)
    );

    // Fallback: If no nodes found in allowed domains, use top relevant nodes 
    // but warn the model in the system prompt (optional, but good for UX)
    const nodesToUse = filteredNodes.length > 0 ? filteredNodes : relevantNodes.slice(0, 2);

    // 2. Construct the Context for the LLM
    const contextBlock = nodesToUse.map(node => `
      [SOURCE: ${node.sub_topic} (${node.knowledge_type})]
      CONTENT: ${node.content}
      CONTEXT: ${node.context}
    `).join('\n---\n');

    // 3. Simulate an LLM Response
    const mockResponse = {
      role: 'assistant',
      content: `${agent.style.emoji} **${agent.name}**: I found ${nodesToUse.length} relevant points for you.\n\n${contextBlock}\n\n(Simulated Response based on System Prompt: "${agent.systemPrompt.substring(0, 50)}...")`,
      sources: nodesToUse.map(n => n.sub_topic),
      agent: agent.id
    };

    return NextResponse.json(mockResponse);

  } catch (error) {
    console.error('Assistant Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
