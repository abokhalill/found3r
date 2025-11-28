import { action, internalQuery, internalMutation, mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ============================================
// LANDING PAGE CONFIG TYPE (V2 - No Pricing)
// ============================================
interface LandingPageConfig {
  slug: string;
  hero: {
    badge?: string;
    headline: string;
    subheadline: string;
    cta: string;
    ctaSecondary?: string;
  };
  problem?: {
    oldWay: string;
    newWay: string;
  };
  features: Array<{
    title: string;
    description: string;
    icon: "shield" | "zap" | "chart" | "rocket" | "star" | "check" | "lock" | "globe" | "cpu" | "layers";
  }>;
  socialProof?: {
    logos?: string[];
    quote?: string;
    author?: string;
    role?: string;
  };
  theme: "dark" | "light";
}

export const run = action({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const { projectId } = args;

    // 1. Get DNA and Project
    const dna = await ctx.runQuery(internal.agents.launchTest.getDNA, { projectId });
    const project = await ctx.runQuery(internal.agents.launchTest.getProject, { projectId });
    
    if (!dna || !dna.painPoints || dna.painPoints.length === 0) {
      await ctx.runMutation(internal.agents.launchTest.logAgent, {
        projectId,
        agentName: "LaunchTest",
        log: "[ERROR] No pain points in DNA | Run SignalScanner first",
      });
      throw new Error("No pain points found.");
    }

    await ctx.runMutation(internal.agents.launchTest.logAgent, {
      projectId,
      agentName: "LaunchTest",
      log: "[SYSTEM] Initializing template engine | Mode: LandingPage",
    });

    // 2. Pick highest score pain point
    const sorted = dna.painPoints.sort((a: any, b: any) => (b.urgencyScore || 0) - (a.urgencyScore || 0));
    const topPain = sorted[0];
    
    // 2b. Get selected strategy and competitor intel (Deep Context)
    const selectedStrategy = dna.insights?.selectedStrategy;
    const competitors = dna.insights?.competitors || [];
    const topCompetitor = competitors[0];
    const marketHeat = dna.insights?.trends?.marketHeat;
    
    // Build deep context for AI
    let deepContext = "";
    
    if (selectedStrategy) {
      deepContext += `\n\n**STRATEGIC ANGLE (MUST INFLUENCE COPY):**
Strategy: ${selectedStrategy.name}
Tagline: ${selectedStrategy.tagline}
Key Tactic: ${selectedStrategy.keyTactic}
IMPORTANT: Align ALL copy to this strategy.`;
    }
    
    if (topCompetitor) {
      deepContext += `\n\n**COMPETITOR POSITIONING (MUST ADDRESS):**
Main Competitor: ${topCompetitor.name}
Their Weakness: ${topCompetitor.weakness}
Their Pricing: ${topCompetitor.pricing}
IMPORTANT: Write copy that specifically positions against "${topCompetitor.name}" by highlighting how we solve "${topCompetitor.weakness}".`;
    }
    
    if (marketHeat) {
      deepContext += `\n\n**MARKET TIMING:**
Market Heat: ${marketHeat}/100
${marketHeat >= 70 ? "This is a HOT market - use urgency in copy (e.g., 'Join the wave', 'Don't miss out')" : 
  marketHeat >= 50 ? "Growing market - emphasize being early adopter" : 
  "Emerging market - focus on innovation and vision"}`;
    }

    await ctx.runMutation(internal.agents.launchTest.logAgent, {
      projectId,
      agentName: "LaunchTest",
      log: `[ANALYZER] Target pain: "${topPain.title}" | Strategy: ${selectedStrategy?.name || 'None'} | Competitor: ${topCompetitor?.name || 'None'}`,
    });

    // 3. Generate slug from project name
    const baseSlug = (project?.name || "project")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;

    // 4. AI Task - Generate Landing Page Config (JSON Template)
    await ctx.runMutation(internal.agents.launchTest.logAgent, {
      projectId,
      agentName: "LaunchTest",
      log: "[RENDERER] Compiling conversion copy...",
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 2000,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are an elite Conversion Copywriter. Create content for a high-converting Smoke Test Landing Page.

**CRITICAL RULES:**
- Do NOT generate pricing. This is a smoke test for interest, not revenue.
- Focus on the Problem/Solution framework.
- Headlines must be punchy and benefit-focused (max 8 words)
- Subheadlines explain the value prop clearly (max 20 words)
- Features should highlight specific benefits, not generic claims
- Use power words: "Instant", "Automated", "10x", "Zero", "Never"
- CTA should create urgency for early access

**ICON OPTIONS (use exactly these strings):**
"shield", "zap", "chart", "rocket", "star", "check", "lock", "globe", "cpu", "layers"

**RETURN THIS EXACT JSON STRUCTURE:**
{
  "hero": {
    "badge": "Short badge text (e.g., 'Now in Beta')",
    "headline": "Main headline (max 8 words)",
    "subheadline": "Value proposition (max 20 words)",
    "cta": "Get Early Access",
    "ctaSecondary": "No credit card required"
  },
  "problem": {
    "oldWay": "Describe the painful old way of doing things (2-3 sentences)",
    "newWay": "Describe how your solution makes it effortless (2-3 sentences)"
  },
  "features": [
    { "title": "Feature name", "description": "Benefit description (max 15 words)", "icon": "icon_name" },
    { "title": "Feature name", "description": "Benefit description (max 15 words)", "icon": "icon_name" },
    { "title": "Feature name", "description": "Benefit description (max 15 words)", "icon": "icon_name" }
  ],
  "socialProof": {
    "logos": ["Company 1", "Company 2", "Company 3", "Company 4", "Company 5"]
  }
}`
        },
        {
          role: "user",
          content: `Create landing page copy for:

**Product:** ${project?.name || "SaaS Product"}
**Niche:** ${project?.niche || "Technology"}
**Problem:** ${topPain.title}
**Context:** ${topPain.description}
${deepContext}

Focus on the Problem/Solution framework. Make visitors feel the pain of the old way, then show them the new way. No pricing - this is a smoke test for interest.`
        }
      ]
    });

    const aiResult = JSON.parse(completion.choices[0].message.content || "{}");
    
    // 5. Build the final config (V2 - No Pricing)
    const landingPageConfig: LandingPageConfig = {
      slug,
      hero: aiResult.hero || {
        headline: "Build Something Amazing",
        subheadline: "The fastest way to validate your startup idea.",
        cta: "Get Early Access"
      },
      problem: aiResult.problem,
      features: (aiResult.features || []).slice(0, 6),
      socialProof: aiResult.socialProof,
      theme: "dark"
    };

    await ctx.runMutation(internal.agents.launchTest.logAgent, {
      projectId,
      agentName: "LaunchTest",
      log: `[COMPILER] Config assembled | Features: ${landingPageConfig.features.length} | Problem/Solution: ${landingPageConfig.problem ? 'Yes' : 'No'}`,
    });

    // 6. Update DNA with landing page config
    const newValidationData = {
      ...dna.validationData,
      landingPageConfig,
      smokeTest: {
        headline: landingPageConfig.hero.headline,
        subheadline: landingPageConfig.hero.subheadline,
        cta: landingPageConfig.hero.cta,
        features: landingPageConfig.features,
        problem: landingPageConfig.problem,
      }
    };

    await ctx.runMutation(internal.agents.launchTest.updateDNA, {
      projectId,
      validationData: newValidationData
    });

    // 7. Create Ticket
    const featuresList = landingPageConfig.features
      .map((f) => `- **${f.title}**: ${f.description}`)
      .join('\n');
    
    await ctx.runMutation(internal.agents.launchTest.createTicket, {
      projectId,
      title: "Launch Smoke Test Landing Page",
      description: `## Landing Page Ready

**Headline:** ${landingPageConfig.hero.headline}

**Subheadline:** ${landingPageConfig.hero.subheadline}

**CTA:** ${landingPageConfig.hero.cta}

### Features
${featuresList}

### Social Proof
> "${landingPageConfig.socialProof?.quote || 'N/A'}"
> — ${landingPageConfig.socialProof?.author || ''}, ${landingPageConfig.socialProof?.role || ''}

---
**Preview URL:** \`found3r.dev/p/${slug}\`

*Click "Deploy" to make it live.*`,
      status: "todo",
      priority: "high",
      type: "validation_task",
      agentAuthor: "LaunchTest"
    });

    await ctx.runMutation(internal.agents.launchTest.logAgent, {
      projectId,
      agentName: "LaunchTest",
      log: `[SUCCESS] Artifact generated | Slug: ${slug}`,
    });
  }
});

