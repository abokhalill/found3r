"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Zap, BarChart3, Rocket, Star, Check, Lock, Globe, Cpu, Layers,
  ArrowRight, Sparkles, CheckCircle2, AlertCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

// ============================================
// LANDING PAGE CONFIG TYPE
// ============================================
export interface LandingPageConfig {
  slug: string;
  hero: {
    badge?: string;
    headline: string;
    subheadline: string;
    cta: string;
    ctaSecondary?: string;
  };
  features: Array<{
    title: string;
    description: string;
    icon: "shield" | "zap" | "chart" | "rocket" | "star" | "check" | "lock" | "globe" | "cpu" | "layers";
  }>;
  socialProof?: {
    quote: string;
    author: string;
    role: string;
  };
  pricing?: {
    planName: string;
    price: string;
    period: string;
    features: string[];
  };
  theme: "dark" | "light";
}

// ============================================
// ICON MAPPER
// ============================================
const iconMap = {
  shield: Shield,
  zap: Zap,
  chart: BarChart3,
  rocket: Rocket,
  star: Star,
  check: Check,
  lock: Lock,
  globe: Globe,
  cpu: Cpu,
  layers: Layers,
};

// ============================================
// ANIMATION VARIANTS
// ============================================
const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

// ============================================
// SAAS V1 - APPLE-GRADE BENTO TEMPLATE
// High-Density Industrial Design
// ============================================
export default function SaaS_V1({ config }: { config: LandingPageConfig }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "duplicate">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const addSignup = useMutation(api.functions.waitlist.addSignup);
  const trackPageView = useMutation(api.functions.waitlist.trackPageView);

  // Track page view on mount
  useEffect(() => {
    if (config.slug) {
      trackPageView({ 
        slug: config.slug, 
        referrer: typeof window !== "undefined" ? document.referrer : undefined 
      }).catch(() => {});
    }
  }, [config.slug, trackPageView]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const result = await addSignup({
        slug: config.slug,
        email: email.trim(),
        source: "landing_page",
        referrer: typeof window !== "undefined" ? document.referrer : undefined,
      });

      if (result.duplicate) {
        setSubmitStatus("duplicate");
      } else {
        setSubmitStatus("success");
        setEmail("");
      }
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Grid Background - Visual Noise */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* Subtle Top Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] blur-[100px] pointer-events-none" />
      
      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-medium text-sm tracking-tight">{config.slug || "Product"}</span>
          </div>
          <button className="h-8 px-4 text-xs font-medium text-zinc-400 hover:text-white transition-colors">
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Badge */}
            {config.hero.badge && (
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  {config.hero.badge}
                </span>
              </motion.div>
            )}

            {/* Headline */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl font-semibold tracking-tighter text-white leading-[1.1] mb-5"
            >
              {config.hero.headline}
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-zinc-400 max-w-md mx-auto leading-relaxed mb-8"
            >
              {config.hero.subheadline}
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="max-w-sm mx-auto">
              <AnimatePresence mode="wait">
                {submitStatus === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2 h-10 px-6 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    You're on the list
                  </motion.div>
                ) : submitStatus === "duplicate" ? (
                  <motion.div
                    key="duplicate"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2 h-10 px-6 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400 text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Already signed up
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 h-10 px-4 bg-white/5 border border-white/10 rounded-lg text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white/20 transition-colors"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      type="submit"
                      className="bg-white text-black h-10 px-6 rounded-lg font-medium hover:bg-white/90 transition-all disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      ) : (
                        <>
                          {config.hero.cta}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Error message */}
              {submitStatus === "error" && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 text-xs text-red-400 flex items-center justify-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errorMessage}
                </motion.p>
              )}
            </motion.div>

            {/* Secondary CTA */}
            {config.hero.ctaSecondary && submitStatus === "idle" && (
              <motion.p variants={fadeInUp} className="mt-4 text-xs text-zinc-600">
                {config.hero.ctaSecondary}
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      {config.features && config.features.length > 0 && (
        <section className="relative z-10 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="grid grid-cols-3 gap-4"
            >
              {config.features.slice(0, 6).map((feature, i) => {
                const Icon = iconMap[feature.icon] || Zap;
                
                return (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.08] hover:border-white/15 transition-all duration-200"
                  >
                    {/* Icon */}
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                      <Icon className="w-4 h-4 text-zinc-500" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-sm font-medium text-white mb-1.5">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* Social Proof Section */}
      {config.socialProof && (
        <section className="relative z-10 py-24 border-t border-white/5">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {/* Quote */}
              <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-8 text-zinc-200">
                "{config.socialProof.quote}"
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0070F3] to-purple-600 flex items-center justify-center text-lg font-semibold">
                  {config.socialProof.author.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-medium">{config.socialProof.author}</p>
                  <p className="text-sm text-zinc-500">{config.socialProof.role}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {config.pricing && (
        <section className="relative z-10 py-24 border-t border-white/5">
          <div className="max-w-md mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-[#0070F3]/5 blur-xl -z-10" />
              
              {/* Plan Name */}
              <div className="text-center mb-6">
                <span className="inline-block px-3 py-1 bg-[#0070F3]/20 text-[#0070F3] text-xs font-medium rounded-full mb-4">
                  {config.pricing.planName}
                </span>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold">{config.pricing.price}</span>
                  <span className="text-zinc-500">/{config.pricing.period}</span>
                </div>
              </div>
              
              {/* Features */}
              <ul className="space-y-3 mb-8">
                {config.pricing.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-[#0070F3]/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[#0070F3]" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 bg-[#0070F3] hover:bg-[#0070F3]/90 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="relative z-10 py-32 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Ready to get started?
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-zinc-400 mb-8"
            >
              Join thousands of users who are already building the future.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold overflow-hidden group"
              >
                {/* Gradient Border */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#0070F3] via-purple-500 to-[#0070F3] p-[1.5px]">
                  <div className="w-full h-full rounded-[10px] bg-[#0A0A0A] group-hover:bg-[#0A0A0A]/90 transition-colors" />
                </div>
                <span className="relative z-10 flex items-center gap-2">
                  {config.hero.cta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#0070F3] to-purple-600 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm text-zinc-500">Built with Found3r</span>
          </div>
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
