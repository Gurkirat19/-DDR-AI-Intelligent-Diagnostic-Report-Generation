import "./globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthProvider } from "@/components/AuthContext";
import AnimatedBackground from "@/components/AnimatedBackground";
import { LoaderScreen } from "@/components/LoaderScreen";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "DDR AI - Intelligent Diagnostic Report Generation",
  description: "AI-powered detailed diagnostic reports for property and thermal inspections. Transform raw data into actionable insights.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen relative">
        <AuthProvider>
          <AnimatedBackground />
          <Suspense fallback={<LoaderScreen message="Starting DDR AI" subtext="Preparing your workspace" />}>
            <AppShell>{children}</AppShell>
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
