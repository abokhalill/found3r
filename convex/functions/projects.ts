import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { Doc, Id } from "../_generated/dataModel";

export const createProject = mutation({
  args: {
    name: v.string(),
    niche: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q: any) => q.eq("clerkUserId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    const projectId = await ctx.db.insert("projects", {
      userId: user._id,
      name: args.name,
      niche: args.niche,
      status: "scoping",
    });

    await ctx.db.insert("project_brain", {
      projectId: projectId,
      painPoints: [],
      validationData: {},
      techStack: {},
      gtmStrategy: {},
    });

    return projectId;
  },
});

export const getProjects = query({
  handler: async (ctx: any) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q: any) => q.eq("clerkUserId", identity.subject))
      .first();

    if (!user) {
      return [];
    }

    const projects = await ctx.db
      .query("projects")
      .withIndex("by_user", (q: any) => q.eq("userId", user._id))
      .collect();

    return projects;
  },
});

export const getProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx: any, args: any) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const project = await ctx.db.get(args.projectId);

    if (!project) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q: any) => q.eq("clerkUserId", identity.subject))
      .first();

    if (!user || project.userId !== user._id) {
      return null;
    }

    return project;
  },
});

export const updateProject = mutation({
  args: {
    projectId: v.id("projects"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    techStack: v.optional(v.array(v.string())),
    status: v.optional(v.union(v.literal("idea"), v.literal("planning"), v.literal("development"), v.literal("testing"), v.literal("launched"))),
    progress: v.optional(v.number()),
  },
  handler: async (ctx: any, args: any) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q: any) => q.eq("clerkUserId", identity.subject))
      .first();

    if (!user || project.userId !== user._id) {
      throw new Error("Not authorized");
    }

    const { projectId, ...updateData } = args;
    await ctx.db.patch(projectId, updateData);

    return projectId;
  },
});

export const deleteProject = mutation({
  args: { projectId: v.id("projects") },
  handler: async (ctx: any, args: any) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q: any) => q.eq("clerkUserId", identity.subject))
      .first();

    if (!user || project.userId !== user._id) {
      throw new Error("Not authorized");
    }

    await ctx.db.delete(args.projectId);

    return args.projectId;
  },
});

export const getDNA = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx: any, args: any) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const project = await ctx.db.get(args.projectId);
    if (!project) return null;
    
    const user = await ctx.db.query("users").withIndex("by_clerk_id", (q: any) => q.eq("clerkUserId", identity.subject)).first();
    if (!user || project.userId !== user._id) return null;

    return await ctx.db.query("project_brain").withIndex("by_project", (q: any) => q.eq("projectId", args.projectId)).first();
  }
});

export const getAgentLogs = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx: any, args: any) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const project = await ctx.db.get(args.projectId);
    if (!project) return [];
    
    const user = await ctx.db.query("users").withIndex("by_clerk_id", (q: any) => q.eq("clerkUserId", identity.subject)).first();
    if (!user || project.userId !== user._id) return [];

    const logs = await ctx.db
      .query("agent_logs")
      .withIndex("by_project", (q: any) => q.eq("projectId", args.projectId))
      .order("desc")
      .take(20);
    
    return logs;
  }
});
