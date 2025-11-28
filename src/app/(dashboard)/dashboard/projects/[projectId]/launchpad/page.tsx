"use client";

import { useParams } from "next/navigation";
import { useQuery, useAction } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import { motion } from "framer-motion";
import { Rocket, Copy, ExternalLink, Loader2, MessageSquare, Mail, Hash, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function LaunchpadPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  
  const dna = useQuery(api.functions.projects.getDNA, { projectId: projectId as any });
  const runAgent = useAction(api.orchestrator.runAgent);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const gtmStrategy = dna?.gtmStrategy || {};
  const assets = gtmStrategy.assets || [];
  const channels = gtmStrategy.channels || [];

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      toast("Generating assets...");
      await runAgent({ projectId: projectId as any, agentName: "DistributionKit" });
      toast.success("Assets generated");
    } catch (error) {
      toast.error("Failed to generate assets");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Copied");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const CHANNEL_ICONS: Record<string, any> = {
    reddit: Hash,
    email: Mail,
    twitter: MessageSquare,
    linkedin: MessageSquare,
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
            {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Rocket className="w-3.5 h-3.5" />}
            {isGenerating ? "Generating..." : "Generate Assets"}
          </button>
        </div>

        {/* Assets */}
        {assets.length > 0 ? (
          <div className="space-y-4">
            {assets.map((asset: any, i: number) => {
              const Icon = CHANNEL_ICONS[asset.channel?.toLowerCase()] || MessageSquare;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-[#18181B] border border-[#27272A] rounded-lg overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[#27272A]">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-md bg-[#27272A] flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-white/40" />
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-white/80">{asset.title || asset.channel}</p>
                        <p className="text-[11px] text-white/30">{asset.channel}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(asset.content, i)}
                      className="h-7 px-2.5 text-[11px] font-medium rounded-md bg-[#27272A] text-white/50 hover:text-white/70 hover:bg-[#3F3F46] flex items-center gap-1.5 transition-colors"
                    >
                      {copiedIndex === i ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copiedIndex === i ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="p-4">
                    <pre className="text-[12px] text-white/50 whitespace-pre-wrap font-mono leading-relaxed">
                      {asset.content}
                    </pre>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#18181B] border border-[#27272A] rounded-lg p-12 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#27272A] flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-6 h-6 text-white/30" />
            </div>
            <p className="text-[14px] font-medium text-white/70 mb-1">No assets</p>
            <p className="text-[13px] text-white/40 max-w-sm mx-auto">
              Click "Generate Assets" to create distribution content
            </p>
          </motion.div>
        )}

        {/* Channels */}
        {channels.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#18181B] border border-[#27272A] rounded-lg p-5"
          >
            <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider mb-4">Recommended Channels</p>
            <div className="grid grid-cols-3 gap-3">
              {channels.map((channel: any, i: number) => (
                <div key={i} className="p-3 rounded-md bg-[#27272A]/50">
                  <p className="text-[13px] font-medium text-white/70">{channel.name}</p>
                  <p className="text-[11px] text-white/40 mt-1">{channel.reason}</p>
                  {channel.url && (
                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-white/50 hover:text-white/70 flex items-center gap-1 mt-2 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Visit
                    </a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
