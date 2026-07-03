/**
 * The visible structural grid — the single biggest "this is print, not a
 * website" signal. Fixed full-height column rules behind all content.
 * Fewer rules on small screens so it never fights the type.
 */
export function GridLines() {
  return (
    <div className="grid-lines grid12" aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="col-rule"
          data-hide-mobile={i % 2 === 1 ? "" : undefined}
        />
      ))}
    </div>
  );
}
