import { site, type Review } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * Four members, in their own words.
 *
 * There are no face photographs in the image set, and inventing avatars for
 * quotes that are themselves written for a demo would be two dishonesties
 * stacked on one another. So the section is type only: the quote carries it,
 * and the attribution is a name, a neighbourhood and what they train.
 *
 * Nothing here is a number and nothing here is an action, so the section
 * spends neither accent — amber and red both sit this one out. That is what
 * keeps it quiet next to the board, which is the page's loud element.
 */
export function Testimonials() {
  const copy = site.reviewsSection;

  return (
    <section id="testimonials" className="border-t border-iron-line py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="display max-w-[20ch] text-3xl text-bone md:text-5xl">{copy.heading}</h2>
          <p className="mt-4 max-w-2xl text-smoke md:text-lg">{copy.subhead}</p>
        </Reveal>

        <Reveal delay={90}>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10 md:gap-6">
            {site.reviews.map((review) => (
              <QuoteCard key={review.name} review={review} />
            ))}
          </ul>

          <p className="mt-6 max-w-2xl text-sm text-smoke">{copy.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * One quote. `figure`/`blockquote`/`figcaption` is the markup a quote with an
 * attribution is actually for — the name is not part of what the member said,
 * and nesting it inside the blockquote would claim that it was.
 */
function QuoteCard({ review }: { review: Review }) {
  return (
    <li className="flex">
      <figure className="flex flex-col rounded-ui border border-iron-line bg-iron p-5 md:p-6">
        <blockquote className="leading-relaxed text-bone/90 md:text-lg">
          &ldquo;{review.quote}&rdquo;
        </blockquote>

        {/* Pushed to the bottom so the attributions line up across a row of
            cards whose quotes are not the same length. */}
        <figcaption className="mt-auto pt-5">
          <div className="border-t border-iron-line pt-4">
            <span className="display-tight block text-lg text-bone">{review.name}</span>
            <span className="mt-1 block text-sm text-smoke">
              {review.area}, {review.program}
            </span>
          </div>
        </figcaption>
      </figure>
    </li>
  );
}
