import { mutation, query, action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

// 1. Create New Idea Profile (Project)
export const createIdeaProfile = mutation({
  args: {
    niche: v.string(),
    description: v.string(), // Optional description/context
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", identity.subject))
      .first();
    
    if (!user) throw new Error("User not found");

    const projectId = await ctx.db.insert("projects", {
      userId: user._id,
      name: args.niche, // Default name to niche
      niche: args.niche,
      status: "validating",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return projectId;
  },
});

// 2. Fetch Validation Summary
export const getValidationSummary = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project) return null;

    const dna = await ctx.db
      .query("project_brain")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .first();

    const logs = await ctx.db
        .query("agent_logs")
        .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
        .order("desc")
        .take(5);

    return {
      project,
      validation: dna?.validationData || null,
      latestLogs: logs,
    };
  },
});

// 3. Trigger Scraping Job (Agent A)
export const triggerValidation = action({
  args: { 
      projectId: v.id("projects"),
      provider: v.optional(v.string()) 
  },
  handler: async (ctx, args) => {
    // We call the main Orchestrator or Agent directly
    await ctx.runAction(api.orchestrator.runAgent, {
        projectId: args.projectId,
        agentName: "SignalScanner",
        provider: args.provider
    });
    return { success: true, message: "Validation agent started" };
  },
});

// 4. Get Final Recommendation Report
export const getReport = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
     const dna = await ctx.db
      .query("project_brain")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .first();
      
     if (!dna || !dna.validationData) return null;

     // Return a formatted report object
     return {
         recommendation: dna.validationData.recommendation,
         score: dna.validationData.totalScore,
         breakdown: dna.validationData.breakdown,
         signals: dna.validationData.signals,
         generatedAt: dna.validationData.timestamp,
     };
  },
});

// 5. Get Validation Status
export const validationStatus = query({
    args: { projectId: v.id("projects") },
    handler: async (ctx, args) => {
         const project = await ctx.db.get(args.projectId);
         if (!project) return null;
         return { status: project.status };
    }
});

// 6. Get All Signals
export const getAllSignals = query({
    args: { projectId: v.id("projects") },
    handler: async (ctx, args) => {
        const dna = await ctx.db
          .query("project_brain")
          .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
          .first();
        return dna?.validationData?.signals || [];
    }
});

// 7. Get Tickets
export const getTickets = query({
    args: { projectId: v.id("projects") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("tickets")
            .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
            .collect();
    }
});

// 8. Refresh Context (Re-run validation)
export const refreshProjectContext = action({
    args: { projectId: v.id("projects") },
    handler: async (ctx, args) => {
        await ctx.runAction(api.orchestrator.runAgent, {
            projectId: args.projectId,
            agentName: "SignalScanner",
            provider: "firecrawl" // Force fresh scrape
        });
        return { success: true };
    }
});

// 9. Trigger Full Intelligence Sweep
export const triggerFullIntelligenceSweep = action({
    args: { projectId: v.id("projects") },
    handler: async (ctx, args) => {
        // TODO: Implement runFullSweep action in convex/validation/runFullSweep.ts
        // For now, run SignalScanner as the primary intelligence agent
        await ctx.runAction(api.orchestrator.runAgent, { 
            projectId: args.projectId, 
            agentName: "SignalScanner" 
        });
        return { success: true };
    }
});

// 10. Get Global Insights
export const getGlobalInsights = query({
    args: { projectId: v.id("projects") },
    handler: async (ctx, args) => {
        const dna = await ctx.db
            .query("project_brain")
            .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
            .first();
        return dna?.insights || null;
    }
});

// 11. Get Competitors (Helper)
export const getCompetitors = query({
    args: { projectId: v.id("projects") },
    handler: async (ctx, args) => {
        const dna = await ctx.db
            .query("project_brain")
            .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
            .first();
        return dna?.insights?.competitors || [];
    }
});

// 12. Get Trends (Helper)
export const getTrends = query({
    args: { projectId: v.id("projects") },
    handler: async (ctx, args) => {
        const dna = await ctx.db
            .query("project_brain")
            .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
            .first();
        return dna?.insights?.trends || [];
    }
});

// 13. Get Pivot Ticket
export const getPivotTicket = query({
    args: { projectId: v.id("projects") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("tickets")
            .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
            .filter(q => q.eq(q.field("agentAuthor"), "PivotOracle"))
            .first();
    }
});
