import { action, mutation, query, internalQuery, internalMutation, internalAction } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ============================================
// CO-PILOT: Terse, High-IQ Co-Founder
// ============================================
const COPILOT_PROMPT = `You are a terse, high-IQ Co-Founder. You answer strategic questions based on project DNA.

**RULES:**
- Be DIRECT. No fluff, no lectures.
- If the data doesn't support an answer, say "Insufficient data."
- Reference specific numbers from the DNA when possible.
- Keep responses under 100 words unless complexity demands more.
- If asked about next steps, prioritize based on validation score.

**TONE:** Professional, slightly impatient, results-focused.`;

// ============================================
// QUERIES
// ============================================
export const getMessages = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("chat")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .order("asc")
      .collect();
    return messages;
  },
});

// ============================================
// MUTATIONS
// ============================================
export const sendMessage = mutation({
  args: { 
    projectId: v.id("projects"), 
    message: v.string() 
  },
  handler: async (ctx, args) => {
    const { projectId, message } = args;
    
    // Save user message
    await ctx.db.insert("chat", {
      projectId,
      role: "user",
      message,
      timestamp: Date.now(),
    });

    // Schedule the AI response
    await ctx.scheduler.runAfter(0, internal.agents.copilot.generateResponse, {
      projectId,
      userMessage: message,
    });

    return { success: true };
  },
});

// ============================================
// INTERNAL ACTION: Generate AI Response
// ============================================
export const generateResponse = internalAction({
  args: { 
    projectId: v.id("projects"), 
    userMessage: v.string() 
  },
  handler: async (ctx, args): Promise<{ response: string }> => {
    const { projectId, userMessage } = args;

    // 1. Fetch project DNA for context (using internal queries)
    const dna: any = await ctx.runQuery(internal.agents.copilot.getDNA, { projectId });
    const project: any = await ctx.runQuery(internal.agents.copilot.getProject, { projectId });

    // 2. Build context string
    const contextStr: string = dna ? `
PROJECT: ${project?.name || 'Unknown'}
NICHE: ${project?.niche || 'Unknown'}
VALIDATION SCORE: ${dna.validationData?.score || 'N/A'}
RECOMMENDATION: ${dna.validationData?.recommendation || 'N/A'}
BRUTAL VERDICT: ${dna.validationData?.brutalVerdict || 'N/A'}
PAIN POINTS: ${JSON.stringify(dna.painPoints?.slice(0, 3) || [])}
TECH STACK: ${JSON.stringify(dna.techStack || {})}
GTM CHANNELS: ${JSON.stringify(dna.gtmStrategy?.channels || [])}
` : 'No DNA available. Run validation first.';

    // 3. Get recent chat history for context
    const recentMessages: any[] = await ctx.runQuery(internal.agents.copilot.getRecentMessages, { 
      projectId, 
      limit: 10 
    });

    const chatHistory = recentMessages.map((m: any) => ({
      role: m.role as "user" | "assistant",
      content: m.message
    }));

    // 4. Generate response
    let response: string;
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-5-nano",
        messages: [
          { role: "system", content: `${COPILOT_PROMPT}\n\n---\nPROJECT CONTEXT:\n${contextStr}` },
          ...chatHistory,
          { role: "user", content: userMessage }
        ],
        max_completion_tokens: 2000, // Reasoning models need more tokens (reasoning + output)
      });
      
      // Debug: log full response structure
      console.log("OpenAI Response:", JSON.stringify(completion, null, 2));
      
      // Try multiple ways to extract content
      const choice = completion.choices?.[0];
      response = choice?.message?.content 
        || (choice as any)?.text 
        || (choice?.message as any)?.text
        || JSON.stringify(choice?.message || "Empty response from API");
    } catch (error: any) {
      console.error("OpenAI API Error:", error?.message || error);
      response = `Error: ${error?.message || "Failed to generate response."}`;
    }

    // 5. Save assistant response
    await ctx.runMutation(internal.agents.copilot.saveMessage, {
      projectId,
      role: "assistant" as const,
      message: response,
    });

    return { response };
  },
});

// ============================================
// INTERNAL HELPERS
// ============================================
export const getDNA = internalQuery({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("project_brain")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .first();
  },
});

export const getProject = internalQuery({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.projectId);
  },
});

export const getRecentMessages = internalQuery({
  args: { projectId: v.id("projects"), limit: v.number() },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("chat")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .order("desc")
      .take(args.limit);
    return messages.reverse();
  },
});

export const saveMessage = internalMutation({
  args: { 
    projectId: v.id("projects"), 
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
    message: v.string() 
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("chat", {
      projectId: args.projectId,
      role: args.role,
      message: args.message,
      timestamp: Date.now(),
    });
  },
});

// Inject system log as chat message (for activity feed integration)
export const injectSystemLog = mutation({
  args: { 
    projectId: v.id("projects"), 
    log: v.string() 
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("chat", {
      projectId: args.projectId,
      role: "system",
      message: args.log,
      timestamp: Date.now(),
    });
  },
});
