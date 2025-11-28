"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, Activity, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "chat" | "activity";

interface CoPilotProps {
  projectId: string;
  logs: any[];
  contextPhase?: string;
}

export default function CoPilot({ projectId, logs, contextPhase }: CoPilotProps) {
  const [tab, setTab] = useState<Tab>("chat");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  
  const chatMessages = useQuery(api.agents.copilot.getMessages, { projectId: projectId as any });
  const sendMessage = useMutation(api.agents.copilot.sendMessage);
  
  const messages = chatMessages || [];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, logs]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const msg = input;
    setInput("");
    setIsTyping(true);
    try {
      await sendMessage({ projectId: projectId as any, message: msg });
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const suggestions = {
    strategy: ["Find competitors", "Explain strategy", "What's our edge?"],
    traction: ["Why low conversion?", "Improve headline", "Analyze signals"],
    blueprint: ["Explain architecture", "What to build first?", "Simplify stack"],
    launchpad: ["Write Reddit post", "Draft cold email", "Best channels?"],
    command: ["What's next?", "Summarize progress", "Run analysis"],
  };

  const currentSuggestions = suggestions[contextPhase as keyof typeof suggestions] || suggestions.command;

  return (
    <div className="flex flex-col h-full bg-[#09090B]">
      {/* Header */}
      <div className="h-10 border-b border-[#1F1F23] flex items-center px-3 shrink-0">
        <p className="text-[12px] font-medium text-white/60">Co-Pilot</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#1F1F23] shrink-0">
        <button
          onClick={() => setTab("chat")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-medium transition-colors",
            tab === "chat" ? "text-white/80 border-b border-white/40" : "text-white/30 hover:text-white/50"
          )}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Chat
        </button>
        <button
          onClick={() => setTab("activity")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-medium transition-colors",
            tab === "activity" ? "text-white/80 border-b border-white/40" : "text-white/30 hover:text-white/50"
          )}
        >
          <Activity className="w-3.5 h-3.5" />
          Activity
          {logs.length > 0 && (
            <span className="text-[9px] text-white/30">{logs.length}</span>
          )}
        </button>
      </div>

      {/* Chat */}
      {tab === "chat" && (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.length === 0 ? (
              <div className="py-6">
                <div className="w-8 h-8 rounded-full bg-[#27272A] flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-4 h-4 text-white/40" />
                </div>
                <p className="text-[12px] text-white/50 text-center mb-4">Ask anything about your project</p>
                <div className="space-y-1.5">
                  {currentSuggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(s)}
                      className="w-full text-left px-3 py-2 rounded-md bg-[#18181B] border border-[#27272A] hover:border-[#3F3F46] transition-colors text-[11px] text-white/50 hover:text-white/70"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg: any, i: number) => (
                  <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[85%] px-3 py-2 rounded-lg text-[12px] leading-relaxed",
                      msg.role === "user" 
                        ? "bg-white text-black" 
                        : "bg-[#18181B] text-white/70 border border-[#27272A]"
                    )}>
                      {msg.message}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="px-3 py-2 rounded-lg bg-[#18181B] border border-[#27272A]">
                      <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-white/30 animate-pulse" />
                        <div className="w-1 h-1 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: "150ms" }} />
                        <div className="w-1 h-1 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={endRef} />
          </div>
          
          {/* Input */}
          <div className="p-3 border-t border-[#1F1F23] shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask..."
                className="flex-1 h-9 px-3 rounded-md bg-[#18181B] border border-[#27272A] text-[12px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#3F3F46] transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="h-9 w-9 rounded-md bg-white text-black flex items-center justify-center transition-all duration-150 disabled:opacity-30 hover:bg-white/90"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activity */}
      {tab === "activity" && (
        <div className="flex-1 overflow-y-auto p-3 min-h-0">
          {logs.length > 0 ? (
            <div className="space-y-1">
              {logs.slice().reverse().map((log: any, i: number) => (
                <div key={i} className="px-2 py-1.5 rounded bg-[#18181B] text-[10px] leading-relaxed">
                  <span className="text-white/40 font-medium">{log.agentName}</span>
                  <span className="text-white/25 mx-1.5">·</span>
                  <span className="text-white/40">{log.log}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <Activity className="w-6 h-6 text-white/20 mb-2" />
              <p className="text-[11px] text-white/30">No activity</p>
            </div>
          )}
          <div ref={endRef} />
        </div>
      )}
    </div>
  );
}
