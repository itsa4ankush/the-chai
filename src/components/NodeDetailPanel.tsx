import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ghanaHealthcareData, nodeColors, nodeIcons, type GraphNode } from "@/data/ghanaHealthcare";

interface Props {
  node: GraphNode;
  onClose: () => void;
}

export default function NodeDetailPanel({ node, onClose }: Props) {
  const neighbors = ghanaHealthcareData.edges
    .filter((e) => e.source === node.id || e.target === node.id)
    .map((e) => {
      const otherId = e.source === node.id ? e.target : e.source;
      const other = ghanaHealthcareData.nodes.find((n) => n.id === otherId)!;
      const direction = e.source === node.id ? "out" : "in";
      return { other, relation: e.relation, direction };
    });

  return (
    <div className="border-t border-border bg-card p-4">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <span className="text-lg">{nodeIcons[node.type]}</span>
          <h3 className="text-sm font-semibold text-foreground">{node.label}</h3>
          <span
            className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium text-white"
            style={{ backgroundColor: nodeColors[node.type] }}
          >
            {node.type}
          </span>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
          <X className="h-3 w-3" />
        </Button>
      </div>

      <div className="mb-3 space-y-1">
        {Object.entries(node.details).map(([key, val]) => (
          <div key={key} className="text-xs">
            <span className="text-muted-foreground">{key}: </span>
            <span className="text-foreground">{val}</span>
          </div>
        ))}
      </div>

      <div>
        <h4 className="mb-1 text-xs font-medium text-muted-foreground">
          Connections ({neighbors.length})
        </h4>
        <div className="max-h-32 space-y-1 overflow-y-auto">
          {neighbors.map(({ other, relation, direction }, i) => (
            <div key={i} className="flex items-center gap-1 text-[11px]">
              <span>{nodeIcons[other.type]}</span>
              <span className="text-foreground">{other.label}</span>
              <span className="text-muted-foreground">
                ({direction === "out" ? `→ ${relation}` : `← ${relation}`})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
