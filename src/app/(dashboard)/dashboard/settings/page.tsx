"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "react-hot-toast";
import { X, Loader2, User, Cpu, Fuel, Bell, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// FOUNDER SETTINGS - Linear-Style Sidebar Layout
// Industrial Design. High Density. No "Toy" UI.
// ============================================

const SKILLS = [
  "React", "Node.js", "Python", "TypeScript", "SQL", "AWS",
  "No-Code", "Figma", "Sales", "Marketing", "SEO", "Copywriting",
  "Finance", "Legal", "Operations", "Data Analysis",
];

const BUDGET_SNAPS = [
  { value: "$0", label: "$0", desc: "Bootstrap" },
  { value: "$1K", label: "$1K", desc: "Seed" },
  { value: "$5K", label: "$5K", desc: "Growth" },
  { value: "$10K+", label: "$10K+", desc: "Funded" },
];

const SECTIONS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "matrix", label: "Founder Matrix", icon: Cpu },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export default function SettingsPage() {
  const user = useQuery(api.users.getCurrent);
  const updateProfile = useMutation(api.users.updateProfile);
  
  const [activeSection, setActiveSection] = useState("profile");
  const [name, setName] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [budget, setBudget] = useState("$1K");
  const [constraints, setConstraints] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Load user data into form
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setSkills(user.skills || []);
      setBudget(user.budget || "$1K");
      setConstraints(user.constraints || "");
    }
  }, [user]);

  const toggleSkill = (skill: string) => {
    setSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  // Save changes
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile({
        name: name || undefined,
        skills,
        budget,
        constraints: constraints || undefined,
      });
      toast.success("Profile updated");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-[#8A8F98]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold tracking-tight text-white">Settings</h1>
          <p className="text-xs text-[#8A8F98] mt-1">Manage your Founder Matrix</p>
        </div>

        {/* Layout: Sidebar + Content */}
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-48 shrink-0">
            <nav className="space-y-1">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all",
                    activeSection === section.id
                      ? "bg-white/10 text-white"
                      : "text-[#8A8F98] hover:text-white hover:bg-white/5"
                  )}
                >
                  <section.icon className="w-4 h-4" />
                  {section.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            {/* Profile Section */}
            {activeSection === "profile" && (
              <div className="bg-[#0A0A0A] border border-white/5 rounded-lg p-6">
                <h2 className="text-sm font-medium text-white mb-6">Profile</h2>
                
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#8A8F98] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full h-10 px-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                    />
                  </div>

                  {/* Email (Read-only) */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#8A8F98] mb-2">
                      Email
                    </label>
                    <input
                      type="text"
                      value={user.email}
                      disabled
                      className="w-full h-10 px-3 bg-white/5 border border-white/5 rounded-lg text-sm text-[#8A8F98] cursor-not-allowed"
                    />
                  </div>

                  {/* Constraints */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#8A8F98] mb-2">
                      Constraints
                    </label>
                    <textarea
                      value={constraints}
                      onChange={(e) => setConstraints(e.target.value)}
                      placeholder="Time, budget, or other limitations..."
                      rows={3}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Founder Matrix Section */}
            {activeSection === "matrix" && (
              <div className="space-y-6">
                {/* Skills Grid */}
                <div className="bg-[#0A0A0A] border border-white/5 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-[#8A8F98]" />
                    </div>
                    <div>
                      <h2 className="text-sm font-medium text-white">Skills Matrix</h2>
                      <p className="text-[10px] text-[#8A8F98]">Select your capabilities</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {SKILLS.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={cn(
                          "px-3 py-2 rounded-md text-[11px] font-medium transition-all active:scale-95",
                          skills.includes(skill)
                            ? "bg-zinc-800 text-white border border-white/20"
                            : "bg-[#0A0A0A] text-[#8A8F98] border border-white/5 hover:border-white/10"
                        )}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>

                  {skills.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <p className="text-[10px] text-[#8A8F98]">
                        Active: <span className="text-white">{skills.join(", ")}</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Budget */}
                <div className="bg-[#0A0A0A] border border-white/5 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <Fuel className="w-4 h-4 text-[#8A8F98]" />
                    </div>
                    <div>
                      <h2 className="text-sm font-medium text-white">Budget</h2>
                      <p className="text-[10px] text-[#8A8F98]">Your runway for this venture</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {BUDGET_SNAPS.map((snap) => (
                      <button
                        key={snap.value}
                        onClick={() => setBudget(snap.value)}
                        className={cn(
                          "p-3 rounded-lg border text-center transition-all active:scale-95",
                          budget === snap.value
                            ? "bg-white text-black border-white"
                            : "bg-[#0A0A0A] border-white/10 text-white hover:border-white/20"
                        )}
                      >
                        <div className="text-sm font-medium">{snap.label}</div>
                        <div className={cn("text-[10px]", budget === snap.value ? "text-black/60" : "text-[#8A8F98]")}>
                          {snap.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === "notifications" && (
              <div className="bg-[#0A0A0A] border border-white/5 rounded-lg p-6">
                <h2 className="text-sm font-medium text-white mb-6">Notifications</h2>
                <div className="space-y-4">
                  {[
                    { label: "Agent Completions", desc: "Get notified when agents finish tasks" },
                    { label: "Weekly Digest", desc: "Summary of your validation progress" },
                    { label: "Market Alerts", desc: "New signals in your niche" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                      <div>
                        <p className="text-xs font-medium text-white">{item.label}</p>
                        <p className="text-[10px] text-[#8A8F98]">{item.desc}</p>
                      </div>
                      <button className="w-10 h-5 rounded-full bg-white/10 relative transition-colors hover:bg-white/20">
                        <div className="w-4 h-4 rounded-full bg-[#8A8F98] absolute left-0.5 top-0.5 transition-transform" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Billing Section */}
            {activeSection === "billing" && (
              <div className="bg-[#0A0A0A] border border-white/5 rounded-lg p-6">
                <h2 className="text-sm font-medium text-white mb-6">Billing</h2>
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-5 h-5 text-[#8A8F98]" />
                  </div>
                  <p className="text-xs text-[#8A8F98] mb-4">You're on the Free plan</p>
                  <button className="h-9 px-5 text-xs font-medium bg-white text-black hover:bg-white/90 rounded-md transition-all active:scale-95">
                    Upgrade to Pro
                  </button>
                </div>
              </div>
            )}

            {/* Save Button */}
            {(activeSection === "profile" || activeSection === "matrix") && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={cn(
                    "h-9 px-5 text-xs font-medium rounded-md flex items-center gap-2 transition-all active:scale-95",
                    isSaving
                      ? "bg-white/10 text-[#8A8F98] cursor-not-allowed"
                      : "bg-white text-black hover:bg-white/90"
                  )}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
