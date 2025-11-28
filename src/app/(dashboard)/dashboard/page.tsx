"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ChevronDown, Folder, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { cn } from "@/lib/utils";

export const dynamic = 'force-dynamic';

const STAGES: Record<string, string> = {
  scoping: "text-white/40",
  validation: "text-blue-400",
  building: "text-amber-400",
  live: "text-emerald-400",
};

export default function DashboardPage() {
  const { user } = useUser();
  const [filter, setFilter] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const convexUser = useQuery(api.users.viewer, user ? {} : "skip");
  const projects = useQuery(api.functions.projects.getProjects, convexUser ? {} : "skip");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "c" && !e.metaKey && !e.ctrlKey && document.activeElement?.tagName !== "INPUT") {
        window.location.href = "/dashboard/projects";
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!convexUser) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-5 h-5 text-white/30 animate-spin" />
      </div>
    );
  }

  const filtered = projects?.filter((p: any) => filter === "all" || p.status === filter) || [];

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-3xl mx-auto p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[16px] font-medium text-white/90">Projects</h1>
          <div className="flex items-center gap-2">
            {/* Filter */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="h-8 px-3 text-[12px] font-medium text-white/50 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] rounded-md flex items-center gap-2 transition-colors"
              >
                {filter === "all" ? "All" : filter}
                <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute top-full right-0 mt-1 w-28 bg-[#18181B] border border-[#27272A] rounded-md shadow-xl z-50 py-1"
                  >
                    {["all", "scoping", "validation", "building", "live"].map((f) => (
                      <button
                        key={f}
                        onClick={() => { setFilter(f); setDropdownOpen(false); }}
                        className={cn(
                          "w-full px-3 py-1.5 text-[12px] text-left hover:bg-white/5 transition-colors capitalize",
                          filter === f ? "text-white" : "text-white/50"
                        )}
                      >
                        {f}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Link href="/dashboard/projects">
              <button className="h-8 px-3 text-[12px] font-medium bg-white text-black hover:bg-white/90 rounded-md flex items-center gap-2 transition-all duration-150 active:scale-[0.98]">
                <Plus className="w-3.5 h-3.5" />
                New
              </button>
            </Link>
          </div>
        </div>

        {/* Projects */}
        {filtered.length > 0 ? (
          <div className="space-y-1">
            {filtered.map((project: any, i: number) => {
              const stage = project.status || "scoping";
              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                >
                  <Link href={`/dashboard/projects/${project._id}`}>
                    <div className="group flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-[#18181B] transition-colors cursor-pointer">
                      <div className="w-8 h-8 rounded-md bg-[#27272A] flex items-center justify-center text-[11px] font-semibold text-white/60 group-hover:bg-[#3F3F46] transition-colors">
                        {project.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-white/80 truncate">{project.name}</p>
                        <p className="text-[12px] text-white/30 truncate">{project.niche || "No niche"}</p>
                      </div>
                      <span className={cn("text-[11px] font-medium capitalize", STAGES[stage] || STAGES.scoping)}>
                        {stage}
                      </span>
                      <ArrowRight className="w-4 h-4 text-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
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
              <Folder className="w-6 h-6 text-white/30" />
            </div>
            <p className="text-[14px] font-medium text-white/70 mb-1">No projects</p>
            <p className="text-[13px] text-white/40 mb-6">
              Press <kbd className="px-1.5 py-0.5 bg-[#27272A] rounded text-[11px] font-mono mx-0.5">C</kbd> to create
            </p>
            <Link href="/dashboard/projects">
              <button className="h-9 px-4 text-[12px] font-medium bg-white text-black hover:bg-white/90 rounded-md inline-flex items-center gap-2 transition-all duration-150">
                Create Project
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </motion.div>
        )}

        {/* Footer */}
        {filtered.length > 0 && (
          <div className="mt-4 text-[11px] text-white/30">
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
}
