"use client";

import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { MobileDrawer } from "./MobileDrawer";
import { useState, useEffect, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

/**
 * SiteHeader Component
 * Main navigation with mobile drawer menu and theme toggle
 * Extracted from new_index.html navigation section (lines 1480-1516)
 * jhjkjdjd test
 */
export function SiteHeader() {
  const { theme, toggleTheme } = useTheme();
  const { isOpen: mobileMenuOpen, openMenu, closeMenu } = useMobileMenu();
  const [debugInfo, setDebugInfo] = useState({ width: 0, height: 0, computedHeight: '' });
  const pathname = usePathname();

  const desktopScrollTargets: Record<string, string> = {
    "/": "home",
    // Use homepage anchor wrappers (these exist even while dynamic sections are still loading)
    "/hostel-villa": "hostel-villa-anchor",
    // NOTE: Do not smooth-scroll for CAFE anymore.
    // Clicking CAFE should navigate to the dedicated /cafe page instead of scrolling the homepage section.
    // "/cafe": "cafe-anchor",
    // NOTE: Do not smooth-scroll for REVIEWS anymore.
    // Clicking REVIEWS should navigate to the dedicated /reviews page instead of scrolling the homepage section.
    // "/reviews": "reviews-anchor",
    // NOTE: Do not smooth-scroll for VIEWS anymore.
    // Clicking VIEWS should navigate to the dedicated /views page instead of scrolling the homepage section.
    // "/views": "views-anchor",
    "/contact": "contact-anchor",
  };

  const scrollToSectionId = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const nav = document.querySelector("nav.site-nav") as HTMLElement | null;
    const navHeight = nav?.getBoundingClientRect().height ?? 0;

    const top = window.scrollY + el.getBoundingClientRect().top - navHeight;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  const handleDesktopNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    const targetId = desktopScrollTargets[href];
    if (!targetId) return;

    // Smooth-scroll only when the target anchor exists on the current page.
    // This keeps normal navigation working on actual route pages (/cafe, /reviews, etc.),
    // while still enabling smooth scroll on the homepage even after we pushState() the URL.
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    e.preventDefault();
    scrollToSectionId(targetId);

    // Update the address bar path without navigation/reload (so the URL becomes /cafe, /views, etc.)
    // This keeps the user on the homepage while reflecting the selected section in the URL.
    window.history.pushState(null, "", href);
  };

  const handleFaqNavClick = () => {
    // If we previously changed the URL on the homepage via pushState (e.g. /cafe, /reviews),
    // rewrite the current history entry back to "/" before navigating to /faq.
    // This ensures browser "Back" returns to the homepage (where smooth scroll works),
    // instead of returning to a pseudo-path that can break scroll behavior.
    const pseudoPaths = new Set(Object.keys(desktopScrollTargets).filter((p) => p !== "/"));
    if (pseudoPaths.has(window.location.pathname)) {
      window.history.replaceState(null, "", "/");
    }
  };

  // Theme UI text and icons for desktop
  const themeIcon = theme === "dark" ? "🌞" : "🌙";
  const themeLabel = theme === "dark" ? "Dark" : "Light";

  // Debug: Track viewport and nav height
  useEffect(() => {
    const updateDebugInfo = () => {
      const nav = document.querySelector('nav.site-nav');
      if (nav) {
        const computed = window.getComputedStyle(nav);
        const allClasses = nav.className;
        const info = {
          width: window.innerWidth,
          height: nav.getBoundingClientRect().height,
          computedHeight: computed.height
        };
        
        // // Console logging for deeper inspection
        // console.group('🐛 Navigation Debug Info');
        // console.log('Viewport Width:', info.width + 'px');
        // console.log('Actual Nav Height:', info.height + 'px');
        // console.log('Computed Height:', info.computedHeight);
        // console.log('All Classes:', allClasses);
        // console.log('Nav Element:', nav);
        
        // // Check what styles are being applied
        // const allStyles = Array.from(document.styleSheets).flatMap(sheet => {
        //   try {
        //     return Array.from(sheet.cssRules || []);
        //   } catch {
        //     return [];
        //   }
        // }).filter(rule => {
        //   const styleRule = rule as CSSStyleRule;
        //   return styleRule.selectorText && styleRule.selectorText.includes('site-nav');
        // });
        
        // console.log('Matching CSS Rules:', allStyles.map(r => r.cssText));
        // console.groupEnd();
        
        setDebugInfo(info);
      }
    };
    
    updateDebugInfo();
    window.addEventListener('resize', updateDebugInfo);
    
    // Update after a short delay to catch any style changes
    const timer = setTimeout(updateDebugInfo, 500);
    
    return () => {
      window.removeEventListener('resize', updateDebugInfo);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* DEBUG PANEL - Remove this after debugging */}
      {/* 
        <div 
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'rgba(0, 0, 0, 0.9)',
            color: '#39ff14',
            padding: '15px',
            borderRadius: '8px',
            zIndex: 99999,
            fontFamily: 'monospace',
            fontSize: '12px',
            border: '2px solid #39ff14',
            minWidth: '250px'
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '14px' }}>🐛 Nav Debug Info</div>
          <div>Viewport Width: <strong>{debugInfo.width}px</strong></div>
          <div>Nav Height (actual): <strong>{debugInfo.height}px</strong></div>
          <div>Computed Height: <strong>{debugInfo.computedHeight}</strong></div>
          <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #39ff14' }}>
            Expected Height:
            <div style={{ fontSize: '11px', marginTop: '5px' }}>
              {debugInfo.width < 1536 && '• < 1536px → 80px (5rem)'}
              {debugInfo.width >= 1536 && debugInfo.width < 2560 && '• 1536-2559px → 160px (10rem)'}
              {debugInfo.width >= 2560 && '• ≥ 2560px → 320px (20rem)'}
            </div>
          </div>
        </div>
      */}
      
      {/* Navigation */}
      <nav 
        className="site-nav fixed top-0 left-0 right-0 flex items-center z-50 glass-bg border-b h-20 [@media(min-width:1470px)]:h-24 [@media(min-width:1536px)]:h-20 [@media(min-width:1920px)]:h-24 [@media(min-width:2560px)]:h-40"
        style={{
          background: theme === 'dark' ? 'rgba(0,0,0,0.95)' : 'rgba(248, 253, 248, 0.95)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderBottomColor: theme === 'dark' ? 'rgba(57, 255, 20, 0.2)' : '#d4e6d4',
        }}
      >
        <div className="w-full px-2 sm:px-6 lg:px-6 xl:px-8 flex items-center justify-between lg:justify-between">
          {/* Mobile Hamburger Button - Left Side */}
          <button
            onClick={openMenu}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg flex-shrink-0 transition-all order-1"
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6 text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          {/* Logo - Center on Mobile, Left on Desktop */}
            <div className="flex items-center gap-2 [@media(min-width:1920px)]:gap-1 flex-shrink-0 order-2 lg:order-1 absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-auto lg:transform-none lg:ml-[7rem] [@media(min-width:1536px)]:ml-16 [@media(min-width:1920px)]:ml-36 [@media(min-width:2560px)]:ml-55">
            <Link
              href={ROUTES.HOME}
              className="flex items-center font-light text-xl sm:text-2xl tracking-widest no-underline text-olive-green flex-shrink-0 [@media(min-width:1470px)]:ml-[50px] [@media(min-width:1511px)]:ml-[50px] [@media(min-width:1536px)]:ml-[165px] [@media(min-width:1920px)]:ml-[50px]"
            >
              <Image 
                src="/images/Parvati's Lap - Luxury Hostel & Villa - logo-updated.png"
                alt="Parvati's Lap Logo"
                width={69}
                height={37}
                priority
                quality={100}
                sizes="(min-width:2560px) 204px, (min-width:1920px) 134px, (min-width:1536px) 118px, (min-width:1470px) 83px, 69px"
                className="lg:ml-1 [@media(min-width:1470px)]:w-[83px] [@media(min-width:1470px)]:h-[45px] [@media(min-width:1536px)]:w-[118px] [@media(min-width:1536px)]:h-[59px] [@media(min-width:1920px)]:w-[134px] [@media(min-width:1920px)]:h-[67px] [@media(min-width:2560px)]:w-[204px] [@media(min-width:2560px)]:h-[98px]"
              />
              <Image
                src="/images/Parvati's Lap - Luxury Hostel & Villa - logo-text.png"
                alt="PARVATI'S LAP"
                width={128}
                height={169}
                priority
                quality={100}
                sizes="(min-width:2560px) 250px, (min-width:1920px) 209px, (min-width:1536px) 183px, (min-width:1470px) 203px, 128px"
                className="ml-2 lg:ml-3 [@media(min-width:1470px)]:h-[203px] [@media(min-width:1470px)]:w-auto [@media(min-width:1536px)]:h-[183px] [@media(min-width:1536px)]:w-auto [@media(min-width:1536px)]:ml-[12px] [@media(min-width:1920px)]:h-[209px] [@media(min-width:1920px)]:w-auto [@media(min-width:1920px)]:ml-[18px] [@media(min-width:2560px)]:h-[250px] [@media(min-width:2560px)]:w-auto [@media(min-width:2560px)]:ml-[24px]"
              />
            </Link>
          </div>

          {/* Desktop Menu & Theme Toggle - Right Side */}
          <div className="flex items-center gap-2 flex-shrink-0 order-3 lg:order-2">
            <ul className="hidden lg:flex gap-4 xl:gap-6 items-center list-none m-0 p-0">
              <li className="m-0 p-0">
                <Link
                  href={ROUTES.HOME}
                  className="text-secondary text-xs [@media(min-width:1280px)]:text-sm [@media(min-width:1440px)]:text-sm [@media(min-width:1470px)]:text-base [@media(min-width:1511px)]:text-base [@media(min-width:1536px)]:text-base [@media(min-width:1920px)]:text-lg [@media(min-width:2560px)]:text-2xl font-light tracking-wide no-underline hover:text-forest-green transition-all duration-300 ease-in-out block py-2 whitespace-nowrap hover:scale-105"
                  onClick={(e) => handleDesktopNavClick(e, ROUTES.HOME)}
                >
                  HOME
                </Link>
              </li>
              <li className="m-0 p-0">
                {/*
                  Legacy menu item (kept for plug-and-play rollback)
                  <Link
                    href="/hostel-villa"
                    className="text-secondary text-xs [@media(min-width:1280px)]:text-sm [@media(min-width:1440px)]:text-sm [@media(min-width:1470px)]:text-base [@media(min-width:1511px)]:text-base [@media(min-width:1536px)]:text-base [@media(min-width:1920px)]:text-lg [@media(min-width:2560px)]:text-2xl font-light tracking-wide no-underline hover:text-forest-green transition-all duration-300 ease-in-out block py-2 whitespace-nowrap hover:scale-105"
                    onClick={(e) => handleDesktopNavClick(e, "/hostel-villa")}
                  >
                    HOSTEL & VILLA
                  </Link>
                */}
                <Link
                  href={ROUTES.VILLA}
                  className="text-secondary text-xs [@media(min-width:1280px)]:text-sm [@media(min-width:1440px)]:text-sm [@media(min-width:1470px)]:text-base [@media(min-width:1511px)]:text-base [@media(min-width:1536px)]:text-base [@media(min-width:1920px)]:text-lg [@media(min-width:2560px)]:text-2xl font-light tracking-wide no-underline hover:text-forest-green transition-all duration-300 ease-in-out block py-2 whitespace-nowrap hover:scale-105"
                  onClick={(e) => handleDesktopNavClick(e, ROUTES.VILLA)}
                >
                  VILLA
                </Link>
              </li>
              <li className="m-0 p-0">
                <Link
                  href={ROUTES.HOSTEL}
                  className="text-secondary text-xs [@media(min-width:1280px)]:text-sm [@media(min-width:1440px)]:text-sm [@media(min-width:1470px)]:text-base [@media(min-width:1511px)]:text-base [@media(min-width:1536px)]:text-base [@media(min-width:1920px)]:text-lg [@media(min-width:2560px)]:text-2xl font-light tracking-wide no-underline hover:text-forest-green transition-all duration-300 ease-in-out block py-2 whitespace-nowrap hover:scale-105"
                  onClick={(e) => handleDesktopNavClick(e, ROUTES.HOSTEL)}
                >
                  HOSTEL
                </Link>
              </li>
              <li className="m-0 p-0">
                <Link
                  href={ROUTES.TREKS}
                  className="text-secondary text-xs [@media(min-width:1280px)]:text-sm [@media(min-width:1440px)]:text-sm [@media(min-width:1470px)]:text-base [@media(min-width:1511px)]:text-base [@media(min-width:1536px)]:text-base [@media(min-width:1920px)]:text-lg [@media(min-width:2560px)]:text-2xl font-light tracking-wide no-underline hover:text-forest-green transition-all duration-300 ease-in-out block py-2 whitespace-nowrap hover:scale-105"
                  onClick={(e) => handleDesktopNavClick(e, ROUTES.TREKS)}
                >
                  TREKS
                </Link>
              </li>
              <li className="m-0 p-0">
                <Link
                  href={ROUTES.CAFE}
                  className="text-secondary text-xs [@media(min-width:1280px)]:text-sm [@media(min-width:1440px)]:text-sm [@media(min-width:1470px)]:text-base [@media(min-width:1511px)]:text-base [@media(min-width:1536px)]:text-base [@media(min-width:1920px)]:text-lg [@media(min-width:2560px)]:text-2xl font-light tracking-wide no-underline hover:text-forest-green transition-all duration-300 ease-in-out block py-2 whitespace-nowrap hover:scale-105"
                  onClick={(e) => handleDesktopNavClick(e, ROUTES.CAFE)}
                >
                  CAFE
                </Link>
              </li>
              <li className="m-0 p-0">
                <Link
                  href="/reviews"
                  className="text-secondary text-xs [@media(min-width:1280px)]:text-sm [@media(min-width:1440px)]:text-sm [@media(min-width:1470px)]:text-base [@media(min-width:1511px)]:text-base [@media(min-width:1536px)]:text-base [@media(min-width:1920px)]:text-lg [@media(min-width:2560px)]:text-2xl font-light tracking-wide no-underline hover:text-forest-green transition-all duration-300 ease-in-out block py-2 whitespace-nowrap hover:scale-105"
                  onClick={(e) => handleDesktopNavClick(e, "/reviews")}
                >
                  REVIEWS
                </Link>
              </li>
              <li className="m-0 p-0">
                <Link
                  href="/views"
                  className="text-secondary text-xs [@media(min-width:1280px)]:text-sm [@media(min-width:1440px)]:text-sm [@media(min-width:1470px)]:text-base [@media(min-width:1511px)]:text-base [@media(min-width:1536px)]:text-base [@media(min-width:1920px)]:text-lg [@media(min-width:2560px)]:text-2xl font-light tracking-wide no-underline hover:text-forest-green transition-all duration-300 ease-in-out block py-2 whitespace-nowrap hover:scale-105"
                  onClick={(e) => handleDesktopNavClick(e, "/views")}
                >
                  VIEWS
                </Link>
              </li>
              <li className="m-0 p-0">
                <Link
                  href="/contact"
                  className="text-secondary text-xs [@media(min-width:1280px)]:text-sm [@media(min-width:1440px)]:text-sm [@media(min-width:1470px)]:text-base [@media(min-width:1511px)]:text-base [@media(min-width:1536px)]:text-base [@media(min-width:1920px)]:text-lg [@media(min-width:2560px)]:text-2xl font-light tracking-wide no-underline hover:text-forest-green transition-all duration-300 ease-in-out block py-2 whitespace-nowrap hover:scale-105"
                  onClick={(e) => handleDesktopNavClick(e, "/contact")}
                >
                  CONTACT
                </Link>
              </li>
              <li className="m-0 p-0">
                <a
                  href="/faq"
                  className="text-secondary text-xs [@media(min-width:1280px)]:text-sm [@media(min-width:1440px)]:text-sm [@media(min-width:1470px)]:text-base [@media(min-width:1511px)]:text-base [@media(min-width:1536px)]:text-base [@media(min-width:1920px)]:text-lg [@media(min-width:2560px)]:text-2xl font-light tracking-wide no-underline hover:text-forest-green transition-all duration-300 ease-in-out block py-2 whitespace-nowrap hover:scale-105"
                  onClick={handleFaqNavClick}
                >
                  FAQ
                </a>
              </li>
            </ul>

            <button
              onClick={toggleTheme}
              id="theme-toggle"
              className="hidden lg:inline-flex items-center gap-2 cursor-pointer transition-all ml-2 lg:ml-4 p-2 rounded-lg flex-shrink-0"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              style={{
                background: theme === 'dark' ? 'rgba(57, 255, 20, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                border: theme === 'dark' ? '1px solid rgba(57, 255, 20, 0.4)' : '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              <span
                className="text-lg [@media(min-width:1536px)]:text-xl [@media(min-width:1920px)]:text-2xl 3xl:text-[30px]">
                {themeIcon}
              </span>
              <span 
                className="text-sm [@media(min-width:1536px)]:text-xs [@media(min-width:1920px)]:text-sm font-medium tracking-wide leading-none 3xl:text-[30px]"
                style={{
                  color: theme === 'light' ? '#9ab19a' : undefined,
                  fontWeight: 100
                }}
              >
                {themeLabel}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <MobileDrawer isOpen={mobileMenuOpen} onClose={closeMenu} />
    </>
  );
}

