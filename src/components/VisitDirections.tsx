import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * Four ways of arriving at the same door.
 *
 * An unordered list, not a numbered one. These are alternatives — the two
 * approach roads, the sign to look for, and the one that tells you you have
 * overshot — and numbering them would promise a sequence that isn't there.
 * The numerals on this site are reserved for real sequences and real figures.
 */
export function VisitDirections() {
  const copy = site.visitSection.directions;

  return (
    <section className="border-t border-iron-line py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="display max-w-[20ch] text-2xl text-bone md:text-4xl">{copy.heading}</h2>
          <p className="mt-4 max-w-2xl text-smoke md:text-lg">{copy.subhead}</p>
        </Reveal>

        <Reveal delay={90}>
          <ul className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2">
            {site.location.directions.map((step) => (
              <li
                key={step}
                className="flex gap-3 rounded-ui border border-iron-line bg-iron p-5 text-sm leading-relaxed text-bone/85 md:p-6 md:text-base"
              >
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-amber" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
