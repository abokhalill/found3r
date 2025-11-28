"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Search,
  TestTube,
  FileText,
  Rocket,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const NAV_ITEMS = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    href: "/dashboard",
  },
  {
    icon: Search,
    label: "Discovery",
    href: "/dashboard/discovery",
  },
  {
    icon: TestTube,
    label: "Validation",
    href: "/dashboard/validation",
  },
  {
    icon: FileText,
    label: "Blueprint",
    href: "/dashboard/blueprint",
  },
  {
    icon: Rocket,
    label: "Launch",
    href: "/dashboard/launch",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/dashboard/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      className="h-screen bg-background border-r border-border flex flex-col"
      initial={false}
      animate={{ width: collapsed ? 72 : 220 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-3 border-b border-border">
        {!collapsed && (
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">F3</span>
            </div>
            <span className="text-foreground font-semibold text-sm tracking-tight">Found3r</span>
          </motion.div>
        )}
        
        {collapsed && (
          <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center mx-auto">
            <span className="text-primary-foreground font-bold text-xs">F3</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="space-y-0.5 px-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const isDisabled = (item as any).disabled;

            return (
              <Link
                key={item.href}
                href={isDisabled ? "#" : item.href}
                className={`
                  flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-all duration-150 text-sm
                  ${isActive ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50 border border-transparent"}
                  ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                  ${collapsed ? "justify-center" : ""}
                `}
                onClick={(e) => {
                  if (isDisabled) e.preventDefault();
                }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium tracking-tight">{item.label}</span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-3">
        <div className={`flex items-center gap-2.5 ${collapsed ? "justify-center" : ""}`}>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-7 h-7",
              },
            }}
          />
          {!collapsed && (
            <motion.div
              className="flex-1 min-w-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-xs font-medium text-foreground truncate">Account</p>
              <p className="text-[10px] text-muted-foreground">Manage settings</p>
            </motion.div>
          )}
        </div>
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full mt-3 p-1.5 rounded-md border border-border bg-secondary/50 hover:bg-secondary hover:border-white/20 text-muted-foreground hover:text-foreground transition-all duration-150 flex items-center justify-center"
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </motion.aside>
  );
}
