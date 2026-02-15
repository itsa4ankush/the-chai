import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { searchGraph, type SearchResult } from "@/lib/graphSearch";

interface Message {
  role: "user" | "assistant";
  content: string;
  result?: SearchResult;
}

interface Props {
  onSearchResult?: (result: SearchResult) => void;
}

const sampleQuestions = [
  "Which hospitals in Accra have MRI scanners?",
  "What specialties does Aisha Hospital offer?",
  "Which facilities are in the Northern region?",
  "Which clinics specialize in ophthalmology?",
];

export default function ChatPanel({ onSearchResult }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (query?: string) => {
    const q = query || input.trim();
    if (!q) return;

    const userMsg: Message = { role: "user", content: q };
    const result = searchGraph(q);
    const assistantMsg: Message = { role: "assistant", content: result.answer, result };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    onSearchResult?.(result);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-4 py-3">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Sparkles className="h-4 w-4 text-amber-400" />
          Graph RAG Q&A
        </h2>
        <p className="text-xs text-muted-foreground">Ask questions about Ghana's healthcare system</p>
      </div>

      <ScrollArea className="flex-1 px-4 py-3">
        {messages.length === 0 && (
          <div className="space-y-2 pt-4">
            <p className="text-xs text-muted-foreground">Try asking:</p>
            {sampleQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="block w-full rounded-lg border border-border bg-card/50 px-3 py-2 text-left text-xs text-foreground transition-colors hover:bg-accent"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`mb-3 ${msg.role === "user" ? "flex justify-end" : ""}`}>
            <div
              className={`max-w-[90%] rounded-lg px-3 py-2 text-xs ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {msg.role === "assistant" ? (
                <div className="space-y-1 whitespace-pre-wrap">
                  {msg.content.split("**").map((part, j) =>
                    j % 2 === 1 ? (
                      <strong key={j}>{part}</strong>
                    ) : (
                      <span key={j}>{part}</span>
                    )
                  )}
                  {msg.result && (
                    <div className="mt-2 rounded border border-border/50 bg-background/50 p-2 text-[10px] text-muted-foreground">
                      📊 Traversed {msg.result.relevantNodes.length} nodes, {msg.result.relevantEdges.length} edges
                      {msg.result.paths.length > 0 && (
                        <div className="mt-1">
                          Paths: {msg.result.paths.slice(0, 3).map((p) => p.join(" → ")).join(" | ")}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </ScrollArea>

      <div className="border-t border-border p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Ghana's healthcare..."
            className="h-8 text-xs"
          />
          <Button type="submit" size="icon" className="h-8 w-8 shrink-0">
            <Send className="h-3 w-3" />
          </Button>
        </form>
      </div>
    </div>
  );
}
