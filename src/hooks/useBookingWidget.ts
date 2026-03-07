import { useState, useCallback } from "react";

/**
 * useBookingWidget Hook
 * Manages booking widget expand/collapse state
 * Converts initBookingWidget() from new_index.html (lines 383-414)
 * 
 * @param initialCollapsed - Initial collapsed state (default: true)
 * @returns {object} Widget state and control functions
 */
export function useBookingWidget(initialCollapsed: boolean = true) {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  /**
   * Toggle collapsed state
   */
  const toggle = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  /**
   * Expand the widget
   */
  const expand = useCallback(() => {
    setIsCollapsed(false);
  }, []);

  /**
   * Collapse the widget
   */
  const collapse = useCallback(() => {
    setIsCollapsed(true);
  }, []);

  return {
    isCollapsed,
    toggle,
    expand,
    collapse,
  };
}







