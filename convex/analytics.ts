import { mutation, query, internalMutation } from "./_generated/server";
import { v } from "convex/values";

// ============================================
// ANALYTICS V2 - Validation Funnel Tracking
// ============================================

// Track page view for a project's landing page
export const trackView = mutation({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const { projectId } = args;
    
    const brain = await ctx.db
      .query("project_brain")
      .withIndex("by_project", (q) => q.eq("projectId", projectId))
      .first();
    
    if (!brain) return { success: false };
    
    // Increment view count
    const currentViews = brain.validationData?.views || 0;
    const newValidationData = {
      ...brain.validationData,
      views: currentViews + 1,
      lastViewAt: Date.now(),
    };
    
    await ctx.db.patch(brain._id, { validationData: newValidationData });
    
    return { success: true, views: currentViews + 1 };
  }
});

// Capture email lead
export const captureEmail = mutation({
  args: { 
    projectId: v.id("projects"), 
    email: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { projectId, email, source } = args;
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }
    
    // Check for duplicate
    const existing = await ctx.db
      .query("waitlist_signups")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();
    
    if (existing && existing.projectId === projectId) {
      return { success: true, duplicate: true };
    }
    
    // Save the lead
    await ctx.db.insert("waitlist_signups", {
      projectId,
      email,
      source: source || "landing_page",
      createdAt: Date.now(),
    });
    
    // Update brain with lead count
    const brain = await ctx.db
      .query("project_brain")
      .withIndex("by_project", (q) => q.eq("projectId", projectId))
      .first();
    
    if (brain) {
      const currentLeads = brain.validationData?.leads || [];
      const newValidationData = {
        ...brain.validationData,
        leads: [...currentLeads, { email, capturedAt: Date.now(), source }],
        leadCount: currentLeads.length + 1,
      };
      await ctx.db.patch(brain._id, { validationData: newValidationData });
    }
    
    // Log the capture (notification placeholder)
    await ctx.db.insert("agent_logs", {
      projectId,
      agentName: "Analytics",
      log: `[LEAD] New signup: ${email} | Source: ${source || 'landing_page'}`,
    });
    
    return { success: true, duplicate: false };
  }
});

// Get funnel stats for dashboard
export const getFunnelStats = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const { projectId } = args;
    
    const brain = await ctx.db
      .query("project_brain")
      .withIndex("by_project", (q) => q.eq("projectId", projectId))
      .first();
    
    if (!brain) {
      return {
        signalsFound: 0,
        pageViews: 0,
        leadsCaptured: 0,
        conversionRate: 0,
        isLive: false,
      };
    }
    
    const signals = brain.painPoints?.length || 0;
    const views = brain.validationData?.views || 0;
    const leads = brain.validationData?.leadCount || 0;
    const conversionRate = views > 0 ? Math.round((leads / views) * 100) : 0;
    
    return {
      signalsFound: signals,
      pageViews: views,
      leadsCaptured: leads,
      conversionRate,
      isLive: brain.validationData?.isLive || false,
      // V2: Return full subdomain URL
      deployedUrl: brain.validationData?.deployment?.url || null,
      slug: brain.validationData?.deployment?.slug || null,
    };
  }
});

// Get recent leads
export const getRecentLeads = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const { projectId } = args;
    
    const signups = await ctx.db
      .query("waitlist_signups")
      .withIndex("by_project", (q) => q.eq("projectId", projectId))
      .order("desc")
      .take(10);
    
    return signups.map(s => ({
      email: s.email,
      source: s.source,
      createdAt: s.createdAt,
    }));
  }
});
