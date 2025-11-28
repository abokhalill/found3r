"use client";

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C0C0D]">
      <div className="w-full max-w-[400px] px-6">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5E6AD2] to-[#8B5CF6] flex items-center justify-center">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-[22px] font-medium text-[#F7F8F8] text-center mb-8 tracking-[-0.01em]">
          Log in to Found3r
        </h1>

        <SignIn
          appearance={{
            variables: {
              colorPrimary: "#5E6AD2",
              colorBackground: "#0C0C0D",
              colorText: "#F7F8F8",
              colorTextSecondary: "#9CA3AF",
              borderRadius: "8px",
            },
            elements: {
              rootBox: "w-full flex justify-center",
              card: "shadow-none bg-transparent w-full p-0",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              formFieldLabel: "text-[#9CA3AF] text-[13px] font-normal mb-1.5",
              formFieldInput:
                "bg-[#1A1A1D] border border-white/[0.06] text-[#F7F8F8] placeholder:text-[#6B6F76] focus:border-[#5E6AD2] focus:ring-0 focus:outline-none text-[14px] h-11 rounded-lg px-3",
              footerActionText: "text-[#9CA3AF] text-[13px]",
              footerActionLink: "text-[#F7F8F8] hover:text-white font-medium",
              formButtonPrimary:
                "w-full bg-[#5E6AD2] text-white hover:bg-[#6B75D9] transition-all font-medium h-11 rounded-lg text-[14px]",
              socialButtonsBlockButton:
                "bg-[#1A1A1D] border border-white/[0.06] text-[#F7F8F8] hover:bg-[#222225] h-11 rounded-lg",
              socialButtonsBlockButtonText: "text-[13px] font-medium",
              dividerLine: "bg-white/[0.06]",
              dividerText: "text-[#6B6F76] text-[12px]",
              identityPreviewEditButton: "text-[#5E6AD2]",
              formFieldSuccessText: "text-emerald-400",
              formFieldErrorText: "text-red-400",
              alert: "bg-[#1A1A1D] border border-white/[0.06] text-[#F7F8F8]",
            },
          }}
          fallbackRedirectUrl="/onboarding"
        />

        {/* Footer */}
        <p className="text-center text-[13px] text-[#6B6F76] mt-8">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-[#F7F8F8] hover:text-white font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
