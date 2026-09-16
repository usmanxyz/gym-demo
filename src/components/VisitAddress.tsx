import { MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { waLink } from "@/lib/wa";
import { AreaMap } from "./AreaMap";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Where the gym is, and the three ways to do something about it.
 *
 * The address and the drawing sit side by side from md rather than stacked,
 * because they are one answer told twice — the words for somebody copying it
 * into a message, the schematic for somebody picturing the turn.
 *
 * "Get directions" leaves for Google Maps and the other two are the gym's own
 * channels, so only the WhatsApp one carries the action colour. Three red
 * buttons in a row would make none of them the thing to press.
 */
export function VisitAddress() {
  const copy = site.visitSection.address;
  const location = site.location;

  return (
    <section id="address" className="border-t border-iron-line py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="display max-w-[20ch] text-2xl text-bone md:text-4xl">{copy.heading}</h2>
          <p className="mt-4 max-w-2xl text-smoke md:text-lg">{copy.subhead}</p>
        </Reveal>

        <Reveal delay={90}>
          <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-2 md:gap-10">
            <div className="min-w-0">
              <address className="display-tight text-xl not-italic text-bone md:text-2xl">
                {location.line1}
                <br />
                {location.area}
                <br />
                {location.city}
              </address>

              <dl className="mt-7 flex flex-col gap-5 border-t border-iron-line pt-6 text-sm">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden />
                  <div>
                    <dt className="text-smoke">{copy.landmarkLabel}</dt>
                    <dd className="mt-1 leading-relaxed text-bone/85">{location.landmark}</dd>
                  </div>
                </div>

                <div className="flex gap-3">
                  {/* No glyph on this one — the icons mark the two things you
                      look for on arrival, and parking is a fact about them. */}
                  <span aria-hidden className="mt-2 ml-1 size-1.5 shrink-0 rounded-full bg-amber" />
                  <div>
                    <dt className="text-smoke">{copy.parkingLabel}</dt>
                    <dd className="mt-1 leading-relaxed text-bone/85">{location.parking}</dd>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden />
                  <div>
                    <dt className="text-smoke">{copy.phoneLabel}</dt>
                    <dd className="numeral mt-1 text-base text-amber">
                      <a href={`tel:${site.contact.phone}`} className="hover:underline">
                        {site.contact.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={waLink(copy.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="on-action flex min-h-12 items-center justify-center gap-2.5 rounded-ui bg-wrap px-6 text-sm font-semibold text-white transition-colors hover:bg-wrap-deep"
                >
                  <WhatsAppIcon className="size-4 shrink-0" aria-hidden />
                  {copy.waCta}
                </a>
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center gap-2.5 rounded-ui border border-iron-line bg-iron px-6 text-sm font-medium text-bone transition-colors hover:border-bone/40"
                >
                  <MapPin className="size-4 shrink-0" aria-hidden />
                  {copy.directionsCta}
                </a>
                <a
                  href={`tel:${site.contact.phone}`}
                  className="flex min-h-12 items-center justify-center gap-2.5 rounded-ui border border-iron-line bg-iron px-6 text-sm font-medium text-bone transition-colors hover:border-bone/40"
                >
                  <Phone className="size-4 shrink-0" aria-hidden />
                  {copy.callCta}
                </a>
              </div>
            </div>

            <AreaMap />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
