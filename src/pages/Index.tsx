import { useState, useMemo } from "react";
import { Search, Filter, Info, Network } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import GraphVisualization from "@/components/GraphVisualization";
import ChatPanel from "@/components/ChatPanel";
import NodeDetailPanel from "@/components/NodeDetailPanel";
import HowItWorksPanel from "@/components/HowItWorksPanel";
import { ghanaHealthcareData, nodeColors, nodeIcons, type NodeType, type GraphNode } from "@/data/ghanaHealthcare";
import type { SearchResult } from "@/lib/graphSearch";

const typeFilters: { type: NodeType; label: string }[] = [
  { type: "region", label: "Regions" },
  { type: "facility", label: "Facilities" },
  { type: "doctor", label: "Doctors" },
  { type: "equipment", label: "Equipment" },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<NodeType[]>([]);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [highlightNodes, setHighlightNodes] = useState<Set<string>>(new Set());
  const [highlightEdges, setHighlightEdges] = useState<Array<{ source: string; target: string }>>([]);

  const toggleFilter = (type: NodeType) => {
    setActiveFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSearchResult = (result: SearchResult) => {
    setHighlightNodes(new Set(result.relevantNodes));
    setHighlightEdges(result.relevantEdges.map((e) => ({ source: e.source, target: e.target })));
  };

  const stats = useMemo(() => {
    const nodes = ghanaHealthcareData.nodes;
    return {
      regions: nodes.filter((n) => n.type === "region").length,
      facilities: nodes.filter((n) => n.type === "facility").length,
      doctors: nodes.filter((n) => n.type === "doctor").length,
      equipment: nodes.filter((n) => n.type === "equipment").length,
      edges: ghanaHealthcareData.edges.length,
    };
  }, []);

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex items-center gap-3">
          <Network className="h-5 w-5 text-primary" />
          <div>
            <h1 className="text-sm font-bold text-foreground">Ghana Healthcare Graph RAG</h1>
            <p className="text-[10px] text-muted-foreground">
              {stats.facilities} facilities · {stats.doctors} doctors · {stats.equipment} equipment · {stats.regions} regions · {stats.edges} relationships
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter graph..."
              className="h-7 w-48 pl-7 text-xs"
            />
          </div>
          <div className="flex gap-1">
            {typeFilters.map(({ type, label }) => (
              <Badge
                key={type}
                variant={activeFilters.includes(type) ? "default" : "outline"}
                className="cursor-pointer text-[10px]"
                style={
                  activeFilters.includes(type)
                    ? { backgroundColor: nodeColors[type], borderColor: nodeColors[type] }
                    : { borderColor: nodeColors[type], color: nodeColors[type] }
                }
                onClick={() => toggleFilter(type)}
              >
                {nodeIcons[type]} {label}
              </Badge>
            ))}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Info className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>How It Works</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <HowItWorksPanel />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={65} minSize={40}>
          <div className="relative h-full">
            <GraphVisualization
              highlightNodes={highlightNodes}
              highlightEdges={highlightEdges}
              onNodeClick={setSelectedNode}
              filterTypes={activeFilters.length > 0 ? activeFilters : undefined}
              searchTerm={searchTerm || undefined}
            />
            {/* Legend */}
            <div className="absolute bottom-3 left-3 flex gap-2 rounded-lg border border-border bg-card/80 px-3 py-2 backdrop-blur-sm">
              {typeFilters.map(({ type, label }) => (
                <div key={type} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: nodeColors[type] }} />
                  {label}
                </div>
              ))}
            </div>
            {selectedNode && (
              <div className="absolute bottom-0 left-0 right-0">
                <NodeDetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
              </div>
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={35} minSize={25}>
          <ChatPanel onSearchResult={handleSearchResult} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Index;
