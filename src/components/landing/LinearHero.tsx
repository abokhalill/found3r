"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// ============================================
// SIDEBAR PANEL
// ============================================
function DashboardSidebar() {
  return (
    <div className="w-[220px] h-[380px] bg-[#111113] rounded-xl border border-white/[0.08] overflow-hidden flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#5E6AD2] flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="text-[14px] font-semibold text-white">Linear</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-2 space-y-0.5">
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-white/[0.06]">
          <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span className="text-[13px] text-white">Home</span>
        </div>
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-md">
          <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <span className="text-[13px] text-white/50">Inbox</span>
        </div>
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-md">
          <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
          </svg>
          <span className="text-[13px] text-white/50">My Issues</span>
        </div>
      </div>

      {/* Workspace */}
      <div className="px-3 mt-3 flex-1">
        <div className="text-[11px] text-white/30 uppercase tracking-wider mb-2 px-1">Workspace</div>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-md">
            <div className="w-4 h-4 rounded bg-violet-500/30 flex items-center justify-center">
              <span className="text-[9px] text-violet-400">P</span>
            </div>
            <span className="text-[12px] text-white/50">Projects</span>
          </div>
          <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-md bg-white/[0.04]">
            <div className="w-4 h-4 rounded bg-blue-500/30 flex items-center justify-center">
              <span className="text-[9px] text-blue-400">I</span>
            </div>
            <span className="text-[12px] text-white">Initiatives</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// INBOX PANEL
// ============================================
function InboxPanel() {
  const items = [
    { id: "ENG-135", title: "Refactor sonic crawler", assignee: "nan assigned you", color: "bg-red-500", isActive: true },
    { id: "", title: "LLM Chatbot", assignee: "New project update by raissa", color: "bg-violet-500", isActive: false },
    { id: "ENG-159", title: "Error uploading images via API", assignee: "SLA breached", color: "bg-amber-500", isActive: false },
    { id: "DES-498", title: "Redesign users settings...", assignee: "kari mentioned you", color: "bg-white/40", isActive: false },
  ];

  return (
    <div className="w-[300px] h-[380px] bg-[#111113] rounded-xl border border-white/[0.08] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
        <span className="text-[14px] font-medium text-white">Inbox</span>
        <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-hidden">
        {items.map((item, i) => (
          <div 
            key={i} 
            className={`px-4 py-3 border-b border-white/[0.04] ${item.isActive ? 'bg-white/[0.04]' : ''}`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full ${item.color} mt-1.5 shrink-0`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {item.id && <span className="text-[11px] text-white/30 font-mono">{item.id}</span>}
                  <span className="text-[13px] text-white truncate">{item.title}</span>
                </div>
                <p className="text-[12px] text-white/40 mt-1 truncate">{item.assignee}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// DETAIL PANEL
// ============================================
function CodeEditorPanel() {
  return (
    <div className="w-[480px] h-[380px] bg-[#111113] rounded-xl border border-white/[0.08] overflow-hidden">
      {/* Header with tabs */}
      <div className="px-4 py-3 border-b border-white/[0.06] flex items-center gap-6">
        <div className="flex items-center gap-2 text-[13px] text-white/70">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <span>Description</span>
        </div>
        <span className="text-[13px] text-white/30">Activity</span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-[18px] font-semibold text-white mb-5">Refactor sonic crawler</h3>
        
        <div className="space-y-4 font-mono text-[12px] leading-[1.7] text-white/50">
          <p>
            <span className="text-white/70">.document</span>
            <span className="text-amber-400/80">.documentContent</span>
            <span className="text-white/40">; is defined wrongly. It should be a </span>
            <span className="text-cyan-400/80">LazyManyToOne</span>
            <span className="text-white/40"> relation.</span>
          </p>
          
          <p className="text-white/30">
            /* The document content that this comment is associated with, e.g. */
          </p>
          
          <p>
            <span className="text-violet-400/80">isManyToOne</span>
            <span className="text-white/40">: () =&gt; </span>
            <span className="text-cyan-400/80">DocumentContent</span>
            <span className="text-white/30">, /* comment */, false, false,</span>
          </p>
          
          <p>
            <span className="text-violet-400/80">public</span>
            <span className="text-white/50"> documentContent?: </span>
            <span className="text-cyan-400/80">DocumentContent</span>
            <span className="text-white/40">;</span>
          </p>
          
          <p className="text-white/40">
            We would be accessing <span className="text-cyan-400/60">CachedPromise&lt;DocumentContent&gt;</span> then, and document content would be hydr...
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================
// LINEAR HERO COMPONENT
// ============================================
export function LinearHero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A0A0B]" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-32">
        <div className="text-center">
          <motion.h1
            className="text-[42px] md:text-[56px] lg:text-[68px] font-medium text-white tracking-[-0.03em] leading-[1.08]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Found3r is a purpose-built tool for
            <br />
            validating and building products
          </motion.h1>

          <motion.p
            className="text-[17px] text-[#8A8F98] mt-6 max-w-lg mx-auto leading-[1.6]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Meet the system for modern founder development.
            <br />
            Streamline validation, MVPs, and product launches.
          </motion.p>

          <motion.div
            className="flex justify-center items-center gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/sign-up"
              className="h-10 px-5 bg-white text-[#0A0A0B] rounded-lg font-medium text-[14px] flex items-center hover:bg-gray-100 transition-colors"
            >
              Start building
            </Link>
            <Link
              href="#features"
              className="text-[14px] text-[#8A8F98] hover:text-white transition-colors flex items-center gap-1"
            >
              <span className="text-[#5C5F66]">New:</span> AI Agent for Validation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ========== SUBTLE DASHBOARD BACKGROUND ========== */}
      <motion.div 
        className="absolute inset-x-0 bottom-0 h-[58%] overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        {/* The tilted dashboard - SUBTLE opacity */}
        <div 
          className="absolute inset-x-0 top-0 bottom-0 flex justify-center"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 0%",
          }}
        >
          <motion.div 
            className="flex items-start gap-3 opacity-[0.55]"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 0.55 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transform: "rotateX(8deg) translateY(20px)",
              transformOrigin: "50% 0%",
              transformStyle: "preserve-3d",
            }}
          >
            <DashboardSidebar />
            <InboxPanel />
            <CodeEditorPanel />
          </motion.div>
        </div>

        {/* Top gradient fade - blends into hero */}
        <div 
          className="absolute inset-x-0 top-0 h-40 z-10"
          style={{
            background: "linear-gradient(to bottom, #0A0A0B 0%, #0A0A0B 20%, transparent 100%)",
          }}
        />

        {/* Left edge fade */}
        <div 
          className="absolute inset-y-0 left-0 w-[20%] z-10"
          style={{
            background: "linear-gradient(to right, #0A0A0B 0%, #0A0A0B 50%, transparent 100%)",
          }}
        />

        {/* Right edge fade */}
        <div 
          className="absolute inset-y-0 right-0 w-[20%] z-10"
          style={{
            background: "linear-gradient(to left, #0A0A0B 0%, #0A0A0B 50%, transparent 100%)",
          }}
        />

        {/* Bottom fade */}
        <div 
          className="absolute inset-x-0 bottom-0 h-24 z-10"
          style={{
            background: "linear-gradient(to top, #0A0A0B 0%, transparent 100%)",
          }}
        />
      </motion.div>
    </section>
  );
}
