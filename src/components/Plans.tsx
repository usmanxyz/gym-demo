import Link from "next/link";
import { Check } from "lucide-react";
import { site, type Plan } from "@/content/site";
import { fillTemplate, formatPKR } from "@/lib/format";
import { waLink } from "@/lib/wa";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * The three memberships, at either depth.
 *
 * The admission fee sits above the cards rather than in a footnote under
 * them. It is the one charge that is easy to hide and the one a visitor most
 * resents finding late, so it is stated once, first, in the information
 * colour — and then never restated as a figure anywhere else on the page.
 *
 * Prices are the page's loudest numbers, so they wear the numeral face in
 * amber. The buttons under them are red. That is the whole palette rule in
 * one component: amber says what it costs, red is how you act on it.
 */
export function Plans({ variant = "full" }: { variant?: "preview" | "full" }) {
  const copy = site.plansSection;
  const { admissionFeePKR, admissionNote, plans } = site.membership;
  const preview = variant === "preview";

  return (
    <section id="plans" className="border-t border-iron-line py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="display max-w-[20ch] text-3xl text-bone md:text-5xl">{copy.heading}</h2>
          <p className="mt-4 max-w-2xl text-smoke md:text-lg">{copy.subhead}</p>
        </Reveal>

        <Reveal delay={90}>
          <div className="mt-8 flex flex-col gap-x-6 gap-y-2 rounded-ui border border-iron-line bg-iron p-5 sm:flex-row sm:items-baseline md:mt-10 md:p-6">
            <p className="numeral shrink-0 text-2xl text-amber md:text-3xl">
              {formatPKR(admissionFeePKR)}
            </p>
            <p className="max-w-3xl text-sm leading-relaxed text-bone/85 md:text-base">
              {admissionNote}
            </p>
          </div>

          <ul className="mt-6 grid gap-4 md:mt-8 md:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.slug} plan={plan} preview={preview} />
            ))}
          </ul>

          {preview ? (
            <Link
              href="/plans"
              className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-bone underline decoration-iron-line underline-offset-4 transition-colors hover:decoration-bone"
            >
              {site.pages.plans.viewAll}
            </Link>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}

/**
 * One membership. The featured plan is marked with a label and a brighter
 * edge rather than a different size — a card that grows taller than its
 * neighbours breaks the row on a phone, where they are stacked anyway and
 * "bigger" means nothing.
 */
function PlanCard({ plan, preview }: { plan: Plan; preview: boolean }) {
  const copy = site.plansSection;
  const message = fillTemplate(copy.waTemplate, { plan: plan.name });

  return (
    <li
      className={`flex flex-col rounded-ui border bg-iron p-5 md:p-6 ${
        plan.featured ? "border-bone/30" : "border-iron-line"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="display-tight text-xl text-bone md:text-2xl">{plan.name}</h3>
        {plan.featured ? (
          <span className="rounded-full border border-amber/40 px-2.5 py-0.5 text-xs font-medium text-amber">
            {copy.featuredLabel}
          </span>
        ) : null}
      </div>

      <p className="numeral mt-4 text-4xl text-amber md:text-5xl">{formatPKR(plan.pricePKR)}</p>
      <p className="mt-1.5 text-sm text-smoke">{plan.period}</p>
      <p className="mt-4 text-sm leading-relaxed text-bone/85">{plan.blurb}</p>

      {preview ? null : (
        <ul className="mt-5 mb-6 flex flex-col gap-2.5 border-t border-iron-line pt-5 text-sm">
          {plan.includes.map((item) => (
            <li key={item} className="flex gap-2.5">
              <Check className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden />
              <span className="text-bone/85">{item}</span>
            </li>
          ))}
        </ul>
      )}

      {preview ? null : (
        <a
          href={waLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto flex min-h-12 items-center justify-center gap-2.5 rounded-ui px-5 text-sm font-semibold transition-colors ${
            plan.featured
              ? "on-action bg-wrap text-white hover:bg-wrap-deep"
              : "border border-iron-line bg-ink/40 text-bone hover:border-bone/40"
          }`}
        >
          <WhatsAppIcon className="size-4 shrink-0" aria-hidden />
          {copy.planCta}
        </a>
      )}
    </li>
  );
}
