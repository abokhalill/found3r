"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// ============================================
// SEEDED RANDOM - Deterministic random for SSR
// ============================================
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// ============================================
// VALIDATION FUNNEL VISUALIZATION
// Shows the journey: Signals → Landing Pages → Signups → Revenue
// ============================================
function ValidationFunnelVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const [points, setPoints] = useState<{ x: number; y: number; color: string; size: number }[]>([]);

  // Generate points only on client to avoid hydration mismatch
  useEffect(() => {
    const data: { x: number; y: number; color: string; size: number }[] = [];
    
    // Clusters representing validation stages over time
    // X = time progression, Y = validation stage (lower = more validated/revenue)
    const clusters = [
      // Early signals (top-left) - many raw signals
      { cx: 15, cy: 20, spread: 8, count: 35, color: "#5E6AD2" },
      { cx: 25, cy: 25, spread: 6, count: 28, color: "#5E6AD2" },
      // Landing pages deployed (middle)
      { cx: 40, cy: 35, spread: 10, count: 22, color: "#10B981" },
      { cx: 50, cy: 40, spread: 8, count: 18, color: "#10B981" },
      // Signups captured (lower-middle)
      { cx: 60, cy: 55, spread: 8, count: 15, color: "#F59E0B" },
      { cx: 70, cy: 60, spread: 6, count: 12, color: "#F59E0B" },
      // Revenue validated (bottom-right) - fewer but high value
      { cx: 80, cy: 75, spread: 5, count: 8, color: "#EF4444" },
      { cx: 88, cy: 80, spread: 4, count: 5, color: "#EF4444" },
    ];

    let seed = 1;
    clusters.forEach(cluster => {
      for (let i = 0; i < cluster.count; i++) {
        const angle = seededRandom(seed++) * Math.PI * 2;
        const r = seededRandom(seed++) * cluster.spread;
        data.push({
          x: Math.max(5, Math.min(95, cluster.cx + Math.cos(angle) * r)),
          y: Math.max(5, Math.min(95, cluster.cy + Math.sin(angle) * r)),
          color: cluster.color,
          size: 1.2 + seededRandom(seed++) * 1.8,
        });
      }
    });

    setPoints(data);
  }, []);

  // Y-axis labels - Validation stages (right side)
  const yLabels = ["Raw Signals", "Scored Leads", "Pages Live", "Email Signups", "Paid Intent", "Revenue"];
  
  // X-axis labels - Time/velocity
  const xLabels = ["Day 1", "Day 3", "Week 1", "Week 2", "Week 3", "Week 4"];

  // Metric annotations - Found3r specific
  const annotations = [
    { x: 18, y: 15, value: "847", sub: "signals scraped" },
    { x: 45, y: 30, value: "12", sub: "pages deployed" },
    { x: 65, y: 50, value: "234", sub: "signups captured" },
    { x: 82, y: 70, value: "$4.2K", sub: "validated MRR" },
  ];

  return (
    <div ref={containerRef} className="relative w-full h-[420px]">
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full">
        {/* Horizontal */}
        {[15, 30, 45, 60, 75, 90].map((y) => (
          <line key={`h-${y}`} x1="0" y1={`${y}%`} x2="85%" y2={`${y}%`} stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
        ))}
        {/* Vertical */}
        {[10, 25, 40, 55, 70, 85].map((x) => (
          <line key={`v-${x}`} x1={`${x}%`} y1="5%" x2={`${x}%`} y2="95%" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
        ))}
      </svg>

      {/* Trend line - diagonal showing validation progression */}
      <svg className="absolute inset-0 w-full h-full" style={{ width: '85%' }}>
        <defs>
          <linearGradient id="trend-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5E6AD2" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 10% 15% Q 30% 25%, 50% 40% T 90% 85%"
          fill="none"
          stroke="url(#trend-gradient)"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
      </svg>

      {/* Data points */}
      <svg className="absolute inset-0 w-full h-full" style={{ width: '85%' }}>
        <defs>
          <filter id="scatter-glow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {points.map((point, i) => (
          <motion.circle
            key={i}
            cx={`${point.x}%`}
            cy={`${point.y}%`}
            r={point.size}
            fill={point.color}
            filter="url(#scatter-glow)"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 0.85, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: i * 0.003 }}
          />
        ))}
      </svg>

      {/* Y-axis labels */}
      <div className="absolute right-0 top-0 h-full w-[15%] flex flex-col justify-between py-4 pr-2">
        {yLabels.map((label, i) => (
          <span key={i} className="text-[10px] text-white/25 text-right leading-none">{label}</span>
        ))}
      </div>

      {/* X-axis labels */}
      <div className="absolute bottom-0 left-0 w-[85%] flex justify-between px-2">
        {xLabels.map((label, i) => (
          <span key={i} className="text-[9px] text-white/20">{label}</span>
        ))}
      </div>

      {/* Annotations */}
      {annotations.map((ann, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: `${ann.x}%`, top: `${ann.y}%` }}
          initial={{ opacity: 0, y: 5 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
        >
          <div className="text-[11px] text-white font-medium">{ann.value}</div>
          <div className="text-[9px] text-white/35">{ann.sub}</div>
        </motion.div>
      ))}

      {/* Legend */}
      <motion.div 
        className="absolute top-4 left-4 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.2 }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#5E6AD2]" />
          <span className="text-[9px] text-white/30">Signals</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span className="text-[9px] text-white/30">Pages</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
          <span className="text-[9px] text-white/30">Signups</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
          <span className="text-[9px] text-white/30">Revenue</span>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================
// FEATURES - Found3r Contextual
// ============================================
const features = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: "Signal-to-Revenue Tracking",
    description: "Watch ideas flow from raw Reddit signals to validated revenue in real-time.",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    title: "Velocity Metrics",
    description: "Measure time from idea to first paying customer. Optimize your validation speed.",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "Conversion Funnels",
    description: "See exactly where prospects drop off. Optimize landing pages with AI suggestions.",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: "Revenue Attribution",
    description: "Know exactly which signals led to paying customers. Double down on what works.",
  },
];

// ============================================
// INSIGHTS SECTION
// ============================================
export function Insights() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="relative py-24 bg-[#0A0A0B]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-20" />

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16">
          {/* Left: Content */}
          <div className="space-y-6">
            <motion.h2
              className="text-[32px] md:text-[38px] font-medium text-white tracking-[-0.02em] leading-[1.15]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              From signal to
              <br />
              revenue in weeks
            </motion.h2>

            <motion.p
              className="text-[15px] text-white/50 leading-[1.7]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Track every step of your validation journey.
              <br />
              <span className="text-white/70">Real-time funnel analytics</span> show exactly where
              <br />
              ideas convert to paying customers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button className="h-10 px-5 bg-[#18181B] border border-white/[0.08] rounded-lg text-[14px] text-white font-medium inline-flex items-center gap-2 hover:bg-[#1f1f23] transition-colors">
                View demo
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </motion.div>
          </div>

          {/* Right: Validation Funnel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ValidationFunnelVisualization />
          </motion.div>
        </div>

        {/* Feature Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 mt-20 pt-12 border-t border-white/[0.06]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {features.map((feature, i) => (
            <div key={i}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white/40">{feature.icon}</span>
                <h3 className="text-[14px] font-medium text-white">{feature.title}</h3>
              </div>
              <p className="text-[13px] text-white/40 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
