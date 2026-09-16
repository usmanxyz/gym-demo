import { Hero } from "@/components/Hero";
import { Schedule } from "@/components/Schedule";
import { TrialForm } from "@/components/TrialForm";

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

      <TrialForm />
    </>
  );
}
