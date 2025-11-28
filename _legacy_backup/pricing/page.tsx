import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Pricing - Found3r",
  description: "Enterprise-grade pricing for AI cofounder platform",
};

const tiers = [
  {
    name: "Starter",
    price: "$49",
    description: "Perfect for solo founders validating their first ideas",
    features: [
      { name: "5 Pain Discovery Scans/month", included: true },
      { name: "2 Fake Door Validators", included: true },
      { name: "Basic Analytics Dashboard", included: true },
      { name: "Email Support", included: true },
      { name: "SSO Integration", included: false },
      { name: "Priority Support", included: false },
      { name: "Custom Agents", included: false },
      { name: "SLA Guarantee", included: false },
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: "$199",
    description: "For serious founders building multiple ventures",
    features: [
      { name: "Unlimited Pain Discovery", included: true },
      { name: "Unlimited Validators", included: true },
      { name: "Advanced Analytics & Insights", included: true },
      { name: "Priority Email & Chat Support", included: true },
      { name: "API Access", included: true },
      { name: "Custom Launch Strategies", included: true },
      { name: "SSO Integration", included: false },
      { name: "SLA Guarantee", included: false },
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "High availability infrastructure for teams and agencies",
    features: [
      { name: "Everything in Pro", included: true },
      { name: "SSO & SAML Integration", included: true },
      { name: "Dedicated Account Manager", included: true },
      { name: "99.9% SLA Guarantee", included: true },
      { name: "Custom Agent Development", included: true },
      { name: "On-premise Deployment", included: true },
      { name: "Advanced Security & Compliance", included: true },
      { name: "24/7 Premium Support", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const comparisonFeatures = [
  { category: "Discovery", features: ["Pain Scraping", "Community Analysis", "Trend Detection", "Market Validation"] },
  { category: "Validation", features: ["Fake Door Pages", "A/B Testing", "Conversion Tracking", "User Feedback"] },
  { category: "Development", features: ["Roadmap Generation", "Technical Blueprints", "Architecture Planning", "Timeline Estimates"] },
  { category: "Launch", features: ["Multi-channel Distribution", "Launch Analytics", "Community Engagement", "Press Kit Generation"] },
  { category: "Support & SLA", features: ["Email Support", "Priority Support", "SLA Guarantee", "Dedicated Manager"] },
];

export default function PricingPage() {
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
            <Link href="/legal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Legal
            </Link>
            <Button size="sm">Sign In</Button>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4">Pricing</Badge>
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Enterprise-Grade Infrastructure
          </h1>
          <p className="text-lg text-muted-foreground">
            Production-ready AI agents with high availability, SSO, and SLA guarantees.
            Scale from validation to launch without limits.
          </p>
        </div>

        {/* Pricing Tiers - Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-24">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-lg border p-8 flex flex-col ${
                tier.popular
                  ? "border-primary bg-card ring-2 ring-primary/20"
                  : "border-border bg-card"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge variant="default">Most Popular</Badge>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold tracking-tight mb-2">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                  {tier.price !== "Custom" && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature.name} className="flex items-start gap-3 text-sm">
                    {feature.included ? (
                      <Check className="size-4 text-accent mt-0.5 shrink-0" />
                    ) : (
                      <X className="size-4 text-muted-foreground/50 mt-0.5 shrink-0" />
                    )}
                    <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.popular ? "default" : "outline"}
                className="w-full"
                size="lg"
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-card px-6 py-4 border-b border-border">
            <h2 className="text-xl font-bold tracking-tight">Feature Comparison</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                    Feature
                  </th>
                  {tiers.map((tier) => (
                    <th key={tier.name} className="text-center px-6 py-4 text-sm font-medium">
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((category, idx) => (
                  <React.Fragment key={category.category}>
                    <tr className="border-b border-border bg-secondary/10">
                      <td colSpan={4} className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {category.category}
                      </td>
                    </tr>
                    {category.features.map((feature) => (
                      <tr key={feature} className="border-b border-border hover:bg-secondary/20 transition-colors">
                        <td className="px-6 py-4 text-sm">{feature}</td>
                        <td className="px-6 py-4 text-center">
                          <Check className="size-4 text-accent mx-auto" />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Check className="size-4 text-accent mx-auto" />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Check className="size-4 text-accent mx-auto" />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="mt-24 border border-border rounded-lg p-12 text-center bg-card">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            For agencies, accelerators, or teams with specific requirements,
            we offer custom deployments with dedicated infrastructure and support.
          </p>
          <Button size="lg" variant="default">
            Schedule a Demo
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border mt-24">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Found3r. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
