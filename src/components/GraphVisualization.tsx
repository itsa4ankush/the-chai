import { useCallback, useEffect, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { ghanaHealthcareData, nodeColors, type NodeType, type GraphNode } from "@/data/ghanaHealthcare";

interface Props {
  highlightNodes?: Set<string>;
  highlightEdges?: Array<{ source: string; target: string }>;
  onNodeClick?: (node: GraphNode) => void;
  filterTypes?: NodeType[];
  searchTerm?: string;
}

interface ForceNode {
  id: string;
  label: string;
  type: NodeType;
  details: Record<string, string>;
  x?: number;
  y?: number;
}

interface ForceLink {
  source: string | ForceNode;
  target: string | ForceNode;
  relation: string;
}

export default function GraphVisualization({ highlightNodes, highlightEdges, onNodeClick, filterTypes, searchTerm }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const filteredNodes = ghanaHealthcareData.nodes.filter((n) => {
    if (filterTypes && filterTypes.length > 0 && !filterTypes.includes(n.type)) return false;
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      return n.label.toLowerCase().includes(s) || Object.values(n.details).some((v) => v.toLowerCase().includes(s));
    }
    return true;
  });

  const nodeIds = new Set(filteredNodes.map((n) => n.id));
  const filteredEdges = ghanaHealthcareData.edges.filter((e) => nodeIds.has(e.source) && nodeIds.has(e.target));

  const graphData = {
    nodes: filteredNodes.map((n) => ({ ...n })),
    links: filteredEdges.map((e) => ({ source: e.source, target: e.target, relation: e.relation })),
  };

  const isHighlightedEdge = useCallback(
    (link: ForceLink) => {
      if (!highlightEdges) return false;
      const s = typeof link.source === "string" ? link.source : link.source.id;
      const t = typeof link.target === "string" ? link.target : link.target.id;
      return highlightEdges.some((e) => e.source === s && e.target === t);
    },
    [highlightEdges]
  );

  const paintNode = useCallback(
    (node: ForceNode, ctx: CanvasRenderingContext2D) => {
      const isHighlighted = highlightNodes?.has(node.id);
      const r = isHighlighted ? 8 : 5;
      const color = nodeColors[node.type];

      ctx.beginPath();
      ctx.arc(node.x!, node.y!, r, 0, 2 * Math.PI);
      ctx.fillStyle = isHighlighted ? color : color + "cc";
      ctx.fill();

      if (isHighlighted) {
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Label
      ctx.font = `${isHighlighted ? "bold " : ""}${isHighlighted ? 4 : 3}px Sans-Serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = isHighlighted ? "#fff" : "#ccc";
      ctx.fillText(node.label, node.x!, node.y! + r + 2);
    },
    [highlightNodes]
  );

  return (
    <div ref={containerRef} className="h-full w-full">
      <ForceGraph2D
        ref={graphRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        nodeCanvasObject={paintNode}
        nodePointerAreaPaint={(node: ForceNode, color: string, ctx: CanvasRenderingContext2D) => {
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, 8, 0, 2 * Math.PI);
          ctx.fillStyle = color;
          ctx.fill();
        }}
        linkColor={(link: ForceLink) => (isHighlightedEdge(link) ? "#f59e0b" : "rgba(255,255,255,0.1)")}
        linkWidth={(link: ForceLink) => (isHighlightedEdge(link) ? 2 : 0.5)}
        linkDirectionalArrowLength={3}
        linkDirectionalArrowRelPos={1}
        onNodeClick={(node: any) => onNodeClick?.(node as GraphNode)}
        backgroundColor="transparent"
        cooldownTicks={100}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
      />
    </div>
  );
}
