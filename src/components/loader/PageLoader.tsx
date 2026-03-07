"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * PageLoader Component
 * Displays a loading screen with spinner before the entire page loads
 * Automatically fades out when the page is ready
 * 
 * 🔴 DEBUG MODE: Set DEBUG_MODE to true to keep loader visible for testing
 */

// ========================================
// 🔴 DEBUG CONTROL - Change this value
// ========================================
const DEBUG_MODE = false; // Set to true to keep loader visible for debugging
// ========================================

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Skip auto-hide if DEBUG_MODE is enabled
    if (DEBUG_MODE) {
      console.log("🔴 DEBUG MODE: PageLoader will stay visible");
      return;
    }

    // Wait for the page to be fully loaded
    const handleLoad = () => {
      // Start fade out animation
      setFadeOut(true);
      
      // Remove loader after animation completes
      setTimeout(() => {
        setIsLoading(false);
      }, 500); // Match this with CSS transition duration
    };

    // Check if page is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // In DEBUG_MODE, always show the loader
  if (!isLoading && !DEBUG_MODE) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: theme === "dark" 
          ? "linear-gradient(135deg, #000000 0%, #0a0a0a 100%)" 
          : "linear-gradient(135deg, #fefffe 0%, #f8fdf8 100%)",
      }}
      onClick={DEBUG_MODE ? () => {
        console.log("🔴 DEBUG MODE: Click detected, but loader stays visible. Set DEBUG_MODE = false to enable auto-hide.");
      } : undefined}
    >
      {/* Debug Mode Indicator */}
      {DEBUG_MODE && (
        <div
          className="fixed top-4 right-4 px-4 py-2 rounded-lg border-2"
          style={{
            background: "rgba(255, 0, 0, 0.9)",
            borderColor: "#ff0000",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: "monospace",
            boxShadow: "0 0 20px rgba(255, 0, 0, 0.5)",
            zIndex: 100000,
          }}
        >
          🔴 DEBUG MODE ACTIVE
        </div>
      )}
      
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8 animate-pulse">
          <Image
            src="/images/Parvati's Lap - Luxury Hostel & Villa - logo-updated.png"
            alt="Parvati's Lap - Luxury Hostel & Villa logo (Kasol, Parvati Valley)"
            width={96}
            height={96}
            className="mx-auto mb-4"
            style={{ filter: theme === "dark" ? "brightness(1.2)" : "none" }}
            priority
          />
          <h1
            className="text-3xl md:text-4xl font-light tracking-widest"
            style={{
              color: theme === "dark" ? "#e6f4e6" : "#1a2e1a",
            }}
          >
            PARVATI&apos;S LAP
          </h1>
          <p
            className="text-sm md:text-base font-light tracking-wide mt-2"
            style={{
              color: theme === "dark" ? "#9fb3a0" : "#4a6b4a",
            }}
          >
            Loading your Himalayan experience...
          </p>
        </div>

        {/* Spinner */}
        <div className="relative w-16 h-16 mx-auto">
          <div
            className="absolute inset-0 rounded-full animate-spin"
            style={{
              border: `3px solid ${theme === "dark" ? "rgba(57, 255, 20, 0.2)" : "rgba(154, 173, 122, 0.2)"}`,
              borderTopColor: theme === "dark" ? "#39ff14" : "#808000",
            }}
          ></div>
        </div>

        {/* Optional: Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <div
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              backgroundColor: theme === "dark" ? "#39ff14" : "#808000",
              animationDelay: "0ms",
            }}
          ></div>
          <div
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              backgroundColor: theme === "dark" ? "#39ff14" : "#808000",
              animationDelay: "150ms",
            }}
          ></div>
          <div
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              backgroundColor: theme === "dark" ? "#39ff14" : "#808000",
              animationDelay: "300ms",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

/**
 * ========================================
 * 🔴 DEBUG MODE INSTRUCTIONS
 * ========================================
 * 
 * To enable debug mode and keep the loader visible:
 * 1. Change line 18: const DEBUG_MODE = true;
 * 2. Save the file
 * 3. The loader will stay visible on the page
 * 4. You'll see a red "DEBUG MODE ACTIVE" banner in top-right
 * 5. Check browser console for debug messages
 * 
 * To disable debug mode (normal behavior):
 * 1. Change line 18: const DEBUG_MODE = false;
 * 2. Save the file
 * 3. Loader will auto-hide after page loads (500ms)
 * 
 * ⚠️ REMEMBER: Set DEBUG_MODE = false before production!
 * ========================================
 */



