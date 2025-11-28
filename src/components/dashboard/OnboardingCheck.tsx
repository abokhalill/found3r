"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export function OnboardingCheck({ children }: { children: React.ReactNode }) {
  const { user, isLoaded: isClerkLoaded } = useUser();
  const router = useRouter();

  const createUser = useMutation(api.users.createUser);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const convexUser = useQuery(
    api.users.getCurrent,
    isClerkLoaded && user ? {} : "skip"
  );

  useEffect(() => {
    if (!isClerkLoaded) return;
    
    if (!user) {
      router.replace("/sign-in");
      return;
    }

    if (convexUser !== undefined && convexUser !== null && !convexUser.onboardingCompleted) {
      router.replace("/onboarding");
    }
  }, [isClerkLoaded, user, convexUser, router]);

  useEffect(() => {
    if (!isClerkLoaded || !user) return;
    if (convexUser !== null) return;
    if (isCreatingUser) return;

    setIsCreatingUser(true);
    createUser({
      clerkId: user.id,
      email: user.primaryEmailAddress?.emailAddress || `user-${user.id}@example.com`,
      name: user.fullName || undefined,
    })
      .catch((error) => {
        console.error("Failed to create Convex user from OnboardingCheck", error);
      })
      .finally(() => {
        setIsCreatingUser(false);
      });
  }, [isClerkLoaded, user, convexUser, isCreatingUser, createUser]);

  // Show loading state while checking
  if (!isClerkLoaded || convexUser === undefined || isCreatingUser) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not found in Convex, show error
  if (convexUser === null) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-slate-300 mb-4">
            Your account is being set up. This should only take a moment...
          </p>
        </div>
      </div>
    );
  }

  // Show redirecting state if onboarding not completed
  if (!convexUser.onboardingCompleted) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Redirecting to onboarding...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
