import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get the current authenticated user
 * Returns null if not authenticated
 */
export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", identity.subject))
      .unique();

    return user;
  },
});

/**
 * Alias for getCurrent - for backward compatibility
 */
export const viewer = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", identity.subject))
      .first();

    return user;
  },
});

/**
 * Get a user by Clerk ID - requires authentication
 */
export const getUser = query({
  args: { clerkId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const clerkId = args.clerkId || identity.subject;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", clerkId))
      .first();

    return user;
  },
});

/**
 * Create or get user (used by webhooks and as fallback)
 */
export const createUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", args.clerkId))
      .first();

    if (existingUser) {
      return existingUser._id;
    }

    // Create new user
    const userId = await ctx.db.insert("users", {
      clerkUserId: args.clerkId,
      email: args.email,
      name: args.name,
      credits: 0,
      onboardingCompleted: false,
    });

    return userId;
  },
});

/**
 * Update user profile
 */
export const updateUser = mutation({
  args: {
    clerkId: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", args.clerkId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    if (args.name !== undefined) {
      await ctx.db.patch(user._id, { name: args.name });
    }

    return user._id;
  },
});

/**
 * Update the current user's profile (authenticated) - Founder Matrix
 */
export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    budget: v.optional(v.string()),
    constraints: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", identity.subject))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const updates: Record<string, any> = {};
    if (args.name !== undefined) updates.name = args.name;
    if (args.skills !== undefined) updates.skills = args.skills;
    if (args.budget !== undefined) updates.budget = args.budget;
    if (args.constraints !== undefined) updates.constraints = args.constraints;

    if (Object.keys(updates).length > 0) {
      await ctx.db.patch(user._id, updates);
    }

    return user._id;
  },
});

/**
 * Complete onboarding and update user profile
 */
export const completeOnboarding = mutation({
  args: {
    skills: v.array(v.string()),
    budget: v.string(),
    constraints: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, {
      skills: args.skills,
      budget: args.budget,
      constraints: args.constraints,
      onboardingCompleted: true,
    });

    return user._id;
  },
});

/**
 * Sync or create user from Clerk (fallback for when webhook fails)
 */
export const syncUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    // Check if user exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", identity.subject))
      .first();

    if (existingUser) {
      return existingUser._id;
    }

    // Create user if doesn't exist (webhook fallback)
    const userId = await ctx.db.insert("users", {
      clerkUserId: identity.subject,
      email: identity.email || `user-${identity.subject}@placeholder.com`,
      name: identity.name,
      credits: 0,
      onboardingCompleted: false,
    });

    return userId;
  },
});

/**
 * Delete user and all associated data (called by webhook on user.deleted)
 */
export const deleteUser = mutation({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", args.clerkId))
      .first();

    if (!user) {
      console.log(`User ${args.clerkId} not found, may have already been deleted`);
      return null;
    }

    // Get all user's projects
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    // Delete all project-related data
    for (const project of projects) {
      // Delete tickets
      const tickets = await ctx.db
        .query("tickets")
        .withIndex("by_project", (q) => q.eq("projectId", project._id))
        .collect();
      for (const ticket of tickets) {
        await ctx.db.delete(ticket._id);
      }

      // Delete project_brain
      const brain = await ctx.db
        .query("project_brain")
        .withIndex("by_project", (q) => q.eq("projectId", project._id))
        .first();
      if (brain) await ctx.db.delete(brain._id);

      // Delete agent_logs
      const logs = await ctx.db
        .query("agent_logs")
        .withIndex("by_project", (q) => q.eq("projectId", project._id))
        .collect();
      for (const log of logs) {
        await ctx.db.delete(log._id);
      }

      // Delete chat messages
      const chats = await ctx.db
        .query("chat")
        .withIndex("by_project", (q) => q.eq("projectId", project._id))
        .collect();
      for (const chat of chats) {
        await ctx.db.delete(chat._id);
      }

      // Delete waitlist signups
      const signups = await ctx.db
        .query("waitlist_signups")
        .withIndex("by_project", (q) => q.eq("projectId", project._id))
        .collect();
      for (const signup of signups) {
        await ctx.db.delete(signup._id);
      }

      // Delete the project itself
      await ctx.db.delete(project._id);
    }

    // Finally, delete the user
    await ctx.db.delete(user._id);

    return user._id;
  },
});
