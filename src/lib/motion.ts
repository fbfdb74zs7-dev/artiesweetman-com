import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

/* Shared "drift" language — long, buttery, decelerating.
   Everything on the site eases with these so motion feels of a piece. */
export const DRIFT = "power4.out";
export const DRIFT_SOFT = "power3.out";
export const DUR = {
  reveal: 1.25,
  hero: 1.6,
  driftLong: 1.8,
} as const;

export { gsap, ScrollTrigger, ScrollSmoother, useGSAP };
