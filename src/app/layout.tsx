import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ClerkProviderWrapper } from "@/lib/clerk";
import { ConvexProviderWrapper } from "@/lib/convex";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Found3r - AI Cofounder Platform",
  description: "Production-grade AI cofounder platform for building startups with autonomous agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body 
        className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable} font-sans antialiased`}
        style={{ 
          backgroundColor: '#0B0C0E',
          color: '#EDEDED',
          minHeight: '100vh'
        }}
      >
        <ClerkProviderWrapper>
          <ConvexProviderWrapper>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'hsl(240 6% 10%)',
                  color: 'hsl(0 0% 98%)',
                  border: '1px solid hsl(240 3.7% 15.9%)',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                },
                success: {
                  iconTheme: {
                    primary: 'hsl(160 84% 39%)',
                    secondary: 'hsl(240 6% 10%)',
                  },
                },
                error: {
                  iconTheme: {
                    primary: 'hsl(0 84% 60%)',
                    secondary: 'hsl(240 6% 10%)',
                  },
                },
              }}
            />
          </ConvexProviderWrapper>
        </ClerkProviderWrapper>
      </body>
    </html>
  );
}
