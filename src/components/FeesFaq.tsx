import { ChevronDown } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * The fee questions the homepage FAQ doesn't answer. The two it does — the
 * admission fee and the personal-training price — are deliberately not
 * repeated here; the same answer in two files is the same answer until
 * someone edits one of them.
 *
 * Native <details>, so it opens with a keyboard, opens without JavaScript,
 * and is findable by the browser's own in-page search even while closed.
 * There is no accordion library here and there does not need to be one.
 */
export function FeesFaq() {
  const copy = site.plansSection.faq;

  return (
    <section className="border-t border-iron-line py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="display max-w-[20ch] text-2xl text-bone md:text-4xl">{copy.heading}</h2>
        </Reveal>

        <Reveal delay={90}>
          <div className="mt-8 max-w-3xl divide-y divide-iron-line border-y border-iron-line">
            {site.membership.feesFaqs.map((faq) => (
              <details key={faq.q} className="group">
                {/* `list-none` kills the triangle everywhere except Safari,
                    which draws it from its own pseudo-element. */}
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-medium text-bone [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown
                    aria-hidden
                    className="size-5 shrink-0 text-smoke transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="pb-5 pr-10 text-sm leading-relaxed text-bone/85 md:text-base">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
