import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Command, ChevronRight, BookOpen, Rocket, Code, Zap, Settings } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Documentation - Found3r",
  description: "Complete documentation for Found3r AI cofounder platform",
};

const navigation = [
  {
    title: "Getting Started",
    icon: Rocket,
    items: [
      { title: "Introduction", href: "#introduction" },
      { title: "Quick Start", href: "#quick-start" },
      { title: "Installation", href: "#installation" },
      { title: "Configuration", href: "#configuration" },
    ],
  },
  {
    title: "Core Concepts",
    icon: BookOpen,
    items: [
      { title: "Pain Discovery", href: "#pain-discovery" },
      { title: "Validation", href: "#validation" },
      { title: "Roadmap Generation", href: "#roadmap" },
      { title: "Launch", href: "#launch" },
    ],
  },
  {
    title: "Agents",
    icon: Zap,
    items: [
      { title: "Pain Scraper Agent", href: "#pain-scraper" },
      { title: "Fake Door Validator", href: "#validator" },
      { title: "Roadmap Agent", href: "#roadmap-agent" },
      { title: "Torpedo Launcher", href: "#torpedo" },
    ],
  },
  {
    title: "API Reference",
    icon: Code,
    items: [
      { title: "Authentication", href: "#auth" },
      { title: "Endpoints", href: "#endpoints" },
      { title: "Webhooks", href: "#webhooks" },
      { title: "Rate Limits", href: "#rate-limits" },
    ],
  },
  {
    title: "Advanced",
    icon: Settings,
    items: [
      { title: "Custom Agents", href: "#custom-agents" },
      { title: "Orchestrator", href: "#orchestrator" },
      { title: "Self-hosting", href: "#self-hosting" },
      { title: "Security", href: "#security" },
    ],
  },
];

