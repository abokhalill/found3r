"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export function F3Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0B0C0E]/80 backdrop-blur-xl border-b border-white/5" : ""
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="text-[14px] font-bold text-white">F3</span>
          </div>
          <span className="text-[16px] font-medium text-[#EDEDED]">Found3r</span>
        </Link>

        {/* Center Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="/features" 
            className="text-[14px] text-[#8A8F98] hover:text-[#EDEDED] transition-colors"
          >
            Features
          </Link>
          <Link 
            href="/pricing" 
            className="text-[14px] text-[#8A8F98] hover:text-[#EDEDED] transition-colors"
          >
            Pricing
          </Link>
          <Link 
            href="/docs" 
            className="text-[14px] text-[#8A8F98] hover:text-[#EDEDED] transition-colors"
          >
            Docs
          </Link>
          <Link 
            href="/contact" 
            className="text-[14px] text-[#8A8F98] hover:text-[#EDEDED] transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Right CTA Button */}
        <div>
          <Link
            href="/sign-in"
            className="text-[14px] text-[#8A8F98] hover:text-[#EDEDED] transition-colors font-medium"
          >
            Log in
          </Link>
        </div>

      </div>
    </motion.nav>
  );
}
