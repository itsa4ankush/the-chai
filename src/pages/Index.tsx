import { useState, useMemo } from "react";
import { Search, Info, Network, Map } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import GraphVisualization from "@/components/GraphVisualization";
import MapVisualization from "@/components/MapVisualization";
import ChatPanel from "@/components/ChatPanel";
import NodeDetailPanel from "@/components/NodeDetailPanel";
import HowItWorksPanel from "@/components/HowItWorksPanel";
import { ghanaHealthcareData, nodeColors, nodeIcons, type NodeType, type GraphNode } from "@/data/ghanaHealthcare";
import type { SearchResult } from "@/lib/graphSearch";

const typeFilters: { type: NodeType; label: string }[] = [
  { type: "region", label: "Regions" },
  { type: "facility", label: "Facilities" },
  { type: "specialty", label: "Specialties" },
  { type: "equipment", label: "Equipment" },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<NodeType[]>([]);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [highlightNodes, setHighlightNodes] = useState<Set<string>>(new Set());
  const [highlightEdges, setHighlightEdges] = useState<Array<{ source: string; target: string }>>([]);
  const [viewMode, setViewMode] = useState<"graph" | "map">("graph");

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
      specialties: nodes.filter((n) => n.type === "specialty").length,
      equipment: nodes.filter((n) => n.type === "equipment").length,
      edges: ghanaHealthcareData.edges.length,
    };
  }, []);

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Disclaimer Banner */}
      <div className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-2 text-center">
        <p className="text-xs font-medium text-amber-300">
          ⚠️ <strong>Disclaimer:</strong> This is a visualization of a sample dataset from one of the{" "}
          <span className="font-bold text-amber-200">Hack Nation AI</span> hackathons and is for learning purposes only.
        </p>
      </div>
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex items-center gap-3">
          <Network className="h-5 w-5 text-primary" />
          <div>
            <h1 className="text-sm font-bold text-foreground">Ghana Healthcare Graph RAG</h1>
            <p className="text-[10px] text-muted-foreground">
              {stats.facilities} facilities · {stats.specialties} specialties · {stats.equipment} equipment · {stats.regions} regions · {stats.edges} relationships
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "graph" | "map")}>
            <TabsList className="h-7">
              <TabsTrigger value="graph" className="h-6 text-[10px] px-2 gap-1">
                <Network className="h-3 w-3" /> Graph
              </TabsTrigger>
              <TabsTrigger value="map" className="h-6 text-[10px] px-2 gap-1">
                <Map className="h-3 w-3" /> Map
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter..."
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
            {viewMode === "graph" ? (
              <>
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
              </>
            ) : (
              <MapVisualization
                filterTypes={activeFilters.length > 0 ? activeFilters : undefined}
                searchTerm={searchTerm || undefined}
              />
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
