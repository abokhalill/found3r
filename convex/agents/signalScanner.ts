import { action, internalQuery, internalMutation } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import { fetchSignals, Signal } from "../lib/scraping";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ============================================
// V2 SIGNAL SCANNER - Revenue/Compliance Filter
// ============================================
const ANALYST_PROMPT = `You are a STRICT signal analyst. Your job is to filter market signals for REVENUE POTENTIAL and COMPLIANCE RISK.

**FILTER CRITERIA (BE RUTHLESS):**
1. **Revenue Signal**: Does this indicate willingness to pay? (pricing complaints, budget mentions, "I'd pay for...")
2. **Compliance Signal**: Is there regulatory/legal risk? (GDPR, HIPAA, financial regulations)
3. **Pain Intensity**: How urgent is this problem? (workarounds, frustration level)

**SCORING:**
- 80-100: Explicit payment intent + clear pain
- 60-79: Strong pain, implied budget
- 40-59: Valid problem, unclear monetization
- 20-39: Vague complaints
- 0-19: Noise, not actionable

**OUTPUT REQUIREMENTS:**
For each VALID signal (score >= 40), extract:
- title: Short problem statement (max 10 words)
- description: What's the pain? Who has it?
- urgencyScore: 0-100
- hasMoneySignal: boolean
- complianceFlag: boolean (true if regulatory risk detected)

Return JSON: {
  "signals": [{ "title": string, "description": string, "urgencyScore": number, "hasMoneySignal": boolean, "complianceFlag": boolean, "sourceUrl": string }],
  "overallScore": number (0-100),
  "verdict": string (1 sentence summary)
}`;

export const run = action({
  args: { 
      projectId: v.id("projects"),
      provider: v.optional(v.string()) 
  },
  handler: async (ctx, args) => {
    const { projectId } = args;

    // 1. Get Context
    const project = await ctx.runQuery(internal.agents.signalScanner.getProject, { projectId });
    if (!project) throw new Error("Project not found");

    await ctx.runMutation(internal.agents.signalScanner.logAgent, {
      projectId,
      agentName: "SignalScanner",
      log: `[SYSTEM] V2 Hybrid scan | Target: ${project.niche}`,
    });

    // 2. FETCH SIGNALS (V2: HN + Reddit hybrid)
    let fetchResult;
    try {
      fetchResult = await fetchSignals(project.niche);
    } catch (e: any) {
      await ctx.runMutation(internal.agents.signalScanner.logAgent, {
        projectId,
        agentName: "SignalScanner",
        log: `[ERROR] Fetch failed | ${e.message}`,
      });
      throw e;
    }

    const { signals, stats, markdown } = fetchResult;

    if (signals.length === 0) {
      await ctx.runMutation(internal.agents.signalScanner.logAgent, {
        projectId,
        agentName: "SignalScanner",
        log: `[WARN] No signals found | VERDICT: Cannot validate`,
      });
      return;
    }
    
    await ctx.runMutation(internal.agents.signalScanner.logAgent, {
      projectId,
      agentName: "SignalScanner",
      log: `[SCRAPER] ${stats.total} signals | HN: ${stats.bySource.HackerNews} | Reddit: ${stats.bySource.Reddit}`,
    });

    // 3. ANALYZE with Revenue/Compliance Filter
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 2000,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: ANALYST_PROMPT },
        { 
          role: "user", 
          content: `Analyze these signals for niche: "${project.niche}"

SIGNAL COUNT: ${stats.total} (HN: ${stats.bySource.HackerNews}, Reddit: ${stats.bySource.Reddit})

---

${markdown}` 
        }
      ]
    });

    const result = JSON.parse(completion.choices[0].message.content || "{}");
    const analyzedSignals = result.signals || [];
    const overallScore = Math.min(100, Math.max(0, result.overallScore || 50));
    const verdict = result.verdict || "Analysis complete.";

    await ctx.runMutation(internal.agents.signalScanner.logAgent, {
      projectId,
      agentName: "SignalScanner",
      log: `[AI] Score: ${overallScore} | Signals: ${analyzedSignals.length} | ${verdict}`,
    });

    // Determine recommendation
    let recommendation: "kill" | "pivot" | "proceed";
    if (overallScore < 40) recommendation = "kill";
    else if (overallScore < 60) recommendation = "pivot";
    else recommendation = "proceed";

    // 4. Save to project_brain.signals (V2 structure)
    await ctx.runMutation(internal.agents.signalScanner.updateBrain, {
      projectId,
      signals: analyzedSignals,
      validationData: { 
        score: overallScore, 
        recommendation,
        verdict,
        rawSignals: signals.map(s => ({ source: s.source, url: s.url, title: s.title })),
        stats,
      },
    });

    // 5. Generate Tickets for high-signal pains
    for (const signal of analyzedSignals.filter((s: any) => s.urgencyScore >= 60)) {
      await ctx.runMutation(internal.agents.signalScanner.createTicket, {
        projectId,
        title: `Validate: ${signal.title}`,
        description: `**Score: ${signal.urgencyScore}/100**\n${signal.description}\n\n${signal.hasMoneySignal ? '💰 Money signal detected' : ''}${signal.complianceFlag ? '\n⚠️ Compliance risk' : ''}`,
        status: "todo",
        priority: signal.urgencyScore > 70 ? "high" : "medium",
        type: "validation_task",
        agentAuthor: "SignalScanner",
      });
    }

    await ctx.runMutation(internal.agents.signalScanner.logAgent, {
      projectId,
      agentName: "SignalScanner",
      log: `[SUCCESS] Score: ${overallScore}/100 | ${recommendation.toUpperCase()} | ${analyzedSignals.length} signals saved`,
    });

    // 6. Proactive Co-Pilot message
    let proactiveMessage = "";
    if (overallScore >= 60) {
      proactiveMessage = `Strong signal! Score: ${overallScore}/100. Found ${analyzedSignals.length} validated pains. Ready to generate a landing page?`;
    } else if (overallScore >= 40) {
      proactiveMessage = `Moderate signal. Score: ${overallScore}/100. ${verdict}`;
    } else {
      proactiveMessage = `Weak signal. Score: ${overallScore}/100. Consider pivoting or refining your niche.`;
    }

    await ctx.runMutation(internal.agents.copilot.saveMessage, {
      projectId,
      role: "assistant" as const,
      message: proactiveMessage,
    });
  },
});

