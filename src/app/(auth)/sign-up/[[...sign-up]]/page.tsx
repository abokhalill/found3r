"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0B0C0E]">
      <SignUp
        appearance={{
          baseTheme: dark,
          variables: { 
            colorPrimary: "#FFFFFF", 
            colorTextOnPrimaryBackground: "#000000",
            colorBackground: "#0B0C0E"
          },
          elements: {
            rootBox: "w-full flex justify-center",
            card: "shadow-none bg-transparent",
            header: "hidden",
            footer: "hidden"
          }
        }}
        forceRedirectUrl="/onboarding"
      />
    </div>
  );
}
