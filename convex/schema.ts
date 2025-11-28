import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkUserId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    credits: v.number(),
    skills: v.optional(v.array(v.string())),
    budget: v.optional(v.string()),
    constraints: v.optional(v.string()),
    onboardingCompleted: v.optional(v.boolean()),
    updatedAt: v.optional(v.number()),
  }).index("by_clerk_id", ["clerkUserId"]),

  projects: defineTable({
    userId: v.id("users"),
    name: v.string(),
    niche: v.string(),
    status: v.string(),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  }).index("by_user", ["userId"]),

  tickets: defineTable({
    projectId: v.id("projects"),
    title: v.string(),
    description: v.string(),
    status: v.string(),
    priority: v.string(),
    type: v.string(),
    agentAuthor: v.string(),
  }).index("by_project", ["projectId"]),

  project_brain: defineTable({
    projectId: v.id("projects"),
    painPoints: v.any(),
    validationData: v.any(),
    techStack: v.any(),
    gtmStrategy: v.any(),
    founderProfile: v.optional(v.any()),
    insights: v.optional(v.any()),
    analytics: v.optional(v.any()), // Reddit signal analytics
  }).index("by_project", ["projectId"]),

  agent_logs: defineTable({
    projectId: v.id("projects"),
    agentName: v.string(),
    log: v.string(),
  }).index("by_project", ["projectId"]),

  // Co-Pilot Chat
  chat: defineTable({
    projectId: v.id("projects"),
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
    message: v.string(),
    timestamp: v.number(),
  }).index("by_project", ["projectId"]),

  // Waitlist Signups (Real Traction Data)
  waitlist_signups: defineTable({
    projectId: v.id("projects"),
    email: v.string(),
    source: v.optional(v.string()), // e.g., "landing_page", "reddit", "direct"
    referrer: v.optional(v.string()), // URL they came from
    createdAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_email", ["email"]),
});
