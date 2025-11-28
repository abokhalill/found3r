import OpenAI from 'openai';

export interface LLMRequest {
  system: string;
  prompt: string;
  model?: 'gpt-5-nano' | 'gpt-4o' | 'gpt-3.5-turbo';
}

export async function callLLM(request: LLMRequest): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY not set.");
  }

  const openai = new OpenAI({ apiKey });
  const model = request.model || 'gpt-5-nano';

  try {
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: request.system },
        { role: "user", content: request.prompt },
      ],
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("Failed to call LLM");
  }
}

export async function analyzeSentiment(text: string): Promise<number> {
    try {
        const response = await callLLM({
            system: "You are a sentiment analyzer. Return ONLY a number between 0 and 1 where 0 is very negative and 1 is very positive. No text.",
            prompt: `Analyze sentiment: "${text}"`,
            model: 'gpt-5-nano'
        });
        
        const score = parseFloat(response.trim());
        return isNaN(score) ? 0.5 : score;
    } catch (e) {
        console.error("Sentiment analysis failed:", e);
        return 0.5;
    }
}
