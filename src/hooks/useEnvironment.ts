import { useEffect, useState } from "react";

export type Env = {
  reduced: boolean; // prefers-reduced-motion: reduce
  desktop: boolean; // >= 1024px AND fine pointer (mouse)
  ready: boolean; // resolved on client (avoids SSR/hydration flash)
};

/**
 * Single source of truth for the two axes that gate motion:
 *  - reduced motion  → final state, zero motion, no cursor, no canvas
 *  - desktop + mouse → kinetic hero, trailing cursor, ScrollSmoother
 * Mobile / touch / coarse pointer → strong STATIC editorial composition.
 */
export function useEnvironment(): Env {
  const [env, setEnv] = useState<Env>({
    reduced: false,
    desktop: false,
    ready: false,
  });

  useEffect(() => {
    const mReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mDesktop = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine)"
    );
    const update = () =>
      setEnv({
        reduced: mReduce.matches,
        desktop: mDesktop.matches,
        ready: true,
      });
    update();
    mReduce.addEventListener("change", update);
    mDesktop.addEventListener("change", update);
    return () => {
      mReduce.removeEventListener("change", update);
      mDesktop.removeEventListener("change", update);
    };
  }, []);

  return env;
}
