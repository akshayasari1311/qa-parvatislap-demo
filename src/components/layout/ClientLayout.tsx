"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { PageLoader } from "@/components/loader/PageLoader";
import { ScreenResolutionDebug } from "@/components/debug/ScreenResolutionDebug"; // 🔴 DEBUG - Remove before production

/**
 * ClientLayout Component
 * Wraps the app with client-side providers and layout components
 * This separates client-side logic from the server-side RootLayout
 */
export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <PageLoader />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      
      {/* ==========================================
          🔴 DEBUG TOOL - SCREEN RESOLUTION DISPLAY
          Remove this line before production deployment
          ========================================== */}
      {/* <ScreenResolutionDebug /> */}
    </ThemeProvider>
  );
}

