"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  LayoutDashboard, 
  FolderOpen, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bot,
  Zap
} from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/dashboard/projects", icon: FolderOpen },
  { name: "Agents", href: "/dashboard/agents", icon: Bot },
  { name: "Conversations", href: "/dashboard/conversations", icon: MessageSquare },
  { name: "Team", href: "/dashboard/team", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <motion.nav
      className={`${isCollapsed ? "w-20" : "w-64"} bg-slate-800/50 border-r border-slate-700 transition-all duration-300 relative`}
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-slate-900 font-bold text-sm">F3</span>
            </div>
            {!isCollapsed && (
              <motion.span
                className="text-white font-bold text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Found3r
              </motion.span>
            )}
          </Link>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-slate-400 hover:text-amber-400 p-1"
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>

        <div className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      : "text-slate-300 hover:text-amber-400 hover:bg-slate-700/50"
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-auto pt-8">
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-amber-400" />
              {!isCollapsed && (
                <motion.span
                  className="text-amber-400 text-sm font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Pro Plan
                </motion.span>
              )}
            </div>
            {!isCollapsed && (
              <motion.p
                className="text-slate-400 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Unlimited agents and projects
              </motion.p>
            )}
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-700">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-300 hover:text-amber-400 hover:bg-slate-700/50 p-2"
              >
                <Avatar className="w-6 h-6 mr-3">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback className="bg-amber-500/20 text-amber-400 text-xs">
                    {user?.firstName?.[0] || user?.emailAddresses[0]?.emailAddress[0]}
                  </AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <motion.div
                    className="text-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-sm font-medium text-white truncate">
                      {user?.firstName || user?.emailAddresses[0]?.emailAddress}
                    </div>
                    <div className="text-xs text-slate-400 truncate">
                      {user?.emailAddresses[0]?.emailAddress}
                    </div>
                  </motion.div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
              <DropdownMenuItem onClick={handleSignOut} className="text-slate-300 hover:text-amber-400">
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.nav>
  );
}
