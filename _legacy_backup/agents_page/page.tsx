"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Monitor, 
  Server, 
  Palette, 
  GitBranch, 
  Cloud, 
  Lightbulb,
  Play,
  Pause,
  Settings,
  Plus,
  Search,
  Filter
} from "lucide-react";
import { Input } from "@/components/ui/input";

const agents = [
  {
    id: "1",
    name: "Frontend Agent",
    type: "frontend",
    icon: Monitor,
    capabilities: ["React", "Vue", "Angular", "Tailwind CSS", "TypeScript"],
    status: "active" as const,
    currentTask: "Building dashboard components",
    performance: 92,
    tasksCompleted: 47,
    model: "GPT-4",
  },
  {
    id: "2",
    name: "Backend Agent",
    type: "backend",
    icon: Server,
    capabilities: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"],
    status: "active" as const,
    currentTask: "Setting up API authentication",
    performance: 88,
    tasksCompleted: 35,
    model: "Claude-3",
  },
  {
    id: "3",
    name: "Design Agent",
    type: "design",
    icon: Palette,
    capabilities: ["Figma", "UI/UX", "Prototyping", "Design Systems"],
    status: "idle" as const,
    currentTask: null,
    performance: 95,
    tasksCompleted: 28,
    model: "GPT-4",
  },
  {
    id: "4",
    name: "DevOps Agent",
    type: "devops",
    icon: GitBranch,
    capabilities: ["Docker", "Kubernetes", "CI/CD", "AWS", "Azure"],
    status: "busy" as const,
    currentTask: "Configuring deployment pipeline",
    performance: 90,
    tasksCompleted: 19,
    model: "Claude-3",
  },
  {
    id: "5",
    name: "Full-Stack Agent",
    type: "fullstack",
    icon: Cloud,
    capabilities: ["MERN", "MEAN", "LAMP", "Serverless", "Microservices"],
    status: "offline" as const,
    currentTask: null,
    performance: 85,
    tasksCompleted: 52,
    model: "GPT-4",
  },
  {
    id: "6",
    name: "Product Agent",
    type: "product",
    icon: Lightbulb,
    capabilities: ["Strategy", "Analytics", "Growth", "User Research"],
    status: "idle" as const,
    currentTask: null,
    performance: 93,
    tasksCompleted: 31,
    model: "Claude-3",
  },
];

const statusColors = {
  idle: "bg-slate-600",
  active: "bg-green-500",
  busy: "bg-amber-500",
  offline: "bg-red-500",
};

const statusText = {
  idle: "Idle",
  active: "Active",
  busy: "Busy",
  offline: "Offline",
};

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.capabilities.some(cap => cap.toLowerCase().includes(searchQuery.toLowerCase()))
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
            <h1 className="text-3xl font-bold text-white">AI Agents</h1>
            <p className="text-slate-400 mt-1">Manage and configure your AI development team</p>
          </div>
          <Button className="bg-amber-500 hover:bg-amber-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Agent
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search agents, capabilities, or types..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-400"
            />
          </div>
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
                        <agent.icon className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{agent.name}</CardTitle>
                        <CardDescription className="text-slate-400 text-sm capitalize">
                          {agent.type} Agent
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${statusColors[agent.status]} ${agent.status === "active" ? "animate-pulse" : ""}`} />
                      <span className="text-xs text-slate-400 capitalize">{statusText[agent.status]}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {agent.currentTask && (
                    <div className="p-3 bg-slate-700/30 rounded-lg">
                      <p className="text-xs text-slate-400 mb-1">Current Task</p>
                      <p className="text-sm text-white">{agent.currentTask}</p>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span>Performance</span>
                      <span>{agent.performance}%</span>
                    </div>
                    <Progress value={agent.performance} className="h-2 bg-slate-700" />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-slate-400">Tasks Completed</p>
                      <p className="text-white font-medium">{agent.tasksCompleted}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400">Model</p>
                      <p className="text-white font-medium">{agent.model}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {agent.capabilities.slice(0, 3).map((capability, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                        {capability}
                      </Badge>
                    ))}
                    {agent.capabilities.length > 3 && (
                      <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                        +{agent.capabilities.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1 bg-amber-500 hover:bg-amber-600 text-white">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                      {agent.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">No agents found matching your search.</div>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              Clear Search
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
