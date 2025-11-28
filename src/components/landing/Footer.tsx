"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// ============================================
// SHINING BORDER BUTTON
// Animated conic gradient border
// ============================================
function ShiningButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link href={href} className="relative group">
      {/* Animated border */}
      <div className="absolute -inset-[2px] rounded-xl overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: "conic-gradient(from 0deg, transparent, #5E6AD2, #8B5CF6, #5E6AD2, transparent)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Button content */}
      <div className="relative h-14 px-8 bg-[#0B0B0E] rounded-xl flex items-center justify-center gap-2 group-hover:bg-[#0F0F12] transition-colors">
        {children}
      </div>
    </Link>
  );
}

// ============================================
// FOOTER
// Command Center style with massive CTA
// ============================================
export function Footer() {
  const footerLinks = {
    Product: ["Features", "Pricing", "Changelog", "Roadmap"],
    Company: ["About", "Blog", "Careers", "Press"],
    Resources: ["Documentation", "API Reference", "Community", "Support"],
    Legal: ["Privacy", "Terms", "Security"],
  };

  return (
    <footer className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#0C0C0D]" />
      
      {/* Radial glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
        style={{
          background: "radial-gradient(ellipse at center, rgba(94, 106, 210, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* CTA Section */}
        <div className="text-center mb-24">
          <motion.h2
            className="text-[32px] md:text-[44px] font-medium text-[#F7F8F8] tracking-[-0.025em] leading-[1.15]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to build
            <br />
            <span className="text-[#6B6F76]">something real?</span>
          </motion.h2>

          <motion.p
            className="text-[16px] text-[#9CA3AF] mt-6 max-w-lg mx-auto leading-[1.7]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Join the founders who ship faster than their competition.
          </motion.p>

          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ShiningButton href="/sign-up">
              <span className="text-[16px] font-semibold text-[#EDEDEF] tracking-[-0.01em]">
                Start Building
              </span>
              <svg className="w-5 h-5 text-[#EDEDEF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </ShiningButton>
          </motion.div>

          <motion.p
            className="text-[13px] text-[#8A8F98] mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Free to start. No credit card required.
          </motion.p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.04] mb-16" />

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#5E6AD2] flex items-center justify-center">
                <span className="text-[14px] font-bold text-white">F3</span>
              </div>
              <span className="text-[16px] font-semibold text-[#EDEDEF] tracking-[-0.01em]"></span>
            </div>
            <p className="text-[13px] text-[#8A8F98] leading-relaxed">
              
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[12px] text-[#8A8F98] uppercase tracking-[0.1em] font-medium mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link 
                      href="#" 
                      className="text-[14px] text-[#8A8F98] hover:text-[#EDEDEF] transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.04]">
          <p className="text-[13px] text-[#8A8F98]">
            © 2024 Found3r. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-[#8A8F98] hover:text-[#EDEDEF] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </Link>
            <Link href="#" className="text-[#8A8F98] hover:text-[#EDEDEF] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
              </svg>
            </Link>
            <Link href="#" className="text-[#8A8F98] hover:text-[#EDEDEF] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
