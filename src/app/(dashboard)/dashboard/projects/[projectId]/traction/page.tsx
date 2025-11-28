"use client";

import { useParams } from "next/navigation";
import { useQuery, useAction, useMutation } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Search, Eye, Users, Loader2, ExternalLink, Rocket, Target, TrendingUp, Mail, Clock, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { useState } from "react";
import ValidationPage, { type ValidationPageConfig } from "@/components/templates/ValidationPage";

export default function TractionPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  
  const project = useQuery(api.functions.projects.getProject, { projectId: projectId as any });
  const dna = useQuery(api.functions.projects.getDNA, { projectId: projectId as any });
  const signupStats = useQuery(api.functions.waitlist.getSignupStats, { projectId: projectId as any });
  const runAgent = useAction(api.orchestrator.runAgent);
  const deploySite = useMutation(api.agents.launchTest.deploySite);
  
  const [isRunningSignal, setIsRunningSignal] = useState(false);
  const [isRunningLaunchTest, setIsRunningLaunchTest] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  const validationData = dna?.validationData || {};
  const painPoints = dna?.painPoints || [];
  const landingPageConfig = validationData.landingPageConfig as ValidationPageConfig | undefined;
  const deployment = validationData.deployment;

  const signalsCount = painPoints.length;
  const siteViews = validationData.views || 0;
  const signups = signupStats?.total || 0;
  const conversionRate = siteViews > 0 ? ((signups / siteViews) * 100).toFixed(1) : "0.0";

  // Use real signup data for chart
  const trendData = signupStats?.dailyBreakdown || [
    { date: 'Mon', count: 0 },
    { date: 'Tue', count: 0 },
    { date: 'Wed', count: 0 },
    { date: 'Thu', count: 0 },
    { date: 'Fri', count: 0 },
    { date: 'Sat', count: 0 },
    { date: 'Sun', count: 0 },
  ];

  const handleRunSignal = async () => {
    try {
      setIsRunningSignal(true);
      toast("Scanning market signals...");
      await runAgent({ projectId: projectId as any, agentName: "SignalScanner" });
      toast.success("Signals gathered");
    } catch (error) {
      toast.error("Failed to scan signals");
    } finally {
      setIsRunningSignal(false);
    }
  };

  const handleRunLaunchTest = async () => {
    try {
      setIsRunningLaunchTest(true);
      toast("Generating landing page...");
      await runAgent({ projectId: projectId as any, agentName: "LaunchTest" });
      toast.success("Landing page generated");
    } catch (error) {
      toast.error("Failed to generate page");
    } finally {
      setIsRunningLaunchTest(false);
    }
  };

  const handleDeploy = async () => {
    try {
      setIsDeploying(true);
      toast("Deploying...");
      const result = await deploySite({ projectId: projectId as any });
      toast.success("Deployed successfully");
    } catch (error: any) {
      toast.error(error.message || "Deployment failed");
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRunSignal}
            disabled={isRunningSignal}
            className={cn(
              "h-8 px-3 text-[12px] font-medium rounded-md flex items-center gap-2 transition-all duration-150",
              isRunningSignal 
                ? "bg-[#27272A] text-white/40 cursor-not-allowed"
                : "bg-[#27272A] text-white/80 hover:bg-[#3F3F46]"
            )}
          >
            {isRunningSignal ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
            {isRunningSignal ? "Scanning..." : "Scan Signals"}
          </button>
          <button
            onClick={handleRunLaunchTest}
            disabled={isRunningLaunchTest}
            className={cn(
              "h-8 px-3 text-[12px] font-medium rounded-md flex items-center gap-2 transition-all duration-150",
              isRunningLaunchTest 
                ? "bg-[#27272A] text-white/40 cursor-not-allowed"
                : "bg-white text-black hover:bg-white/90"
            )}
          >
            {isRunningLaunchTest ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Eye className="w-3.5 h-3.5" />}
            {isRunningLaunchTest ? "Generating..." : "Generate Page"}
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#18181B] border border-[#27272A] rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-white/40" />
              <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">Signals</span>
            </div>
            <p className="text-[24px] font-semibold text-white tracking-tight">{signalsCount}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-[#18181B] border border-[#27272A] rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-white/40" />
              <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">Views</span>
            </div>
            <p className="text-[24px] font-semibold text-white tracking-tight">{siteViews}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#18181B] border border-[#27272A] rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-4 h-4 text-white/40" />
              <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">Signups</span>
            </div>
            <p className="text-[24px] font-semibold text-white tracking-tight">{signups}</p>
            {signupStats?.last24h ? (
              <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                +{signupStats.last24h} today
              </p>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[#18181B] border border-[#27272A] rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-white/40" />
              <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">Conversion</span>
            </div>
            <p className="text-[24px] font-semibold text-white tracking-tight">{conversionRate}%</p>
            {siteViews > 0 && signups > 0 && (
              <p className="text-[11px] text-white/30 mt-1">{signups} of {siteViews} visitors</p>
            )}
          </motion.div>
        </div>

        {/* Landing Page Preview - Browser Window Style */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-[#18181B] border border-[#27272A] rounded-lg overflow-hidden"
        >
          {/* Browser Chrome */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#27272A] bg-[#0A0A0A]">
            <div className="flex items-center gap-3">
              {/* Traffic Lights */}
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              {/* URL Bar */}
              <div className="flex items-center gap-2 px-3 py-1 bg-[#18181B] rounded-md">
                <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                <span className="text-[11px] text-white/40 font-mono">
                  {deployment?.url || `${project?.niche?.toLowerCase().replace(/\s+/g, '-') || 'your-product'}.found3r.dev`}
                </span>
              </div>
            </div>
            {landingPageConfig && (
              <div className="flex items-center gap-2">
                {deployment?.slug ? (
                  <a
                    href={deployment.url || `https://${deployment.slug}.found3r.dev`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-7 px-2.5 text-[11px] font-medium rounded flex items-center gap-1.5 bg-[#27272A] text-white/70 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View Live
                  </a>
                ) : (
                  <button
                    onClick={handleDeploy}
                    disabled={isDeploying}
                    className={cn(
                      "h-7 px-2.5 text-[11px] font-medium rounded flex items-center gap-1.5 transition-all duration-150",
                      isDeploying
                        ? "bg-[#27272A] text-white/40 cursor-not-allowed"
                        : "bg-white text-black hover:bg-white/90"
                    )}
                  >
                    {isDeploying ? <Loader2 className="w-3 h-3 animate-spin" /> : <Rocket className="w-3 h-3" />}
                    {isDeploying ? "Deploying..." : "Deploy"}
                  </button>
                )}
              </div>
            )}
          </div>
          {/* Content Area - Fixed height with internal scroll */}
          <div className="h-[calc(100vh-420px)] min-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 bg-[#050505]">
            {landingPageConfig ? (
              <div className="transform scale-[0.5] origin-top-left w-[200%]">
                <ValidationPage config={landingPageConfig} />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#18181B] flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-white/20" />
                </div>
                <p className="text-[14px] text-white/50 font-medium">No landing page yet</p>
                <p className="text-[12px] text-white/30 mt-1">Click "Generate Page" to create one</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Signup Trend */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#18181B] border border-[#27272A] rounded-lg p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-white/40" />
              <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider">Signups (Last 7 Days)</p>
            </div>
            {signupStats?.last7d ? (
              <span className="text-[11px] text-white/50">{signupStats.last7d} total</span>
            ) : null}
          </div>
          <div className="h-[180px]">
            {signups > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData}>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} 
                    axisLine={false} 
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} 
                    axisLine={false} 
                    tickLine={false}
                    width={25}
                    allowDecimals={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: '#27272A', 
                      border: '1px solid #3F3F46', 
                      borderRadius: '6px',
                      fontSize: '11px',
                      color: '#fff'
                    }}
                    formatter={(value: number) => [`${value} signups`, '']}
                    labelFormatter={(label) => label}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#fff"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                <p className="text-[13px] text-white/30">No signups yet</p>
                <p className="text-[11px] text-white/20 mt-1">Deploy your landing page to start collecting emails</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Signups */}
        {signupStats?.latestSignups && signupStats.latestSignups.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-[#18181B] border border-[#27272A] rounded-lg p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-4 h-4 text-white/40" />
              <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider">Recent Signups</p>
            </div>
            <div className="space-y-2">
              {signupStats.latestSignups.map((signup: any, i: number) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-[#27272A] last:border-0">
                  <span className="text-[13px] text-white/70 font-mono">{signup.email}</span>
                  <div className="flex items-center gap-2 text-[11px] text-white/30">
                    <Clock className="w-3 h-3" />
                    {new Date(signup.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Pain Points */}
        {painPoints.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-[#18181B] border border-[#27272A] rounded-lg p-5"
          >
            <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider mb-4">Pain Points</p>
            <div className="space-y-2">
              {painPoints.slice(0, 5).map((pain: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-md bg-[#27272A]/50">
                  <div className={cn(
                    "w-6 h-6 rounded flex items-center justify-center text-[10px] font-semibold shrink-0",
                    pain.urgencyScore >= 70 ? "bg-red-500/10 text-red-400" :
                    pain.urgencyScore >= 50 ? "bg-amber-500/10 text-amber-400" :
                    "bg-white/5 text-white/40"
                  )}>
                    {pain.urgencyScore || "—"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-white/80 font-medium">{pain.title}</p>
                    <p className="text-[12px] text-white/40 mt-0.5 line-clamp-1">{pain.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
