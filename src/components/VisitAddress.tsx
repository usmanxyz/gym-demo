import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { waLink } from "@/lib/wa";
import { AreaMap } from "./AreaMap";
import { FloorTables } from "./HoursTable";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Where the gym is, and the three ways to do something about it.
 *
 * The address and the second column sit side by side from md rather than
 * stacked, because they are one answer told twice — the words for somebody
 * copying it into a message, and beside them the thing that visitor still
 * needs to know.
 *
 * What that second thing is, is the difference between the two depths. On
 * /visit it is the schematic of the block, for somebody picturing the turn.
 * On the homepage it is the two timing tables, because a visitor who has not
 * committed to the drive yet is asking whether the hours suit them at all —
 * and the map is waiting on the page this one links to.
 *
 * "Get directions" leaves for Google Maps and the other two are the gym's own
 * channels, so only the WhatsApp one carries the action colour. Three red
 * buttons in a row would make none of them the thing to press.
 */
export function VisitAddress({ variant = "full" }: { variant?: "preview" | "full" }) {
  const copy = site.visitSection.address;
  const location = site.location;
  const preview = variant === "preview";

  return (
    <section
      id={preview ? "location" : "address"}
      className="border-t border-iron-line py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          {/* Larger at preview depth: on the homepage this is a section
              heading among its peers, on /visit it sits under the page
              header and must not compete with it. */}
          <h2
            className={`display max-w-[20ch] text-bone ${
              preview ? "text-3xl md:text-5xl" : "text-2xl md:text-4xl"
            }`}
          >
            {preview ? copy.preview.heading : copy.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-smoke md:text-lg">
            {preview ? copy.preview.subhead : copy.subhead}
          </p>
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

            {preview ? <PreviewHours /> : <AreaMap />}
          </div>

          {preview ? (
            <Link
              href="/visit"
              className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-bone underline decoration-iron-line underline-offset-4 transition-colors hover:decoration-bone"
            >
              {site.pages.visit.viewAll}
            </Link>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}

/**
 * The homepage's second column: both floors' weeks, stacked because the
 * column is half a page wide, and under them the notes that qualify the
 * times — the Jummah break among them, which is the one a visitor cannot
 * work out from a table of opening hours.
 *
 * Plain lines rather than the bordered box /visit gives them. The tables are
 * already two bordered blocks in a narrow column; a third would turn the
 * section into a stack of rectangles.
 */
function PreviewHours() {
  const copy = site.visitSection.address.preview;

  return (
    <div className="min-w-0">
      <h3 className="display-tight text-lg text-bone md:text-xl">{copy.hoursHeading}</h3>

      <FloorTables className="mt-4 grid gap-4" />

      <ul className="mt-5 flex flex-col gap-2.5 text-sm leading-relaxed text-bone/85">
        {site.hours.notes.map((note) => (
          <li key={note} className="flex gap-3">
            <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-amber" />
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
