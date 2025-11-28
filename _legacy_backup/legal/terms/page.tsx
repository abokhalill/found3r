import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service - Found3r",
  description: "Terms of Service for Found3r AI cofounder platform",
};

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">Last updated: November 20, 2024</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-8 text-zinc-400">
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using Found3r ("the Service"), you agree to be bound by these Terms of Service
                and all applicable laws and regulations. If you do not agree with any of these terms, you are
                prohibited from using or accessing this Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">2. Use License</h2>
              <p className="mb-4">
                Permission is granted to temporarily access the Service for personal, non-commercial use only.
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software contained in the Service</li>
                <li>Remove any copyright or proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">3. AI Agent Usage</h2>
              <p>
                Found3r provides autonomous AI agents for pain discovery, validation, roadmap generation,
                and launch assistance. You acknowledge that:
              </p>
              <ul className="space-y-2 list-disc list-inside mt-4">
                <li>AI outputs are assistive tools and require human oversight</li>
                <li>You maintain full responsibility for decisions made using agent recommendations</li>
                <li>Agent accuracy is not guaranteed and results may vary</li>
                <li>You must review and approve all actions before execution</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">4. User Data and Privacy</h2>
              <p>
                Your use of Found3r is also governed by our Privacy Policy. We collect and process data
                necessary to provide the Service, including project information, pain points, validation
                results, and usage analytics.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">5. Service Availability</h2>
              <p>
                We strive to maintain high availability of the Service but do not guarantee uninterrupted access.
                The Service may be temporarily unavailable for maintenance, updates, or unforeseen technical issues.
                Enterprise customers with SLA agreements are covered under separate terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">6. Intellectual Property</h2>
              <p className="mb-4">
                All intellectual property rights in the Service and its original content remain the property
                of Found3r. Content you create using the Service remains your property, but you grant us
                a license to process and store it as necessary to provide the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">7. Payment Terms</h2>
              <p>
                Subscription fees are billed in advance on a monthly or annual basis. All fees are
                non-refundable except as required by law. We reserve the right to change pricing with
                30 days notice to existing customers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">8. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice, for conduct
                that we believe violates these Terms or is harmful to other users, us, or third parties,
                or for any other reason at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">9. Limitation of Liability</h2>
              <p>
                In no event shall Found3r or its suppliers be liable for any damages (including, without
                limitation, damages for loss of data or profit, or due to business interruption) arising
                out of the use or inability to use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">10. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of the jurisdiction
                in which Found3r operates, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">11. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any
                material changes via email or through the Service. Your continued use of the Service
                after such modifications constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">12. Contact Information</h2>
              <p>
                Questions about the Terms of Service should be sent to us at legal@found3r.com
              </p>
            </section>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex items-center justify-between">
            <Link href="/legal/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              View Privacy Policy →
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
