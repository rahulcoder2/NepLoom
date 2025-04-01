"use client";

import { useState, useEffect } from "react";

/**
 * Custom React hook to track if the user has scrolled past a specified threshold.
 *
 * @param {number} [threshold=10] - The scroll threshold in pixels.
 * @returns {boolean} - Returns true if the user has scrolled past the threshold, false otherwise.
 */
export function useIsScroll(threshold: number = 10): boolean {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}
