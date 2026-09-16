import { site } from "@/content/site";
import { formatTime } from "@/lib/format";

/**
 * Holding page. The sections from SPEC.md land here one at a time, in order:
 * hero, programmes, schedule, plans, trainers, testimonials, gallery,
 * free-trial form, FAQ, location & timings.
 */
export default function Home() {
  const gents = site.hours.gents.mon;
  const ladies = site.hours.ladies.mon;

  return (
    <div id="top" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
      <p className="text-smoke">
        {site.location.area}, {site.location.city}
      </p>
      <h1 className="display mt-4 text-5xl text-bone sm:text-7xl lg:text-8xl">
        {site.hero.headline}
      </h1>
      <p className="mt-6 max-w-xl text-lg text-smoke">{site.hero.subhead}</p>

      <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-4">
        {gents ? (
          <div>
            <dt className="text-sm text-smoke">Open today</dt>
            <dd className="numeral mt-1 text-lg text-amber">
              {formatTime(gents.open)} – {formatTime(gents.close)}
            </dd>
          </div>
        ) : null}
        {ladies ? (
          <div>
            <dt className="text-sm text-smoke">Ladies only</dt>
            <dd className="numeral mt-1 text-lg text-amber">
              {formatTime(ladies.open)} – {formatTime(ladies.close)}
            </dd>
          </div>
        ) : null}
      </dl>
    </div>
  );
}
