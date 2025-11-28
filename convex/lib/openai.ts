import OpenAI from "openai";
import { QueryCtx, ActionCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";

// ============================================
// UNIVERSAL BRAIN - Standardized AI Layer
// ============================================

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Default model for all agents
const UNIVERSAL_MODEL = "gpt-5-nano";

// Reasoning models need more tokens (reasoning + output)
const DEFAULT_MAX_TOKENS = 2000;

// ============================================
// CONTEXT ENGINE
// ============================================

interface StrategicContext {
  founder: {
    name: string;
    skills: string[];
    budget: string;
    constraints: string;
  };
  project: {
    name: string;
    niche: string;
    status: string;
  };
  dna: {
    score: number | null;
    recommendation: string | null;
    painPointCount: number;
    lastAction: string | null;
  };
}

/**
 * Fetches and structures all relevant context for AI calls
 */
export async function getStrategicContext(
  ctx: QueryCtx,
  projectId: Id<"projects">
): Promise<StrategicContext> {
  // Fetch all data in parallel
  const [project, dna] = await Promise.all([
    ctx.db.get(projectId),
    ctx.db
      .query("project_brain")
      .withIndex("by_project", (q) => q.eq("projectId", projectId))
      .first(),
  ]);

  // Get user from project
  const user = project?.userId ? await ctx.db.get(project.userId) : null;

  return {
    founder: {
      name: user?.name || "Founder",
      skills: user?.skills || [],
      budget: user?.budget || "bootstrap",
      constraints: user?.constraints || "",
    },
    project: {
      name: project?.name || "Unknown Project",
      niche: project?.niche || "Unknown Niche",
      status: project?.status || "scoping",
    },
    dna: {
      score: dna?.validationData?.score || null,
      recommendation: dna?.validationData?.recommendation || null,
      painPointCount: dna?.painPoints?.length || 0,
      lastAction: dna?.validationData?.brutalVerdict ? "Validated" : (dna?.painPoints?.length ? "Scraped signals" : null),
    },
  };
}

/**
 * Formats context into an optimized string for LLM injection
 */
export function formatContextString(context: StrategicContext): string {
  const skillStr = context.founder.skills.length > 0 
    ? context.founder.skills.slice(0, 3).join(", ") 
    : "Generalist";
  
  const scoreStr = context.dna.score !== null 
    ? `${context.dna.score}/100` 
    : "Not validated";

  const lastActionStr = context.dna.lastAction || "No recent activity";

  return `FOUNDER: ${context.founder.name} (${skillStr}). BUDGET: ${context.founder.budget}. PROJECT: ${context.project.name} (${context.project.niche}). STATUS: ${context.project.status}. SCORE: ${scoreStr}. PAIN_POINTS: ${context.dna.painPointCount}. LAST_ACTION: ${lastActionStr}.`;
}

// ============================================
// UNIVERSAL AGENT CALLER
// ============================================

interface AgentCallOptions {
  maxTokens?: number;
  // Note: temperature not supported by gpt-5-nano (reasoning model)
  jsonMode?: boolean;
}

interface AgentResponse {
  content: string;
  reasoning_tokens?: number;
  total_tokens?: number;
}

/**
 * Universal wrapper for all AI agent calls
 * Automatically injects strategic context into every call
 */
export async function callAgent(
  ctx: QueryCtx,
  projectId: Id<"projects">,
  systemPrompt: string,
  userPrompt: string,
  options: AgentCallOptions = {}
): Promise<AgentResponse> {
  const {
    maxTokens = DEFAULT_MAX_TOKENS,
    jsonMode = false,
  } = options;

  // Get and format context
  const context = await getStrategicContext(ctx, projectId);
  const contextStr = formatContextString(context);

  // Build system prompt with context injection
  const fullSystemPrompt = `${systemPrompt}

---
STRATEGIC CONTEXT:
${contextStr}
---`;

  try {
    const completion = await openai.chat.completions.create({
      model: UNIVERSAL_MODEL,
      messages: [
        { role: "system", content: fullSystemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_completion_tokens: maxTokens,
      ...(jsonMode && { response_format: { type: "json_object" as const } }),
    });

    const choice = completion.choices?.[0];
    const content = choice?.message?.content || "";
    
    // Extract token usage for monitoring
    const reasoning_tokens = (completion.usage as any)?.completion_tokens_details?.reasoning_tokens;
    const total_tokens = completion.usage?.total_tokens;

    return {
      content,
      reasoning_tokens,
      total_tokens,
    };
  } catch (error: any) {
    console.error("Universal Brain Error:", error?.message || error);
    throw new Error(`AI call failed: ${error?.message || "Unknown error"}`);
  }
}

/**
 * Simplified caller for actions (which can't use ctx.db directly)
 * Pass pre-fetched context string instead
 */
export async function callAgentWithContext(
  contextStr: string,
  systemPrompt: string,
  userPrompt: string,
  options: AgentCallOptions = {}
): Promise<AgentResponse> {
  const {
    maxTokens = DEFAULT_MAX_TOKENS,
    jsonMode = false,
  } = options;

  const fullSystemPrompt = `${systemPrompt}

---
STRATEGIC CONTEXT:
${contextStr}
---`;

  try {
    const completion = await openai.chat.completions.create({
      model: UNIVERSAL_MODEL,
      messages: [
        { role: "system", content: fullSystemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_completion_tokens: maxTokens,
      ...(jsonMode && { response_format: { type: "json_object" as const } }),
    });

    const choice = completion.choices?.[0];
    const content = choice?.message?.content || "";
    
    const reasoning_tokens = (completion.usage as any)?.completion_tokens_details?.reasoning_tokens;
    const total_tokens = completion.usage?.total_tokens;

    return {
      content,
      reasoning_tokens,
      total_tokens,
    };
  } catch (error: any) {
    console.error("Universal Brain Error:", error?.message || error);
    throw new Error(`AI call failed: ${error?.message || "Unknown error"}`);
  }
}

/**
 * Direct OpenAI call without context (for simple utilities)
 */
export async function callOpenAI(
  systemPrompt: string,
  userPrompt: string,
  options: AgentCallOptions = {}
): Promise<string> {
  const {
    maxTokens = DEFAULT_MAX_TOKENS,
    jsonMode = false,
  } = options;

  try {
    const completion = await openai.chat.completions.create({
      model: UNIVERSAL_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_completion_tokens: maxTokens,
      ...(jsonMode && { response_format: { type: "json_object" as const } }),
    });

    return completion.choices?.[0]?.message?.content || "";
  } catch (error: any) {
    console.error("OpenAI Error:", error?.message || error);
    throw new Error(`OpenAI call failed: ${error?.message || "Unknown error"}`);
  }
}

// Export model constant for reference
export { UNIVERSAL_MODEL, DEFAULT_MAX_TOKENS };
