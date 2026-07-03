import { ScrollSmoother } from "./motion";

/**
 * Smooth-scroll to an in-page target by hash (e.g. "#craft").
 * - Desktop + motion: drive ScrollSmoother (buttery, matches the site's feel).
 * - Mobile / reduced-motion / no smoother: native scroll (instant if reduced).
 */
export function smoothScrollTo(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const smoother = ScrollSmoother.get();
  if (smoother && !reduced) {
    // small offset so the section title clears the top edge
    smoother.scrollTo(target, true, "top top-=8");
    return;
  }
  target.scrollIntoView({
    behavior: reduced ? "auto" : "smooth",
    block: "start",
  });
}
