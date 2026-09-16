import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * The three ways money actually changes hands here — cash at the desk, a bank
 * transfer, or JazzCash and Easypaisa. No card rail, because the gym has no
 * terminal and implying one would misrepresent how the business runs.
 */
export function PaymentMethods() {
  const copy = site.plansSection.payment;

  return (
    <section className="border-t border-iron-line py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="display max-w-[20ch] text-2xl text-bone md:text-4xl">{copy.heading}</h2>
          <p className="mt-4 max-w-2xl text-smoke md:text-lg">{copy.subhead}</p>
        </Reveal>

        <Reveal delay={90}>
          {/* One hairline between the three, drawn by the gap over the border
              colour, so the block reads as a single panel split in three
              rather than three cards that happen to be touching. */}
          <dl className="mt-8 grid gap-px overflow-hidden rounded-ui border border-iron-line bg-iron-line md:mt-10 md:grid-cols-3">
            {site.membership.payment.map((option) => (
              <div key={option.method} className="bg-iron p-5 md:p-6">
                <dt className="display-tight text-base text-bone md:text-lg">{option.method}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-bone/85">{option.detail}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