// --- HELPERS ---

export const getProject = internalQuery({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.projectId);
  }
});

export const getDNA = internalQuery({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.query("project_brain").withIndex("by_project", (q) => q.eq("projectId", args.projectId)).first();
  }
});

export const updateDNA = internalMutation({
  args: { projectId: v.id("projects"), validationData: v.any() },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("project_brain").withIndex("by_project", (q) => q.eq("projectId", args.projectId)).first();
    if (existing) {
        await ctx.db.patch(existing._id, { validationData: args.validationData });
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

// ============================================
// DEPLOY SITE MUTATION (V2 - Wildcard Subdomain)
// Sets isLive = true, returns subdomain URL
// ============================================
export const deploySite = mutation({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const { projectId } = args;
    
    // 1. Get existing brain and Project
    const brain = await ctx.db
      .query("project_brain")
      .withIndex("by_project", (q) => q.eq("projectId", projectId))
      .first();
    
    const project = await ctx.db.get(projectId);
    
    if (!brain) {
      throw new Error("Project brain not found. Generate a landing page first.");
    }
    
    // 2. Check if landing page config exists
    const config = brain.validationData?.landingPageConfig;
    if (!config) {
      throw new Error("No landing page config found. Generate one first.");
    }
    
    // 3. Generate readable slug for subdomain (e.g., legal-ai)
    const nicheSlug = (project?.niche || "startup")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 25);
    const randomSuffix = Math.random().toString(36).substring(2, 5);
    const deploySlug = `${nicheSlug}-${randomSuffix}`;
    
    // 4. Build subdomain URL
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "found3r.dev";
    const subdomainUrl = `https://${deploySlug}.${rootDomain}`;
    
    // 5. Update brain with deployment info + isLive flag
    const newValidationData = {
      ...brain.validationData,
      isLive: true,
      launchConfig: config,
      deployment: {
        slug: deploySlug,
        publishedAt: Date.now(),
        status: "live",
        url: subdomainUrl,
      },
    };
    
    await ctx.db.patch(brain._id, { validationData: newValidationData });
    
    // 6. Log the deployment
    await ctx.db.insert("agent_logs", {
      projectId,
      agentName: "LaunchTest",
      log: `[DEPLOY] Site live | ${subdomainUrl}`
    });
    
    // 7. Return the subdomain URL
    return {
      url: subdomainUrl,
      slug: deploySlug
    };
  }
});

// ============================================
// PUBLIC LANDING PAGE QUERY (V2)
// Only returns data if isLive = true
// ============================================
export const getPublicLandingPage = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const { slug } = args;
    
    // Find the brain with matching slug
    const allBrains = await ctx.db.query("project_brain").collect();
    
    const matchingBrain = allBrains.find((brain: any) => 
      brain.validationData?.landingPageConfig?.slug === slug ||
      brain.validationData?.deployment?.slug === slug
    );
    
    if (!matchingBrain) {
      return null;
    }
    
    // V2: Check isLive flag - return 404 if not live
    if (!matchingBrain.validationData?.isLive) {
      return null;
    }
    
    // Get the project for additional context
    const project = await ctx.db.get(matchingBrain.projectId);
    
    return {
      projectId: matchingBrain.projectId,
      projectName: project?.name || "Untitled",
      niche: project?.niche || "",
      config: matchingBrain.validationData?.landingPageConfig || null,
      deployment: matchingBrain.validationData?.deployment || null,
      isLive: true,
    };
  }
});
