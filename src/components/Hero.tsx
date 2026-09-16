import Image from "next/image";
import { site } from "@/content/site";
import { waLink } from "@/lib/wa";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * The gym floor at night, full-bleed to the viewport edge with hard corners,
 * and one job: get a thumb onto "Claim your free trial".
 *
 * The photo is dark already but unevenly — the red LED strips blow out the top
 * right. Two overlays rather than one flat scrim: a vertical ramp that anchors
 * the type block, and a flat wash that holds the whole frame down so the
 * headline clears contrast wherever the photo happens to be bright.
 *
 * Pulled up under the fixed navbar (which is transparent until you scroll), so
 * the photograph starts at the top of the viewport instead of below the bar.
 */
export function Hero() {
  const { headline, subhead, primaryCta, secondaryCta, stats } = site.hero;

  return (
    <section
      id="top"
      className="relative -mt-16 flex min-h-[38rem] flex-col justify-end overflow-hidden md:-mt-20 md:min-h-[44rem] lg:min-h-[85vh]"
    >
      <Image
        src={site.heroImage.src}
        alt={site.heroImage.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Dark overlay, in three thin passes rather than one flat scrim: a ramp
          up from the bottom that carries the type block, a left-hand wash that
          protects the left-aligned text without flattening the right half of
          the room, and a light overall knock-down. Enough to clear contrast,
          little enough that the racks and the red strips still read. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/25 to-transparent"
      />
      <div aria-hidden className="absolute inset-0 bg-ink/10" />
      {/* The navbar is transparent over the photo, and the ceiling lights sit
          right behind the phone number. This gives the bar something to sit on. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/85 via-ink/45 to-transparent"
      />
      {/* Hands the section off to the page ground with no visible seam. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 pt-32 md:px-8 md:pb-20 md:pt-40">
        <h1 className="display max-w-[16ch] text-[2.5rem] text-bone sm:text-6xl lg:text-7xl">
          {headline}
        </h1>

        <p className="mt-5 max-w-xl text-lg leading-relaxed text-bone/85 md:mt-6 md:text-xl">
          {subhead}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-10">
          <a
            href="#book"
            className="rounded-ui bg-wrap px-7 py-4 text-center text-base font-semibold text-bone transition-colors hover:bg-wrap-hot"
          >
            {primaryCta}
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 rounded-ui bg-whatsapp px-7 py-4 text-base font-semibold text-ink transition-colors hover:bg-whatsapp-hot"
          >
            <WhatsAppIcon className="size-5 shrink-0" />
            {secondaryCta}
          </a>
        </div>

        {/* Real figures, so they wear the information colour. */}
        <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-3 border-t border-bone/15 pt-7 md:mt-14 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="numeral block text-3xl leading-none text-amber md:text-4xl">
                  {stat.value}
                </span>
                <span
                  aria-hidden
                  className="mt-2 block text-[0.8125rem] leading-snug text-smoke md:text-[0.95rem]"
                >
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
