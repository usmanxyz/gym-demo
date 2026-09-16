import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * Freezing, stopping and refunds, in plain sentences on the page rather than
 * in a terms document nobody opens. A gym site that hides its own small print
 * is demonstrating the wrong thing to a gym owner.
 */
export function PlanPolicy() {
  const copy = site.plansSection.policy;

  return (
    <section className="border-t border-iron-line py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="display max-w-[20ch] text-2xl text-bone md:text-4xl">{copy.heading}</h2>
          <p className="mt-4 max-w-2xl text-smoke md:text-lg">{copy.subhead}</p>
        </Reveal>

        <Reveal delay={90}>
          <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2">
            {site.membership.policy.map((group) => (
              <div
                key={group.heading}
                className="rounded-ui border border-iron-line bg-iron p-5 md:p-6"
              >
                <h3 className="display-tight text-lg text-bone md:text-xl">{group.heading}</h3>
                <ul className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-bone/85">
                  {group.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-amber" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
