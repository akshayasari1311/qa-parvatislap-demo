import { useState, useEffect, useCallback } from "react";

/**
 * useMobileMenu Hook
 * Manages mobile menu drawer state and interactions
 * Converts initMobileMenu() from new_index.html (lines 106-138)
 * 
 * @returns {object} Menu state and control functions
 */
export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Open the mobile menu and prevent body scrolling
   */
  const openMenu = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  /**
   * Close the mobile menu and restore body scrolling
   */
  const closeMenu = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
  }, []);

  /**
   * Toggle menu state
   */
  const toggleMenu = useCallback(() => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [isOpen, openMenu, closeMenu]);

  /**
   * Handle Escape key press to close menu
   */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeMenu]);

  /**
   * Cleanup: Restore body scroll on unmount
   */
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return {
    isOpen,
    openMenu,
    closeMenu,
    toggleMenu,
  };
}







