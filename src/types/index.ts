export interface User {
  _id: string;
  clerkId: string;
  email: string;
  name?: string;
  avatar?: string;
  subscriptionTier: "free" | "pro" | "enterprise";
  createdAt: number;
  updatedAt: number;
}

export interface Project {
  _id: string;
  userId: string;
  name: string;
  description: string;
  status: "idea" | "planning" | "development" | "testing" | "launched";
  techStack: string[];
  repositoryUrl?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Conversation {
  _id: string;
  projectId: string;
  userId: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface Message {
  _id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface Task {
  _id: string;
  projectId: string;
  assignedTo: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "completed" | "blocked";
  priority: "low" | "medium" | "high" | "critical";
  estimatedTime?: number;
  actualTime?: number;
  createdAt: number;
  updatedAt: number;
  dueDate?: number;
}

export interface CodeFile {
  _id: string;
  projectId: string;
  path: string;
  content: string;
  language: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface Mockup {
  _id: string;
  projectId: string;
  name: string;
  description?: string;
  imageUrl?: string;
  figmaUrl?: string;
  status: "draft" | "review" | "approved";
  createdAt: number;
  updatedAt: number;
}

export interface Agent {
  _id: string;
  name: string;
  type: "frontend" | "backend" | "fullstack" | "design" | "devops" | "product";
  status: "idle" | "active" | "busy" | "offline";
  capabilities: string[];
  currentTask?: string;
  model: string;
  createdAt: number;
  updatedAt: number;
}

export interface OrchestratorSession {
  _id: string;
  projectId: string;
  userId: string;
  status: "active" | "paused" | "completed" | "failed";
  agents: string[];
  currentPhase: string;
  progress: number;
  createdAt: number;
  updatedAt: number;
}
