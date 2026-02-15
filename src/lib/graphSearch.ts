import { ghanaHealthcareData, type GraphNode, type GraphEdge } from "@/data/ghanaHealthcare";

export interface SearchResult {
  answer: string;
  relevantNodes: string[];
  relevantEdges: Array<{ source: string; target: string; relation: string }>;
  paths: string[][];
}

function tokenize(query: string): string[] {
  const stopWords = new Set(["the", "a", "an", "in", "at", "of", "is", "are", "which", "what", "who", "how", "many", "does", "do", "have", "has", "with", "and", "or", "that", "this", "for", "to", "from"]);
  return query
    .toLowerCase()
    .replace(/[?.,!]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !stopWords.has(w));
}

function nodeMatchScore(node: GraphNode, tokens: string[]): number {
  let score = 0;
  const label = node.label.toLowerCase();
  const detailStr = Object.values(node.details).join(" ").toLowerCase();
  const typeStr = node.type.toLowerCase();

  for (const token of tokens) {
    if (label.includes(token)) score += 3;
    if (detailStr.includes(token)) score += 2;
    if (typeStr.includes(token)) score += 1;
  }
  return score;
}

function getNeighbors(nodeId: string): Array<{ node: GraphNode; edge: GraphEdge; direction: "out" | "in" }> {
  const results: Array<{ node: GraphNode; edge: GraphEdge; direction: "out" | "in" }> = [];
  const nodeMap = new Map(ghanaHealthcareData.nodes.map((n) => [n.id, n]));

  for (const edge of ghanaHealthcareData.edges) {
    if (edge.source === nodeId) {
      const target = nodeMap.get(edge.target);
      if (target) results.push({ node: target, edge, direction: "out" });
    }
    if (edge.target === nodeId) {
      const source = nodeMap.get(edge.source);
      if (source) results.push({ node: source, edge, direction: "in" });
    }
  }
  return results;
}

export function searchGraph(query: string): SearchResult {
  const tokens = tokenize(query);
  if (tokens.length === 0) {
    return { answer: "Please ask a question about Ghana's healthcare system.", relevantNodes: [], relevantEdges: [], paths: [] };
  }

  const nodeMap = new Map(ghanaHealthcareData.nodes.map((n) => [n.id, n]));

  // Score all nodes
  const scored = ghanaHealthcareData.nodes
    .map((node) => ({ node, score: nodeMatchScore(node, tokens) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return { answer: "I couldn't find any matching entities in the Ghana healthcare graph. Try asking about hospitals, doctors, equipment, or regions.", relevantNodes: [], relevantEdges: [], paths: [] };
  }

  // Get top seed nodes and expand 1-hop
  const seeds = scored.slice(0, 5);
  const relevantNodeIds = new Set<string>();
  const relevantEdges: GraphEdge[] = [];
  const paths: string[][] = [];

  for (const { node } of seeds) {
    relevantNodeIds.add(node.id);
    const neighbors = getNeighbors(node.id);

    for (const { node: neighbor, edge } of neighbors) {
      // Include neighbor if it also matches or if it connects two seeds
      const neighborScore = nodeMatchScore(neighbor, tokens);
      if (neighborScore > 0 || seeds.some((s) => s.node.id === neighbor.id)) {
        relevantNodeIds.add(neighbor.id);
        relevantEdges.push(edge);
        paths.push([edge.source, edge.relation, edge.target]);
      } else {
        // Always include direct neighbors for context
        relevantNodeIds.add(neighbor.id);
        relevantEdges.push(edge);
      }
    }
  }

  // Build answer from retrieved context
  const answerParts: string[] = [];
  const topNodes = seeds.slice(0, 3).map((s) => s.node);

  for (const node of topNodes) {
    const neighbors = getNeighbors(node.id);
    const details = Object.entries(node.details)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ");

    let desc = `**${node.label}** (${node.type}) — ${details}`;

    const connections = neighbors.slice(0, 5).map(({ node: n, edge, direction }) => {
      const rel = edge.relation.replace(/_/g, " ");
      return direction === "out" ? `${rel} → ${n.label}` : `${n.label} → ${rel}`;
    });

    if (connections.length > 0) {
      desc += `\n  Connected: ${connections.join("; ")}`;
    }
    answerParts.push(desc);
  }

  const answer = `Based on the knowledge graph, here's what I found:\n\n${answerParts.join("\n\n")}\n\n*Retrieved ${relevantNodeIds.size} nodes and ${relevantEdges.length} edges from the graph.*`;

  return {
    answer,
    relevantNodes: Array.from(relevantNodeIds),
    relevantEdges: relevantEdges.map((e) => ({ source: e.source, target: e.target, relation: e.relation })),
    paths,
  };
}
