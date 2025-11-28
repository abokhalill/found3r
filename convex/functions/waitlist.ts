import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

// ============================================
// PUBLIC: Add email to waitlist (no auth required)
// ============================================
export const addSignup = mutation({
  args: {
    slug: v.string(),
    email: v.string(),
    source: v.optional(v.string()),
    referrer: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { slug, email, source, referrer } = args;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    // Find project by slug (from landing page config or deployment)
    const allDna = await ctx.db.query("project_brain").collect();
    const matchingDna = allDna.find((dna: any) =>
      dna.validationData?.landingPageConfig?.slug === slug ||
      dna.validationData?.deployment?.slug === slug
    );

    if (!matchingDna) {
      throw new Error("Project not found");
    }

    const projectId = matchingDna.projectId;

    // Check for duplicate email on this project
    const existing = await ctx.db
      .query("waitlist_signups")
      .withIndex("by_project", (q) => q.eq("projectId", projectId))
      .filter((q) => q.eq(q.field("email"), email.toLowerCase()))
      .first();

    if (existing) {
      return { success: true, message: "Already signed up", duplicate: true };
    }

    // Insert new signup
    await ctx.db.insert("waitlist_signups", {
      projectId,
      email: email.toLowerCase(),
      source: source || "landing_page",
      referrer: referrer || undefined,
      createdAt: Date.now(),
    });

    // Log the signup
    await ctx.db.insert("agent_logs", {
      projectId,
      agentName: "Waitlist",
      log: `[SIGNUP] New email: ${email.slice(0, 3)}***@${email.split("@")[1]}`,
    });

    return { success: true, message: "Successfully signed up", duplicate: false };
  },
});

// ============================================
// Get signups for a project (authenticated)
// ============================================
export const getSignups = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const signups = await ctx.db
      .query("waitlist_signups")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .order("desc")
      .collect();

    return signups;
  },
});

// ============================================
// Get signup stats for a project
// ============================================
export const getSignupStats = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const signups = await ctx.db
      .query("waitlist_signups")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();

    // Calculate stats
    const total = signups.length;
    
    // Signups in last 24 hours
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const last24h = signups.filter((s) => s.createdAt > oneDayAgo).length;
    
    // Signups in last 7 days
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const last7d = signups.filter((s) => s.createdAt > sevenDaysAgo).length;

    // By source
    const bySource: Record<string, number> = {};
    signups.forEach((s) => {
      const src = s.source || "unknown";
      bySource[src] = (bySource[src] || 0) + 1;
    });

    // Daily breakdown (last 7 days)
    const dailyBreakdown: { date: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const dayStart = new Date();
      dayStart.setHours(0, 0, 0, 0);
      dayStart.setDate(dayStart.getDate() - i);
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate() + 1);

      const count = signups.filter(
        (s) => s.createdAt >= dayStart.getTime() && s.createdAt < dayEnd.getTime()
      ).length;

      dailyBreakdown.push({
        date: dayStart.toLocaleDateString("en-US", { weekday: "short" }),
        count,
      });
    }

    return {
      total,
      last24h,
      last7d,
      bySource,
      dailyBreakdown,
      latestSignups: signups.slice(0, 5).map((s) => ({
        email: `${s.email.slice(0, 3)}***@${s.email.split("@")[1]}`,
        createdAt: s.createdAt,
        source: s.source,
      })),
    };
  },
});

// ============================================
// Track page view (for analytics)
// ============================================
export const trackPageView = mutation({
  args: {
    slug: v.string(),
    referrer: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { slug } = args;

    // Find project by slug
    const allDna = await ctx.db.query("project_brain").collect();
    const matchingDna = allDna.find((dna: any) =>
      dna.validationData?.landingPageConfig?.slug === slug ||
      dna.validationData?.deployment?.slug === slug
    );

    if (!matchingDna) {
      return { success: false };
    }

    // Increment view count in validationData
    const currentViews = matchingDna.validationData?.views || 0;
    await ctx.db.patch(matchingDna._id, {
      validationData: {
        ...matchingDna.validationData,
        views: currentViews + 1,
        lastViewAt: Date.now(),
      },
    });

    return { success: true, views: currentViews + 1 };
  },
});
