"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// ============================================
// SIGNAL SCANNER CARD (Wide)
// Live-updating list animation
// ============================================
function SignalScannerCard() {
  const [signals, setSignals] = useState([
    { id: 1, source: "reddit", text: "Need a tool for contract review", status: "scanning" },
    { id: 2, source: "hn", text: "Looking for AI legal assistant", status: "scanning" },
    { id: 3, source: "twitter", text: "Frustrated with manual compliance", status: "scanning" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSignals((prev) => {
        const updated = [...prev];
        const scanningIndex = updated.findIndex((s) => s.status === "scanning");
        if (scanningIndex !== -1) {
          updated[scanningIndex].status = "validated";
        } else {
          // Reset all to scanning
          return updated.map((s) => ({ ...s, status: "scanning" }));
        }
        return updated;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const sourceIcons: Record<string, React.ReactNode> = {
    reddit: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
      </svg>
    ),
    hn: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0v24h24V0H0zm12.3 12.5l-3.6-6.8h1.7l2.8 5.5 2.8-5.5h1.7l-3.6 6.8v4.7h-1.8v-4.7z"/>
      </svg>
    ),
    twitter: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  };

  return (
    <div className="h-full p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[#5E6AD2]/20 flex items-center justify-center">
          <svg className="w-4 h-4 text-[#5E6AD2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h3 className="text-[15px] font-semibold text-[#EDEDEF] tracking-[-0.01em]">Signal Scanner</h3>
          <p className="text-[12px] text-[#8A8F98]">Real-time market intelligence</p>
        </div>
      </div>

      <div className="flex-1 space-y-2">
        {signals.map((signal) => (
          <motion.div
            key={signal.id}
            className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-lg border border-white/[0.05]"
            animate={{
              borderColor: signal.status === "validated" ? "rgba(16, 185, 129, 0.3)" : "rgba(255,255,255,0.05)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className={`text-[#8A8F98] transition-colors duration-300 ${signal.status === "validated" ? "text-emerald-400" : ""}`}>
              {sourceIcons[signal.source]}
            </div>
            <span className="flex-1 text-[13px] text-[#EDEDEF] truncate">{signal.text}</span>
            <motion.div
              className={`h-5 px-2 rounded-full text-[10px] font-medium flex items-center ${
                signal.status === "validated" 
                  ? "bg-emerald-500/20 text-emerald-400" 
                  : "bg-white/[0.05] text-[#8A8F98]"
              }`}
              animate={{
                scale: signal.status === "validated" ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {signal.status === "validated" ? "Validated" : "Scanning..."}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// MICRO-MVP CARD (Tall)
// Typewriter code effect
// ============================================
function MicroMVPCard() {
  const codeLines = [
    'import { defineSchema } from "convex";',
    '',
    'export default defineSchema({',
    '  users: defineTable({',
    '    email: v.string(),',
    '    plan: v.string(),',
    '  }),',
    '  contracts: defineTable({',
    '    userId: v.id("users"),',
    '    content: v.string(),',
    '    status: v.string(),',
    '  }),',
    '});',
  ];

  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= codeLines.length) {
      // Reset after a pause
      const timeout = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLine(0);
        setCurrentChar(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const line = codeLines[currentLine];
    
    if (currentChar < line.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLine] = line.slice(0, currentChar + 1);
          return updated;
        });
        setCurrentChar((c) => c + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
        setDisplayedLines((prev) => [...prev, ""]);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar, codeLines]);

  return (
    <div className="h-full flex flex-col">
      {/* Window chrome */}
      <div className="h-8 bg-[#1A1A1F] border-b border-white/[0.05] flex items-center px-3 gap-2 rounded-t-xl">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[11px] text-[#8A8F98] ml-2">schema.ts</span>
      </div>

      {/* Code content */}
      <div className="flex-1 p-4 font-mono text-[12px] leading-relaxed overflow-hidden">
        {displayedLines.map((line, i) => (
          <div key={i} className="flex">
            <span className="w-6 text-[#8A8F98]/50 select-none">{i + 1}</span>
            <span className="text-[#EDEDEF]">
              {line}
              {i === currentLine && currentLine < codeLines.length && (
                <motion.span
                  className="inline-block w-[2px] h-[14px] bg-[#5E6AD2] ml-[1px]"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="h-8 bg-[#1A1A1F] border-t border-white/[0.05] flex items-center justify-between px-3 rounded-b-xl">
        <span className="text-[10px] text-[#8A8F98]">TypeScript</span>
        <span className="text-[10px] text-emerald-400">● Auto-generating...</span>
      </div>
    </div>
  );
}

// ============================================
// TRACTION CARD (Box)
// Animated line chart
// ============================================
function TractionCard() {
  const [data, setData] = useState([10, 15, 12, 25, 35, 45, 80]);
  const maxValue = Math.max(...data);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1), prev[prev.length - 1] + Math.random() * 20 - 5];
        return newData.map((v) => Math.max(10, Math.min(100, v)));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="h-full p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-semibold text-[#EDEDEF] tracking-[-0.01em]">Traction</h3>
          <p className="text-[12px] text-[#8A8F98]">Real-time signups</p>
        </div>
        <div className="text-right">
          <p className="text-[24px] font-semibold text-[#EDEDEF] tracking-[-0.02em]">247</p>
          <p className="text-[11px] text-emerald-400">+34% this week</p>
        </div>
      </div>

      <div className="flex-1 relative">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Gradient fill */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5E6AD2" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#5E6AD2" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Area fill */}
          <motion.path
            d={`${pathD} L 100 100 L 0 100 Z`}
            fill="url(#chartGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Line */}
          <motion.path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="#5E6AD2"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* End dot */}
          <motion.circle
            cx={points[points.length - 1].x}
            cy={points[points.length - 1].y}
            r="3"
            fill="#5E6AD2"
            filter="url(#glow)"
            animate={{
              r: [3, 4, 3],
              opacity: [1, 0.8, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>
      </div>
    </div>
  );
}

// ============================================
// BENTO GRID
// 3-column layout with engine cards
// ============================================
export function BentoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#0C0C0D]" />
      
      {/* Ambient glow blobs - Linear style */}
      <div 
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-40"
        style={{
          background: "radial-gradient(ellipse at center, rgba(94, 106, 210, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            className="text-[12px] text-[#5E6AD2] uppercase tracking-[0.2em] font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            The Engine
          </motion.span>
          <motion.h2
            className="text-[32px] md:text-[44px] font-medium text-[#F7F8F8] tracking-[-0.025em] mt-4 leading-[1.15]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Four agents.
            <br />
            <span className="text-[#6B6F76]">One mission.</span>
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Signal Scanner - Wide (spans 2 columns) */}
          <motion.div
            className="md:col-span-2 h-[280px] bg-[#141416] border border-white/[0.06] rounded-2xl overflow-hidden hover:bg-[#1A1A1D] transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SignalScannerCard />
          </motion.div>

          {/* Traction - Box */}
          <motion.div
            className="h-[280px] bg-[#141416] border border-white/[0.06] rounded-2xl overflow-hidden hover:bg-[#1A1A1D] transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TractionCard />
          </motion.div>

          {/* Micro-MVP - Tall (spans 2 rows) */}
          <motion.div
            className="md:row-span-2 h-[400px] md:h-auto bg-[#141416] border border-white/[0.06] rounded-2xl overflow-hidden hover:bg-[#1A1A1D] transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <MicroMVPCard />
          </motion.div>

          {/* Distribution Kit */}
          <motion.div
            className="md:col-span-2 h-[200px] bg-[#141416] border border-white/[0.06] rounded-2xl overflow-hidden hover:bg-[#1A1A1D] transition-all duration-300 p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-[#EDEDEF] tracking-[-0.01em]">Distribution Kit</h3>
                <p className="text-[12px] text-[#8A8F98]">Auto-generated marketing assets</p>
              </div>
            </div>
            <div className="flex gap-3">
              {["Twitter Thread", "Product Hunt", "Cold Email", "Landing Copy"].map((asset, i) => (
                <motion.div
                  key={asset}
                  className="h-9 px-4 bg-white/[0.03] border border-white/[0.05] rounded-lg flex items-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                >
                  <span className="text-[12px] text-[#8A8F98]">{asset}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
