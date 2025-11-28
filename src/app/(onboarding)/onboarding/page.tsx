"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { ArrowRight, ArrowLeft, Loader2, User, Cpu, Fuel, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = 'force-dynamic';

const ROLES = [
  { id: "technical", label: "Technical Founder", desc: "Build the product" },
  { id: "product", label: "Product Manager", desc: "Define the vision" },
  { id: "business", label: "Business Founder", desc: "Drive growth" },
  { id: "designer", label: "Designer Founder", desc: "Craft experiences" },
];

const SKILLS = [
  "React", "Node.js", "Python", "TypeScript", "SQL", "AWS",
  "No-Code", "Figma", "Sales", "Marketing", "SEO", "Copywriting",
  "Finance", "Legal", "Operations", "Data Analysis",
];

const BUDGET_SNAPS = [
  { value: 0, label: "$0" },
  { value: 1000, label: "$1K" },
  { value: 5000, label: "$5K" },
  { value: 10000, label: "$10K+" },
];

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasSynced = useRef(false);

  const completeOnboarding = useMutation(api.users.completeOnboarding);
  const syncUser = useMutation(api.users.syncUser);
  
  const convexUser = useQuery(
    api.users.getCurrent,
    isLoaded && user ? {} : "skip"
  );

  // Form state
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [budget, setBudget] = useState(1000);
  const [isFullTime, setIsFullTime] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      router.replace("/sign-in");
      return;
    }
    if (convexUser === null && !hasSynced.current) {
      hasSynced.current = true;
      syncUser().catch(console.error);
      return;
    }
    if (convexUser?.onboardingCompleted) {
      router.replace("/dashboard");
    }
    // Pre-fill name from Clerk
    if (user.fullName && !name) {
      setName(user.fullName);
    }
  }, [isLoaded, user, convexUser, router, syncUser, name]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = async () => {
    if (!user || !convexUser) return;
    if (!name.trim() || !role || selectedSkills.length === 0) {
      toast.error("Please complete all steps");
      return;
    }

    setIsSubmitting(true);
    try {
      const budgetLabel = BUDGET_SNAPS.find(b => b.value === budget)?.label || "$1K";
      const timeConstraint = isFullTime ? "Full Time" : "Part Time";
      
      await completeOnboarding({
        skills: [role, ...selectedSkills],
        budget: budgetLabel,
        constraints: `${timeConstraint} commitment`,
      });

      toast.success("Founder OS initialized!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to initialize:", error);
      toast.error("Initialization failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  // Validation per step
  const canProceed = () => {
    if (step === 1) return name.trim() && role;
    if (step === 2) return selectedSkills.length > 0;
    return true;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090B] px-4 py-10">
      <div className="relative z-10 w-full max-w-md">
        
        {/* Header */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-[18px] font-medium text-white/90 mb-1">
            Set up your profile
          </h1>
          <p className="text-[13px] text-white/40">
            Step {step} of {totalSteps}
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  "flex-1 h-1 rounded-full transition-all duration-300",
                  step >= s ? "bg-white" : "bg-[#27272A]"
                )}
              />
            ))}
          </div>
        </div>

        {/* Main Card */}
        <motion.div 
          className="bg-[#18181B] border border-[#27272A] rounded-lg p-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Identity */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15 }}
                className="space-y-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-[#27272A] flex items-center justify-center">
                    <User className="w-4 h-4 text-white/50" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-white/80">Identity</p>
                    <p className="text-[11px] text-white/40">Who are you?</p>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-white/40 mb-2">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full h-10 px-3 bg-[#27272A]/50 border border-[#3F3F46] rounded-md text-[13px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#52525B] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-white/40 mb-2">Role</label>
                  <div className="grid grid-cols-2 gap-2">
                    {ROLES.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setRole(r.id)}
                        className={cn(
                          "p-3 rounded-md text-left transition-all duration-150",
                          role === r.id
                            ? "bg-white text-black"
                            : "bg-[#27272A]/50 border border-[#3F3F46] text-white/70 hover:border-[#52525B]"
                        )}
                      >
                        <p className="text-[12px] font-medium">{r.label}</p>
                        <p className={cn("text-[11px]", role === r.id ? "text-black/60" : "text-white/40")}>
                          {r.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Skills */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-md bg-[#27272A] flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-white/50" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-white/80">Skills</p>
                    <p className="text-[11px] text-white/40">Select your expertise</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-[11px] font-medium transition-all duration-150",
                        selectedSkills.includes(skill)
                          ? "bg-white text-black"
                          : "bg-[#27272A]/50 border border-[#3F3F46] text-white/50 hover:border-[#52525B]"
                      )}
                    >
                      {skill}
                    </button>
                  ))}
                </div>

                {selectedSkills.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[#27272A]">
                    <p className="text-[11px] text-white/40">
                      {selectedSkills.length} selected
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 3: Constraints */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15 }}
                className="space-y-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-[#27272A] flex items-center justify-center">
                    <Fuel className="w-4 h-4 text-white/50" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-white/80">Resources</p>
                    <p className="text-[11px] text-white/40">Your constraints</p>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-white/40 mb-3">Budget</label>
                  <div className="flex gap-2">
                    {BUDGET_SNAPS.map((snap) => (
                      <button
                        key={snap.value}
                        onClick={() => setBudget(snap.value)}
                        className={cn(
                          "flex-1 py-2 rounded-md text-[12px] font-medium transition-all duration-150",
                          budget === snap.value
                            ? "bg-white text-black"
                            : "bg-[#27272A]/50 border border-[#3F3F46] text-white/50 hover:border-[#52525B]"
                        )}
                      >
                        {snap.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-white/40 mb-3">Commitment</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsFullTime(false)}
                      className={cn(
                        "flex-1 py-2.5 rounded-md text-[12px] font-medium transition-all duration-150",
                        !isFullTime
                          ? "bg-white text-black"
                          : "bg-[#27272A]/50 border border-[#3F3F46] text-white/50 hover:border-[#52525B]"
                      )}
                    >
                      Part Time
                    </button>
                    <button
                      onClick={() => setIsFullTime(true)}
                      className={cn(
                        "flex-1 py-2.5 rounded-md text-[12px] font-medium transition-all duration-150",
                        isFullTime
                          ? "bg-white text-black"
                          : "bg-[#27272A]/50 border border-[#3F3F46] text-white/50 hover:border-[#52525B]"
                      )}
                    >
                      Full Time
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="h-9 px-3 text-[12px] font-medium text-white/40 hover:text-white/60 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className={cn(
                "h-9 px-4 text-[12px] font-medium rounded-md flex items-center gap-1.5 transition-all duration-150",
                canProceed()
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-[#27272A] text-white/30 cursor-not-allowed"
              )}
            >
              Continue
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={cn(
                "h-9 px-4 text-[12px] font-medium rounded-md flex items-center gap-2 transition-all duration-150",
                "bg-white text-black hover:bg-white/90",
                isSubmitting && "opacity-50 cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Complete
                  <Check className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
