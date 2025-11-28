import { QueryCtx, MutationCtx } from "../_generated/server";

/**
 * Get the current authenticated user
 * Throws an error if user is not authenticated
 */
export async function getCurrentUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthenticated");
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", identity.subject))
    .first();

  if (!user) {
    throw new Error("User not found in database");
  }

  return user;
}

/**
 * Get the current authenticated user or null if not authenticated
 */
export async function getCurrentUserOrNull(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null;
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", identity.subject))
    .first();

  return user;
}

/**
 * Verify the current user has access to a resource
 * Throws an error if user doesn't have access
 */
export async function verifyUserAccess(
  ctx: QueryCtx | MutationCtx,
  resourceUserId: any
) {
  const currentUser = await getCurrentUser(ctx);
  
  if (currentUser._id !== resourceUserId) {
    throw new Error("Unauthorized: You don't have access to this resource");
  }
  
  return currentUser;
}
