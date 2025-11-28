"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

export function F3EngineGrid() {
  return (
    <section className="relative py-24 px-6" style={{ backgroundColor: '#0B0C0E' }}>
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-[32px] font-medium text-[#EDEDED] mb-3 tracking-tight">The Found3r Engine</h2>
          <p className="text-[14px] text-[#8A8F98]">Four autonomous systems working in parallel</p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Deep Market Research */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SpotlightCard className="p-6">
            <h3 className="text-[15px] font-medium text-[#EDEDED] mb-4">Deep Market Research</h3>
            
            {/* Heatmap Visual */}
            <div className="relative h-[200px] flex items-center justify-center bg-black/20 rounded-lg overflow-hidden">
              {/* World Map Dots Grid */}
              <div className="grid grid-cols-16 gap-1 opacity-30">
                {Array.from({ length: 128 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-zinc-700 rounded-sm" />
                ))}
              </div>
              
              {/* Hotspots */}
              {/* SF */}
              <div className="absolute left-[20%] top-[40%] w-12 h-12 bg-indigo-500/40 rounded-full blur-xl" />
              <div className="absolute left-[20%] top-[40%] w-2 h-2 bg-white rounded-full" />
              
              {/* NY */}
              <div className="absolute left-[35%] top-[35%] w-12 h-12 bg-indigo-500/40 rounded-full blur-xl" />
              <div className="absolute left-[35%] top-[35%] w-2 h-2 bg-white rounded-full" />
              
              {/* London */}
              <div className="absolute right-[30%] top-[30%] w-12 h-12 bg-indigo-500/40 rounded-full blur-xl" />
              <div className="absolute right-[30%] top-[30%] w-2 h-2 bg-white rounded-full" />
              
              {/* Floating Label */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2">
                  <p className="text-[12px] text-[#EDEDED] font-medium">High Intent Signal detected in r/SaaS</p>
                </div>
              </div>
            </div>
            
            {/* Footer Stats */}
            <div className="mt-4 pt-3 border-t border-white/5">
              <p className="text-[14px] text-[#8A8F98]">
                <span className="text-[#EDEDED] font-medium">3 markets</span> showing demand density
              </p>
            </div>
            </SpotlightCard>
          </motion.div>

          {/* Card 2: Competitor Recon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SpotlightCard className="p-6">
            <h3 className="text-[15px] font-medium text-[#EDEDED] mb-4">Competitor Recon</h3>
            
            {/* Comparison Table */}
            <div className="space-y-2">
              {/* Header Row */}
              <div className="grid grid-cols-4 gap-2 pb-2 border-b border-white/5">
                <div className="text-[12px] text-[#8A8F98] font-medium">Name</div>
                <div className="text-[12px] text-[#8A8F98] font-medium">Pricing</div>
                <div className="text-[12px] text-[#8A8F98] font-medium">Gap</div>
                <div className="text-[12px] text-[#8A8F98] font-medium">Status</div>
              </div>
              
              {/* Competitor A */}
              <div className="grid grid-cols-4 gap-2 py-2 bg-white/[0.02] rounded px-2">
                <div className="text-[14px] text-[#EDEDED]">Comp A</div>
                <div className="text-[14px] text-[#8A8F98]">$99/mo</div>
                <div className="text-[14px] text-[#8A8F98]">Mobile</div>
                <div className="text-[12px] text-green-400">Stable</div>
              </div>
              
              {/* Competitor B - High Churn */}
              <div className="grid grid-cols-4 gap-2 py-2 bg-red-500/5 border border-red-500/20 rounded px-2">
                <div className="text-[14px] text-[#EDEDED]">Comp B</div>
                <div className="text-[14px] text-[#8A8F98]">$149/mo</div>
                <div className="text-[14px] text-[#8A8F98]">Support</div>
                <div className="text-[12px] text-red-400 font-medium">High Churn</div>
              </div>
              
              {/* Competitor C */}
              <div className="grid grid-cols-4 gap-2 py-2 bg-white/[0.02] rounded px-2">
                <div className="text-[14px] text-[#EDEDED]">Comp C</div>
                <div className="text-[14px] text-[#8A8F98]">$79/mo</div>
                <div className="text-[14px] text-[#8A8F98]">API</div>
                <div className="text-[12px] text-yellow-400">Growing</div>
              </div>
            </div>
            
            {/* Footer Insight */}
            <div className="mt-4 pt-3 border-t border-white/5">
              <p className="text-[14px] text-[#8A8F98]">
                <span className="text-[#EDEDED] font-medium">Market gap</span> identified in support quality
              </p>
            </div>
            </SpotlightCard>
          </motion.div>

          {/* Card 3: MVP Construction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <SpotlightCard className="p-6">
            <h3 className="text-[15px] font-medium text-[#EDEDED] mb-4">MVP Construction</h3>
            
            {/* Build Log Timeline */}
            <div className="space-y-3">
              {/* Event 1 */}
              <div className="flex items-start gap-3">
                <div className="text-[12px] text-[#8A8F98] font-mono w-12 flex-shrink-0">00:01</div>
                <div className="flex-1">
                  <p className="text-[14px] text-[#EDEDED]">Database Schema generated</p>
                  <p className="text-[12px] text-[#8A8F98] mt-0.5">Postgres</p>
                </div>
                <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0 mt-1.5" />
              </div>
              
              {/* Event 2 */}
              <div className="flex items-start gap-3">
                <div className="text-[12px] text-[#8A8F98] font-mono w-12 flex-shrink-0">00:05</div>
                <div className="flex-1">
                  <p className="text-[14px] text-[#EDEDED]">Auth implemented</p>
                  <p className="text-[12px] text-[#8A8F98] mt-0.5">Clerk</p>
                </div>
                <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0 mt-1.5" />
              </div>
              
              {/* Event 3 */}
              <div className="flex items-start gap-3">
                <div className="text-[12px] text-[#8A8F98] font-mono w-12 flex-shrink-0">00:12</div>
                <div className="flex-1">
                  <p className="text-[14px] text-[#EDEDED]">Stripe Connect integrated</p>
                  <p className="text-[12px] text-[#8A8F98] mt-0.5">Payments</p>
                </div>
                <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0 mt-1.5" />
              </div>
              
              {/* Event 4 - Deployed */}
              <div className="flex items-start gap-3 bg-green-500/5 border border-green-500/20 rounded-lg p-2 -mx-2">
                <div className="text-[12px] text-green-400 font-mono w-12 flex-shrink-0 font-medium">00:45</div>
                <div className="flex-1">
                  <p className="text-[14px] text-[#EDEDED] font-medium">Deployed to Production</p>
                  <p className="text-[12px] text-green-400 mt-0.5">Vercel</p>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0 mt-1.5 animate-pulse" />
              </div>
            </div>
            
            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-white/5">
              <p className="text-[14px] text-[#8A8F98]">
                <span className="text-[#EDEDED] font-medium">45 minutes</span> from idea to live app
              </p>
            </div>
            </SpotlightCard>
          </motion.div>

          {/* Card 4: Fake Door Validation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <SpotlightCard className="p-6">
            <h3 className="text-[15px] font-medium text-[#EDEDED] mb-4">Fake Door Validation</h3>
            
            {/* Conversion Graph */}
            <div className="relative h-[200px] bg-black/20 rounded-lg p-4">
              <svg viewBox="0 0 300 120" className="w-full h-full">
                {/* Grid Lines */}
                <line x1="0" y1="30" x2="300" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <line x1="0" y1="90" x2="300" y2="90" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                
                {/* Line Chart Path - Sharp Spike */}
                <motion.path
                  d="M 0,110 L 50,105 L 100,100 L 150,95 L 200,60 L 250,20 L 300,15"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                
                {/* Gradient Fill */}
                <defs>
                  <linearGradient id="validationFill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(99,102,241,0.2)" />
                    <stop offset="100%" stopColor="rgba(99,102,241,0)" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M 0,110 L 50,105 L 100,100 L 150,95 L 200,60 L 250,20 L 300,15 L 300,120 L 0,120 Z"
                  fill="url(#validationFill)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                
                {/* Data Point at Spike */}
                <circle cx="250" cy="20" r="3" fill="#6366f1" />
                
                {/* Spike Label */}
                <text x="250" y="10" textAnchor="middle" fill="#6366f1" fontSize="10" fontWeight="500">
                  142
                </text>
              </svg>
              
              {/* Trend Icon */}
              <div className="absolute top-4 right-4">
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
            </div>
            
            {/* Footer Label */}
            <div className="mt-4 pt-3 border-t border-white/5">
              <p className="text-[14px] text-[#EDEDED] font-medium mb-1">142 signups in 24h</p>
              <p className="text-[12px] text-green-400">Validation Threshold Met</p>
            </div>
            </SpotlightCard>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
