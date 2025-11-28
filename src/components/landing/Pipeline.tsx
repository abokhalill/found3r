"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// ============================================
// PIPELINE NODES
// ============================================
const pipelineSteps = [
  {
    id: "signal",
    label: "Signal",
    description: "Scrape market signals from Reddit, HN, and Twitter",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: "smoke",
    label: "Smoke Test",
    description: "Generate and deploy a validation landing page",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    ),
  },
  {
    id: "mvp",
    label: "MVP",
    description: "Auto-generate schema, APIs, and UI components",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: "revenue",
    label: "Revenue",
    description: "Launch to paying customers with distribution kit",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

// ============================================
// PIPELINE SECTION
// Animated beam traveling through nodes
// ============================================
export function Pipeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeNode, setActiveNode] = useState(-1);

  // Animate through nodes when in view
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % (pipelineSteps.length + 1));
    }, 1500);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0C0C0D]" />
      
      {/* Section Header */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mb-20">
        <motion.span
          className="text-[12px] text-[#5E6AD2] uppercase tracking-[0.2em] font-medium"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The Validation Pipeline
        </motion.span>
        <motion.h2
          className="text-[32px] md:text-[44px] font-medium text-[#F7F8F8] tracking-[-0.025em] mt-4 leading-[1.15]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          From idea to revenue
          <br />
          <span className="text-[#6B6F76]">in one continuous flow.</span>
        </motion.h2>
      </div>

      {/* Pipeline */}
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="relative">
          {/* The Beam Line (SVG) */}
          <svg
            className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-2"
            viewBox="0 0 8 400"
            preserveAspectRatio="none"
          >
            {/* Background line */}
            <line
              x1="4"
              y1="0"
              x2="4"
              y2="400"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="2"
            />
            
            {/* Animated beam */}
            <motion.line
              x1="4"
              y1="0"
              x2="4"
              y2="400"
              stroke="url(#beamGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
            />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="beamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="40%" stopColor="#5E6AD2" />
                <stop offset="60%" stopColor="#5E6AD2" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>

          {/* Nodes */}
          <div className="relative space-y-0">
            {pipelineSteps.map((step, index) => {
              const isActive = activeNode === index;
              const isPast = activeNode > index;
              
              return (
                <motion.div
                  key={step.id}
                  className="relative flex items-center gap-8 py-8"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Left content (even indices) */}
                  <div className={`flex-1 ${index % 2 === 0 ? "text-right pr-12" : "opacity-0"}`}>
                    {index % 2 === 0 && (
                      <div>
                        <h3 
                          className={`text-[20px] font-semibold tracking-[-0.02em] transition-all duration-500 ${
                            isActive ? "text-white" : isPast ? "text-[#EDEDEF]" : "text-[#8A8F98]"
                          }`}
                          style={{
                            textShadow: isActive ? "0 0 20px rgba(255,255,255,0.5)" : "none",
                          }}
                        >
                          {step.label}
                        </h3>
                        <p className="text-[14px] text-[#8A8F98] mt-1 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Center node */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                        isActive 
                          ? "bg-[#5E6AD2] border-[#5E6AD2] text-white" 
                          : isPast 
                            ? "bg-[#5E6AD2]/20 border-[#5E6AD2]/50 text-[#5E6AD2]"
                            : "bg-[#0C0C0D] border-white/10 text-[#8A8F98]"
                      }`}
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        boxShadow: isActive 
                          ? "0 0 30px rgba(94, 106, 210, 0.5)" 
                          : "0 0 0px rgba(94, 106, 210, 0)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.icon}
                    </motion.div>
                    
                    {/* Pulse ring on active */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-[#5E6AD2]"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 1.8, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </div>

                  {/* Right content (odd indices) */}
                  <div className={`flex-1 ${index % 2 === 1 ? "text-left pl-12" : "opacity-0"}`}>
                    {index % 2 === 1 && (
                      <div>
                        <h3 
                          className={`text-[20px] font-semibold tracking-[-0.02em] transition-all duration-500 ${
                            isActive ? "text-white" : isPast ? "text-[#EDEDEF]" : "text-[#8A8F98]"
                          }`}
                          style={{
                            textShadow: isActive ? "0 0 20px rgba(255,255,255,0.5)" : "none",
                          }}
                        >
                          {step.label}
                        </h3>
                        <p className="text-[14px] text-[#8A8F98] mt-1 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
