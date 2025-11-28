import { action, internalQuery, internalMutation } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ============================================
// BUILD PLANNER - "THE ARCHITECT" (Pro)
// Outputs: Mermaid.js Graph + Tech Stack + Phases
// ============================================
export const run = action({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const { projectId } = args;
    
    // 1. Get Context
    const context = await ctx.runQuery(internal.agents.buildPlanner.getContext, { projectId });
    if (!context || !context.project || !context.user) throw new Error("Context not found");
    const { user, project, dna } = context;

    await ctx.runMutation(internal.agents.buildPlanner.logAgent, {
        projectId,
        agentName: "BuildPlanner",
        log: `[SYSTEM] Initializing architect sequence | Skills: [${user.skills?.join(", ") || "None"}]`
    });

    const topPain = dna?.painPoints?.[0]?.title || project.niche;
    const landingPageConfig = dna?.validationData?.landingPageConfig;
    
    // Get deep context from all intelligence sources
    const selectedStrategy = dna?.insights?.selectedStrategy;
    const competitors = dna?.insights?.competitors || [];
    const topCompetitor = competitors[0];
    const trends = dna?.insights?.trends;
    
    // Build comprehensive strategy context
    let strategyContext = "";
    
    if (selectedStrategy) {
      strategyContext += `\n**STRATEGIC DIRECTION (MUST INFLUENCE PRIORITIES):**
Strategy: "${selectedStrategy.name}"
Key Tactic: ${selectedStrategy.keyTactic}
IMPORTANT: Prioritize features that align with this strategy:
- If "Price Undercut": Use open-source tools, minimize infrastructure costs
- If "UX Play": Prioritize frontend polish, animations, user testing
- If "Feature Niche": Build the ONE killer feature first
- If "Speed Demon": Optimize for fast deployment and iteration`;
    }
    
    if (topCompetitor) {
      strategyContext += `\n\n**COMPETITIVE INTELLIGENCE:**
Main Competitor: ${topCompetitor.name}
Their Weakness: ${topCompetitor.weakness}
IMPORTANT: Ensure our tech stack and features directly address "${topCompetitor.weakness}".`;
    }
    
    if (trends?.marketHeat) {
      strategyContext += `\n\n**MARKET TIMING:**
Market Heat: ${trends.marketHeat}/100 (${trends.timing})
${trends.marketHeat >= 70 ? "HOT MARKET: Prioritize speed to market over perfection" : 
  trends.marketHeat >= 50 ? "GROWING MARKET: Balance speed with quality" : 
  "EMERGING MARKET: Focus on differentiation and innovation"}`;
    }

    // 2. AI Task - Generate Rich Roadmap Artifact
    const completion = await openai.chat.completions.create({
      model: "gpt-5-nano",
      max_completion_tokens: 4000, // Reasoning model needs more tokens
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are a CTO and Solutions Architect. Create a SPECIFIC, TECHNICAL architecture roadmap.

**CRITICAL RULES - DO NOT GENERATE GENERIC DIAGRAMS:**
- Do NOT use generic nodes like "Frontend", "Backend", "API", "Database"
- BE SPECIFIC with actual technology names
- Include real data flows and integrations

**FOUNDER CONSTRAINTS:**
- Skills: ${user.skills?.join(", ") || "Generalist - recommend no-code/low-code"}
- Budget: ${user.budget || "Bootstrap"}
- Niche: ${project.niche}

**PRODUCT CONTEXT:**
- Problem: ${topPain}
- Product Name: ${project.name}

**OUTPUT REQUIREMENTS:**

1. **techStack** - Match to founder skills with SPECIFIC versions:
   - If skills include "React/Next.js" → "Next.js 15 (App Router)"
   - If skills include "Python" → "FastAPI 0.100+"
   - If no skills → "Next.js 15 + Convex + Clerk"
   - Always include specific versions or variants

2. **mermaidGraph** - SPECIFIC 3-LAYER ARCHITECTURE:
   
   LAYER 1 - CLIENT (be specific):
   - NOT "User" → Use "Browser" or "MobileApp"
   - NOT "Frontend" → Use "NextJS" or "ReactApp" or "VueApp"
   
   LAYER 2 - SERVER (be specific):
   - NOT "API" → Use "ConvexActions" or "FastAPIRoutes" or "ExpressServer"
   - Include specific integrations: "StripeWebhook", "ClerkAuth", "OpenAIAPI"
   
   LAYER 3 - DATA (be specific):
   - NOT "Database" → Use "ConvexDB" or "PostgreSQL" or "MongoDB"
   - Include caching: "RedisCache" if applicable
   
   SYNTAX RULES:
   - Start with \`graph TD;\`
   - Use \`-->\` for data flow
   - Use \`-.->\` for async/webhook flows
   - Max 8-10 nodes for clarity
   - NO brackets, quotes, or special chars in node names
   
   GOOD EXAMPLE:
   \`graph TD; Browser-->NextJS; NextJS-->ClerkAuth; NextJS-->ConvexActions; ConvexActions-->ConvexDB; ConvexActions-->OpenAIAPI; StripeWebhook-.->ConvexActions\`
   
   BAD EXAMPLE (too generic):
   \`graph TD; User-->Frontend; Frontend-->API; API-->DB\`

3. **phases** - Development phases with SPECIFIC deliverables:
   - Phase 1: MVP (Week 1-2) - Core user flow only
   - Phase 2: Growth (Week 3-4) - Analytics, A/B testing, optimization
   - Phase 3: Scale (Month 2+) - Multi-tenancy, advanced features

**RETURN THIS EXACT JSON:**
{
  "techStack": {
    "frontend": "Next.js 15 (App Router + Turbopack)",
    "backend": "Convex (Realtime Functions)",
    "database": "Convex DB (Document Store)",
    "hosting": "Vercel (Edge Network)",
    "auth": "Clerk (Social + Email)",
    "ai": "OpenAI GPT-4o-mini",
    "payments": "Stripe (if applicable)"
  },
  "mermaidGraph": "graph TD; Browser-->NextJS; NextJS-->ClerkAuth; NextJS-->ConvexActions; ConvexActions-->ConvexDB; ConvexActions-->OpenAIAPI",
  "phases": [
    {
      "name": "MVP",
      "duration": "Week 1-2",
      "features": [
        { "title": "User Authentication", "description": "Clerk social login + email/password", "effort": "1 day" },
        { "title": "Core Feature", "description": "Main value proposition", "effort": "3 days" }
      ]
    },
    {
      "name": "Growth",
      "duration": "Week 3-4",
      "features": [
        { "title": "Analytics Dashboard", "description": "Track key metrics", "effort": "2 days" }
      ]
    },
    {
      "name": "Scale",
      "duration": "Month 2+",
      "features": [
        { "title": "API Access", "description": "Public API for integrations", "effort": "1 week" }
      ]
    }
  ]
}`
        },
        {
          role: "user",
          content: `Generate a complete technical architecture for:

PRODUCT: ${project.name}
NICHE: ${project.niche}
PROBLEM: ${topPain}
FOUNDER SKILLS: ${user.skills?.join(", ") || "None - recommend no-code stack"}
${strategyContext}

Create specific features for the "${project.niche}" industry. Include at least 2-3 features per phase. ${selectedStrategy ? `Prioritize features that support the "${selectedStrategy.name}" strategy.` : ""}`
        }
      ]
    });

    const result = JSON.parse(completion.choices[0].message.content || "{}");

    await ctx.runMutation(internal.agents.buildPlanner.logAgent, {
        projectId,
        agentName: "BuildPlanner",
        log: `[ARCHITECT] Schema compiled | Phases: ${result.phases?.length || 0}`
    });

    // 3. Update DNA with complete tech stack artifact
    const updatedTechStack = {
        ...result.techStack,
        mermaidGraph: result.mermaidGraph || null,
        phases: result.phases || []
    };
    
    await ctx.runMutation(internal.agents.buildPlanner.updateTechStack, {
        projectId,
        techStack: updatedTechStack
    });

    // 4. Create Tickets for MVP features only (actionable)
    const mvpPhase = result.phases?.find((p: any) => p.name === "MVP");
    const mvpFeatures = mvpPhase?.features || [];
    
    for (const feature of mvpFeatures) {
        await ctx.runMutation(internal.agents.buildPlanner.createTicket, {
            projectId,
            title: `Build: ${feature.title}`,
            description: `${feature.description}\n\n**Effort:** ${feature.effort || 'TBD'}\n**Phase:** MVP`,
            status: "backlog",
            priority: "high",
            type: "feature",
            agentAuthor: "BuildPlanner"
        });
    }

    // 5. Create summary ticket
    const totalFeatures = result.phases?.reduce((acc: number, p: any) => acc + (p.features?.length || 0), 0) || 0;
    await ctx.runMutation(internal.agents.buildPlanner.createTicket, {
        projectId,
        title: "Technical Roadmap Complete",
        description: `## Architecture Overview

**Tech Stack:**
- Frontend: ${result.techStack?.frontend || 'TBD'}
- Backend: ${result.techStack?.backend || 'TBD'}
- Database: ${result.techStack?.database || 'TBD'}
- Auth: ${result.techStack?.auth || 'TBD'}

**Phases:** ${result.phases?.length || 0}
**Total Features:** ${totalFeatures}

---
*View the architecture diagram in the Roadmap tab.*`,
        status: "done",
        priority: "medium",
        type: "documentation",
        agentAuthor: "BuildPlanner"
    });

    await ctx.runMutation(internal.agents.buildPlanner.logAgent, {
        projectId,
        agentName: "BuildPlanner",
        log: `[SUCCESS] Roadmap generated (${Date.now()}ms) | MVP features: ${mvpFeatures.length}`
    });
  }
});

// --- HELPERS ---

export const getContext = internalQuery({
    args: { projectId: v.id("projects") },
    handler: async (ctx, args) => {
        const project = await ctx.db.get(args.projectId);
        if (!project) return null;
        const user = await ctx.db.get(project.userId);
        const dna = await ctx.db.query("project_brain").withIndex("by_project", q => q.eq("projectId", args.projectId)).first();
        return { user, project, dna };
    }
});

export const updateTechStack = internalMutation({
    args: { 
        projectId: v.id("projects"), 
        techStack: v.any()
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db.query("project_brain").withIndex("by_project", q => q.eq("projectId", args.projectId)).first();
        if (existing) {
            await ctx.db.patch(existing._id, { techStack: args.techStack });
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
