"use client";

import { useEffect, useState } from "react";

/**
 * ScreenResolutionDebug Component
 * Displays current screen resolution and breakpoint information
 * FOR DEBUGGING ONLY - Remove before production deployment
 */
export function ScreenResolutionDebug() {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    breakpoint: "",
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      let breakpoint = "";
      if (width < 640) breakpoint = "xs (< 640px)";
      else if (width < 768) breakpoint = "sm (640px - 768px)";
      else if (width < 1024) breakpoint = "md (768px - 1024px)";
      else if (width < 1280) breakpoint = "lg (1024px - 1280px)";
      else if (width < 1536) breakpoint = "xl (1280px - 1536px)";
      else if (width < 2560) breakpoint = "2xl (1536px - 2560px)";
      else breakpoint = "3xl (≥ 2560px)";

      setDimensions({ width, height, breakpoint });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const isUltraWide = dimensions.width >= 2560;
  const isMobile = dimensions.width < 768;

  return (
    <div
      className="fixed bottom-4 left-4 z-[99999] pointer-events-none"
      style={{
        fontFamily: "monospace",
      }}
    >
      <div
        className={`rounded-xl shadow-2xl ${isUltraWide ? 'px-8 py-6 border-4 rounded-2xl' : isMobile ? 'px-3 py-2 border-2' : 'px-4 py-3 border-2'}`}
        style={{
          background: "rgba(0, 0, 0, 0.95)",
          borderColor: "#39ff14",
          boxShadow: isUltraWide ? "0 0 40px rgba(57, 255, 20, 0.5)" : "0 0 25px rgba(57, 255, 20, 0.4)",
        }}
      >
        <div
          className="font-bold"
          style={{ 
            color: "#39ff14",
            fontSize: isUltraWide ? "28px" : "12px",
            marginBottom: isUltraWide ? "16px" : "8px"
          }}
        >
          🔍 SCREEN DEBUG
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: isUltraWide ? "12px" : "4px" }}>
          <div style={{ color: "#ffffff" }}>
            <span style={{ color: "#9fb3a0", fontSize: isUltraWide ? "20px" : "12px" }}>Width:</span>{" "}
            <span style={{ color: "#39ff14", fontWeight: "bold", fontSize: isUltraWide ? "32px" : "14px" }}>
              {dimensions.width}px
            </span>
          </div>
          
          <div style={{ color: "#ffffff" }}>
            <span style={{ color: "#9fb3a0", fontSize: isUltraWide ? "20px" : "12px" }}>Height:</span>{" "}
            <span style={{ color: "#39ff14", fontWeight: "bold", fontSize: isUltraWide ? "32px" : "14px" }}>
              {dimensions.height}px
            </span>
          </div>
          
          <div style={{ color: "#ffffff" }}>
            <span style={{ color: "#9fb3a0", fontSize: isUltraWide ? "20px" : "12px" }}>Breakpoint:</span>{" "}
            <span style={{ color: "#39ff14", fontWeight: "bold", fontSize: isUltraWide ? "24px" : "13px" }}>
              {dimensions.breakpoint}
            </span>
          </div>
          
          <div
            style={{
              color: "#7a8a7a",
              borderTop: `${isUltraWide ? '3px' : '1px'} solid rgba(57, 255, 20, 0.2)`,
              fontSize: isUltraWide ? "24px" : "11px",
              fontWeight: "bold",
              marginTop: isUltraWide ? "16px" : "8px",
              paddingTop: isUltraWide ? "16px" : "8px"
            }}
          >
            {dimensions.width}x{dimensions.height}
          </div>
        </div>
      </div>
    </div>
  );
}

