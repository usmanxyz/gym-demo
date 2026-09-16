import { Check, Minus } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * The comparison table. Lives only on /plans: the homepage preview's job is
 * "is this for me?", and nobody reads a nine-row grid to answer that.
 *
 * It is a real <table> with real headers, so a screen reader announces which
 * plan a tick belongs to. A tick alone would leave that meaning in the
 * geometry, which is why every cell also carries a visually hidden word.
 *
 * Below md the table scrolls inside its own box rather than squeezing four
 * columns into 375px. The page itself never scrolls sideways; the plan cards
 * above already carry the same information stacked, so this is the second
 * reading of it, not the only one.
 */
export function PlansComparison() {
  const copy = site.plansSection.compare;
  const { plans, compare } = site.membership;

  return (
    <section className="border-t border-iron-line py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="display max-w-[20ch] text-2xl text-bone md:text-4xl">{copy.heading}</h2>
          <p className="mt-4 max-w-2xl text-smoke md:text-lg">{copy.subhead}</p>
        </Reveal>

        <Reveal delay={90}>
          <div className="mt-8 overflow-x-auto rounded-ui border border-iron-line md:mt-10">
            <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
              <caption className="sr-only">{copy.heading}</caption>
              <thead>
                <tr className="bg-iron">
                  <th scope="col" className="px-4 py-3.5 font-medium text-smoke md:px-5">
                    {copy.rowHeading}
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.slug}
                      scope="col"
                      className="w-[8.5rem] px-4 py-3.5 text-center font-semibold text-bone md:px-5"
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compare.map((row) => (
                  <tr key={row.label} className="border-t border-iron-line">
                    <th
                      scope="row"
                      className="px-4 py-3.5 font-normal text-bone/85 md:px-5"
                    >
                      {row.label}
                    </th>
                    {plans.map((plan) => (
                      <td key={plan.slug} className="px-4 py-3.5 text-center md:px-5">
                        <Cell value={row.plans[plan.slug]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * A tick, a dash, or the detail itself. The detail is a number about what you
 * get, so it wears the information colour; a tick is not a number and stays
 * quiet in bone.
 */
function Cell({ value }: { value: boolean | string }) {
  const copy = site.plansSection.compare;

  if (value === true) {
    return (
      <>
        <Check className="mx-auto size-4.5 text-bone" aria-hidden />
        <span className="sr-only">{copy.yes}</span>
      </>
    );
  }

  if (value === false) {
    return (
      <>
        <Minus className="mx-auto size-4 text-smoke/60" aria-hidden />
        <span className="sr-only">{copy.no}</span>
      </>
    );
  }

  return <span className="numeral text-[0.9375rem] text-amber">{value}</span>;
}
