import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * What goes in the bag. Short on purpose — the point of the list is how
 * little is on it, so padding it out would argue against itself.
 *
 * What happens during a first session is `firstVisit` on the homepage; this
 * only covers what to bring to one, so the two never restate each other.
 */
export function VisitBring() {
  const copy = site.visitSection.bring;

  return (
    <section id="bring" className="border-t border-iron-line py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="display max-w-[20ch] text-2xl text-bone md:text-4xl">{copy.heading}</h2>
          <p className="mt-4 max-w-2xl text-smoke md:text-lg">{copy.subhead}</p>
        </Reveal>

        <Reveal delay={90}>
          {/* One hairline between the items, drawn by the gap over the border
              colour — the same single-panel-split-in-four the payment methods
              use, so the two lists read as the same kind of thing. */}
          <dl className="mt-8 grid gap-px overflow-hidden rounded-ui border border-iron-line bg-iron-line md:mt-10 md:grid-cols-2">
            {site.visit.bring.map((item) => (
              <div key={item.title} className="bg-iron p-5 md:p-6">
                <dt className="display-tight text-base text-bone md:text-lg">{item.title}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-bone/85">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
