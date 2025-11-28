"use client";

import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";

// ============================================
// PREVIEW CARD COMPONENTS (Linear-style)
// ============================================

// Signal Scanner - Intercom-style request card
function SignalScannerPreview() {
  return (
    <div className="space-y-3">
      {/* Request Card */}
      <motion.div 
        className="bg-[#18181B] rounded-xl p-4 border border-white/[0.08]"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#5E6AD2]/20 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-[#5E6AD2]">r/</span>
          </div>
          <div>
            <p className="text-[11px] text-white/40 mb-1">r/SaaS · zoe@acme.inc</p>
            <p className="text-[13px] text-white/80 leading-relaxed">We need a contract review tool that actually works...</p>
          </div>
        </div>
      </motion.div>

      {/* New Request Badge */}
      <motion.div 
        className="bg-[#18181B] rounded-xl p-3 border border-white/[0.08] flex items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-[12px] text-white/70 font-medium">HN</p>
          <p className="text-[11px] text-white/40">New request</p>
        </div>
        <div className="flex -space-x-1">
          <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-[#18181B]" />
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-[#18181B]" />
        </div>
      </motion.div>

      {/* Planning Card */}
      <motion.div 
        className="bg-[#18181B] rounded-xl p-3 border border-white/[0.08]"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 rounded bg-[#5E6AD2]/20 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-[#5E6AD2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <span className="text-[11px] text-white/60">Multi-niche signal dashboard</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-white/30">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full border border-white/20" />
            <span>Planning</span>
          </div>
          <span>Q4 2025</span>
          <div className="flex -space-x-1 ml-auto">
            <div className="w-4 h-4 rounded-full bg-white/10" />
            <div className="w-4 h-4 rounded-full bg-white/10" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Launch Test - Git workflow style
function LaunchTestPreview() {
  const activities = [
    { hash: "#20319", user: "igor", action: "lin 15267 add sear...", type: "commit" },
    { user: "igor", action: "linked", ref: "igor/lin 15267", suffix: "add...", type: "link" },
    { user: "igor", action: "changed status from In Progress", type: "status" },
    { user: "GitHub", action: "changed status from In Review", type: "status" },
    { user: "igor", action: "changed status from Ready...", type: "status" },
  ];

  return (
    <div className="bg-[#18181B] rounded-xl p-4 border border-white/[0.08]">
      <div className="space-y-2.5">
        {activities.map((activity, i) => (
          <motion.div 
            key={i}
            className="flex items-center gap-2 text-[11px]"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
          >
            {activity.hash && (
              <span className="text-[#5E6AD2] font-mono">{activity.hash}</span>
            )}
            <span className="text-[#5E6AD2]">{activity.user}</span>
            <span className="text-white/40">{activity.action}</span>
            {activity.ref && (
              <>
                <span className="text-[#5E6AD2]">@</span>
                <span className="text-[#5E6AD2]">{activity.ref}</span>
              </>
            )}
            {activity.suffix && (
              <span className="text-white/40">{activity.suffix}</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Build Planner - Mobile app style
function BuildPlannerPreview() {
  return (
    <div className="relative">
      {/* Phone Frame */}
      <motion.div 
        className="w-[180px] mx-auto bg-[#18181B] rounded-[24px] p-2 border border-white/[0.08] shadow-2xl"
        initial={{ opacity: 0, y: 20, rotateY: -10 }}
        whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Screen */}
        <div className="bg-[#0A0A0B] rounded-[18px] overflow-hidden">
          {/* Status Bar */}
          <div className="h-6 flex items-center justify-between px-4 text-[8px] text-white/40">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-1.5 rounded-sm bg-white/40" />
            </div>
          </div>
          
          {/* App Header */}
          <div className="px-4 py-2 flex items-center justify-between">
            <span className="text-[10px] text-white/60">Inbox</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <span className="text-[7px] text-emerald-400">4</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-3 pb-4 space-y-2">
            <div className="flex items-center gap-2 text-[9px]">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-white/50">Change feature...</span>
            </div>
            <div className="flex items-center gap-2 text-[9px]">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-white/50">Schema update</span>
            </div>
            <div className="flex items-center gap-2 text-[9px]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#5E6AD2]" />
              <span className="text-white/50">API endpoint</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Decorative Ring */}
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-white/[0.06]" />
    </div>
  );
}

// Distribution Kit - Abstract shape
function DistributionKitPreview() {
  return (
    <div className="relative h-[200px] flex items-center justify-center">
      {/* Abstract 3D Shape */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{ perspective: "1000px" }}
      >
        {/* Main Shape - Stylized "A" or Abstract Form */}
        <div className="relative w-32 h-32">
          {/* Back Layer */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent rounded-2xl"
            style={{ transform: "translateZ(-20px) rotateY(10deg)" }}
          />
          {/* Middle Layer */}
          <div 
            className="absolute inset-2 bg-gradient-to-br from-white/[0.12] to-white/[0.04] rounded-xl border border-white/[0.1]"
            style={{ transform: "translateZ(0px)" }}
          />
          {/* Front Layer - Abstract Lines */}
          <div 
            className="absolute inset-4 flex flex-col justify-center items-center gap-2"
            style={{ transform: "translateZ(20px)" }}
          >
            <div className="w-12 h-0.5 bg-white/30 rounded-full" />
            <div className="w-8 h-0.5 bg-white/20 rounded-full" />
            <div className="w-10 h-0.5 bg-white/25 rounded-full" />
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div 
          className="absolute -top-4 -right-4 w-8 h-8 rounded-lg bg-[#5E6AD2]/20 border border-[#5E6AD2]/30"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-2 -left-6 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </motion.div>
    </div>
  );
}

// ============================================
// FEATURE DATA
// ============================================
const features = [
  {
    id: "signal",
    label: "Market Signals",
    title: "Scrape what customers actually want",
    Preview: SignalScannerPreview,
    hasArrow: true,
  },
  {
    id: "launch",
    label: "Validation Engine",
    title: "Deploy landing pages and capture real demand",
    Preview: LaunchTestPreview,
    hasArrow: false,
    hasPlus: true,
  },
  {
    id: "build",
    label: "Code Generation",
    title: "Ship MVPs from anywhere",
    Preview: BuildPlannerPreview,
    hasArrow: true,
  },
  {
    id: "distribute",
    label: "Distribution Kit",
    title: "Turn signals into actionable launches",
    Preview: DistributionKitPreview,
    hasArrow: false,
  },
];

// ============================================
// FEATURE CARD (Linear-style)
// ============================================
function FeatureCard({ 
  feature, 
  index 
}: { 
  feature: typeof features[0]; 
  index: number;
}) {
  const Preview = feature.Preview;
  
  return (
    <motion.div
      className="group flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
    >
      {/* Preview Card */}
      <div className="bg-gradient-to-b from-[#18181B] to-[#0f0f10] rounded-2xl border border-white/[0.06] p-5 mb-5 min-h-[280px] flex items-center justify-center overflow-hidden group-hover:border-white/[0.1] transition-colors">
        <Preview />
      </div>

      {/* Label + Title + Arrow */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[12px] text-white/40 mb-1.5">{feature.label}</p>
          <h3 className="text-[15px] font-medium text-white leading-snug tracking-[-0.01em]">
            {feature.title}
          </h3>
        </div>
        {feature.hasArrow && (
          <div className="w-8 h-8 rounded-full border border-white/[0.1] flex items-center justify-center shrink-0 group-hover:border-white/20 group-hover:bg-white/[0.02] transition-all">
            <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white/60 transition-colors" />
          </div>
        )}
        {feature.hasPlus && (
          <div className="w-8 h-8 rounded-full border border-white/[0.1] flex items-center justify-center shrink-0 group-hover:border-white/20 group-hover:bg-white/[0.02] transition-all">
            <Plus className="w-3.5 h-3.5 text-white/40 group-hover:text-white/60 transition-colors" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ============================================
// STACKED FEATURES SECTION (Linear-style)
// ============================================
export function StackedFeatures() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#0A0A0B]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Row - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 md:mb-20">
          {/* Left: Tag + Headline */}
          <div>
            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-2 h-2 rounded-full bg-[#5E6AD2]" />
              <span className="text-[13px] text-white/50 font-medium">Agents and automations</span>
            </motion.div>
            
            <motion.h2
              className="text-[36px] md:text-[48px] lg:text-[56px] font-medium text-white tracking-[-0.03em] leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Validate faster
              <br />
              <span className="text-white">with AI agents</span>
            </motion.h2>
          </div>

          {/* Right: Description */}
          <motion.div
            className="lg:pt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-[16px] md:text-[17px] text-white/50 leading-[1.7] max-w-md">
              Expand the capabilities of Found3r with a fleet of AI agents that keep your validation pipeline running and your ideas moving toward revenue.
            </p>
          </motion.div>
        </div>

        {/* Feature Cards Grid - 4 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.id}
              feature={feature} 
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Subtle gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0B] to-transparent pointer-events-none" />
    </section>
  );
}
