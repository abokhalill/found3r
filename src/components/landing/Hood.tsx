"use client";

import { motion } from "framer-motion";

// ============================================
// DASHBOARD SCREENSHOT - Full workspace replica
// Exact copy of the actual Found3r dashboard
// ============================================
function DashboardPreview() {
  const STAGES = [
    { id: "pain", label: "Signals", done: true },
    { id: "strategy", label: "Strategy", done: true },
    { id: "smoketest", label: "Validation", done: true },
    { id: "techspec", label: "Blueprint", done: false },
    { id: "launch", label: "Launch", done: false },
  ];

  const activityLogs = [
    { agent: "LaunchTest", time: "2:34 PM", status: "SUCCESS", message: "Artifact generated | Slug: fitcheck-waitlist" },
    { agent: "LaunchTest", time: "2:33 PM", status: "COMPILER", message: "Config assembled | Features: 4 | Problem/Solution: Yes" },
  ];

  return (
    <motion.div 
      className="relative w-full max-w-[520px]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
    >
      {/* Full dashboard container with subtle border */}
      <div className="bg-[#0A0A0B] rounded-xl border border-white/[0.06] overflow-hidden">
        
        {/* App header bar */}
        <div className="h-11 border-b border-white/[0.06] flex items-center justify-between px-4 bg-[#0A0A0B]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/[0.04]">
              <div className="w-5 h-5 rounded bg-[#5E6AD2] flex items-center justify-center text-[9px] font-bold text-white">F</div>
              <span className="text-[11px] text-white/80 font-medium">FitCheck AI</span>
              <svg className="w-3 h-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <span className="text-[10px] text-white/40">Command</span>
          </div>
          <div className="h-6 px-2.5 rounded-md bg-white/[0.06] border border-white/[0.06] text-[10px] text-white/60 font-medium flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Run Analysis
          </div>
        </div>

        {/* Sidebar + Content */}
        <div className="flex">
          {/* Sidebar */}
          <div className="w-[120px] border-r border-white/[0.06] p-2.5 bg-[#0A0A0B]">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/[0.06] text-white/90">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span className="text-[10px] font-medium">Overview</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-white/40">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-[10px] font-medium">Traction</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-white/40">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
                <span className="text-[10px] font-medium">Launch</span>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-3 space-y-2.5 bg-[#0A0A0B]">
            
            {/* Progress + Next Step Row */}
            <div className="grid grid-cols-5 gap-2.5">
              {/* Progress Card */}
              <div className="col-span-3 bg-[#18181B] border border-[#27272A] rounded-lg p-3">
                <div className="flex items-center justify-between mb-2.5">
                  <div>
                    <p className="text-[8px] font-medium text-white/40 uppercase tracking-wider">Progress</p>
                    <p className="text-[20px] font-semibold text-white mt-0.5 tracking-tight">60%</p>
                  </div>
                  <div className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-[8px] font-medium text-emerald-400">
                    3/5 complete
                  </div>
                </div>
                
                {/* Stage bars */}
                <div className="flex gap-1">
                  {STAGES.map((stage, i) => (
                    <motion.div
                      key={stage.id}
                      className={`flex-1 h-1 rounded-full ${stage.done ? 'bg-white' : 'bg-[#27272A]'}`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                      viewport={{ once: true }}
                      style={{ transformOrigin: 'left' }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-1.5">
                  {STAGES.map((stage) => (
                    <span key={stage.id} className="text-[6px] text-white/30">{stage.label}</span>
                  ))}
                </div>
              </div>

              {/* Next Step Card */}
              <div className="col-span-2 bg-[#18181B] border border-[#27272A] rounded-lg p-3">
                <p className="text-[8px] font-medium text-white/40 uppercase tracking-wider">Next step</p>
                <p className="text-[10px] font-medium text-white mt-1.5 leading-snug">Generate blueprint</p>
                <div className="mt-2 flex items-center gap-1 text-white/40">
                  <span className="text-[8px]">Continue</span>
                  <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Validation Funnel */}
            <div className="bg-[#18181B] border border-[#27272A] rounded-lg p-3">
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-[8px] font-medium text-white/40 uppercase tracking-wider">Validation Funnel</p>
                <span className="text-[8px] text-blue-400 flex items-center gap-1">
                  View Live
                  <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </div>
              
              {/* Funnel metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="relative">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-blue-400" />
                    </div>
                    <span className="text-[7px] font-medium text-white/50">Signals Found</span>
                  </div>
                  <p className="text-[20px] font-bold text-white tracking-tight">12</p>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 text-white/10">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-purple-400" />
                    </div>
                    <span className="text-[7px] font-medium text-white/50">Page Views</span>
                  </div>
                  <p className="text-[20px] font-bold text-white tracking-tight">847</p>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 text-white/10">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[7px] font-medium text-white/50">Leads Captured</span>
                  </div>
                  <p className="text-[20px] font-bold text-emerald-400 tracking-tight">64</p>
                </div>
              </div>

              {/* Conversion rate */}
              <div className="mt-2.5 pt-2.5 border-t border-white/[0.04] flex items-center justify-between">
                <span className="text-[7px] text-white/40">Conversion Rate</span>
                <span className="text-[10px] font-semibold text-emerald-400">7.6%</span>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#18181B] border border-[#27272A] rounded-lg p-3">
              <div className="flex items-center gap-1.5 mb-2.5">
                <svg className="w-2.5 h-2.5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p className="text-[8px] font-medium text-white/40 uppercase tracking-wider">Recent Activity</p>
              </div>
              <div className="space-y-1.5">
                {activityLogs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className={`w-1 h-1 rounded-full mt-1.5 shrink-0 ${log.status === 'SUCCESS' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-[8px] font-medium text-white/60">{log.agent}</span>
                        <span className="text-[7px] text-white/20">{log.time}</span>
                      </div>
                      <p className="text-[7px] text-white/40 mt-0.5 truncate">
                        [{log.status}] {log.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle glow effect behind panel */}
      <div 
        className="absolute -inset-4 -z-10 opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(ellipse at center, rgba(94, 106, 210, 0.15) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}

// ============================================
// FEATURE ROW COMPONENT
// ============================================
function FeatureRow({ 
  title, 
  description, 
  hasArrow = false,
  delay = 0 
}: { 
  title: string; 
  description: string;
  hasArrow?: boolean;
  delay?: number;
}) {
  return (
    <motion.div 
      className="grid grid-cols-2 gap-8 py-6 border-t border-white/[0.06]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-2">
        <h3 className="text-[15px] font-medium text-white">{title}</h3>
        {hasArrow && (
          <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        )}
      </div>
      <p className="text-[14px] text-white/50 leading-relaxed">{description}</p>
    </motion.div>
  );
}

// ============================================
// HOOD COMPONENT - Under the hood section
// ============================================
export function Hood() {
  const features = [
    {
      title: "AI Signal Scanner",
      description: "Powered by the latest models and advanced data collection algorithms to extract pain points from various sources and social platforms. Extracts pain points with revenue potential in seconds.",
      hasArrow: false,
    },
    {
      title: "Real-time Validation Engine",
      description: "Multi-dimensional scoring across market demand, willingness to pay, urgency, and founder-fit. Every signal is weighted and ranked.",
      hasArrow: true,
    },
    {
      title: "Instant Landing Pages",
      description: "Generate conversion-optimized validation pages with one click. Deploy to custom subdomains and start collecting real user interest.",
      hasArrow: false,
    },
    {
      title: "Built for Speed",
      description: "From idea to live validation page in under 60 seconds. Convex real-time backend ensures zero-latency updates across your entire workflow.",
      hasArrow: false,
    },
  ];

  return (
    <section className="relative bg-[#0A0A0B] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Content */}
          <div>
            {/* Section label */}
            <motion.div 
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
              <span className="text-[13px] text-white/50">Under the hood</span>
            </motion.div>

            {/* Heading */}
            <motion.h2 
              className="text-[40px] md:text-[48px] font-medium text-white tracking-[-0.03em] leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Built on strong
              <br />
              foundations
            </motion.h2>

            {/* Description */}
            <motion.p 
              className="text-[16px] text-white/50 leading-relaxed max-w-md mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Found3r is so <span className="text-white/70">simple to use</span>, it's easy to overlook 
              the wealth of complex technologies packed under the 
              hood that keep your validation <span className="text-white/70">robust, fast, and reliable</span>.
            </motion.p>

            {/* Feature rows */}
            <div>
              {features.map((feature, i) => (
                <FeatureRow 
                  key={i}
                  title={feature.title}
                  description={feature.description}
                  hasArrow={feature.hasArrow}
                  delay={0.1 * i}
                />
              ))}
            </div>
          </div>

          {/* Right side - Dashboard preview */}
          <div className="relative hidden lg:flex lg:items-start lg:justify-center">
            <DashboardPreview />
          </div>
        </div>
      </div>

      {/* Subtle gradient overlay */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(ellipse at 80% 50%, rgba(94, 106, 210, 0.08) 0%, transparent 60%)",
        }}
      />
    </section>
  );
}
