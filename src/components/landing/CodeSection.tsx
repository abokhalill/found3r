"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// ============================================
// TERMINAL ANIMATION
// Mock CLI session
// ============================================
function TerminalWindow() {
  const terminalLines = [
    { type: "command", text: "> found3r init" },
    { type: "output", text: "Initializing Found3r project..." },
    { type: "output", text: "" },
    { type: "command", text: "> validating niche..." },
    { type: "success", text: "✓ 247 market signals found" },
    { type: "success", text: "✓ 3 competitors mapped" },
    { type: "success", text: "✓ Revenue potential: HIGH" },
    { type: "output", text: "" },
    { type: "command", text: "> generating schema..." },
    { type: "output", text: "Creating users table..." },
    { type: "output", text: "Creating contracts table..." },
    { type: "success", text: "✓ Schema generated" },
    { type: "output", text: "" },
    { type: "command", text: "> deploying..." },
    { type: "output", text: "Building landing page..." },
    { type: "output", text: "Deploying to edge..." },
    { type: "success", text: "✓ LIVE at legal-ai.found3r.dev" },
  ];

  const [visibleLines, setVisibleLines] = useState<typeof terminalLines>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= terminalLines.length) {
      // Reset after pause
      const timeout = setTimeout(() => {
        setVisibleLines([]);
        setCurrentIndex(0);
      }, 4000);
      return () => clearTimeout(timeout);
    }

    const delay = terminalLines[currentIndex].type === "command" ? 800 : 200;
    const timeout = setTimeout(() => {
      setVisibleLines((prev) => [...prev, terminalLines[currentIndex]]);
      setCurrentIndex((i) => i + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [currentIndex, terminalLines]);

  return (
    <div className="h-full bg-[#141416] rounded-2xl border border-white/[0.06] overflow-hidden flex flex-col">
      {/* Window chrome */}
      <div className="h-10 bg-[#0C0C0D] border-b border-white/[0.06] flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[12px] text-[#8A8F98] ml-2">Terminal</span>
      </div>

      {/* Terminal content */}
      <div className="flex-1 p-4 font-mono text-[13px] leading-relaxed overflow-hidden">
        {visibleLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`${
              line.type === "command" 
                ? "text-[#EDEDEF]" 
                : line.type === "success" 
                  ? "text-emerald-400" 
                  : "text-[#8A8F98]"
            }`}
          >
            {line.text}
          </motion.div>
        ))}
        
        {/* Cursor */}
        {currentIndex < terminalLines.length && (
          <motion.span
            className="inline-block w-2 h-4 bg-[#5E6AD2]"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </div>
    </div>
  );
}

// ============================================
// CODE SECTION
// Split screen with copy + terminal
// ============================================
export function CodeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const features = [
    {
      title: "Next.js 16 + Convex",
      description: "Type-safe, real-time backend with zero configuration.",
    },
    {
      title: "Auto-generated Schema",
      description: "Your data model, inferred from your niche and validated signals.",
    },
    {
      title: "Edge Deployment",
      description: "Ship to production in seconds, not hours.",
    },
  ];

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#0C0C0D]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Copy */}
          <div>
            <motion.span
              className="text-[12px] text-[#5E6AD2] uppercase tracking-[0.2em] font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Technical Foundation
            </motion.span>
            
            <motion.h2
              className="text-[28px] md:text-[36px] font-medium text-[#F7F8F8] tracking-[-0.025em] mt-4 leading-[1.15]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Standardized stack.
              <br />
              <span className="text-[#6B6F76]">Zero decisions.</span>
            </motion.h2>

            <motion.p
              className="text-[16px] text-[#9CA3AF] mt-6 leading-[1.7]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We made the hard choices so you don&apos;t have to. Every project ships with
              the same battle-tested stack used by the fastest-growing startups.
            </motion.p>

            <div className="mt-10 space-y-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                >
                  <div className="w-6 h-6 rounded-full bg-[#5E6AD2]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#5E6AD2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#EDEDEF] tracking-[-0.01em]">
                      {feature.title}
                    </h3>
                    <p className="text-[14px] text-[#8A8F98] mt-1">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Terminal */}
          <motion.div
            className="h-[400px]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <TerminalWindow />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
