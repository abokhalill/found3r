"use client";

import { useParams } from "next/navigation";
import { useQuery, useAction } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  Folder, FileCode, ChevronRight, ChevronDown, Loader2, 
  Play, FileJson, FileText, Settings, Terminal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { useState } from "react";

// ============================================
// BUILD TAB - VS Code Style Code Editor
// ============================================

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  content?: string;
  language?: string;
}

// Mock file structure based on project
const generateFileTree = (projectName: string, prototypeConfig: any): FileNode[] => {
  return [
    {
      name: "convex",
      type: "folder",
      children: [
        { name: "schema.ts", type: "file", language: "typescript", content: `import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  ${projectName.toLowerCase().replace(/\s+/g, '_')}_items: defineTable({
    userId: v.id("users"),
    title: v.string(),
    status: v.string(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),
});` },
        { name: "functions.ts", type: "file", language: "typescript", content: `import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("${projectName.toLowerCase().replace(/\s+/g, '_')}_items")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const create = mutation({
  args: { 
    userId: v.id("users"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("${projectName.toLowerCase().replace(/\s+/g, '_')}_items", {
      userId: args.userId,
      title: args.title,
      status: "active",
      createdAt: Date.now(),
    });
  },
});` },
      ],
    },
    {
      name: "app",
      type: "folder",
      children: [
        { name: "page.tsx", type: "file", language: "tsx", content: `"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const items = useQuery(api.functions.list, { userId: "user_id" });
  const create = useMutation(api.functions.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await create({ userId: "user_id", title });
    setTitle("");
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">${projectName}</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new item..."
          className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-white text-black rounded-lg">
          Add
        </button>
      </form>

      <div className="space-y-2">
        {items?.map((item) => (
          <div key={item._id} className="p-4 bg-zinc-900 rounded-lg">
            {item.title}
          </div>
        ))}
      </div>
    </main>
  );
}` },
        { name: "layout.tsx", type: "file", language: "tsx", content: `import type { Metadata } from "next";
import { ConvexClientProvider } from "./ConvexClientProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "${projectName}",
  description: "Built with Found3r",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}` },
      ],
    },
    {
      name: "package.json",
      type: "file",
      language: "json",
      content: `{
  "name": "${projectName.toLowerCase().replace(/\s+/g, '-')}",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "convex": "1.0.0",
    "tailwindcss": "3.4.0"
  }
}`,
    },
    {
      name: "README.md",
      type: "file",
      language: "markdown",
      content: `# ${projectName}

Built with Found3r 🚀

## Getting Started

\`\`\`bash
npm install
npx convex dev
npm run dev
\`\`\`

## Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS
- **Backend:** Convex
- **Auth:** Clerk (optional)
`,
    },
  ];
};

export default function BuildPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  
  const project = useQuery(api.functions.projects.getProject, { projectId: projectId as any });
  const dna = useQuery(api.functions.projects.getDNA, { projectId: projectId as any });
  const runAgent = useAction(api.orchestrator.runAgent);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["convex", "app"]));

  const prototypeConfig = dna?.prototypeConfig;
  const fileTree = generateFileTree(project?.name || "MyProject", prototypeConfig);

  const handleGenerateCode = async () => {
    try {
      setIsGenerating(true);
      toast("Generating MVP code...");
      await runAgent({ projectId: projectId as any, agentName: "BuildPlanner" });
      toast.success("Code generated");
    } catch (error) {
      toast.error("Failed to generate code");
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  const getFileIcon = (node: FileNode) => {
    if (node.type === "folder") return Folder;
    if (node.name.endsWith(".json")) return FileJson;
    if (node.name.endsWith(".md")) return FileText;
    if (node.name.endsWith(".ts") || node.name.endsWith(".tsx")) return FileCode;
    return FileCode;
  };

  const renderFileTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node) => {
      const Icon = getFileIcon(node);
      const isExpanded = expandedFolders.has(node.name);
      const isSelected = selectedFile?.name === node.name;

      return (
        <div key={node.name}>
          <button
            onClick={() => {
              if (node.type === "folder") {
                toggleFolder(node.name);
              } else {
                setSelectedFile(node);
              }
            }}
            className={cn(
              "w-full flex items-center gap-2 px-2 py-1.5 text-[13px] hover:bg-white/5 transition-colors rounded",
              isSelected && "bg-white/10"
            )}
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
          >
            {node.type === "folder" && (
              isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-zinc-500" /> : <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
            )}
            <Icon className={cn(
              "w-4 h-4",
              node.type === "folder" ? "text-amber-400" : "text-blue-400"
            )} />
            <span className={cn(
              node.type === "folder" ? "text-zinc-300" : "text-zinc-400"
            )}>
              {node.name}
            </span>
          </button>
          {node.type === "folder" && isExpanded && node.children && (
            <div>{renderFileTree(node.children, depth + 1)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="h-full flex bg-[#1E1E1E]">
      {/* Sidebar - File Explorer */}
      <div className="w-56 border-r border-[#2D2D2D] flex flex-col">
        {/* Explorer Header */}
        <div className="h-9 px-4 flex items-center justify-between border-b border-[#2D2D2D]">
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Explorer</span>
          <button
            onClick={handleGenerateCode}
            disabled={isGenerating}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            title="Generate MVP Code"
          >
            {isGenerating ? (
              <Loader2 className="w-3.5 h-3.5 text-zinc-400 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 text-emerald-400" />
            )}
          </button>
        </div>
        
        {/* File Tree */}
        <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">
          {renderFileTree(fileTree)}
        </div>
      </div>

      {/* Main - Code View */}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        <div className="h-9 flex items-center border-b border-[#2D2D2D] bg-[#252526]">
          {selectedFile && (
            <div className="h-full px-4 flex items-center gap-2 bg-[#1E1E1E] border-r border-[#2D2D2D]">
              <FileCode className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[13px] text-zinc-300">{selectedFile.name}</span>
            </div>
          )}
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto">
          {selectedFile ? (
            <SyntaxHighlighter
              language={selectedFile.language || "typescript"}
              style={atomDark}
              customStyle={{
                margin: 0,
                padding: "16px",
                background: "#1E1E1E",
                fontSize: "13px",
                lineHeight: "1.6",
                minHeight: "100%",
              }}
              showLineNumbers
              lineNumberStyle={{
                minWidth: "3em",
                paddingRight: "1em",
                color: "#5A5A5A",
                textAlign: "right",
              }}
            >
              {selectedFile.content || "// No content"}
            </SyntaxHighlighter>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-2xl bg-[#2D2D2D] flex items-center justify-center mb-6">
                <Terminal className="w-8 h-8 text-zinc-600" />
              </div>
              <h3 className="text-lg font-medium text-zinc-300 mb-2">No file selected</h3>
              <p className="text-[13px] text-zinc-500 max-w-sm mb-6">
                Select a file from the explorer to view its contents, or generate MVP code to get started.
              </p>
              <button
                onClick={handleGenerateCode}
                disabled={isGenerating}
                className={cn(
                  "h-10 px-5 rounded-lg text-[13px] font-medium flex items-center gap-2 transition-all",
                  isGenerating
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                    : "bg-white text-black hover:bg-white/90"
                )}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Generate MVP Code
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="h-6 px-3 flex items-center justify-between bg-[#007ACC] text-white text-[11px]">
          <div className="flex items-center gap-4">
            <span>Found3r</span>
            {selectedFile && <span>{selectedFile.language?.toUpperCase()}</span>}
          </div>
          <div className="flex items-center gap-4">
            <span>UTF-8</span>
            <span>LF</span>
          </div>
        </div>
      </div>
    </div>
  );
}
