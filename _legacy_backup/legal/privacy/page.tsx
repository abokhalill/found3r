import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - Found3r",
  description: "Privacy Policy for Found3r AI cofounder platform",
};

export default function PrivacyPage() {
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
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/legal"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft className="size-4" />
          Back to Legal
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: November 20, 2024</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-8 text-zinc-400">
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                We collect information that you provide directly to us when using Found3r, including:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Account information (name, email, password)</li>
                <li>Project data (pain points, validation results, roadmaps)</li>
                <li>Usage data (feature interactions, agent workflows)</li>
                <li>Communication data (support requests, feedback)</li>
                <li>Payment information (processed securely through third-party providers)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Provide, maintain, and improve the Service</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and security alerts</li>
                <li>Respond to your comments and questions</li>
                <li>Train and improve our AI agents (with appropriate safeguards)</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect and prevent fraud and abuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">3. Data Storage and Security</h2>
              <p>
                Your data is stored using Convex, a secure backend platform with encryption at rest and in transit.
                We implement industry-standard security measures including:
              </p>
              <ul className="space-y-2 list-disc list-inside mt-4">
                <li>End-to-end encryption for sensitive data</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and authentication via Clerk</li>
                <li>Automated backups and disaster recovery procedures</li>
                <li>SOC 2 compliance (Enterprise plans)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">4. Data Sharing and Disclosure</h2>
              <p className="mb-4">
                We do not sell your personal data. We may share your information only in the following circumstances:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>With your explicit consent</li>
                <li>With service providers who assist in operating our platform</li>
                <li>To comply with legal obligations or protect our rights</li>
                <li>In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">5. AI and Machine Learning</h2>
              <p>
                Found3r uses AI agents to analyze pain points, generate validation strategies, and create roadmaps.
                Your project data may be processed by these agents, but:
              </p>
              <ul className="space-y-2 list-disc list-inside mt-4">
                <li>We do not use your data to train models for other customers</li>
                <li>All processing occurs within our secure infrastructure</li>
                <li>You maintain ownership of all outputs generated by agents</li>
                <li>You can request deletion of your data at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">6. Your Rights and Choices</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Access and receive a copy of your personal data</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your data (subject to legal requirements)</li>
                <li>Object to processing of your data</li>
                <li>Export your data in a portable format</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">7. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to improve your experience and analyze usage patterns.
                You can control cookie preferences through your browser settings. Essential cookies required for
                the Service to function cannot be disabled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">8. Third-Party Services</h2>
              <p className="mb-4">
                Found3r integrates with third-party services including:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Clerk (authentication and user management)</li>
                <li>Convex (database and backend infrastructure)</li>
                <li>Stripe (payment processing)</li>
                <li>Analytics providers (usage tracking)</li>
              </ul>
              <p className="mt-4">
                These services have their own privacy policies and data practices. We encourage you to review them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">9. Data Retention</h2>
              <p>
                We retain your information for as long as necessary to provide the Service and fulfill the purposes
                outlined in this policy. When you delete your account, we will delete or anonymize your data within
                30 days, except where retention is required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">10. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure
                appropriate safeguards are in place to protect your data in accordance with this policy and
                applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">11. Children's Privacy</h2>
              <p>
                Found3r is not intended for users under the age of 18. We do not knowingly collect personal
                information from children. If we learn we have collected such information, we will delete it
                immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">12. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes
                by email or through the Service. Your continued use after such changes constitutes acceptance
                of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">13. Contact Us</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-foreground">Email: privacy@found3r.com</p>
                <p className="text-foreground mt-2">Data Protection Officer: dpo@found3r.com</p>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex items-center justify-between">
            <Link href="/legal/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              View Terms of Service →
            </Link>
            <Button variant="outline" size="sm">
              Download PDF
            </Button>
          </div>
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
