import { action, internalQuery, internalMutation } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ============================================
// DISTRIBUTION KIT - "THE CAMPAIGN MANAGER" (Pro)
// Outputs: Ready-to-Ship Marketing Assets
// ============================================
export const run = action({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const { projectId } = args;

    // 1. Get Context
    const context = await ctx.runQuery(internal.agents.distributionKit.getContext, { projectId });
    if (!context || !context.project) throw new Error("Context not found");
    const { project, dna } = context;

    await ctx.runMutation(internal.agents.distributionKit.logAgent, {
        projectId,
        agentName: "DistributionKit",
        log: "[SYSTEM] Initializing campaign generator | Mode: GTM"
    });

    const topPain = dna?.painPoints?.[0]?.title || project.niche;
    const landingPageConfig = dna?.validationData?.landingPageConfig;
    const headline = landingPageConfig?.hero?.headline || project.name;
    const subheadline = landingPageConfig?.hero?.subheadline || topPain;
    const deployedUrl = dna?.validationData?.deployment?.slug 
      ? `https://found3r.vercel.app/p/${dna.validationData.deployment.slug}`
      : null;

    // 2. AI Task - Generate Ready-to-Ship Campaign Assets
    const completion = await openai.chat.completions.create({
      model: "gpt-5-nano",
      max_completion_tokens: 3000, // Reasoning model needs more tokens
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are an elite Growth Marketer. Generate READY-TO-SHIP marketing assets.

**PRODUCT CONTEXT:**
- Product: ${project.name}
- Problem: ${topPain}
- Headline: ${headline}
- Subheadline: ${subheadline}
- Landing Page URL: ${deployedUrl || '[Not deployed yet]'}

**RULES:**
- Write copy that sounds human, not corporate
- Use specific numbers and results when possible
- Reddit posts should feel like genuine community sharing
- Cold emails should be short (under 100 words)
- Product Hunt should be punchy and memorable

**RETURN THIS EXACT JSON:**
{
  "channels": ["Reddit", "Cold Email", "Product Hunt"],
  "assets": {
    "reddit": {
      "subreddit": "r/SaaS or r/startups or r/Entrepreneur",
      "title": "Catchy title that doesn't feel like an ad (max 100 chars)",
      "body_markdown": "Full post body in markdown. Tell a story. Include the problem, your solution, and a soft CTA. 200-400 words."
    },
    "email": {
      "subject": "Short, curiosity-driven subject line (max 50 chars)",
      "body_text": "Plain text email body. Personal, conversational. Under 100 words. Include one clear CTA.",
      "target_profile": "Specific persona (e.g., 'CTOs at Seed-Stage Startups')"
    },
    "product_hunt": {
      "tagline": "One-liner tagline (max 60 chars)",
      "first_comment": "The maker's first comment. Personal story, why you built this, what's next. 150-250 words."
    },
    "twitter": {
      "launch_thread": [
        "Tweet 1: Hook (the problem)",
        "Tweet 2: The insight",
        "Tweet 3: The solution (your product)",
        "Tweet 4: Social proof or early results",
        "Tweet 5: CTA with link"
      ]
    }
  }
}`
        },
        {
          role: "user",
          content: `Generate marketing assets for:

PRODUCT: ${project.name}
NICHE: ${project.niche}
PROBLEM: ${topPain}
HEADLINE: ${headline}
SUBHEADLINE: ${subheadline}
LANDING PAGE: ${deployedUrl || 'Not deployed yet'}

Create compelling, specific copy for Reddit, Email, Product Hunt, and Twitter. Make it sound authentic and human.`
        }
      ]
    });

    const result = JSON.parse(completion.choices[0].message.content || "{}");

    await ctx.runMutation(internal.agents.distributionKit.logAgent, {
        projectId,
        agentName: "DistributionKit",
        log: `[RENDERER] Assets compiled | Channels: ${result.channels?.length || 0}`
    });

    // 3. Update DNA with complete GTM strategy artifact
    await ctx.runMutation(internal.agents.distributionKit.updateGTM, {
        projectId,
        gtmStrategy: {
            channels: result.channels || [],
            assets: result.assets || {},
            generatedAt: Date.now()
        }
    });

    // 4. Create Actionable Tickets
    const assets = result.assets || {};
    
    // Reddit Ticket
    if (assets.reddit) {
      await ctx.runMutation(internal.agents.distributionKit.createTicket, {
          projectId,
          title: `Post to ${assets.reddit.subreddit}`,
          description: `**Title:** ${assets.reddit.title}\n\n---\n\n*Copy the post from the Launch tab and submit to Reddit.*`,
          status: "todo",
          priority: "high",
          type: "marketing",
          agentAuthor: "DistributionKit"
      });
    }

    // Cold Email Ticket
    if (assets.email) {
      await ctx.runMutation(internal.agents.distributionKit.createTicket, {
          projectId,
          title: `Send 10 Cold Emails to ${assets.email.target_profile}`,
          description: `**Subject:** ${assets.email.subject}\n\n---\n\n*Copy the email template from the Launch tab.*`,
          status: "todo",
          priority: "high",
          type: "marketing",
          agentAuthor: "DistributionKit"
      });
    }

    // Product Hunt Ticket
    if (assets.product_hunt) {
      await ctx.runMutation(internal.agents.distributionKit.createTicket, {
          projectId,
          title: "Launch on Product Hunt",
          description: `**Tagline:** ${assets.product_hunt.tagline}\n\n---\n\n*Prepare your launch on producthunt.com. First comment ready in Launch tab.*`,
          status: "backlog",
          priority: "medium",
          type: "marketing",
          agentAuthor: "DistributionKit"
      });
    }

    // Twitter Ticket
    if (assets.twitter) {
      await ctx.runMutation(internal.agents.distributionKit.createTicket, {
          projectId,
          title: "Post Launch Thread on X/Twitter",
          description: `**Thread:** ${assets.twitter.launch_thread?.length || 0} tweets ready\n\n---\n\n*Copy the thread from the Launch tab.*`,
          status: "todo",
          priority: "high",
          type: "marketing",
          agentAuthor: "DistributionKit"
      });
    }

    await ctx.runMutation(internal.agents.distributionKit.logAgent, {
        projectId,
        agentName: "DistributionKit",
        log: `[SUCCESS] Campaign ready | Assets: ${Object.keys(assets).length} | Channels: ${result.channels?.length || 0}`
    });
  }
});

// --- HELPERS ---

export const getContext = internalQuery({
    args: { projectId: v.id("projects") },
    handler: async (ctx, args) => {
        const project = await ctx.db.get(args.projectId);
        const dna = await ctx.db.query("project_brain").withIndex("by_project", q => q.eq("projectId", args.projectId)).first();
        return { project, dna };
    }
});

export const updateGTM = internalMutation({
    args: { projectId: v.id("projects"), gtmStrategy: v.any() },
    handler: async (ctx, args) => {
        const existing = await ctx.db.query("project_brain").withIndex("by_project", q => q.eq("projectId", args.projectId)).first();
        if (existing) {
            await ctx.db.patch(existing._id, { gtmStrategy: args.gtmStrategy });
        }
    }
});

export const createTicket = internalMutation({
  args: { projectId: v.id("projects"), title: v.string(), description: v.string(), status: v.string(), priority: v.string(), type: v.string(), agentAuthor: v.string() },
  handler: async (ctx, args) => { await ctx.db.insert("tickets", args); },
});

export const logAgent = internalMutation({
  args: { projectId: v.id("projects"), agentName: v.string(), log: v.string() },
  handler: async (ctx, args) => { await ctx.db.insert("agent_logs", args); },
});
