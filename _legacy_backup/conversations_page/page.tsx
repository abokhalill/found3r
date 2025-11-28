"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Bot, 
  User,
  Clock,
  Send
} from "lucide-react";

const conversations = [
  {
    id: "1",
    projectId: "1",
    projectName: "E-commerce Platform",
    lastMessage: "I've completed the frontend components for the product page",
    timestamp: "2 hours ago",
    agentType: "Frontend Agent",
    status: "active",
    messageCount: 24,
  },
  {
    id: "2",
    projectId: "2",
    projectName: "Mobile App MVP",
    lastMessage: "The API endpoints are ready for testing",
    timestamp: "1 day ago",
    agentType: "Backend Agent",
    status: "completed",
    messageCount: 18,
  },
  {
    id: "3",
    projectId: "3",
    projectName: "SaaS Dashboard",
    lastMessage: "Design mockups have been updated based on feedback",
    timestamp: "3 hours ago",
    agentType: "Design Agent",
    status: "active",
    messageCount: 32,
  },
];

const messages = [
  {
    id: "1",
    role: "user" as const,
    content: "Can you create a responsive product grid component?",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    role: "agent" as const,
    content: "I'll create a modern product grid with filtering and sorting capabilities. Let me build this with React and Tailwind CSS.",
    timestamp: "10:32 AM",
  },
  {
    id: "3",
    role: "agent" as const,
    content: "```tsx\nimport React, { useState } from 'react';\n\ninterface Product {\n  id: string;\n  name: string;\n  price: number;\n  image: string;\n}\n\nexport const ProductGrid = () => {\n  // Component implementation\n};\n```",
    timestamp: "10:35 AM",
  },
  {
    id: "4",
    role: "user" as const,
    content: "Perfect! Can you also add hover effects and animations?",
    timestamp: "10:40 AM",
  },
];

export default function ConversationsPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter(conv =>
    conv.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.agentType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="h-full flex flex-col"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Conversations</h1>
            <p className="text-slate-400 mt-1">Chat with your AI agents and track development progress</p>
          </div>
          <Button className="bg-amber-500 hover:bg-amber-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Conversation
          </Button>
        </div>

        <div className="flex-1 flex gap-6 min-h-0">
          {/* Conversations List */}
          <div className="w-80 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-400"
              />
            </div>

            <div className="space-y-2 flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <motion.div
                  key={conversation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedConversation.id === conversation.id
                      ? "bg-amber-500/10 border-amber-500/30"
                      : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{conversation.projectName}</h3>
                      <p className="text-slate-400 text-sm">{conversation.agentType}</p>
                    </div>
                    <Badge variant="outline" className="border-slate-600 text-slate-400">
                      {conversation.messageCount}
                    </Badge>
                  </div>
                  <p className="text-slate-300 text-sm mb-2 line-clamp-2">
                    {conversation.lastMessage}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    {conversation.timestamp}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chat Interface */}
          <div className="flex-1 flex flex-col bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="p-4 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-white font-medium">{selectedConversation.projectName}</h2>
                  <p className="text-slate-400 text-sm">{selectedConversation.agentType}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "agent" && (
                    <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-amber-400" />
                    </div>
                  )}
                  <div className={`max-w-lg ${message.role === "user" ? "order-first" : ""}`}>
                    <div className={`p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-amber-500 text-white"
                        : "bg-slate-700 text-slate-200"
                    }`}>
                      <p className="whitespace-pre-wrap font-mono text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 px-1">{message.timestamp}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-slate-300" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-700">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                />
                <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
