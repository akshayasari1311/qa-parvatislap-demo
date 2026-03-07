import { useEffect } from "react";

/**
 * useRain Hook
 * Creates animated rain drops in a container element
 * Converts createRainDrops() from new_index.html (lines 45-59)
 * 
 * @param containerId - ID of the rain overlay container element
 * @param dropCount - Number of rain drops to create (default: 40)
 */
export function useRain(containerId: string = "rainOverlay", dropCount: number = 40) {
  useEffect(() => {
    const rainOverlay = document.getElementById(containerId);
    if (!rainOverlay) return;

    const drops: HTMLDivElement[] = [];

    // Create rain drops
    for (let i = 0; i < dropCount; i++) {
      const drop = document.createElement("div");
      drop.className = "rain-drop";
      drop.style.left = Math.random() * 100 + "%";
      drop.style.width = Math.random() * 3 + 1 + "px";
      drop.style.height = Math.random() * 20 + 10 + "px";
      drop.style.animationDelay = Math.random() * 5 + "s";
      drop.style.animationDuration = Math.random() * 3 + 2 + "s";
      rainOverlay.appendChild(drop);
      drops.push(drop);
    }

    // Cleanup: Remove rain drops on unmount
    return () => {
      drops.forEach((drop) => {
        if (rainOverlay.contains(drop)) {
          rainOverlay.removeChild(drop);
        }
      });
    };
  }, [containerId, dropCount]);
}







