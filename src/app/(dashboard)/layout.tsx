"use client";

import { useQuery, useMutation, useAction } from "convex/react";
import { useConvexAuth } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, ChevronDown, Plus, LayoutDashboard,
  BarChart3, Rocket, Loader2, PanelRightClose, PanelRight,
  Zap, LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import CoPilot from "@/components/CoPilot";
import { SignOutButton } from "@clerk/nextjs";

const PHASES = [
  { id: "command", icon: LayoutDashboard, label: "Overview", path: "" },
  { id: "traction", icon: BarChart3, label: "Traction", path: "/traction" },
  { id: "launchpad", icon: Rocket, label: "Launch", path: "/launchpad" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const user = useQuery(api.users.getCurrent, isAuthenticated ? {} : "skip");
  const projects = useQuery(api.functions.projects.getProjects, isAuthenticated ? undefined : "skip");
  const syncUser = useMutation(api.users.syncUser);
  const router = useRouter();
  const pathname = usePathname();
  const { user: clerkUser } = useUser();
  
  const [projectSwitcherOpen, setProjectSwitcherOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);

  // Extract current project ID and phase from pathname
  const projectIdMatch = pathname.match(/\/projects\/([^/]+)/);
  const currentProjectId = projectIdMatch ? projectIdMatch[1] : null;
  
  // Get current project data
  const currentProject = useQuery(
    api.functions.projects.getProject, 
    currentProjectId ? { projectId: currentProjectId as any } : "skip"
  );
  const logs = useQuery(
    api.agent_logs.get, 
    currentProjectId ? { projectId: currentProjectId as any } : "skip"
  );
  const runBigBang = useAction(api.validation.runFullSweep.runBigBang);
  const sweepStatus = useQuery(
    api.validation.runFullSweep.getSweepStatus, 
    currentProjectId ? { projectId: currentProjectId as any } : "skip"
  );
  
  const [isRunningSweep, setIsRunningSweep] = useState(false);

  // Determine active phase
  const getActivePhase = () => {
    if (pathname.includes("/traction")) return "traction";
    if (pathname.includes("/launchpad")) return "launchpad";
    return "command";
  };
  const activePhase = getActivePhase();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) return;
    if (user === undefined) return;

    if (user === null) {
      syncUser().catch(console.error);
      return;
    }

    if (user && !user.onboardingCompleted) {
      router.push("/onboarding");
    }
  }, [isAuthenticated, isLoading, user, router, syncUser]);

  const handleBigBang = async () => {
    if (!currentProjectId) return;
    try {
      setIsRunningSweep(true);
      toast("Launching Big Bang analysis...", { icon: "🚀" });
      const result = await runBigBang({ projectId: currentProjectId as any });
      if (result.success) {
        toast.success("Dashboard populated! Explore your data.", { icon: "✨" });
      } else {
        toast.error(result.error || "Analysis failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Analysis failed");
    } finally {
      setIsRunningSweep(false);
    }
  };

  // Loading state
  if (isLoading || (isAuthenticated && user === undefined)) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#0A0A0A]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-white/50 animate-spin" />
          <p className="text-sm text-[#8A8F98]">Loading...</p>
        </div>
      </div>
    );
  }

  const isInsideProject = !!currentProjectId;

  return (
    <div className="min-h-screen bg-[#09090B] flex">
      {/* Sidebar */}
      <aside className="w-[220px] border-r border-[#1F1F23] bg-[#09090B] flex flex-col fixed h-screen z-40">
        {/* Logo / Project Switcher */}
        <div className="h-14 border-b border-[#1F1F23] flex items-center px-4">
          {isInsideProject && currentProject ? (
            <div className="relative flex-1">
              <button
                onClick={() => setProjectSwitcherOpen(!projectSwitcherOpen)}
                className="w-full flex items-center gap-3 py-1 group"
              >
                <div className="w-7 h-7 rounded-md bg-[#18181B] flex items-center justify-center text-[10px] font-semibold text-white/90">
                  {currentProject.name?.charAt(0)?.toUpperCase()}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-[13px] font-medium text-white/90 truncate leading-tight">{currentProject.name}</p>
                </div>
                <ChevronDown className={cn(
                  "w-4 h-4 text-white/40 transition-transform duration-200",
                  projectSwitcherOpen && "rotate-180"
                )} />
              </button>
              
              <AnimatePresence>
                {projectSwitcherOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-[#18181B] border border-[#27272A] rounded-lg shadow-xl overflow-hidden z-50"
                  >
                    <div className="max-h-[240px] overflow-y-auto py-1">
                      {projects?.map((project: any) => (
                        <Link
                          key={project._id}
                          href={`/dashboard/projects/${project._id}`}
                          onClick={() => setProjectSwitcherOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 transition-colors",
                            project._id === currentProjectId 
                              ? "bg-white/5" 
                              : "hover:bg-white/5"
                          )}
                        >
                          <div className="w-6 h-6 rounded bg-[#27272A] flex items-center justify-center text-[9px] font-semibold text-white/80">
                            {project.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <span className="text-[13px] text-white/80 truncate">{project.name}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-[#27272A]">
                      <Link
                        href="/dashboard"
                        onClick={() => setProjectSwitcherOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-white/50 hover:text-white/80 hover:bg-white/5 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="text-[13px]">New project</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center">
                <span className="text-[11px] font-bold text-black">F</span>
              </div>
              <span className="text-[14px] font-semibold text-white/90 tracking-tight">Found3r</span>
            </Link>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 px-2 overflow-y-auto">
          {isInsideProject ? (
            <div className="space-y-0.5">
              {PHASES.map((phase) => {
                const isActive = activePhase === phase.id;
                const href = `/dashboard/projects/${currentProjectId}${phase.path}`;
                
                return (
                  <Link
                    key={phase.id}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-all duration-150",
                      isActive 
                        ? "bg-white/[0.08] text-white" 
                        : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
                    )}
                  >
                    <phase.icon className={cn("w-4 h-4", isActive ? "text-white" : "text-white/40")} />
                    {phase.label}
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="space-y-0.5">
              {projects?.map((project: any) => (
                <Link
                  key={project._id}
                  href={`/dashboard/projects/${project._id}`}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-[13px] text-white/50 hover:text-white/80 hover:bg-white/[0.04] transition-all duration-150"
                >
                  <div className="w-5 h-5 rounded bg-[#27272A] flex items-center justify-center text-[9px] font-semibold text-white/60">
                    {project.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <span className="truncate">{project.name}</span>
                </Link>
              ))}
              {(!projects || projects.length === 0) && (
                <div className="px-3 py-8 text-center">
                  <p className="text-[13px] text-white/30">No projects</p>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* User */}
        <div className="border-t border-[#1F1F23] p-2">
          <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/[0.04] transition-colors group">
            {clerkUser?.imageUrl ? (
              <img src={clerkUser.imageUrl} alt="" className="w-7 h-7 rounded-full" />
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#27272A] flex items-center justify-center text-[10px] font-medium text-white/60">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-white/80 truncate">{user?.name || "User"}</p>
            </div>
          </div>
          <div className="flex gap-1 mt-1">
            <Link
              href="/dashboard/settings"
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-[12px] transition-all duration-150",
                pathname === "/dashboard/settings" 
                  ? "bg-white/[0.08] text-white/80" 
                  : "text-white/40 hover:text-white/60 hover:bg-white/[0.04]"
              )}
            >
              <Settings className="w-3.5 h-3.5" />
              Settings
            </Link>
            <SignOutButton>
              <button className="flex items-center justify-center px-3 py-2 rounded-md text-white/40 hover:text-white/60 hover:bg-white/[0.04] transition-all duration-150">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </SignOutButton>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-[220px] flex flex-col min-h-screen bg-[#09090B]">
        {/* Header */}
        {isInsideProject && (
          <header className="h-12 border-b border-[#1F1F23] flex items-center justify-between px-4 bg-[#09090B] shrink-0 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <h1 className="text-[14px] font-medium text-white/90 capitalize">{activePhase}</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleBigBang}
                disabled={isRunningSweep}
                className={cn(
                  "h-8 px-3 text-[12px] font-medium rounded-md flex items-center gap-2 transition-all duration-150",
                  isRunningSweep
                    ? "bg-[#27272A] text-white/40 cursor-not-allowed"
                    : "bg-white text-black hover:bg-white/90 active:scale-[0.98]"
                )}
              >
                {isRunningSweep ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Zap className="w-3.5 h-3.5" />
                )}
                {isRunningSweep ? "Analyzing..." : "Run Analysis"}
              </button>
              <button
                onClick={() => setCopilotOpen(!copilotOpen)}
                className={cn(
                  "h-8 w-8 rounded-md flex items-center justify-center transition-all duration-150",
                  copilotOpen 
                    ? "bg-white/10 text-white" 
                    : "text-white/40 hover:text-white/60 hover:bg-white/[0.04]"
                )}
              >
                {copilotOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRight className="w-4 h-4" />}
              </button>
            </div>
          </header>
        )}

        {/* Progress Bar */}
        <AnimatePresence>
          {(isRunningSweep || (sweepStatus && sweepStatus.phase !== "idle" && sweepStatus.phase !== "complete")) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-b border-[#1F1F23] overflow-hidden"
            >
              <div className="px-4 py-2.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[12px] text-white/60">{sweepStatus?.message || "Processing..."}</span>
                  <span className="text-[11px] text-white/40 font-mono">{sweepStatus?.progress || 0}%</span>
                </div>
                <div className="h-1 bg-[#27272A] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-white rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${sweepStatus?.progress || 0}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-auto">{children}</div>
          
          {/* Co-Pilot Panel */}
          <AnimatePresence>
            {isInsideProject && copilotOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 320, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="border-l border-[#1F1F23] flex flex-col shrink-0 overflow-hidden"
              >
                <CoPilot 
                  projectId={currentProjectId!} 
                  logs={logs || []} 
                  contextPhase={activePhase}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
