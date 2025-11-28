import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Shield, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Legal - Found3r",
  description: "Terms of Service and Privacy Policy for Found3r",
};

const legalPages = [
  {
    title: "Terms of Service",
    description: "User agreement and terms of use for the Found3r platform",
    icon: FileText,
    href: "/legal/terms",
    updated: "Last updated: November 2024",
  },
  {
    title: "Privacy Policy",
    description: "How we collect, use, and protect your personal data",
    icon: Shield,
    href: "/legal/privacy",
    updated: "Last updated: November 2024",
  },
];

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Found3r
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Documentation
            </Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Button size="sm">Sign In</Button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Legal & Compliance</h1>
          <p className="text-lg text-muted-foreground">
            Our commitment to transparency, data protection, and user rights.
          </p>
        </div>

        <div className="space-y-4">
          {legalPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="block rounded-lg border border-border bg-card p-6 hover:border-white/20 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-lg bg-primary/10 p-3 text-primary border border-primary/20">
                  <page.icon className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-bold tracking-tight">{page.title}</h2>
                    <ChevronRight className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <p className="text-muted-foreground mb-2">{page.description}</p>
                  <p className="text-xs text-muted-foreground">{page.updated}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-border bg-card p-8">
          <h3 className="text-lg font-bold tracking-tight mb-2">Questions?</h3>
          <p className="text-muted-foreground mb-4">
            If you have any questions about our legal policies or data handling practices,
            please contact our legal team.
          </p>
          <Button variant="outline">Contact Legal Team</Button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Found3r. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
