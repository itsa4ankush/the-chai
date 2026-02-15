import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    title: "1. Query Input",
    desc: "User asks a natural language question about Ghana's healthcare system.",
    color: "bg-blue-500/20 text-blue-400",
  },
  {
    title: "2. Tokenization",
    desc: "The query is broken into meaningful keywords, filtering out stop words.",
    color: "bg-green-500/20 text-green-400",
  },
  {
    title: "3. Node Matching",
    desc: "Each node in the knowledge graph is scored against the query tokens by label, type, and details.",
    color: "bg-orange-500/20 text-orange-400",
  },
  {
    title: "4. Subgraph Retrieval",
    desc: "Top-scoring nodes are expanded 1-hop to retrieve relevant neighbors and edges — the 'retrieval' in RAG.",
    color: "bg-purple-500/20 text-purple-400",
  },
  {
    title: "5. Answer Generation",
    desc: "The retrieved subgraph context is assembled into a structured answer with entity details and connections.",
    color: "bg-amber-500/20 text-amber-400",
  },
];

export default function HowItWorksPanel() {
  return (
    <Card className="border-border bg-card/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">How Graph RAG Works</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-semibold ${step.color}`}>
                Step {i + 1}
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">{step.title}</p>
                <p className="text-[11px] text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
          {["Query", "Tokenize", "Match", "Retrieve", "Answer"].map((s, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className="rounded bg-muted px-1.5 py-0.5">{s}</span>
              {i < 4 && <ArrowRight className="h-3 w-3" />}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
