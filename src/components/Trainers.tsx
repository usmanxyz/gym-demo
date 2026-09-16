import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { site, type Trainer } from "@/content/site";
import { fillTemplate } from "@/lib/format";
import { classesForTrainer, weeklyClassCount } from "@/lib/trainers";
import { waLink } from "@/lib/wa";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * The three coaches, at either depth.
 *
 * None of the three photographs is a headshot — there is an arm reaching for
 * a dumbbell, a pair of wrapped hands, and a coach shot from behind while she
 * fixes someone's row. So the section never pretends to be portrait cards:
 * the crop is a tall detail from the floor and the name is set as type under
 * it, which is the honest arrangement and also the better-looking one.
 *
 * Every coach carries their own WhatsApp link. Asking for someone by name is
 * the most specific enquiry this site can send, and it costs a sentence.
 */
export function Trainers({ variant = "full" }: { variant?: "preview" | "full" }) {
  const copy = site.trainersSection;
  const preview = variant === "preview";

  return (
    <section id="trainers" className="border-t border-iron-line py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="display max-w-[20ch] text-3xl text-bone md:text-5xl">{copy.heading}</h2>
          <p className="mt-4 max-w-2xl text-smoke md:text-lg">{copy.subhead}</p>
        </Reveal>

        <Reveal delay={90}>
          {preview ? (
            <ul className="mt-8 grid gap-4 sm:grid-cols-3 md:mt-10 md:gap-6">
              {site.trainers.map((trainer) => (
                <PreviewCard key={trainer.slug} trainer={trainer} />
              ))}
            </ul>
          ) : (
            <ul className="mt-10 flex flex-col gap-12 md:mt-14 md:gap-16">
              {site.trainers.map((trainer) => (
                <TrainerRow key={trainer.slug} trainer={trainer} />
              ))}
            </ul>
          )}

          {preview ? (
            <Link
              href="/trainers"
              className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-bone underline decoration-iron-line underline-offset-4 transition-colors hover:decoration-bone"
            >
              {site.pages.trainers.viewAll}
            </Link>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}

/**
 * One coach in full. The crop is tall from md — a portrait shape for a
 * picture that is not a portrait — and stays 4:3 while the row is stacked,
 * because a 3:4 photo at phone width is taller than the screen.
 */
function TrainerRow({ trainer }: { trainer: Trainer }) {
  const copy = site.trainersSection;
  const classes = classesForTrainer(trainer);
  const count = weeklyClassCount(trainer);

  return (
    <li className="grid gap-6 border-t border-iron-line pt-8 first:border-t-0 first:pt-0 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-10 md:pt-12">
      <div className="relative aspect-4/3 md:aspect-3/4">
        <Image
          src={trainer.image}
          alt={trainer.alt}
          fill
          sizes="(min-width: 1024px) 25rem, (min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="min-w-0">
        <h3 className="display-tight text-2xl text-bone md:text-3xl">{trainer.name}</h3>
        <p className="mt-2 text-sm font-medium text-smoke">{trainer.role}</p>

        <p className="mt-5 max-w-2xl leading-relaxed text-bone/85">{trainer.specialty}</p>

        <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-5 border-y border-iron-line py-5 text-sm">
          <div>
            <dt className="text-smoke">{copy.experienceLabel}</dt>
            <dd className="numeral mt-1.5 text-base text-amber">{trainer.experience}</dd>
          </div>
          <div>
            <dt className="text-smoke">{copy.batchLabel}</dt>
            <dd className="mt-1.5 max-w-xs text-base text-bone/85">{trainer.batch}</dd>
          </div>
        </dl>

        {classes.length > 0 ? (
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-bone">{copy.boardLabel}</h4>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              <span className="numeral text-amber">
                {count === 1
                  ? copy.singleClassLabel
                  : fillTemplate(copy.classCountLabel, { count: String(count) })}
              </span>
              <span className="flex flex-wrap gap-1.5">
                {classes.map((coached) => (
                  <span
                    key={coached.type}
                    className="rounded-full bg-bone/10 px-2.5 py-0.5 text-xs font-medium text-bone/80"
                  >
                    {coached.label}
                  </span>
                ))}
              </span>
            </p>
          </div>
        ) : null}

        <h4 className="mt-6 text-sm font-semibold text-bone">{copy.certificationsLabel}</h4>
        <ul className="mt-3 flex max-w-2xl flex-col gap-2.5 text-sm">
          {trainer.certifications.map((certification) => (
            <li key={certification} className="flex gap-2.5">
              <Check className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden />
              <span className="text-bone/85">{certification}</span>
            </li>
          ))}
        </ul>

        <AskLink trainer={trainer} />
      </div>
    </li>
  );
}

/**
 * The homepage depth: the crop, the name under it, and the one link that
 * matters. No credentials — somebody scrolling the homepage is deciding
 * whether this place is coached at all, not which coach to book.
 */
function PreviewCard({ trainer }: { trainer: Trainer }) {
  return (
    <li className="flex flex-col">
      <div className="relative aspect-3/4">
        <Image
          src={trainer.image}
          alt={trainer.alt}
          fill
          sizes="(min-width: 768px) 24rem, 45vw"
          className="object-cover"
        />
      </div>

      <h3 className="display-tight mt-4 text-xl text-bone">{trainer.name}</h3>
      <p className="mt-1.5 text-sm text-smoke">{trainer.role}</p>

      <a
        href={waLink(trainer.waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex min-h-11 items-center gap-2 pt-3 text-sm font-medium text-bone underline decoration-iron-line underline-offset-4 transition-colors hover:decoration-bone"
      >
        <WhatsAppIcon className="size-4 shrink-0" aria-hidden />
        {askLabel(trainer)}
      </a>
    </li>
  );
}

/**
 * The page depth's version of the same link, as a button. Red fill, WhatsApp
 * glyph: the action colour says press this, the glyph says where it lands.
 */
function AskLink({ trainer }: { trainer: Trainer }) {
  return (
    <a
      href={waLink(trainer.waMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className="on-action mt-7 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-ui bg-wrap px-6 text-sm font-semibold text-white transition-colors hover:bg-wrap-deep"
    >
      <WhatsAppIcon className="size-4 shrink-0" aria-hidden />
      {askLabel(trainer)}
    </a>
  );
}

/**
 * "Ask for Bilal" — the first name, because that is what you would say at the
 * desk. Taken off `name` rather than off `boardName`: the board's spelling is
 * a key into the timetable, and a key is not a label.
 */
function askLabel(trainer: Trainer): string {
  return fillTemplate(site.trainersSection.askCta, { name: trainer.name.split(" ")[0] });
}
