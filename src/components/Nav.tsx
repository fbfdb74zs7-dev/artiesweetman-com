import "./nav.css";

const LINKS = [
  { label: "index", href: "#top" },
  { label: "approach", href: "#approach" },
  { label: "craft", href: "#craft" },
  { label: "contact", href: "#contact" },
];

export function Nav() {
  return (
    <header className="nav" data-reveal-nav>
      <a href="#top" className="nav__mark serif" aria-label="Artie Sweetman — home">
        AS
      </a>
      <nav className="nav__links" aria-label="Primary">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="label nav__link">
            {l.label}
          </a>
        ))}
      </nav>
      <span className="label nav__meta">Dunedin — Aotearoa</span>
    </header>
  );
}
