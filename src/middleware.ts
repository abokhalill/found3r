import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// ============================================
// WILDCARD SUBDOMAIN MIDDLEWARE
// Routes: legal-ai.found3r.dev → /sites/legal-ai
// ============================================

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/', 
  '/onboarding',
  '/api/webhooks(.*)',
  '/api/clerk/webhook',
  '/sites(.*)', // Public access to site renderer
  '/p(.*)',     // Legacy public pages
]);

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;
  
  // Get hostname (e.g. "legal-ai.found3r.dev")
  const hostname = req.headers.get("host") || "";

  // 1. Define the Root Domain
  // In Dev: "localhost:3000"
  // In Prod: "found3r.dev"
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

  // 2. Identify Subdomain
  // If hostname is "legal-ai.found3r.dev", currentHost is "legal-ai"
  // If hostname is "found3r.dev", currentHost is null/empty
  let currentHost: string | null = null;
  
  if (process.env.NODE_ENV === "production" && process.env.VERCEL === "1") {
    // Production: Extract subdomain from hostname
    if (hostname.endsWith(`.${rootDomain}`)) {
      currentHost = hostname.replace(`.${rootDomain}`, "");
    }
  } else {
    // Development: Handle localhost subdomains
    if (hostname.includes(".localhost")) {
      currentHost = hostname.split(".localhost")[0];
    }
  }

  // 3. Subdomain Routing Logic
  // If we have a subdomain AND it's not www or the root domain
  if (currentHost && currentHost !== "www" && currentHost !== rootDomain && currentHost !== "app") {
    
    // REWRITE the request to our internal renderer route
    // User sees: "legal-ai.found3r.dev"
    // Server renders: "app/sites/[slug]/page.tsx"
    // Preserve search params for tracking
    const rewriteUrl = new URL(`/sites/${currentHost}${url.pathname}${url.search}`, req.url);
    return NextResponse.rewrite(rewriteUrl);
  }

  // 4. Standard App Routing (Main Domain)
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