const tableOfContents = [
  { title: "Overview", href: "#overview" },
  { title: "Architecture", href: "#architecture" },
  { title: "Agent Workflow", href: "#workflow" },
  { title: "Data Models", href: "#models" },
  { title: "Best Practices", href: "#best-practices" },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Found3r
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/docs" className="text-sm font-medium text-foreground">
                Docs
              </Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="/legal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Legal
              </Link>
            </nav>
          </div>
          <Button size="sm">Sign In</Button>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_200px] gap-8 py-8">
          {/* Left Sidebar - Navigation */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
              {/* Search */}
              <div className="mb-6 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search docs..."
                  className="pl-9 pr-16 h-9 text-sm"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-secondary px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    <Command className="size-3" />K
                  </kbd>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-6">
                {navigation.map((section) => (
                  <div key={section.title}>
                    <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <section.icon className="size-3.5" />
                      {section.title}
                    </div>
                    <ul className="space-y-1 border-l border-border">
                      {section.items.map((item) => (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            className="block pl-4 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors border-l-2 -ml-px border-transparent hover:border-primary"
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="max-w-3xl">
            <div className="mb-8">
              <Badge variant="outline" className="mb-4">Documentation</Badge>
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                Found3r Documentation
              </h1>
              <p className="text-lg text-muted-foreground">
                Complete guide to building, validating, and launching startups with AI agents.
              </p>
            </div>

            {/* Documentation Content */}
            <article className="prose prose-invert max-w-none">
              <div id="overview" className="mb-12">
                <h2 className="text-2xl font-bold tracking-tight mb-4 scroll-mt-20">Overview</h2>
                <p className="text-muted-foreground mb-4">
                  Found3r is a production-grade AI cofounder platform that transforms raw community pain points 
                  into validated startup ideas, product roadmaps, and launch motions. The system operates through 
                  a multi-agent workflow coordinated by a central orchestrator.
                </p>
                <div className="rounded-lg border border-border bg-secondary/20 p-4 my-6">
                  <div className="flex items-start gap-3">
                    <div className="rounded bg-primary/10 p-2 text-primary border border-primary/20">
                      <Zap className="size-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Key Philosophy</h4>
                      <p className="text-sm text-muted-foreground">
                        This is not autopilot. Found3r is a founder amplification engine that keeps you in control 
                        at every checkpoint.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="architecture" className="mb-12">
                <h2 className="text-2xl font-bold tracking-tight mb-4 scroll-mt-20">Architecture</h2>
                <p className="text-muted-foreground mb-4">
                  The platform is built with Next.js 15, Convex backend, and Clerk authentication. Each agent 
                  is a Convex action with strict scope and well-defined data contracts.
                </p>
                <div className="rounded-lg border border-border overflow-hidden my-6">
                  <div className="bg-secondary/30 px-4 py-2 border-b border-border flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">system-architecture.ts</span>
                    <Badge variant="secondary" className="text-xs">TypeScript</Badge>
                  </div>
                  <pre className="bg-card p-4 overflow-x-auto">
                    <code className="text-sm font-mono text-muted-foreground">
{`interface Agent {
  name: string;
  scope: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  status: "idle" | "running" | "complete";
}

const orchestrator = {
  state: "DISCOVERY" | "VALIDATION" | "BLUEPRINT" | "LAUNCH",
  agents: Agent[],
  checkpoints: boolean[],
};`}
                    </code>
                  </pre>
                </div>
              </div>

              <div id="workflow" className="mb-12">
                <h2 className="text-2xl font-bold tracking-tight mb-4 scroll-mt-20">Agent Workflow</h2>
                <div className="space-y-4">
                  {[
                    {
                      step: "01",
                      title: "Pain Discovery",
                      description: "Scrape communities for pain points and validate market signals",
                    },
                    {
                      step: "02",
                      title: "Fake Door Validation",
                      description: "Generate landing pages and measure conversion interest",
                    },
                    {
                      step: "03",
                      title: "Roadmap Generation",
                      description: "Create technical blueprints and feature timelines",
                    },
                    {
                      step: "04",
                      title: "Launch Motion",
                      description: "Execute multi-channel distribution and track metrics",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex gap-4 rounded-lg border border-border p-4 bg-card hover:border-white/20 transition-colors"
                    >
                      <div className="shrink-0 flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary border border-primary/20 font-bold text-sm">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <ChevronRight className="ml-auto size-5 text-muted-foreground shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              <div id="models" className="mb-12">
                <h2 className="text-2xl font-bold tracking-tight mb-4 scroll-mt-20">Data Models</h2>
                <p className="text-muted-foreground mb-4">
                  All data is stored in Convex with strict schema validation and real-time subscriptions.
                </p>
              </div>

              <div id="best-practices" className="mb-12">
                <h2 className="text-2xl font-bold tracking-tight mb-4 scroll-mt-20">Best Practices</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="size-4 mt-1 text-primary shrink-0" />
                    <span>Always review agent outputs before proceeding to next stage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="size-4 mt-1 text-primary shrink-0" />
                    <span>Configure your Founder Matrix during onboarding for personalized results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="size-4 mt-1 text-primary shrink-0" />
                    <span>Use webhooks for external integrations and automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="size-4 mt-1 text-primary shrink-0" />
                    <span>Monitor rate limits when using the API extensively</span>
                  </li>
                </ul>
              </div>

              {/* Footer CTA */}
              <div className="rounded-lg border border-border bg-card p-8 text-center my-12">
                <h3 className="text-xl font-bold tracking-tight mb-2">Ready to Start Building?</h3>
                <p className="text-muted-foreground mb-4">
                  Create your account and start validating ideas in minutes.
                </p>
                <Button size="lg">Get Started</Button>
              </div>
            </article>
          </main>

          {/* Right Sidebar - Table of Contents */}
          <aside className="hidden xl:block">
            <div className="sticky top-20">
              <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                On This Page
              </div>
              <nav>
                <ul className="space-y-2 text-sm border-l border-border">
                  {tableOfContents.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="block pl-4 py-1 text-muted-foreground hover:text-foreground transition-colors border-l-2 -ml-px border-transparent hover:border-primary"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
