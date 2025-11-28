"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { motion } from "framer-motion";
import { Loader2, Ghost, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ValidationPage from "@/components/templates/ValidationPage";
import SaaS_V1 from "@/components/templates/SaaS_V1";

// ============================================
// PUBLIC LANDING PAGE RENDERER (V2)
// Checks isLive flag before rendering
// ============================================
export default function PublicLandingPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const data = useQuery(api.agents.launchTest.getPublicLandingPage, { slug });
  
  // Loading state
  if (data === undefined) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <span className="text-sm text-zinc-500">Loading...</span>
        </motion.div>
      </div>
    );
  }
  
  // Not found or not live
  if (data === null || !data.config || !data.isLive) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md px-6"
        >
          <Ghost className="w-16 h-16 text-zinc-700 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
          <p className="text-zinc-500 mb-6">
            This landing page doesn't exist or hasn't been published yet.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back home
          </Link>
        </motion.div>
      </div>
    );
  }
  
  // V2: Use ValidationPage with projectId for analytics
  return (
    <ValidationPage 
      config={data.config} 
      projectId={data.projectId}
    />
  );
}
