import { Hero } from "@/components/Hero";
import { Schedule } from "@/components/Schedule";
import { site } from "@/content/site";

/**
 * The sections from SPEC.md land here one at a time, in order: hero,
 * programmes, schedule, plans, trainers, testimonials, gallery, free-trial
 * form, FAQ, location & timings.
 */
export default function Home() {
  return (
    <>
      <Hero />

      <Schedule />

      {/* Step 9 replaces this with the real free-trial form. It stands in for
          now so the hero's primary CTA has something to scroll to. */}
      <section id="book" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <h2 className="display text-3xl text-bone md:text-4xl">Book your free trial</h2>
        <p className="mt-4 max-w-xl text-smoke">
          The free-trial form goes here. Until then, message us on WhatsApp and we&rsquo;ll
          confirm a slot at {site.location.area}.
        </p>
      </section>
    </>
  );
}
