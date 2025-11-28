"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Target, 
  Map, 
  BarChart3, 
  Rocket,
  ArrowRight,
  TrendingUp,
  Users,
  Flame,
  Activity,
  Eye,
  Mail,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const STAGES = [
  { id: "pain", label: "Signals" },
  { id: "strategy", label: "Strategy" },
  { id: "smoketest", label: "Validation" },
  { id: "techspec", label: "Blueprint" },
  { id: "launch", label: "Launch" },
];

export default function CommandPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  
  const project = useQuery(api.functions.projects.getProject, { projectId: projectId as any });
  const dna = useQuery(api.functions.projects.getDNA, { projectId: projectId as any });
  const logs = useQuery(api.functions.projects.getAgentLogs, { projectId: projectId as any });
  const funnelStats = useQuery(api.analytics.getFunnelStats, { projectId: projectId as any });

  const painPoints = dna?.painPoints || [];
  const insights = dna?.insights || {};
  const validationData = dna?.validationData || {};
  const techStack = dna?.techStack || {};

  const status: Record<string, boolean> = {
    pain: painPoints.length > 0,
    strategy: !!insights.selectedStrategy,
    smoketest: !!validationData.landingPageConfig,
    techspec: !!techStack.architecture,
    launch: !!validationData.deployment?.slug,
  };

  const completed = Object.values(status).filter(Boolean).length;
  const progress = Math.round((completed / 5) * 100);

  const getNextStep = () => {
    if (!status.pain) return { label: "Gather market signals", href: `/dashboard/projects/${projectId}/traction` };
    if (!status.strategy) return { label: "Define your strategy", href: `/dashboard/projects/${projectId}/strategy` };
    if (!status.smoketest) return { label: "Create landing page", href: `/dashboard/projects/${projectId}/traction` };
    if (!status.techspec) return { label: "Generate blueprint", href: `/dashboard/projects/${projectId}/blueprint` };
    if (!status.launch) return { label: "Prepare for launch", href: `/dashboard/projects/${projectId}/launchpad` };
    return { label: "Monitor and iterate", href: `/dashboard/projects/${projectId}/traction` };
  };

  const nextStep = getNextStep();

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        
        {/* Progress Overview */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-2 bg-[#18181B] border border-[#27272A] rounded-lg p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider">Progress</p>
                <p className="text-[28px] font-semibold text-white mt-1 tracking-tight">{progress}%</p>
              </div>
              <div className={cn(
                "px-2.5 py-1 rounded-md text-[11px] font-medium",
                progress >= 80 ? "bg-emerald-500/10 text-emerald-400" :
                progress >= 40 ? "bg-amber-500/10 text-amber-400" :
                "bg-white/5 text-white/40"
              )}>
                {completed}/5 complete
              </div>
            </div>
            
            {/* Stage indicators */}
            <div className="flex gap-1.5">
              {STAGES.map((stage) => {
                const isDone = status[stage.id];
                return (
                  <div
                    key={stage.id}
                    className={cn(
                      "flex-1 h-1.5 rounded-full transition-colors",
                      isDone ? "bg-white" : "bg-[#27272A]"
                    )}
                  />
                );
              })}
            </div>
            
            <div className="flex justify-between mt-2">
              {STAGES.map((stage) => (
                <span key={stage.id} className="text-[10px] text-white/30">{stage.label}</span>
              ))}
            </div>
          </motion.div>

          {/* Next Action */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <Link
              href={nextStep.href}
              className="block h-full bg-[#18181B] border border-[#27272A] rounded-lg p-5 hover:border-[#3F3F46] transition-colors group"
            >
              <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider">Next step</p>
              <p className="text-[14px] font-medium text-white mt-2 leading-snug">{nextStep.label}</p>
              <div className="mt-4 flex items-center gap-1.5 text-white/40 group-hover:text-white/60 transition-colors">
                <span className="text-[12px]">Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* V2 Validation Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#18181B] border border-[#27272A] rounded-lg p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider">Validation Funnel</p>
            {funnelStats?.isLive && funnelStats?.deployedUrl && (
              <a 
                href={funnelStats.deployedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
              >
                View Live <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          
          {/* Funnel Visualization */}
          <div className="grid grid-cols-3 gap-4">
            {/* Signals Found */}
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-blue-400" />
                <span className="text-[11px] font-medium text-white/60">Signals Found</span>
              </div>
              <p className="text-[32px] font-bold text-white tracking-tight">
                {funnelStats?.signalsFound || painPoints.length || 0}
              </p>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-white/10">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            {/* Page Views */}
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-purple-400" />
                <span className="text-[11px] font-medium text-white/60">Page Views</span>
              </div>
              <p className="text-[32px] font-bold text-white tracking-tight">
                {funnelStats?.pageViews || 0}
              </p>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-white/10">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            {/* Leads Captured */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-medium text-white/60">Leads Captured</span>
              </div>
              <p className="text-[32px] font-bold text-emerald-400 tracking-tight">
                {funnelStats?.leadsCaptured || 0}
              </p>
            </div>
          </div>

          {/* Conversion Rate */}
          {(funnelStats?.pageViews || 0) > 0 && (
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/40">Conversion Rate</span>
                <span className={cn(
                  "text-[14px] font-semibold",
                  (funnelStats?.conversionRate || 0) >= 5 ? "text-emerald-400" :
                  (funnelStats?.conversionRate || 0) >= 2 ? "text-amber-400" : "text-white/60"
                )}>
                  {funnelStats?.conversionRate || 0}%
                </span>
              </div>
            </div>
          )}

          {/* Not Live State */}
          {!funnelStats?.isLive && validationData.landingPageConfig && (
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-[12px] text-amber-400/80">
                Landing page generated but not deployed. Go to Traction to deploy.
              </p>
            </div>
          )}
        </motion.div>

        {/* Strategy Card */}
        {insights.selectedStrategy && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#18181B] border border-[#27272A] rounded-lg p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider">Active Strategy</p>
                <p className="text-[16px] font-medium text-white mt-1">{insights.selectedStrategy.name}</p>
                {insights.selectedStrategy.description && (
                  <p className="text-[13px] text-white/50 mt-1 max-w-xl">{insights.selectedStrategy.description}</p>
                )}
              </div>
              <Link
                href={`/dashboard/projects/${projectId}/strategy`}
                className="text-[12px] text-white/40 hover:text-white/60 transition-colors flex items-center gap-1"
              >
                View <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* Activity Log */}
        {logs && logs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-[#18181B] border border-[#27272A] rounded-lg p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-white/40" />
              <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider">Recent Activity</p>
            </div>
            <div className="space-y-3">
              {logs.slice(0, 5).map((log: any, i: number) => (
                <div key={log._id || i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-medium text-white/60">{log.agentName}</span>
                      <span className="text-[10px] text-white/20">
                        {new Date(log._creationTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-[12px] text-white/40 mt-0.5 line-clamp-1">{log.log}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!logs?.length && !insights.selectedStrategy && painPoints.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#18181B] border border-[#27272A] rounded-lg p-8 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#27272A] flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-white/40" />
            </div>
            <p className="text-[14px] font-medium text-white/80">No data yet</p>
            <p className="text-[13px] text-white/40 mt-1 max-w-sm mx-auto">
              Run the analysis from the header to start gathering market intelligence
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
