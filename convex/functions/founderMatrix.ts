import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { getCurrentUser } from "../lib/auth";

export const create = mutation({
  args: {
    skillLevel: v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced"),
      v.literal("expert")
    ),
    nicheInterests: v.array(v.string()),
    experience: v.string(),
    technicalAbility: v.union(
      v.literal("non-technical"),
      v.literal("basic"),
      v.literal("intermediate"),
      v.literal("advanced")
    ),
    productTypes: v.array(v.string()),
    marketCategories: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    const now = Date.now();
    
    // Combine all skills into the skills array
    const skills = [
      args.skillLevel,
      args.technicalAbility,
      ...args.nicheInterests,
      ...args.productTypes,
      ...args.marketCategories,
    ];

    // Update user with founder profile data
    await ctx.db.patch(user._id, {
      skills,
      constraints: args.experience,
      onboardingCompleted: true,
      updatedAt: now,
    });

    return user._id;
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    
    // Return user data formatted as founder matrix
    if (!user.skills || user.skills.length === 0) {
      return null;
    }

    return {
      _id: user._id,
      userId: user._id,
      skills: user.skills,
      constraints: user.constraints,
      budget: user.budget,
      // Extract specific fields from skills array for backward compatibility
      nicheInterests: user.skills.filter((s: string) => 
        !["beginner", "intermediate", "advanced", "expert", "non-technical", "basic"].includes(s)
      ),
      onboardingCompleted: user.onboardingCompleted,
      updatedAt: user.updatedAt,
    };
  },
});

export const update = mutation({
  args: {
    skillLevel: v.optional(v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced"),
      v.literal("expert")
    )),
    nicheInterests: v.optional(v.array(v.string())),
    experience: v.optional(v.string()),
    technicalAbility: v.optional(v.union(
      v.literal("non-technical"),
      v.literal("basic"),
      v.literal("intermediate"),
      v.literal("advanced")
    )),
    productTypes: v.optional(v.array(v.string())),
    marketCategories: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    const now = Date.now();

    // Build updated skills array
    const currentSkills = user.skills || [];
    let updatedSkills = [...currentSkills];

    if (args.skillLevel || args.technicalAbility || args.nicheInterests || args.productTypes || args.marketCategories) {
      updatedSkills = [
        args.skillLevel,
        args.technicalAbility,
        ...(args.nicheInterests || []),
        ...(args.productTypes || []),
        ...(args.marketCategories || []),
      ].filter(Boolean) as string[];
    }

    const updates: any = {
      updatedAt: now,
    };

    if (updatedSkills.length > 0) {
      updates.skills = updatedSkills;
    }

    if (args.experience !== undefined) {
      updates.constraints = args.experience;
    }

    await ctx.db.patch(user._id, updates);

    return user._id;
  },
});
