"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import { motion } from "framer-motion";
import { Target, Construction, ArrowRight } from "lucide-react";
import Link from "next/link";

// V2: Strategy page - simplified placeholder
export default function StrategyPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  
  const dna = useQuery(api.functions.projects.getDNA, { projectId: projectId as any });
  const insights = dna?.insights || {};
  const selectedStrategy = insights.selectedStrategy;

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        
        {/* V2 Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#18181B] border border-[#27272A] rounded-lg p-8 text-center"
        >
          <div className="w-12 h-12 rounded-full bg-[#27272A] flex items-center justify-center mx-auto mb-4">
            <Construction className="w-6 h-6 text-amber-400" />
          </div>
          <h2 className="text-[16px] font-semibold text-white mb-2">Strategy Module Coming Soon</h2>
          <p className="text-[13px] text-white/50 max-w-md mx-auto mb-6">
            Competitor analysis and strategic positioning features are being rebuilt for V2.
            For now, focus on validating your signals and launching your test page.
          </p>
          <Link
            href={`/dashboard/projects/${projectId}/traction`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-[13px] font-medium hover:bg-white/90 transition-colors"
          >
            Go to Traction <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Show existing strategy if any */}
        {selectedStrategy && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#18181B] border border-[#27272A] rounded-lg p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-emerald-400" />
              <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider">Active Strategy (Legacy)</p>
            </div>
            <h4 className="text-[14px] font-medium text-white mb-1">{selectedStrategy.name}</h4>
            {selectedStrategy.description && (
              <p className="text-[12px] text-white/50">{selectedStrategy.description}</p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
