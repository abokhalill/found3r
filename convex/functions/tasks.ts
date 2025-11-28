import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { Doc, Id } from "../_generated/dataModel";

export const createTask = mutation({
  args: {
    projectId: v.id("projects"),
    title: v.string(),
    description: v.string(),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("critical")),
    status: v.union(v.literal("todo"), v.literal("in_progress"), v.literal("completed"), v.literal("blocked")),
  },
  handler: async (ctx: any, args: any) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q: any) => q.eq("clerkUserId", identity.subject))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const ticket = await ctx.db.insert("tickets", {
      projectId: args.projectId,
      title: args.title,
      description: args.description,
      status: args.status,
      priority: args.priority,
      type: "manual",
      agentAuthor: "user",
    });

    return ticket;
  },
});

export const getTasks = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx: any, args: any) => {
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

    const tickets = await ctx.db
      .query("tickets")
      .withIndex("by_project", (q: any) => q.eq("projectId", args.projectId))
      .collect();

    return tickets;
  },
});

export const updateTask = mutation({
  args: {
    taskId: v.id("tickets"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("critical"))),
    status: v.optional(v.union(v.literal("todo"), v.literal("in_progress"), v.literal("completed"), v.literal("blocked"))),
  },
  handler: async (ctx: any, args: any) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const ticket = await ctx.db.get(args.taskId);
    if (!ticket) {
      throw new Error("Task not found");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q: any) => q.eq("clerkUserId", identity.subject))
      .first();

    // Check project ownership indirectly via project lookup if needed, or trust ID check if userId is on ticket (it's not on ticket, it's on project)
    // We need to verify the user owns the project this ticket belongs to
    const project = await ctx.db.get(ticket.projectId);
    if (!project || project.userId !== user._id) {
      throw new Error("Not authorized");
    }

    const { taskId, ...updateData } = args;
    await ctx.db.patch(taskId, updateData);

    return taskId;
  },
});

export const deleteTask = mutation({
  args: { taskId: v.id("tickets") },
  handler: async (ctx: any, args: any) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const ticket = await ctx.db.get(args.taskId);
    if (!ticket) {
      throw new Error("Task not found");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q: any) => q.eq("clerkUserId", identity.subject))
      .first();
    
    const project = await ctx.db.get(ticket.projectId);
    if (!project || project.userId !== user._id) {
      throw new Error("Not authorized");
    }

    await ctx.db.delete(args.taskId);

    return args.taskId;
  },
});
