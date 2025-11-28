"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// ============================================
// FLOATING TRACTION GRAPH CARD
// ============================================
function TractionGraph() {
  const data = [20, 35, 28, 45, 52, 48, 65, 78, 72, 89];
  const maxValue = Math.max(...data);
  
  const points = data.map((value, index) => ({
    x: (index / (data.length - 1)) * 100,
    y: 100 - (value / maxValue) * 80,
  }));

  const pathD = points.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = points[i - 1];
    const cpX = (prev.x + point.x) / 2;
    return `${acc} C ${cpX} ${prev.y}, ${cpX} ${point.y}, ${point.x} ${point.y}`;
  }, "");

  return (
    <div className="w-[280px] h-[180px] bg-[#0F0F11] rounded-2xl border border-white/[0.06] p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[11px] text-[#6B6F76] uppercase tracking-wider">Signups</p>
          <p className="text-[24px] font-semibold text-[#F7F8F8] tracking-tight">247</p>
        </div>
        <div className="h-6 px-2 bg-emerald-500/10 rounded-full flex items-center">
          <span className="text-[11px] text-emerald-400 font-medium">+34%</span>
        </div>
      </div>
      
      <svg className="w-full h-[80px]" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="graphGradient3d" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5E6AD2" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#5E6AD2" stopOpacity="0" />
          </linearGradient>
          <filter id="glow3d">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path d={`${pathD} L 100 100 L 0 100 Z`} fill="url(#graphGradient3d)" />
        <path d={pathD} fill="none" stroke="#5E6AD2" strokeWidth="2" strokeLinecap="round" filter="url(#glow3d)" />
        <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="4" fill="#5E6AD2" filter="url(#glow3d)" />
      </svg>
    </div>
  );
}

