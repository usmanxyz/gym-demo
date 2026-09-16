import { Phone } from "lucide-react";
import { site, type PageKey } from "@/content/site";
import { fillTemplate } from "@/lib/format";
import { waLink } from "@/lib/wa";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Closes every page. The site has one job and this is it, so no page is
 * allowed to end without it.
 *
 * The prefilled message names the page it came from. That costs nothing and
 * tells whoever picks up the phone what the visitor had just been reading —
 * a fee question or a timetable question arrives already half answered.
 *
 * Red fill with the WhatsApp glyph on it, matching the form's submit button:
 * the action colour says this is the thing to press, and the glyph says where
 * pressing it lands. Amber stays off it, as it stays off every button here.
 */
export function BookingBand({ page }: { page: PageKey }) {
  const band = site.bookingBand;
  const message = fillTemplate(band.waTemplate, { page: site.pages[page].from });

  return (
    <section className="border-t border-iron-line bg-iron">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <Reveal>
          <h2 className="display max-w-[20ch] text-3xl text-bone md:text-4xl">
            {band.heading}
          </h2>
          <p className="mt-4 max-w-xl text-smoke md:text-lg">{band.body}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={waLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="on-action flex min-h-14 items-center justify-center gap-2.5 rounded-ui bg-wrap px-7 text-base font-semibold text-white transition-colors hover:bg-wrap-deep"
            >
              <WhatsAppIcon className="size-5 shrink-0" aria-hidden />
              {band.cta}
            </a>
            <a
              href={`tel:${site.contact.phone}`}
              className="flex min-h-14 items-center justify-center gap-2.5 rounded-ui border border-iron-line bg-ink/40 px-7 text-base font-medium text-bone transition-colors hover:border-bone/40"
            >
              <Phone className="size-4 shrink-0" aria-hidden />
              {band.callCta}
              <span className="tabular-nums text-bone/65">{site.contact.phoneDisplay}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
