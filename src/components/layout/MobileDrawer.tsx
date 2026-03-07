"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { ROUTES } from "@/lib/routes";

/**
 * MobileDrawer Component
 * Mobile navigation drawer with theme toggle
 * Extracted from new_index.html mobile menu section (lines 1518-1547)
 * 
 * @param isOpen - Whether the drawer is open
 * @param onClose - Callback to close the drawer
 */
interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { theme, toggleTheme } = useTheme();

  // Theme UI text and icons for mobile
  const themeIcon = theme === "dark" ? "🌞" : "🌙";
  const themeLabelMobile = theme === "dark" ? "Dark Mode" : "Light Mode";

  return (
    <div
      className={`fixed inset-0 z-[9999] transition-[visibility,opacity] duration-300 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Overlay - clicking closes the drawer */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      ></div>

      {/* Drawer Panel */}
      <div
        className={`absolute top-0 right-0 bottom-0 w-[280px] max-w-[85vw] bg-primary shadow-[-4px_0_20px_rgba(0,0,0,0.2)] transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-theme">
          <h2 className="text-xl font-light tracking-widest text-primary">
            MENU
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-all"
            aria-label="Close menu"
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-6">
          <ul className="flex flex-col gap-4 list-none m-0 p-0">
            <li className="m-0 p-0">
              <a 
                href={ROUTES.HOME}
                className="menu-link" 
                onClick={onClose}
              >
                HOME
              </a>
            </li>
            <li className="m-0 p-0">
              {/*
                Legacy menu item (kept for plug-and-play rollback)
                <a
                  href="/hostel-villa"
                  className="menu-link"
                  onClick={onClose}
                >
                  HOSTEL & VILLA
                </a>
              */}
              <a href={ROUTES.VILLA} className="menu-link" onClick={onClose}>
                VILLA
              </a>
            </li>
            <li className="m-0 p-0">
              <a href={ROUTES.HOSTEL} className="menu-link" onClick={onClose}>
                HOSTEL
              </a>
            </li>
            <li className="m-0 p-0">
              <a href={ROUTES.TREKS} className="menu-link" onClick={onClose}>
                TREKS
              </a>
            </li>
            <li className="m-0 p-0">
              <a href={ROUTES.CAFE} className="menu-link" onClick={onClose}>
                CAFE
              </a>
            </li>
            <li className="m-0 p-0">
              <a
                href="/reviews"
                className="menu-link"
                onClick={onClose}
              >
                REVIEWS
              </a>
            </li>
            <li className="m-0 p-0">
              <a
                href="/views"
                className="menu-link"
                onClick={onClose}
              >
                VIEWS
              </a>
            </li>
            <li className="m-0 p-0">
              <a 
                href={ROUTES.CONTACT}
                className="menu-link" 
                onClick={onClose}
              >
                CONTACT
              </a>
            </li>
            <li className="m-0 p-0">
              <a href={ROUTES.FAQ} className="menu-link" onClick={onClose}>
                FAQ
              </a>
            </li>
          </ul>

          {/* Theme Toggle - Mobile */}
          <div className="mt-8 pt-6 border-t border-theme">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-3 cursor-pointer transition-all p-3 rounded-lg w-full justify-center"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              <span className="text-2xl leading-none">{themeIcon}</span>
              <span className="text-base font-medium tracking-wide leading-none">
                {themeLabelMobile}
              </span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}







