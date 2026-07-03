import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, DRIFT, DRIFT_SOFT, DUR } from "./lib/motion";
import { useEnvironment } from "./hooks/useEnvironment";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { smoothScrollTo } from "./lib/scrollTo";
import { GridLines } from "./components/GridLines";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Cursor } from "./components/Cursor";
import {
  Statement,
  Approach,
  Craft,
  FutureWork,
  Contact,
  Footer,
} from "./components/Sections";

export default function App() {
  const env = useEnvironment();
  const root = useRef<HTMLDivElement>(null);

  // Buttery scroll only where it's allowed (desktop + motion).
  useSmoothScroll(env.ready && env.desktop && !env.reduced);

  // Delegate ALL in-page "#anchor" clicks to smooth-scroll (nav, CTA, footer).
  // Works with ScrollSmoother on desktop and native scroll on mobile/reduced.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const link = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href") || "";
      if (hash.length < 2 || !document.querySelector(hash)) return;
      e.preventDefault();
      smoothScrollTo(hash);
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useGSAP(
    () => {
      if (!env.ready) return;
      const mm = gsap.matchMedia();

      // ---- Below-fold reveals (any device, motion allowed): quiet fade-ups ----
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap
          .utils.toArray<HTMLElement>("[data-reveal], [data-reveal-lines]")
          .filter((el) => !el.closest(".hero"));
        gsap.set(items, { opacity: 0, y: 26 });
        ScrollTrigger.batch(items, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: DUR.reveal,
              ease: DRIFT_SOFT,
              stagger: 0.09,
            }),
        });
      });

      // ---- Desktop hero: kinetic intro + scroll signal (drives canvas drift) ----
      mm.add(
        "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const words = gsap.utils.toArray<HTMLElement>(".hero [data-reveal]");
          gsap.set(words, { opacity: 0, yPercent: 14 });
          gsap.set("[data-reveal-nav]", { opacity: 0, y: -14 });

          const tl = gsap.timeline({ delay: 0.12 });
          tl.to("[data-reveal-nav]", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: DRIFT_SOFT,
          })
            .to(
              words,
              {
                opacity: 1,
                yPercent: 0,
                duration: DUR.hero,
                ease: DRIFT,
                stagger: 0.09, // one word drifting in at a time
              },
              0.1
            );

          // Scroll-linked drift on the type itself (buttery, one thing moving).
          const drift = gsap.to(".hero__statement", {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
          return () => {
            drift.scrollTrigger?.kill();
            drift.kill();
          };
        }
      );

      // ---- Mobile hero: strong static composition + light, quick fade-up ----
      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          const words = gsap.utils.toArray<HTMLElement>(".hero [data-reveal]");
          gsap.from(words, {
            opacity: 0,
            y: 16,
            duration: 0.7,
            ease: DRIFT_SOFT,
            stagger: 0.05,
          });
        }
      );

      return () => mm.revert();
    },
    { scope: root, dependencies: [env.ready] }
  );

  const showCursor = env.ready && env.desktop && !env.reduced;

  return (
    <div ref={root}>
      <GridLines />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="shell">
            <Nav />
          </div>
          <main>
            <Hero env={env} />
            <Statement />
            <Approach />
            <Craft />
            <FutureWork />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
      {showCursor && <Cursor />}
    </div>
  );
}
