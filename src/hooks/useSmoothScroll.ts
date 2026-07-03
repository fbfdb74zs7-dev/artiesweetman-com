import { useLayoutEffect } from "react";
import { gsap, ScrollSmoother, ScrollTrigger } from "../lib/motion";

/**
 * Buttery scroll via ScrollSmoother — desktop + motion-allowed only.
 * On mobile / reduced-motion we add `no-smooth` to <html> and let the
 * browser scroll natively (guardrail: no pinning, no smoother on mobile).
 */
export function useSmoothScroll(enabled: boolean) {
  useLayoutEffect(() => {
    const root = document.documentElement;

    if (!enabled) {
      root.classList.add("no-smooth");
      return;
    }
    root.classList.remove("no-smooth");

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.35, // seconds of "catch-up" — long, drifting
      effects: true, // enables data-speed / data-lag parallax
      normalizeScroll: true,
      smoothTouch: false,
    });

    // Recalculate once fonts settle (avoids trigger drift from reflow).
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);

    // Dev aid: expose the smoother so previews/e2e can drive scroll.
    if (import.meta.env.DEV) (window as unknown as Record<string, unknown>).__smoother = smoother;

    return () => {
      smoother.kill();
      gsap.killTweensOf(window);
    };
  }, [enabled]);
}
