import { v } from "convex/values";
import { query, mutation, internalMutation } from "./_generated/server";

export const get = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const logs = await ctx.db
      .query("agent_logs")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .order("desc")
      .take(100);
    return logs.reverse(); // Show oldest first for terminal flow
  },
});

export const log = mutation({
  args: {
    projectId: v.id("projects"),
    agentName: v.string(),
    log: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("agent_logs", {
      projectId: args.projectId,
      agentName: args.agentName,
      log: args.log,
    });
  },
});

export const logAgent = internalMutation({
  args: {
    projectId: v.id("projects"),
    agentName: v.string(),
    log: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("agent_logs", {
      projectId: args.projectId,
      agentName: args.agentName,
      log: args.log,
    });
  },
});