// ============================================
// FLOATING TICKET LIST CARD
// ============================================
function TicketList() {
  const tickets = [
    { id: "F3-127", title: "Landing page deployed", status: "done", color: "emerald" },
    { id: "F3-128", title: "Schema generated", status: "done", color: "emerald" },
    { id: "F3-129", title: "Run distribution kit", status: "todo", color: "amber" },
  ];

  return (
    <div className="w-[260px] bg-[#0F0F11] rounded-2xl border border-white/[0.06] p-4 overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded bg-[#5E6AD2]/20 flex items-center justify-center">
          <svg className="w-3 h-3 text-[#5E6AD2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <span className="text-[13px] text-[#F7F8F8] font-medium">Execution Queue</span>
      </div>
      
      <div className="space-y-2">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.02]">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
              ticket.status === "done" ? "bg-emerald-500/20" : "bg-amber-500/20"
            }`}>
              {ticket.status === "done" ? (
                <svg className="w-2.5 h-2.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-[#F7F8F8] truncate">{ticket.title}</p>
              <p className="text-[10px] text-[#6B6F76]">{ticket.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// SUCCESS TOAST
// ============================================
function SuccessToast() {
  return (
    <div className="h-10 px-4 bg-[#0F0F11] rounded-full border border-white/[0.06] flex items-center gap-3 shadow-2xl">
      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
        <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-[13px] text-[#F7F8F8] font-medium">Validation Complete</span>
      <div className="h-6 px-2 bg-[#5E6AD2]/20 rounded-full flex items-center">
        <span className="text-[11px] text-[#5E6AD2] font-semibold">89/100</span>
      </div>
    </div>
  );
}

// ============================================
// ANIMATED CURSOR
// ============================================
function AnimatedCursor() {
  return (
    <motion.div
      className="absolute"
      initial={{ x: 0, y: 0 }}
      animate={{ 
        x: [0, 120, 80, -40, 0],
        y: [0, 60, -30, 40, 0],
      }}
      transition={{ 
        duration: 12, 
        repeat: Infinity, 
        ease: "easeInOut",
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
        <path 
          d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 01.35-.15h6.87a.5.5 0 00.35-.85L6.35 2.86a.5.5 0 00-.85.35z" 
          fill="#F7F8F8"
          stroke="#0C0C0D"
          strokeWidth="1"
        />
      </svg>
    </motion.div>
  );
}

// ============================================
// AGENT STATUS CARD
// ============================================
function AgentStatus() {
  return (
    <div className="w-[200px] bg-[#0F0F11] rounded-2xl border border-white/[0.06] p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[11px] text-[#6B6F76] uppercase tracking-wider">Agent Active</span>
      </div>
      <p className="text-[14px] text-[#F7F8F8] font-medium">Signal Scanner</p>
      <p className="text-[12px] text-[#6B6F76] mt-1">Analyzing 247 signals...</p>
      <div className="mt-3 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-[#5E6AD2] rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "72%" }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ============================================
// HERO 3D - DECONSTRUCTED DASHBOARD
// ============================================
export function Hero3D() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-20">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0C0C0D]" />
      
      {/* Atmospheric glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[1000px] h-[800px] rounded-full opacity-60"
        style={{
          background: "radial-gradient(ellipse at center, rgba(94, 106, 210, 0.15) 0%, rgba(139, 92, 246, 0.08) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Text Content */}
        <div className="text-center mb-16">
          {/* Badge */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-7 px-3 bg-white/[0.05] border border-white/[0.08] rounded-full flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[12px] text-[#9CA3AF]">Now in Private Beta</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-[44px] md:text-[56px] lg:text-[72px] font-medium text-[#F7F8F8] tracking-[-0.025em] leading-[1.1]"
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
            className="text-[17px] md:text-[18px] text-[#9CA3AF] mt-6 max-w-lg mx-auto leading-[1.7]"
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
              className="h-12 px-6 bg-[#F7F8F8] text-[#0C0C0D] rounded-lg font-medium text-[14px] flex items-center gap-2 hover:bg-white transition-colors"
            >
              Start Building
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="#demo"
              className="h-12 px-6 bg-white/[0.05] border border-white/[0.08] text-[#F7F8F8] rounded-lg font-medium text-[14px] flex items-center hover:bg-white/[0.08] transition-colors"
            >
              Watch Demo
            </Link>
          </motion.div>
        </div>

        {/* 3D Stage */}
        <motion.div
          className="stage-3d relative h-[500px] md:h-[550px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* The tilted container */}
          <div 
            className="preserve-3d absolute inset-0 flex items-center justify-center"
            style={{
              transform: "rotateX(18deg) rotateY(-8deg)",
            }}
          >
            {/* Layer 1: Baseplate with grid */}
            <motion.div
              className="float-element absolute w-[700px] h-[400px] rounded-3xl glass-card grid-pattern"
              style={{ transform: "translateZ(0px)" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Layer 2: Traction Graph - Left */}
            <motion.div
              className="float-element absolute"
              style={{ 
                transform: "translateZ(50px) translateX(-180px) translateY(-20px)",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ 
                opacity: 1, 
                y: [0, -8, 0],
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.8 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
              }}
            >
              <TractionGraph />
            </motion.div>

            {/* Layer 2: Ticket List - Right */}
            <motion.div
              className="float-element absolute"
              style={{ 
                transform: "translateZ(60px) translateX(160px) translateY(30px)",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ 
                opacity: 1, 
                y: [0, -10, 0],
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.9 },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
              }}
            >
              <TicketList />
            </motion.div>

            {/* Layer 2: Agent Status - Bottom Left */}
            <motion.div
              className="float-element absolute"
              style={{ 
                transform: "translateZ(40px) translateX(-220px) translateY(120px)",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ 
                opacity: 1, 
                y: [0, -6, 0],
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: 1 },
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
              }}
            >
              <AgentStatus />
            </motion.div>

            {/* Layer 3: Success Toast - Top Center */}
            <motion.div
              className="float-element absolute"
              style={{ 
                transform: "translateZ(90px) translateY(-140px)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: [0, -5, 0],
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: 1.1 },
                y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.3 }
              }}
            >
              <SuccessToast />
            </motion.div>

            {/* Layer 3: Animated Cursor */}
            <motion.div
              className="float-element absolute"
              style={{ 
                transform: "translateZ(100px) translateX(50px) translateY(20px)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <AnimatedCursor />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
