import Image from "next/image";
import Link from "next/link";
import {
  AUDIENCE_LABELS,
  DAY_LABELS,
  DAY_ORDER,
  site,
  type Program,
} from "@/content/site";
import { daysForProgramme } from "@/lib/programmes";
import { IntensityMeter } from "./IntensityMeter";
import { Reveal } from "./Reveal";

/**
 * The five programmes, at either depth.
 *
 * Full depth is a stack of wide rows rather than a grid of cards: each
 * programme gets a photograph on one side and, on the other, the four things
 * somebody decides on — who it is for, how long, how hard, and which days.
 * Three columns of that on a desktop would set the session walkthrough in a
 * 30-character measure and bury the thing the page exists to say.
 *
 * Preview depth is the grid, because the homepage is answering a different
 * question: not "what happens in a boxing class?" but "is there something
 * here for me?".
 */
export function Programmes({ variant = "full" }: { variant?: "preview" | "full" }) {
  const copy = site.programmesSection;
  const preview = variant === "preview";

  return (
    <section id="programmes" className="border-t border-iron-line py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="display max-w-[20ch] text-3xl text-bone md:text-5xl">{copy.heading}</h2>
          <p className="mt-4 max-w-2xl text-smoke md:text-lg">{copy.subhead}</p>
        </Reveal>

        <Reveal delay={90}>
          {preview ? (
            <ul className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 lg:grid-cols-3">
              {site.programmes.map((programme) => (
                <PreviewCard key={programme.slug} programme={programme} />
              ))}
            </ul>
          ) : (
            <ul className="mt-10 flex flex-col gap-12 md:mt-14 md:gap-16">
              {site.programmes.map((programme) => (
                <ProgrammeRow key={programme.slug} programme={programme} />
              ))}
            </ul>
          )}

          {preview ? (
            <Link
              href="/programmes"
              className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-bone underline decoration-iron-line underline-offset-4 transition-colors hover:decoration-bone"
            >
              {site.pages.programmes.viewAll}
            </Link>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}

/**
 * One programme in full. The photograph keeps its square corners — it is
 * photography, not chrome — and the facts sit in a bordered strip under the
 * blurb so the eye can find the session length without reading the paragraph.
 */
function ProgrammeRow({ programme }: { programme: Program }) {
  const copy = site.programmesSection;
  const days = daysForProgramme(programme);

  return (
    <li className="grid gap-6 border-t border-iron-line pt-8 first:border-t-0 first:pt-0 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10 md:pt-12">
      {/* 4:3 while the row is stacked, then full-height from md: as a grid
          child it stretches to whatever the text column needs, so the photo
          column never ends halfway down a paragraph. */}
      <div className="relative aspect-4/3 md:aspect-auto md:h-full md:min-h-80">
        <Image
          src={programme.image}
          alt={programme.alt}
          fill
          sizes="(min-width: 1024px) 34rem, (min-width: 768px) 40vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h3 className="display-tight text-2xl text-bone md:text-3xl">{programme.name}</h3>
          {programme.audience === "ladies" ? (
            <span className="rounded-full bg-amber/15 px-2.5 py-0.5 text-xs font-medium text-amber">
              {copy.ladiesLabel}
            </span>
          ) : null}
        </div>

        <p className="mt-4 max-w-2xl leading-relaxed text-bone/85">{programme.blurb}</p>

        <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-5 border-y border-iron-line py-5 text-sm">
          <div>
            <dt className="text-smoke">{copy.durationLabel}</dt>
            <dd className={`mt-1.5 text-base text-amber ${isFigure(programme.duration) ? "numeral" : ""}`}>
              {programme.duration}
            </dd>
          </div>
          <div>
            <dt className="text-smoke">{copy.intensityLabel}</dt>
            <dd className="mt-1.5 text-base">
              <IntensityMeter intensity={programme.intensity} />
            </dd>
          </div>
          <div>
            <dt className="text-smoke">{copy.daysLabel}</dt>
            <dd className="mt-1.5">
              <Days days={days} />
            </dd>
          </div>
        </dl>

        <h4 className="mt-6 text-sm font-semibold text-bone">{copy.forWhoHeading}</h4>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-bone/85">{programme.forWho}</p>

        <h4 className="mt-6 text-sm font-semibold text-bone">{copy.sessionHeading}</h4>
        {/* An ordered list because a session is genuinely a sequence, with the
            markers off: the page spends its numerals on real figures — times,
            rupees, kilos — and a set of 1–4 here would compete with them. */}
        <ol className="mt-3 flex max-w-2xl list-none flex-col gap-3 text-sm leading-relaxed">
          {programme.session.map((step) => (
            <li key={step} className="flex gap-3">
              <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-amber/70" />
              <span className="text-bone/85">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </li>
  );
}

/**
 * Whether a session length is a number of minutes or a phrase.
 *
 * The numeral face is reserved for real figures — times, rupees, kilos — and
 * the ladies' floor answers "how long?" with "Open floor + classes", which is
 * a sentence wearing a measurement's label. It keeps the information colour,
 * because that is what it is, and gives up the display numerals.
 */
function isFigure(duration: string): boolean {
  return /^\d/.test(duration);
}

/**
 * Which days it runs, as day names rather than a count. Seven of them
 * collapses to a single word — a row of every abbreviation in the week says
 * "every day" in seven times the space and takes longer to read.
 */
function Days({ days }: { days: ReturnType<typeof daysForProgramme> }) {
  const copy = site.programmesSection;

  if (days.length === 0) return <span className="text-base text-bone/85">{copy.noDaysLabel}</span>;

  if (days.length === DAY_ORDER.length)
    return <span className="text-base text-bone/85">{copy.everyDayLabel}</span>;

  return (
    <ul className="flex flex-wrap gap-1.5">
      {days.map((day) => (
        <li
          key={day}
          className="rounded-full bg-bone/10 px-2.5 py-0.5 text-xs font-medium text-bone/80"
        >
          {DAY_LABELS[day].short}
        </li>
      ))}
    </ul>
  );
}

/**
 * The homepage depth: the photo, the name, the sentence, and the two facts
 * that decide whether to read further — how long it takes and whose hours it
 * runs in.
 */
function PreviewCard({ programme }: { programme: Program }) {
  const copy = site.programmesSection;

  return (
    <li className="flex flex-col">
      <div className="relative aspect-4/3">
        <Image
          src={programme.image}
          alt={programme.alt}
          fill
          sizes="(min-width: 1024px) 24rem, (min-width: 768px) 45vw, 100vw"
          className="object-cover"
        />
      </div>

      <h3 className="display-tight mt-4 text-xl text-bone">{programme.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-bone/85">{programme.blurb}</p>

      <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <span className="numeral text-amber">{programme.duration}</span>
        <span className="text-smoke">
          {programme.audience === "ladies"
            ? copy.ladiesLabel
            : `${AUDIENCE_LABELS[programme.audience]}, all hours`}
        </span>
      </p>
    </li>
  );
}
