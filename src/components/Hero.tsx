import type { Env } from "../hooks/useEnvironment";
import "./hero.css";

/**
 * Type-only hero (v3). A deliberate typographic statement — no image, nothing
 * missing. The negative space at upper-right (enclosed by the © mark, the
 * "quiet / homes" mass and the "for loud" line) is the RESERVED PORTRAIT ZONE:
 * a future duotone portrait slots into `.hero__stage` grid-area 8/13 × rows 2–3
 * (~4:5) with no reflow — see MASTER.md. `env` kept for signature parity.
 */
export function Hero(_props: { env: Env }) {
  return (
    <section id="top" className="hero" aria-label="Introduction">
      <div className="hero__meta-row shell">
        <p className="label hero__eyebrow" data-reveal>
          Creative direction &amp; websites — for artists
        </p>
        <p className="label hero__eyebrow hero__eyebrow--right" data-reveal>
          Based in<br />Ōtepoti Dunedin
        </p>
      </div>

      <div className="hero__stage shell">
        <h1 className="hero__statement" data-hero-statement>
          <span className="hero__w hero__w--im sans" data-reveal>
            I&nbsp;make
          </span>
          <span className="hero__w hero__w--quiet serif" data-reveal>
            quiet
          </span>
          <span className="hero__w hero__w--homes serif" data-reveal>
            homes
          </span>
          <span className="hero__w hero__w--for serif italic" data-reveal>
            for&nbsp;loud
          </span>
          <span className="hero__w hero__w--work serif" data-reveal>
            work
          </span>
          <span className="hero__cmark sans" aria-hidden data-reveal>
            ©&nbsp;2026
          </span>
        </h1>

        <span className="hero__scroll label" aria-hidden data-reveal>
          <span className="hero__scroll-line" />
          scroll
        </span>
      </div>

      <div className="hero__foot shell">
        <p className="hero__lead serif" data-reveal>
          I&apos;m <span className="italic">Artie Sweetman</span> — I help artists
          put their work online with the calm, structure and precision it
          deserves.
        </p>
        <div className="hero__cta-row" data-reveal>
          <a href="#contact" className="hero__cta label" data-cursor>
            <span>(&nbsp;let&apos;s talk&nbsp;)</span>
          </a>
          <span className="label hero__count">
            For work that<br />deserves calm
          </span>
        </div>
      </div>
    </section>
  );
}
