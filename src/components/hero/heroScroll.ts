/** Shared, mutable scroll signal for the hero — written by a ScrollTrigger,
 *  read inside useFrame. Deliberately outside React so nothing re-renders. */
export const heroScroll = { p: 0 };
