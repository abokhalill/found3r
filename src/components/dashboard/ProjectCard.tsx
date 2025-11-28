"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    status: string;
    lastActive: string;
    createdAt: string;
  };
}

const statusConfig: Record<string, { color: string; label: string }> = {
  idea: { color: "bg-blue-500", label: "Idea" },
  scoping: { color: "bg-blue-500", label: "Scoping" },
  planning: { color: "bg-orange-500", label: "Planning" },
  development: { color: "bg-amber-500", label: "Building" },
  testing: { color: "bg-purple-500", label: "Testing" },
  launched: { color: "bg-green-500", label: "Launched" },
};

export function ProjectCard({ project }: ProjectCardProps) {
  const status = statusConfig[project.status] || statusConfig.idea;
  
  return (
    <Link href={`/dashboard/projects/${project.id}`}>
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="group relative flex flex-col gap-3 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200 cursor-pointer h-full"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-zinc-100 font-semibold truncate tracking-tight">
              {project.name}
            </h3>
            <p className="text-zinc-500 text-sm mt-1 line-clamp-2 font-normal">
              {project.description}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className={cn("w-2 h-2 rounded-full animate-pulse", status.color)} />
          </div>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className={cn("px-2 py-0.5 rounded-full bg-white/5 border border-white/5", "text-zinc-300")}>
              {status.label}
            </span>
          </div>
          <span className="text-zinc-600 font-mono uppercase tracking-wider">
            {project.lastActive}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

