import { HashScroll } from "@/components/HashScroll";
import { Hero } from "@/components/Hero";
import { Plans } from "@/components/Plans";
import { Programmes } from "@/components/Programmes";
import { Schedule } from "@/components/Schedule";
import { Trainers } from "@/components/Trainers";
import { TrialForm } from "@/components/TrialForm";
import { VisitAddress } from "@/components/VisitAddress";

/**
 * The pitch, in one scroll.
 *
 * Every section between the hero and the form is the preview depth of a
 * component that renders in full on its own route, and each hands off with a
 * link rather than trying to carry the whole thing. The homepage's job is to
 * get a phone visitor to the free-trial form; the depth is one tap away for
 * the gym owner who wants to see it.
 *
 * Location keeps its place at the bottom, after the form, because a visitor
 * reading the address has already decided — it answers "where do I go?", not
 * "should I?".
 *
 * Still to come, in §2 order: testimonials and gallery between the trainers
 * and the form, the FAQ between the form and the location, and the sticky
 * mobile CTA bar. None of them has a page counterpart.
 */
export default function Home() {
  return (
    <>
      {/* The navbar's booking button arrives here from the other five pages. */}
      <HashScroll />

      <Hero />

      <Programmes variant="preview" />

      <Schedule variant="preview" />

      <Plans variant="preview" />

      <Trainers variant="preview" />

      <TrialForm />

      <VisitAddress variant="preview" />
    </>
  );
}
