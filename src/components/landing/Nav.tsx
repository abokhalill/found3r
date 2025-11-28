"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// ============================================
// NAV
// Linear-style minimal navigation
// ============================================
export function Nav() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-[#0C0C0D]/80 backdrop-blur-xl border-b border-white/[0.06]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#5E6AD2] flex items-center justify-center">
              <span className="text-[14px] font-bold text-white">F3</span>
            </div>
            <span className="text-[16px] font-semibold text-[#EDEDEF] tracking-[-0.01em]">Found3r</span>
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-[14px] text-[#8A8F98] hover:text-[#EDEDEF] transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-[14px] text-[#8A8F98] hover:text-[#EDEDEF] transition-colors">
              Pricing
            </Link>
            <Link href="#docs" className="text-[14px] text-[#8A8F98] hover:text-[#EDEDEF] transition-colors">
              Docs
            </Link>
            <Link href="#changelog" className="text-[14px] text-[#8A8F98] hover:text-[#EDEDEF] transition-colors">
              Changelog
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link 
              href="/sign-in" 
              className="text-[14px] text-[#8A8F98] hover:text-[#EDEDEF] transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="h-9 px-4 bg-[#EDEDEF] text-[#0B0B0E] rounded-lg font-medium text-[13px] tracking-[-0.01em] flex items-center hover:bg-white transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
