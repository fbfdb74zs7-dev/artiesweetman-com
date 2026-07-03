import "./sections.css";

/* ---------- 01 · STATEMENT ---------- */
export function Statement() {
  return (
    <section id="statement" className="sec shell" aria-labelledby="statement-h">
      <div className="sec__head">
        <span className="section-index" data-reveal>01</span>
        <span className="label" data-reveal>Statement</span>
      </div>
      <h2 id="statement-h" className="statement__line serif" data-reveal-lines>
        A website should feel like the work it holds — <span className="italic">
        composed, deliberate, quiet</span> until you look closely.
      </h2>
      <div className="statement__cols">
        <p className="statement__body" data-reveal>
          I&apos;m a designer and developer making interactive editorial websites —
          considered digital homes for artists and makers, with the restraint of a
          good gallery wall and the structure of a printed page.
        </p>
        <p className="statement__body" data-reveal>
          No noise, no template gloss. Just typography, motion and pace arranged so
          the work is the loudest thing in the room.
        </p>
      </div>
    </section>
  );
}

/* ---------- 02 · APPROACH ---------- */
const APPROACH = [
  {
    n: "01",
    t: "Conversation",
    d: "We start with the work and the why — not a moodboard. I listen for the tone the practice already has.",
  },
  {
    n: "02",
    t: "Structure",
    d: "A skeleton first: grid, hierarchy, pace. The bones have to read as calm before anything is dressed.",
  },
  {
    n: "03",
    t: "Composition",
    d: "Type, image and space set like a spread. Every screen is art-directed, never dropped into a layout.",
  },
  {
    n: "04",
    t: "Craft",
    d: "Motion, detail and performance in the last mile — restrained, buttery, and gone before it's noticed.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="sec shell" aria-labelledby="approach-h">
      <div className="sec__head">
        <span className="section-index" data-reveal>02</span>
        <span className="label" data-reveal>Approach</span>
      </div>
      <h2 id="approach-h" className="sec__title serif" data-reveal-lines>
        How I <span className="italic">work</span>
      </h2>
      <div className="approach__grid">
        {APPROACH.map((a) => (
          <article className="approach__item" key={a.n} data-reveal>
            <span className="approach__n label">{a.n}</span>
            <h3 className="approach__t serif">{a.t}</h3>
            <p className="approach__d">{a.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- 03 · CRAFT (capabilities + editorial data table) ---------- */
const CRAFT = [
  ["Editorial Web Design", "Interactive, typography-led sites composed like a printed spread."],
  ["Front-end Build", "Hand-coded React, Three.js / R3F and GSAP — no page-builder tells."],
  ["Motion & Interaction", "Scroll-driven, drifting motion tuned to feel calm, not flashy."],
  ["Typography & Art Direction", "Layout, type systems and the edit that makes the work sing."],
];

// Practice categories confirmed by Artie. YEAR column removed — no fabricated
// dates. These are the kinds of practice he works with, not dated claims.
const RECORD = [
  ["Practice", "Field", "Engagement"],
  ["Independent artists", "Painting · Sculpture", "Site & identity"],
  ["Small studios", "Design · Craft", "Creative direction"],
  ["Galleries", "Exhibition", "Editorial & web"],
  ["Musicians", "Sound", "Sites & art direction"],
];

export function Craft() {
  return (
    <section id="craft" className="sec shell" aria-labelledby="craft-h">
      <div className="sec__head">
        <span className="section-index" data-reveal>03</span>
        <span className="label" data-reveal>Craft</span>
      </div>
      <h2 id="craft-h" className="sec__title serif" data-reveal-lines>
        What I <span className="italic">make</span>
      </h2>

      <div className="craft__grid">
        {CRAFT.map(([t, d], i) => (
          <article className="craft__item" key={t} data-reveal>
            <span className="craft__n label">{`0${i + 1}`}</span>
            <h3 className="craft__t serif">{t}</h3>
            <p className="craft__d">{d}</p>
          </article>
        ))}
      </div>

      <div className="record" data-reveal>
        <table className="record__table">
          <caption className="sr-only">Practices and fields of work</caption>
          <thead>
            <tr>
              {RECORD[0].map((h) => (
                <th key={h} scope="col" className="label">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECORD.slice(1).map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} className={ci === 0 ? "serif record__lead" : ""}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ---------- FUTURE WORK — minimal, clearly-marked placeholder ---------- */
export function FutureWork() {
  return (
    <section id="work" className="sec shell" aria-labelledby="work-h">
      <div className="sec__head">
        <span className="section-index sec__index--ghost" data-reveal>—</span>
        <span className="label" data-reveal>Future work / portfolio</span>
      </div>
      <h2 id="work-h" className="sec__title sec__title--muted serif" data-reveal-lines>
        Selected projects, <span className="italic">forthcoming</span>
      </h2>
      <div className="work__slots">
        {["01", "02", "03"].map((n) => (
          <div className="work__slot" key={n} data-reveal aria-hidden>
            <span className="tick tl" />
            <span className="tick tr" />
            <span className="tick bl" />
            <span className="tick br" />
            <span className="label work__slot-n">{n}</span>
            <span className="label work__slot-label">project to come</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- 04 · CONTACT ---------- */
export function Contact() {
  return (
    <section id="contact" className="sec sec--contact shell" aria-labelledby="contact-h">
      <div className="sec__head">
        <span className="section-index" data-reveal>04</span>
        <span className="label" data-reveal>Contact</span>
      </div>
      <h2 id="contact-h" className="contact__line serif" data-reveal-lines>
        Let&apos;s make something <span className="italic">quiet</span><br />
        for work that&apos;s <span className="italic">loud</span>.
      </h2>
      <div className="contact__row">
        <a className="contact__email serif" href="mailto:hello@artiesweetman.com" data-cursor>
          hello@artiesweetman.com
        </a>
        <ul className="contact__links" aria-label="Elsewhere">
          {[
            ["Are.na", "[are.na URL]"],
            ["Instagram", "[instagram URL]"],
          ].map(([t, href]) => {
            const placeholder = href.startsWith("[");
            return (
              <li key={t}>
                {placeholder ? (
                  <a
                    className="label contact__link"
                    href={href}
                    aria-disabled
                    title={`${t} — link coming soon`}
                    onClick={(e) => e.preventDefault()}
                  >
                    {t} ↗
                  </a>
                ) : (
                  <a
                    className="label contact__link"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t} ↗
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer shell">
      <span className="footer__mark serif">Artie Sweetman</span>
      <span className="label">Ōtepoti Dunedin — Aotearoa NZ</span>
      <span className="label">
        <span className="footer-c">©</span> 2026 — v3
      </span>
    </footer>
  );
}
