"use client";

import { motion } from "framer-motion";
import { Search, Layout, DollarSign } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

export function F3ExecutionPipeline() {
  return (
    <section className="relative py-24 px-6 overflow-hidden" style={{ backgroundColor: '#0B0C0E' }}>
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-[32px] font-medium text-[#EDEDED] mb-3 tracking-tight">The Execution Pipeline</h2>
          <p className="text-[14px] text-[#8A8F98]">From market signal to paying customer in 72 hours</p>
        </div>

        {/* Pipeline Container */}
        <div className="relative flex items-center justify-center gap-8 md:gap-16">
          
          {/* Step 1: Discovery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10"
          >
            <SpotlightCard className="w-[280px] p-5">
              {/* Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Search className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-[15px] font-medium text-[#EDEDED]">Discovery</h3>
                  <p className="text-[12px] text-[#8A8F98]">Step 1</p>
                </div>
              </div>
              
              {/* Search Bar Visual */}
              <div className="mb-4">
                <div className="bg-black/40 border border-white/5 rounded-lg px-3 py-2 flex items-center gap-2">
                  <Search className="w-3 h-3 text-[#8A8F98]" />
                  <span className="text-[12px] text-[#8A8F98]">Scanning Hacker News...</span>
                </div>
              </div>
              
              {/* Trending Problems List */}
              <div className="space-y-2">
                <div className="text-[12px] text-[#8A8F98] mb-2 font-medium">Trending Problems</div>
                
                <div className="flex items-start gap-2 bg-white/[0.02] rounded px-2 py-1.5">
                  <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  <p className="text-[12px] text-[#EDEDED]">API rate limiting issues</p>
                </div>
                
                <div className="flex items-start gap-2 bg-white/[0.02] rounded px-2 py-1.5">
                  <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  <p className="text-[12px] text-[#EDEDED]">Expensive monitoring tools</p>
                </div>
                
                <div className="flex items-start gap-2 bg-white/[0.02] rounded px-2 py-1.5">
                  <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  <p className="text-[12px] text-[#EDEDED]">Complex deployment flows</p>
                </div>
              </div>
              
              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-white/5">
                <p className="text-[12px] text-[#8A8F98]">
                  <span className="text-[#EDEDED] font-medium">247</span> signals analyzed
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Connector 1: Discovery → Blueprint */}
          <div className="hidden md:block relative w-24 h-1">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 10">
              <motion.line
                x1="0"
                y1="5"
                x2="100"
                y2="5"
                stroke="rgba(99,102,241,0.3)"
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "linear" }}
              />
              {/* Animated Dot */}
              <motion.circle
                r="3"
                fill="#6366f1"
                initial={{ cx: 0, cy: 5 }}
                animate={{ cx: [0, 100] }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>

          {/* Step 2: Blueprint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative z-10"
          >
            <div className="f3-card w-[280px] p-5">
              {/* Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Layout className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-[15px] font-medium text-[#EDEDED]">Blueprint</h3>
                  <p className="text-[12px] text-[#8A8F98]">Step 2</p>
                </div>
              </div>
              
              {/* Wireframe Visual (Skeleton Loader Style) */}
              <div className="space-y-3 mb-4">
                {/* Header Skeleton */}
                <div className="space-y-2">
                  <div className="h-3 bg-white/30 rounded animate-pulse" style={{ width: '60%' }} />
                  <div className="h-2 bg-white/20 rounded animate-pulse" style={{ width: '80%' }} />
                </div>
                
                {/* Content Skeleton */}
                <div className="space-y-2">
                  <div className="h-16 bg-white/30 rounded animate-pulse" />
                  <div className="flex gap-2">
                    <div className="h-12 bg-white/25 rounded animate-pulse flex-1" />
                    <div className="h-12 bg-white/25 rounded animate-pulse flex-1" />
                  </div>
                </div>
                
                {/* Button Skeleton */}
                <div className="h-8 bg-indigo-500/40 rounded animate-pulse" style={{ width: '50%' }} />
              </div>
              
              {/* Status */}
              <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg px-3 py-2">
                <p className="text-[12px] text-purple-400 font-medium">Generating UI/UX specs</p>
              </div>
              
              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-white/5">
                <p className="text-[12px] text-[#8A8F98]">
                  <span className="text-[#EDEDED] font-medium">12</span> components designed
                </p>
              </div>
            </div>
          </motion.div>

          {/* Connector 2: Blueprint → Launch */}
          <div className="hidden md:block relative w-24 h-1">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 10">
              <motion.line
                x1="0"
                y1="5"
                x2="100"
                y2="5"
                stroke="rgba(99,102,241,0.3)"
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1, repeat: Infinity, ease: "linear" }}
              />
              {/* Animated Dot */}
              <motion.circle
                r="3"
                fill="#6366f1"
                initial={{ cx: 0, cy: 5 }}
                animate={{ cx: [0, 100] }}
                transition={{ duration: 2, delay: 1, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>

          {/* Step 3: Launch */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative z-10"
          >
            <SpotlightCard 
              className="w-[280px] p-5 relative"
              style={{
                boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.05), 0 0 0 1px rgba(34,197,94,0.2), 0 0 20px rgba(34,197,94,0.1)'
              }}
            >
              {/* Green Glow Border Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-green-500/10 to-transparent pointer-events-none" />
              
              {/* Header */}
              <div className="relative flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h3 className="text-[15px] font-medium text-[#EDEDED]">Launch</h3>
                  <p className="text-[12px] text-[#8A8F98]">Step 3</p>
                </div>
              </div>
              
              {/* Stripe Dashboard Notification */}
              <div className="relative mb-4">
                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                  {/* Stripe Logo Placeholder */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded bg-indigo-500/20 flex items-center justify-center">
                      <span className="text-[10px] text-indigo-400 font-bold">S</span>
                    </div>
                    <span className="text-[12px] text-[#8A8F98]">Stripe Dashboard</span>
                  </div>
                  
                  {/* Notification Content */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] text-[#EDEDED] font-medium">New Customer</span>
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    </div>
                    <div className="text-[24px] font-medium text-green-400">$29.00</div>
                    <div className="text-[12px] text-[#8A8F98]">Pro Plan • Monthly</div>
                  </div>
                </div>
              </div>
              
              {/* Success Badge */}
              <div className="relative bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-2">
                <p className="text-[12px] text-green-400 font-medium">First revenue generated</p>
              </div>
              
              {/* Footer */}
              <div className="relative mt-4 pt-3 border-t border-white/5">
                <p className="text-[12px] text-[#8A8F98]">
                  <span className="text-[#EDEDED] font-medium">72 hours</span> from idea to revenue
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

        </div>

        {/* Timeline Indicator */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <div className="text-[12px] text-[#8A8F98]">Average completion time:</div>
          <div className="text-[14px] text-[#EDEDED] font-medium">72 hours</div>
        </div>

      </div>
    </section>
  );
}
