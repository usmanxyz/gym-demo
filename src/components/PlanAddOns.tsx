import { site } from "@/content/site";
import { formatPKR } from "@/lib/format";
import { Reveal } from "./Reveal";

/**
 * Personal training and the diet plan, priced next to each other.
 *
 * Personal training used to be one figure inside the membership block, which
 * made the more expensive of the two read like part of a membership. Priced
 * as add-ons, side by side, it is obvious they are extra and optional.
 */
export function PlanAddOns() {
  const copy = site.plansSection.addOns;

  return (
    <section className="border-t border-iron-line py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="display max-w-[20ch] text-2xl text-bone md:text-4xl">{copy.heading}</h2>
          <p className="mt-4 max-w-2xl text-smoke md:text-lg">{copy.subhead}</p>
        </Reveal>

        <Reveal delay={90}>
          <ul className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2">
            {site.membership.addOns.map((addOn) => (
              <li
                key={addOn.slug}
                className="rounded-ui border border-iron-line bg-iron p-5 md:p-6"
              >
                <h3 className="display-tight text-lg text-bone md:text-xl">{addOn.name}</h3>
                <p className="mt-3 flex items-baseline gap-2">
                  <span className="numeral text-3xl text-amber md:text-4xl">
                    {formatPKR(addOn.pricePKR)}
                  </span>
                  <span className="text-sm text-smoke">{addOn.period}</span>
                </p>
                <p className="mt-4 text-sm leading-relaxed text-bone/85">{addOn.blurb}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
