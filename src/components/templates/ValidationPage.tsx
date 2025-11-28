"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Zap, BarChart3, Rocket, Star, Check, Lock, Globe, Cpu, Layers,
  ArrowRight, Sparkles, CheckCircle2, AlertCircle, Loader2, X, ArrowDown
} from "lucide-react";
import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

// ============================================
// V2 VALIDATION PAGE - Pure Conversion Template
// No pricing. Problem/Solution framework.
// bg-[#050505], text-zinc-300, border-white/10
// ============================================

export interface ValidationPageConfig {
  slug: string;
  hero: {
    badge?: string;
    headline: string;
    subheadline: string;
    cta: string;
    ctaSecondary?: string;
  };
  problem?: {
    oldWay: string;
    newWay: string;
  };
  features: Array<{
    title: string;
    description: string;
    icon: "shield" | "zap" | "chart" | "rocket" | "star" | "check" | "lock" | "globe" | "cpu" | "layers";
  }>;
  socialProof?: {
    logos?: string[];
    quote?: string;
    author?: string;
    role?: string;
  };
  theme: "dark" | "light";
}

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

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

interface ValidationPageProps {
  config: ValidationPageConfig;
  projectId?: Id<"projects">;
}

export default function ValidationPage({ config, projectId }: ValidationPageProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "duplicate">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const captureEmail = useMutation(api.analytics.captureEmail);
  const trackView = useMutation(api.analytics.trackView);

  // Track page view on mount
  useEffect(() => {
    if (projectId) {
      trackView({ projectId }).catch(() => {});
    }
  }, [projectId, trackView]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !projectId) return;

    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const result = await captureEmail({
        projectId,
        email: email.trim(),
        source: "validation_page",
      });

      if (result.duplicate) {
        setStatus("duplicate");
      } else {
        setStatus("success");
        setEmail("");
      }
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fake company logos for social proof
  const fakeLogos = ["Acme Inc", "TechCorp", "StartupXYZ", "InnovateCo", "FutureLabs"];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans antialiased">
      {/* Subtle noise texture */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

      {/* Navigation - Minimal */}
      <nav className="relative z-50 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-black" />
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-white">{config.slug || "Product"}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
            className="h-8 px-4 bg-white text-black rounded-lg text-[13px] font-medium hover:bg-white/90 transition-all"
          >
            Get Early Access
          </motion.button>
        </div>
      </nav>

      {/* Hero Section - Big & Bold */}
      <section className="relative z-10 pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            {/* Badge */}
            {config.hero.badge && (
              <motion.div variants={fadeInUp} className="mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[13px] font-medium text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {config.hero.badge}
                </span>
              </motion.div>
            )}

            {/* Headline - Massive */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-8"
            >
              {config.hero.headline}
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-zinc-400 max-w-xl mx-auto leading-relaxed mb-12"
            >
              {config.hero.subheadline}
            </motion.p>

            {/* Email Capture Form - Prominent */}
            <motion.div variants={fadeInUp} id="signup" className="max-w-md mx-auto">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center justify-center gap-3 h-14 px-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-semibold">You're on the list!</span>
                  </motion.div>
                ) : status === "duplicate" ? (
                  <motion.div
                    key="duplicate"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center justify-center gap-3 h-14 px-6 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-400"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-semibold">Already signed up!</span>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="flex gap-3"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 h-14 px-5 bg-white/5 border border-white/10 rounded-2xl text-[15px] placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-all"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      type="submit"
                      className="h-14 px-8 bg-white text-black rounded-2xl font-semibold text-[15px] hover:bg-white/90 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          {config.hero.cta}
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>

              {status === "error" && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-sm text-red-400 flex items-center justify-center gap-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errorMessage}
                </motion.p>
              )}

              {config.hero.ctaSecondary && status === "idle" && (
                <motion.p variants={fadeInUp} className="mt-4 text-[13px] text-zinc-500">
                  {config.hero.ctaSecondary}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-zinc-600"
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* Social Proof - Trusted By */}
      <section className="relative z-10 py-12 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-center text-[12px] uppercase tracking-widest text-zinc-600 mb-8">Trusted by teams at</p>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {(config.socialProof?.logos || fakeLogos).map((logo, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-[15px] font-medium text-zinc-600 grayscale"
              >
                {logo}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution - 2 Column Grid */}
      {config.problem && (
        <section className="relative z-10 py-20 border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* The Old Way */}
              <motion.div
                variants={fadeInUp}
                className="p-8 bg-red-500/5 border border-red-500/10 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <X className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-red-400">The Old Way</h3>
                </div>
                <p className="text-zinc-300 leading-relaxed">{config.problem.oldWay}</p>
              </motion.div>

              {/* The New Way */}
              <motion.div
                variants={fadeInUp}
                className="p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-emerald-400">The New Way</h3>
                </div>
                <p className="text-zinc-300 leading-relaxed">{config.problem.newWay}</p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Features Grid */}
      {config.features && config.features.length > 0 && (
        <section className="relative z-10 py-20 border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-16"
            >
              Everything you need
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-6"
            >
              {config.features.slice(0, 6).map((feature, i) => {
                const Icon = iconMap[feature.icon] || Zap;
                
                return (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="group p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-[17px] font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[15px] text-zinc-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* Final CTA - Simple */}
      <section className="relative z-10 py-24 border-t border-white/10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold tracking-tight mb-6">
              Get Early Access
            </h2>
            <p className="text-lg text-zinc-400 mb-10">
              Join the waitlist and be the first to know when we launch.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-2xl text-lg font-semibold hover:bg-white/90 transition-all"
            >
              {config.hero.cta}
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="relative z-10 border-t border-white/10 py-8">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-black" />
            </div>
            <span className="text-[13px] text-zinc-500">Built with Found3r</span>
          </div>
          <p className="text-[13px] text-zinc-600">
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
