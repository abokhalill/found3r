// ============================================
// MARKET SCRAPER - Hybrid Signal Layer (V2)
// Primary: Hacker News (Free/Fast)
// Secondary: Reddit via Firecrawl (3 results max)
// ============================================

import { scrapeNiche } from "./firecrawl";

// ============================================
// TYPES
// ============================================

export interface Signal {
  source: "HackerNews" | "Reddit";
  content: string;
  url: string;
  date: string;
  title?: string;
  score?: number;
}

// ============================================
// HACKER NEWS SCRAPER (Algolia API - FREE)
// Fast, reliable, high-quality discussions
// ============================================

async function fetchHackerNewsSignals(niche: string): Promise<Signal[]> {
  const signals: Signal[] = [];
  
  try {
    // Query HN Algolia API for stories and comments
    const query = encodeURIComponent(niche);
    const response = await fetch(
      `https://hn.algolia.com/api/v1/search?query=${query}&tags=story&hitsPerPage=10`
    );
    
    if (!response.ok) {
      console.error("[HN] API request failed:", response.status);
      return signals;
    }
    
    const data = await response.json();
    const hits = data.hits || [];
    
    for (const hit of hits) {
      // Skip if no meaningful content
      if (!hit.title && !hit.story_text) continue;
      
      signals.push({
        source: "HackerNews",
        content: hit.story_text || hit.title || "",
        title: hit.title || "HN Discussion",
        url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
        date: hit.created_at || new Date().toISOString(),
        score: hit.points || 0,
      });
    }
    
    console.log(`[HN] Found ${signals.length} signals for "${niche}"`);
  } catch (error) {
    console.error("[HN] Scraper Error:", error);
  }

  return signals;
}

// ============================================
// REDDIT SCRAPER (via Firecrawl - LIMITED)
// High-intent community discussions
// ============================================

async function fetchRedditSignals(niche: string, limit: number = 3): Promise<Signal[]> {
  const signals: Signal[] = [];
  
  try {
    // Use Firecrawl scraper focused on Reddit
    const result = await scrapeNiche(niche);
    
    // Parse signals and tag as Reddit
    const firecrawlSignals = (result as any).signals || [];
    
    for (const signal of firecrawlSignals.slice(0, limit)) {
      signals.push({
        source: "Reddit",
        content: signal.content || signal.text || "",
        title: signal.title || "Reddit Discussion",
        url: signal.url || "",
        date: signal.date || new Date().toISOString(),
        score: signal.score,
      });
    }
    
    console.log(`[Reddit] Found ${signals.length} signals (limited to ${limit})`);
  } catch (error) {
    console.error("[Reddit] Scraper Error:", error);
  }

  return signals;
}

// ============================================
// UNIFIED SIGNAL FETCHER (V2 Core)
// ============================================

export interface FetchSignalsResult {
  signals: Signal[];
  stats: {
    total: number;
    bySource: { HackerNews: number; Reddit: number };
    fetchedAt: number;
  };
  markdown: string; // For AI analysis
}

/**
 * V2 Core: Fetch signals from HN (primary) + Reddit (secondary)
 * Returns normalized array + markdown for AI
 */
export async function fetchSignals(niche: string): Promise<FetchSignalsResult> {
  console.log(`[SCRAPER] V2 Hybrid fetch for: "${niche}"`);
  
  // Fetch in parallel: HN (free) + Reddit (limited to 3)
  const [hnSignals, redditSignals] = await Promise.all([
    fetchHackerNewsSignals(niche),
    fetchRedditSignals(niche, 3), // Limit Reddit to save credits
  ]);
  
  // Merge and sort by score
  const allSignals = [...hnSignals, ...redditSignals].sort((a, b) => {
    return (b.score || 0) - (a.score || 0);
  });
  
  // Build markdown for AI analysis
  const markdown = allSignals.map((s, i) => 
    `### Signal ${i + 1} [${s.source}]\n**Title:** ${s.title || 'N/A'}\n**Content:** ${s.content.substring(0, 500)}...\n**URL:** ${s.url}\n**Date:** ${s.date}\n---`
  ).join('\n\n');
  
  const stats = {
    total: allSignals.length,
    bySource: {
      HackerNews: hnSignals.length,
      Reddit: redditSignals.length,
    },
    fetchedAt: Date.now(),
  };
  
  console.log(`[SCRAPER] Total: ${stats.total} signals (HN: ${stats.bySource.HackerNews}, Reddit: ${stats.bySource.Reddit})`);

  return { signals: allSignals, stats, markdown };
}

// ============================================
// LEGACY EXPORTS (for backward compatibility)
// ============================================

export interface MarketSignal {
  source: "Reddit";
  text: string;
  title: string;
  url: string;
  score?: number;
  date?: string;
  author?: string;
  subreddit?: string;
}

export interface MarketSignalsResult {
  signals: MarketSignal[];
  stats: {
    total: number;
    bySource: Record<string, number>;
    fetchedAt: number;
  };
}

export async function fetchMarketSignals(niche: string): Promise<MarketSignalsResult> {
  const result = await fetchSignals(niche);
  return {
    signals: result.signals.map(s => ({
      source: "Reddit" as const,
      text: s.content,
      title: s.title || "",
      url: s.url,
      score: s.score,
      date: s.date,
    })),
    stats: {
      total: result.stats.total,
      bySource: { Reddit: result.stats.total },
      fetchedAt: result.stats.fetchedAt,
    },
  };
}

export async function quickSignalCheck(niche: string): Promise<MarketSignal[]> {
  const result = await fetchSignals(niche);
  return result.signals.map(s => ({
    source: "Reddit" as const,
    text: s.content,
    title: s.title || "",
    url: s.url,
    score: s.score,
    date: s.date,
  }));
}

// ============================================
// SIGNAL ANALYSIS HELPERS
// ============================================

/**
 * Extract key themes from signals
 */
export function extractThemes(signals: MarketSignal[]): string[] {
  const themes: Map<string, number> = new Map();
  
  const keywords = [
    "expensive", "slow", "frustrating", "broken", "wish", "need",
    "pain", "problem", "hate", "annoying", "difficult", "complex",
    "pricing", "cost", "time", "manual", "tedious", "outdated"
  ];
  
  for (const signal of signals) {
    const text = signal.text.toLowerCase();
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        themes.set(keyword, (themes.get(keyword) || 0) + 1);
      }
    }
  }
  
  // Return top 5 themes
  return Array.from(themes.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([theme]) => theme);
}

/**
 * Calculate signal strength score
 */
export function calculateSignalStrength(signals: MarketSignal[]): number {
  if (signals.length === 0) return 0;
  
  let score = 0;
  
  // Volume score (max 40)
  score += Math.min(signals.length * 5, 40);
  
  // Source diversity (max 30)
  const sources = new Set(signals.map(s => s.source));
  score += sources.size * 15;
  
  // Engagement score (max 30)
  const avgScore = signals.reduce((sum, s) => sum + (s.score || 0), 0) / signals.length;
  score += Math.min(avgScore / 10, 30);
  
  return Math.min(Math.round(score), 100);
}
