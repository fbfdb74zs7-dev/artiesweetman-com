import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/motion";
import "./cursor.css";

/**
 * Subtle desktop-only trailing cursor: a small drifting ring that lags the
 * pointer with long easing, plus a precise dot that tracks 1:1. Mounted only
 * when desktop && !reduced (guardrail). Uses gsap.quickTo — no React state.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ringEl = ring.current!;
    const dotEl = dot.current!;

    // Long-lagged ring (the "drift"), tight dot.
    const rx = gsap.quickTo(ringEl, "x", { duration: 0.9, ease: "power3.out" });
    const ry = gsap.quickTo(ringEl, "y", { duration: 0.9, ease: "power3.out" });
    const dx = gsap.quickTo(dotEl, "x", { duration: 0.18, ease: "power3.out" });
    const dy = gsap.quickTo(dotEl, "y", { duration: 0.18, ease: "power3.out" });

    let visible = false;
    const move = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([ringEl, dotEl], { autoAlpha: 1, duration: 0.4 });
      }
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
    };

    // Grow the ring over interactive targets — quiet affordance.
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement)?.closest("a, button, [data-cursor]");
      gsap.to(ringEl, {
        scale: t ? 2.1 : 1,
        borderColor: t
          ? "rgba(26,23,18,0.55)"
          : "rgba(26,23,18,0.28)",
        duration: 0.5,
        ease: "power3.out",
      });
    };
    const leaveWin = () =>
      gsap.to([ringEl, dotEl], { autoAlpha: 0, duration: 0.3 });

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerout", (e) => {
      if (!e.relatedTarget) leaveWin();
    });

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  return (
    <div aria-hidden className="cursor-layer">
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
    </div>
  );
}
