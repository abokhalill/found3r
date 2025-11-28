"use client";

import { useParams } from "next/navigation";
import { useQuery, useAction, useMutation } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Loader2, ChevronDown, ChevronUp, CheckCircle2, Circle, Clock, AlertCircle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function BlueprintPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  
  const dna = useQuery(api.functions.projects.getDNA, { projectId: projectId as any });
  const tasks = useQuery(api.functions.tasks.getTasks, { projectId: projectId as any });
  const runAgent = useAction(api.orchestrator.runAgent);
  const updateTicketStatus = useMutation(api.functions.tasks.updateTask);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [graphExpanded, setGraphExpanded] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [svgContent, setSvgContent] = useState<string>("");

  const techStack = dna?.techStack || {};
  const mermaidDiagram = techStack.mermaidGraph;
  const features = techStack.features || [];

  // Mermaid rendering - using render() for CSP compliance
  useEffect(() => {
    if (mermaidDiagram && graphExpanded) {
      import('mermaid').then(async (mermaid) => {
        mermaid.default.initialize({ 
          startOnLoad: false, 
          theme: 'dark',
          securityLevel: 'loose',
          themeVariables: {
            primaryColor: '#0070F3',
            primaryTextColor: '#fff',
            primaryBorderColor: '#333',
            lineColor: '#555',
            secondaryColor: '#1a1a1a',
            tertiaryColor: '#0a0a0a',
          }
        });
        try {
          const { svg } = await mermaid.default.render('mermaid-graph', mermaidDiagram);
          setSvgContent(svg);
        } catch (error) {
          console.error('Mermaid render error:', error);
          setSvgContent('');
        }
      });
    }
  }, [mermaidDiagram, graphExpanded]);

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      toast("Generating architecture...");
      await runAgent({ projectId: projectId as any, agentName: "BuildPlanner" });
      toast.success("Blueprint generated");
    } catch (error) {
      toast.error("Failed to generate blueprint");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleMarkComplete = async (ticketId: string) => {
    try {
      await updateTicketStatus({ taskId: ticketId as any, status: "done" });
      toast.success("Marked complete");
      setSelectedTicket(null);
    } catch (error) {
      toast.error("Failed to update ticket");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "done": return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case "in_progress": return <Clock className="w-4 h-4 text-amber-400" />;
      case "blocked": return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <Circle className="w-4 h-4 text-[#8A8F98]" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/20 text-red-400";
      case "medium": return "bg-amber-500/20 text-amber-400";
      default: return "bg-white/10 text-[#8A8F98]";
    }
  };

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={cn(
              "h-8 px-3 text-[12px] font-medium rounded-md flex items-center gap-2 transition-all duration-150",
              isGenerating 
                ? "bg-[#27272A] text-white/40 cursor-not-allowed"
                : "bg-white text-black hover:bg-white/90"
            )}
          >
            {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
            {isGenerating ? "Generating..." : "Generate Blueprint"}
          </button>
        </div>

        {/* Architecture Graph */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#18181B] border border-[#27272A] rounded-lg overflow-hidden"
        >
          <button
            onClick={() => setGraphExpanded(!graphExpanded)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-white/40" />
              <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">Architecture</span>
              {mermaidDiagram && (
                <span className="text-[10px] text-emerald-400">Ready</span>
              )}
            </div>
            {graphExpanded ? <ChevronUp className="w-4 h-4 text-white/30" /> : <ChevronDown className="w-4 h-4 text-white/30" />}
          </button>
          
          <AnimatePresence>
            {graphExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-[#27272A]"
              >
                <div className="p-4">
                  {mermaidDiagram ? (
                    <>
                      {svgContent ? (
                        <div 
                          className="flex justify-center [&>svg]:max-w-full"
                          dangerouslySetInnerHTML={{ __html: svgContent }}
                        />
                      ) : (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="w-5 h-5 text-white/30 animate-spin" />
                        </div>
                      )}
                      
                      {techStack.stack && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {Object.entries(techStack.stack).map(([category, tech]: [string, any]) => (
                            <div key={category} className="px-2.5 py-1 rounded-md bg-[#27272A] text-[11px]">
                              <span className="text-white/30">{category}: </span>
                              <span className="text-white/60">{tech}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="py-8 text-center">
                      <div className="w-10 h-10 rounded-full bg-[#27272A] flex items-center justify-center mx-auto mb-3">
                        <GitBranch className="w-5 h-5 text-white/30" />
                      </div>
                      <p className="text-[13px] text-white/50">No architecture</p>
                      <p className="text-[12px] text-white/30 mt-1">Click "Generate Blueprint" to create one</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tickets */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#18181B] border border-[#27272A] rounded-lg p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider">Tickets</p>
            <span className="text-[11px] text-white/30">
              {tasks?.filter((t: any) => t.status === "done").length || 0}/{tasks?.length || 0}
            </span>
          </div>

          {tasks && tasks.length > 0 ? (
            <div className="space-y-2">
              {tasks.map((ticket: any, i: number) => (
                <button
                  key={ticket._id}
                  onClick={() => setSelectedTicket({ ...ticket, displayId: `FND-${i + 1}` })}
                  className="w-full flex items-center gap-3 p-3 rounded-md bg-[#27272A]/50 hover:bg-[#27272A] transition-colors text-left"
                >
                  {getStatusIcon(ticket.status)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] text-white/30 font-mono">FND-{i + 1}</span>
                      <span className={cn("text-[10px] px-1.5 py-0.5 rounded", getPriorityColor(ticket.priority))}>
                        {ticket.priority}
                      </span>
                    </div>
                    <p className="text-[13px] text-white/70 truncate">{ticket.title}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-[13px] text-white/50">No tickets</p>
              <p className="text-[12px] text-white/30 mt-1">Generate a blueprint to create tickets</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Ticket Detail Sheet */}
      <Sheet open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <SheetContent className="bg-[#0A0A0A] border-l border-white/10 w-[500px]">
          <SheetHeader>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] text-[#8A8F98] font-mono">{selectedTicket?.displayId}</span>
              <span className={cn("text-[9px] px-1.5 py-0.5 rounded", getPriorityColor(selectedTicket?.priority))}>
                {selectedTicket?.priority}
              </span>
            </div>
            <SheetTitle className="text-white text-left">{selectedTicket?.title}</SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            {/* Status */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#8A8F98] mb-2">Status</p>
              <div className="flex items-center gap-2">
                {getStatusIcon(selectedTicket?.status)}
                <span className="text-[12px] text-white capitalize">{selectedTicket?.status?.replace("_", " ")}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#8A8F98] mb-2">Description</p>
              <div className="prose prose-invert prose-sm max-w-none text-[#8A8F98]">
                <ReactMarkdown>{selectedTicket?.description || "No description"}</ReactMarkdown>
              </div>
            </div>

            {/* Agent Reasoning */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#8A8F98] mb-2">Agent Reasoning</p>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-[11px] text-[#8A8F98]">
                  Created by <span className="text-white">{selectedTicket?.agentAuthor}</span> based on market signals and strategic direction.
                </p>
              </div>
            </div>

            {/* Actions */}
            {selectedTicket?.status !== "done" && (
              <button
                onClick={() => handleMarkComplete(selectedTicket?._id)}
                className="w-full h-10 px-4 text-xs font-medium rounded-md bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 flex items-center justify-center gap-2 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                Mark as Complete
              </button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
