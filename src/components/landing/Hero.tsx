"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// ============================================
// DASHBOARD SCREENSHOT MOCK
// Linear-grade fidelity
// ============================================
function DashboardScreenshot() {
  return (
    <div className="w-full h-full bg-[#141416] rounded-2xl border border-white/[0.06] overflow-hidden">
      {/* Window Chrome */}
      <div className="h-10 bg-[#0C0C0D] border-b border-white/[0.06] flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="h-6 w-64 bg-white/[0.03] rounded-md flex items-center justify-center">
            <span className="text-[11px] text-[#8A8F98]">found3r.dev/dashboard</span>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex h-[calc(100%-40px)]">
        {/* Sidebar */}
        <div className="w-56 border-r border-white/[0.06] p-4 space-y-6">
          <div className="space-y-1">
            <div className="h-8 w-full bg-white/[0.05] rounded-md flex items-center px-3 gap-2">
              <div className="w-4 h-4 rounded bg-[#5E6AD2]" />
              <span className="text-[13px] text-[#EDEDEF]">Command</span>
            </div>
            <div className="h-8 w-full rounded-md flex items-center px-3 gap-2 opacity-50">
              <div className="w-4 h-4 rounded bg-white/10" />
              <span className="text-[13px] text-[#8A8F98]">Validate</span>
            </div>
            <div className="h-8 w-full rounded-md flex items-center px-3 gap-2 opacity-50">
              <div className="w-4 h-4 rounded bg-white/10" />
              <span className="text-[13px] text-[#8A8F98]">Build</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <span className="text-[11px] text-[#8A8F98] uppercase tracking-wider">Projects</span>
            <div className="space-y-1">
              <div className="h-7 w-full bg-white/[0.03] rounded flex items-center px-2 gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[12px] text-[#EDEDEF]">AI Legal Assistant</span>
              </div>
              <div className="h-7 w-full rounded flex items-center px-2 gap-2 opacity-40">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-[12px] text-[#8A8F98]">SaaS Boilerplate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[18px] font-semibold text-[#EDEDEF] tracking-[-0.02em]">AI Legal Assistant</h2>
              <p className="text-[13px] text-[#8A8F98]">Validation Stage</p>
            </div>
            <div className="flex gap-2">
              <div className="h-8 px-3 bg-white/[0.05] rounded-md flex items-center">
                <span className="text-[12px] text-[#8A8F98]">Run Agent</span>
              </div>
              <div className="h-8 px-3 bg-[#5E6AD2] rounded-md flex items-center">
                <span className="text-[12px] text-white font-medium">Deploy</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-4">
              <span className="text-[11px] text-[#8A8F98] uppercase tracking-wider">Signals</span>
              <p className="text-[28px] font-semibold text-[#EDEDEF] tracking-[-0.02em] mt-1">247</p>
              <span className="text-[11px] text-emerald-400">+12% this week</span>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-4">
              <span className="text-[11px] text-[#8A8F98] uppercase tracking-wider">Signups</span>
              <p className="text-[28px] font-semibold text-[#EDEDEF] tracking-[-0.02em] mt-1">89</p>
              <span className="text-[11px] text-emerald-400">4.2% conversion</span>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-4">
              <span className="text-[11px] text-[#8A8F98] uppercase tracking-wider">DNA Score</span>
              <p className="text-[28px] font-semibold text-[#EDEDEF] tracking-[-0.02em] mt-1">94</p>
              <span className="text-[11px] text-[#5E6AD2]">Ready to build</span>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-4">
            <span className="text-[11px] text-[#8A8F98] uppercase tracking-wider">Agent Activity</span>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[12px] text-[#EDEDEF]">Signal Scanner completed</span>
                <span className="text-[11px] text-[#8A8F98] ml-auto">2m ago</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#5E6AD2]" />
                <span className="text-[12px] text-[#EDEDEF]">Landing page deployed</span>
                <span className="text-[11px] text-[#8A8F98] ml-auto">15m ago</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-[12px] text-[#EDEDEF]">Build Planner running...</span>
                <span className="text-[11px] text-[#8A8F98] ml-auto">now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// HERO SECTION
// Linear.app aesthetic with 3D perspective
// ============================================
export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-20">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-[#0C0C0D]" />
      
      {/* Radial glow behind screenshot */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[800px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(94, 106, 210, 0.08) 0%, transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Badge */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-7 px-3 bg-white/[0.05] border border-white/[0.08] rounded-full flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[12px] text-[#8A8F98] tracking-[-0.01em]">Now in Private Beta</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-center text-[44px] md:text-[56px] lg:text-[72px] font-medium text-[#F7F8F8] tracking-[-0.025em] leading-[1.1]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          The Operating System
          <br />
          <span className="text-[#6B6F76]">for Founders</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-center text-[17px] md:text-[18px] text-[#9CA3AF] mt-6 max-w-lg mx-auto tracking-normal leading-[1.7]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Validate ideas in minutes. Generate MVPs in seconds.
          <br />
          Ship before the competition knows you exist.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/sign-up"
            className="h-12 px-6 bg-[#EDEDEF] text-[#0B0B0E] rounded-lg font-medium text-[14px] tracking-[-0.01em] flex items-center gap-2 hover:bg-white transition-colors"
          >
            Start Building
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            href="#demo"
            className="h-12 px-6 bg-white/[0.05] border border-white/[0.08] text-[#EDEDEF] rounded-lg font-medium text-[14px] tracking-[-0.01em] flex items-center hover:bg-white/[0.08] transition-colors"
          >
            Watch Demo
          </Link>
        </motion.div>

        {/* Dashboard Screenshot with 3D Perspective */}
        <motion.div
          className="mt-20 relative"
          style={{ perspective: "1200px" }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative"
            style={{
              transformStyle: "preserve-3d",
            }}
            initial={{ rotateX: 25, scale: 0.9 }}
            animate={{ rotateX: 20, scale: 0.95 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Glow effect */}
            <div 
              className="absolute inset-0 rounded-xl"
              style={{
                boxShadow: "0 0 80px -20px rgba(94, 106, 210, 0.3), 0 0 40px -10px rgba(255, 255, 255, 0.05)",
              }}
            />
            
            {/* Screenshot container with mask */}
            <div
              className="relative h-[500px] md:h-[600px] rounded-xl overflow-hidden"
              style={{
                maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
              }}
            >
              <DashboardScreenshot />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
