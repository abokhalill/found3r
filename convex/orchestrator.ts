import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

// Type-safe agent references (V2 Pivot - Serious Names)
const agents = {
  signalScanner: api["agents/signalScanner" as keyof typeof api] as any,
  launchTest: api["agents/launchTest" as keyof typeof api] as any,
  buildPlanner: api["agents/buildPlanner" as keyof typeof api] as any,
  distributionKit: api["agents/distributionKit" as keyof typeof api] as any,
};

// ============================================
// CREATE PROJECT WITH AUTO-ANALYSIS
// Creates project and immediately runs SignalScanner
// ============================================
export const createProjectWithAnalysis = action({
  args: {
    name: v.string(),
    niche: v.string(),
  },
  handler: async (ctx, args): Promise<{ projectId: Id<"projects">; analysisStarted: boolean }> => {
    const { name, niche } = args;

    // 1. Create the project
    const projectId = await ctx.runMutation(api.functions.projects.createProject, {
      name,
      niche,
    });

    // 2. Trigger SignalScanner in background (don't await - let it run async)
    let analysisStarted = false;
    try {
      ctx.runAction(agents.signalScanner.run, { projectId }).catch((error: any) => {
        console.error("[AUTO-ANALYSIS] SignalScanner failed:", error.message);
      });
      analysisStarted = true;
    } catch (error) {
      console.error("[AUTO-ANALYSIS] Failed to start:", error);
    }

    return { projectId, analysisStarted };
  },
});

export const runAgent = action({
  args: {
    projectId: v.id("projects"),
    agentName: v.union(
      v.literal("SignalScanner"),
      v.literal("LaunchTest"),
      v.literal("BuildPlanner"),
      v.literal("DistributionKit"),
    ),
    provider: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<void> => {
    const { projectId, agentName, provider } = args;

    switch (agentName) {
      case "SignalScanner": {
        await ctx.runAction(agents.signalScanner.run, { projectId, provider });
        return;
      }
      case "LaunchTest": {
        await ctx.runAction(agents.launchTest.run, { projectId });
        return;
      }
      case "BuildPlanner": {
        await ctx.runAction(agents.buildPlanner.run, { projectId });
        return;
      }
      case "DistributionKit": {
        await ctx.runAction(agents.distributionKit.run, { projectId });
        return;
      }
      default: {
        throw new Error(`Unknown agent: ${agentName}`);
      }
    }
  },
});
