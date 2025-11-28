import { action, internalMutation, query } from "../_generated/server";
import { v } from "convex/values";
import { api, internal } from "../_generated/api";

// ============================================
// FULL INTELLIGENCE SWEEP
// One-click to run all intelligence agents in sequence
// ============================================

// Type-safe agent references (V2 Pivot - Serious Names)
const agents = {
  signalScanner: api["agents/signalScanner" as keyof typeof api] as any,
  launchTest: api["agents/launchTest" as keyof typeof api] as any,
  buildPlanner: api["agents/buildPlanner" as keyof typeof api] as any,
  distributionKit: api["agents/distributionKit" as keyof typeof api] as any,
};

export type SweepPhase = "idle" | "signalScanner" | "parallel" | "complete" | "error";

export interface SweepStatus {
  phase: SweepPhase;
  progress: number; // 0-100
  message: string;
  startedAt?: number;
  completedAt?: number;
  error?: string;
}

// ============================================
// RUN FULL SWEEP ACTION (Legacy - Sequential)
// ============================================
export const runFullSweep = action({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args): Promise<{ success: boolean; error?: string }> => {
    // Redirect to runBigBang
    return await ctx.runAction(api.validation.runFullSweep.runBigBang, { projectId: args.projectId });
  }
});

// ============================================
// RUN BIG BANG ACTION
// The One-Click "Analyze Niche" that populates EVERYTHING
// Sequence:
//   1. SignalScanner (Gets signals + score) - MUST run first
//   2. Parallel: LaunchTest, BuildPlanner, DistributionKit
// ============================================
export const runBigBang = action({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args): Promise<{ success: boolean; error?: string }> => {
    const { projectId } = args;
    
    try {
      // ============================================
      // PHASE 1: SignalScanner (Sequential - Required First)
      // Other agents need pain points as context
      // ============================================
      await ctx.runMutation(internal.validation.runFullSweep.updateSweepStatus, {
        projectId,
        status: {
          phase: "signalScanner",
          progress: 10,
          message: "Scanning market signals from Reddit...",
          startedAt: Date.now(),
        }
      });
      
      await ctx.runAction(agents.signalScanner.run, { projectId });
      
      // ============================================
      // PHASE 2: Parallel Execution
      // LaunchTest, BuildPlanner, DistributionKit
      // ============================================
      await ctx.runMutation(internal.validation.runFullSweep.updateSweepStatus, {
        projectId,
        status: {
          phase: "parallel",
          progress: 30,
          message: "Running intelligence agents in parallel...",
        }
      });
      
      // Run all agents in parallel using Promise.all
      const parallelResults = await Promise.allSettled([
        // LaunchTest - Generates Landing Page Config
        ctx.runAction(agents.launchTest.run, { projectId }).then(() => {
          return ctx.runMutation(internal.validation.runFullSweep.logProgress, {
            projectId,
            agent: "LaunchTest",
            message: "Landing page generated",
          });
        }),
        
        // BuildPlanner - Generates Graph + Tickets
        ctx.runAction(agents.buildPlanner.run, { projectId }).then(() => {
          return ctx.runMutation(internal.validation.runFullSweep.logProgress, {
            projectId,
            agent: "BuildPlanner",
            message: "Technical roadmap created",
          });
        }),
        
        // DistributionKit - Generates GTM Assets
        ctx.runAction(agents.distributionKit.run, { projectId }).then(() => {
          return ctx.runMutation(internal.validation.runFullSweep.logProgress, {
            projectId,
            agent: "DistributionKit",
            message: "Marketing assets generated",
          });
        }),
      ]);
      
      // Check for any failures
      const failures = parallelResults.filter(r => r.status === "rejected");
      if (failures.length > 0) {
        console.error("Some agents failed:", failures);
        // Continue anyway - partial success is better than total failure
      }
      
      // ============================================
      // COMPLETE
      // ============================================
      await ctx.runMutation(internal.validation.runFullSweep.updateSweepStatus, {
        projectId,
        status: {
          phase: "complete",
          progress: 100,
          message: `Big Bang complete! ${3 - failures.length}/3 agents succeeded.`,
          completedAt: Date.now(),
        }
      });
      
      return { success: true };
      
    } catch (error: any) {
      await ctx.runMutation(internal.validation.runFullSweep.updateSweepStatus, {
        projectId,
        status: {
          phase: "error",
          progress: 0,
          message: "Big Bang failed",
          error: error.message || "Unknown error",
        }
      });
      
      return { success: false, error: error.message };
    }
  }
});

// ============================================
// SWEEP STATUS MANAGEMENT
// ============================================
export const updateSweepStatus = internalMutation({
  args: { 
    projectId: v.id("projects"),
    status: v.object({
      phase: v.string(),
      progress: v.number(),
      message: v.string(),
      startedAt: v.optional(v.number()),
      completedAt: v.optional(v.number()),
      error: v.optional(v.string()),
    })
  },
  handler: async (ctx, args) => {
    const { projectId, status } = args;
    
    // Store sweep status in DNA insights
    const dna = await ctx.db.query("project_brain").withIndex("by_project", q => q.eq("projectId", projectId)).first();
    
    if (dna) {
      const currentInsights = dna.insights || {};
      await ctx.db.patch(dna._id, {
        insights: {
          ...currentInsights,
          sweepStatus: status,
        }
      });
    }
    
    // Also log the progress
    await ctx.db.insert("agent_logs", {
      projectId,
      agentName: "FullSweep",
      log: `[${status.phase.toUpperCase()}] ${status.progress}% | ${status.message}`,
    });
  }
});

// ============================================
// GET SWEEP STATUS QUERY
// ============================================
export const getSweepStatus = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args): Promise<SweepStatus | null> => {
    const dna = await ctx.db.query("project_brain").withIndex("by_project", q => q.eq("projectId", args.projectId)).first();
    return dna?.insights?.sweepStatus || null;
  }
});

// ============================================
// RESET SWEEP STATUS
// ============================================
export const resetSweepStatus = internalMutation({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const dna = await ctx.db.query("project_brain").withIndex("by_project", q => q.eq("projectId", args.projectId)).first();
    
    if (dna) {
      const currentInsights = dna.insights || {};
      await ctx.db.patch(dna._id, {
        insights: {
          ...currentInsights,
          sweepStatus: { phase: "idle", progress: 0, message: "" },
        }
      });
    }
  }
});

// ============================================
// LOG PROGRESS (For parallel agent completion)
// ============================================
export const logProgress = internalMutation({
  args: { 
    projectId: v.id("projects"),
    agent: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("agent_logs", {
      projectId: args.projectId,
      agentName: args.agent,
      log: `✓ ${args.message}`,
    });
  }
});
