"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { 
  Plus, 
  Search, 
  Filter,
  Grid,
  List,
  SortAsc,
  Loader2,
  Sparkles,
  Zap
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProjects } from "@/hooks/useConvex";
import { useUser } from "@clerk/nextjs";
import { useAction } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

// Force dynamic rendering for client-side data fetching
export const dynamic = 'force-dynamic';

const mockProjects = [
  {
    id: "1",
    name: "E-commerce Platform",
    description: "Modern online shopping experience with AI-powered recommendations",
    status: "development" as const,
    progress: 65,
    agents: ["Frontend", "Backend", "Design"],
    lastActive: "2 hours ago",
    createdAt: "3 days ago",
    techStack: ["React", "Node.js", "PostgreSQL", "Tailwind"],
  },
  {
    id: "2",
    name: "Mobile App MVP",
    description: "Cross-platform mobile app for task management and collaboration",
    status: "planning" as const,
    progress: 25,
    agents: ["Product", "Design"],
    lastActive: "1 day ago",
    createdAt: "1 week ago",
    techStack: ["React Native", "Firebase", "TypeScript"],
  },
  {
    id: "3",
    name: "SaaS Dashboard",
    description: "Analytics dashboard for business intelligence and reporting",
    status: "testing" as const,
    progress: 90,
    agents: ["Full-Stack", "DevOps"],
    lastActive: "3 hours ago",
    createdAt: "2 weeks ago",
    techStack: ["Vue.js", "Python", "MongoDB", "Docker"],
  },
  {
    id: "4",
    name: "AI Content Platform",
    description: "Content generation platform using advanced AI models",
    status: "idea" as const,
    progress: 10,
    agents: ["Product"],
    lastActive: "5 hours ago",
    createdAt: "1 day ago",
    techStack: ["Next.js", "OpenAI", "Prisma"],
  },
];

export default function ProjectsPage() {
  const { user } = useUser();
  const router = useRouter();
  const projects = useProjects();
  const createProjectWithAnalysis = useAction(api.orchestrator.createProjectWithAnalysis);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    niche: "",
  });
  
  const handleCreateProject = async () => {
    if (!formData.name.trim()) {
      toast.error("Project name is required");
      return;
    }
    
    if (!formData.niche.trim()) {
      toast.error("Project niche is required");
      return;
    }
    
    setIsCreating(true);
    
    try {
      const result = await createProjectWithAnalysis({
        name: formData.name,
        niche: formData.niche,
      });
      
      setIsCreateDialogOpen(false);
      setFormData({ name: "", niche: "" });
      
      if (result.analysisStarted) {
        toast.success("Project created. Analyzing market signals...");
      } else {
        toast.success("Project created");
      }
      
      // Navigate to the new project
      router.push(`/dashboard/projects/${result.projectId}`);
    } catch (error) {
      console.error("Failed to create project:", error);
      toast.error("Failed to create project");
    } finally {
      setIsCreating(false);
    }
  };

  // Use mock data if Convex data isn't loaded yet
  const rawProjects = projects === undefined ? undefined : projects;
  
  const displayProjects = rawProjects ? rawProjects.map((p: any) => ({
    id: p._id,
    name: p.name,
    description: p.niche || p.description || "No description",
    status: p.status || "scoping",
    progress: p.progress || 0,
    agents: p.agents || [],
    lastActive: p._creationTime ? new Date(p._creationTime).toLocaleDateString() : "Just now",
    createdAt: p._creationTime ? new Date(p._creationTime).toLocaleDateString() : "Just now",
    techStack: p.techStack || [],
    niche: p.niche, // Keep niche for filtering
  })) : mockProjects;
  
  const filteredProjects = displayProjects.filter((project: any) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (project.niche || project.description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Projects</h1>
            <p className="text-slate-400 mt-1">Manage and monitor your development projects</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-white">Create New Project</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Start a new project with AI cofounders
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-300 font-medium">Project Name *</Label>
                  <Input 
                    id="name" 
                    placeholder="e.g., E-commerce Platform" 
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-500 focus:border-amber-500 transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={isCreating}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="niche" className="text-slate-300 font-medium">Niche / Problem Space *</Label>
                  <Textarea 
                    id="niche" 
                    placeholder="Describe the specific niche or problem you are solving (e.g. 'AI Legal Assistant for Small Firms')" 
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-500 focus:border-amber-500 transition-colors min-h-[100px]"
                    value={formData.niche}
                    onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                    disabled={isCreating}
                  />
                  <p className="text-xs text-slate-500">Describe the specific problem space in detail.</p>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-6 rounded-xl shadow-lg shadow-amber-500/25 transition-all duration-300"
                  onClick={handleCreateProject}
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating & Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Create & Analyze
                    </>
                  )}
                </Button>
                <p className="text-xs text-slate-500 text-center mt-2">
                  We'll automatically scan Reddit for market signals
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-400"
            />
          </div>
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <SortAsc className="w-4 h-4 mr-2" />
            Sort
          </Button>
          <div className="flex border border-slate-600 rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none border-r border-slate-600"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Badge variant="secondary" className="bg-slate-700 text-slate-300">
            {filteredProjects.length} projects
          </Badge>
          <Badge variant="outline" className="border-slate-600 text-slate-400">
            3 active
          </Badge>
          <Badge variant="outline" className="border-green-600 text-green-400">
            1 launched
          </Badge>
        </div>

        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredProjects.map((project: any, index: number) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">No projects found matching your search.</div>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              Clear Search
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