// --- HELPERS (Keep these, they are correct) ---

export const getProject = internalQuery({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => { return await ctx.db.get(args.projectId); },
});

export const updateBrain = internalMutation({
  args: { projectId: v.id("projects"), signals: v.any(), validationData: v.any() },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("project_brain").withIndex("by_project", (q) => q.eq("projectId", args.projectId)).first();
    
    if (existing) { 
      await ctx.db.patch(existing._id, { 
        painPoints: args.signals, // V2: signals stored as painPoints for compatibility
        validationData: args.validationData,
      }); 
    } else { 
      await ctx.db.insert("project_brain", { 
        projectId: args.projectId, 
        painPoints: args.signals,
        validationData: args.validationData,
        techStack: {}, 
        gtmStrategy: {} 
      }); 
    }
  },
});

export const updateDNA = internalMutation({
  args: { projectId: v.id("projects"), painPoints: v.any(), validationData: v.any(), analytics: v.optional(v.any()) },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("project_brain").withIndex("by_project", (q) => q.eq("projectId", args.projectId)).first();
    const updateData: any = { painPoints: args.painPoints, validationData: args.validationData };
    if (args.analytics) updateData.analytics = args.analytics;
    
    if (existing) { 
      await ctx.db.patch(existing._id, updateData); 
    } else { 
      await ctx.db.insert("project_brain", { 
        projectId: args.projectId, 
        painPoints: args.painPoints, 
        validationData: args.validationData, 
        analytics: args.analytics || {},
        techStack: {}, 
        gtmStrategy: {} 
      }); 
    }
  },
});

export const createTicket = internalMutation({
  args: { projectId: v.id("projects"), title: v.string(), description: v.string(), status: v.string(), priority: v.string(), type: v.string(), agentAuthor: v.string() },
  handler: async (ctx, args) => { await ctx.db.insert("tickets", args); },
});

export const logAgent = internalMutation({
  args: { projectId: v.id("projects"), agentName: v.string(), log: v.string() },
  handler: async (ctx, args) => { await ctx.db.insert("agent_logs", args); },
});