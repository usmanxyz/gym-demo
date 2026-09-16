import { site, type PageKey } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * The same short header on all five pages: the heading and one paragraph of
 * what the page is for, and nothing else.
 *
 * Deliberately not a hero. The homepage earns a full-bleed photograph because
 * it has to stop someone scrolling past; a page someone chose to open does
 * not, and a second photo-with-overlay here would push the actual content —
 * the timetable, the fees — below the fold on a phone for no gain.
 */
export function PageHeader({ page }: { page: PageKey }) {
  const { heading, intro } = site.pages[page].header;

  return (
    <div className="border-b border-iron-line">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <Reveal>
          <h1 className="display max-w-[22ch] text-[2.25rem] text-bone sm:text-5xl lg:text-6xl">
            {heading}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-bone/85 md:mt-6 md:text-xl">
            {intro}
          </p>
        </Reveal>
      </div>
    </div>
  );
}
