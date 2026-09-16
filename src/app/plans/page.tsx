import type { Metadata } from "next";
import { BookingBand } from "@/components/BookingBand";
import { FeesFaq } from "@/components/FeesFaq";
import { PageHeader } from "@/components/PageHeader";
import { PaymentMethods } from "@/components/PaymentMethods";
import { PlanAddOns } from "@/components/PlanAddOns";
import { PlanPolicy } from "@/components/PlanPolicy";
import { Plans } from "@/components/Plans";
import { PlansComparison } from "@/components/PlansComparison";
import { site } from "@/content/site";

const page = site.pages.plans;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/plans" },
  // `robots: noindex` and the og image are inherited from the root layout;
  // only the parts that differ per page are set here.
  openGraph: {
    title: `${page.title} — ${site.name}`,
    description: page.description,
    url: "/plans",
  },
};

/**
 * Everything the gym charges for, in one place: the plans, the admission
 * fee, the add-ons, the policy and how to pay.
 *
 * Ordered by how much of a decision each block carries. The three prices
 * answer the question someone opened the page with; the comparison, the
 * add-ons and the small print are what they read once they have a plan in
 * mind. `Plans` is the one block that also appears on the homepage, at its
 * preview depth — everything below it exists only here.
 */
export default function PlansPage() {
  return (
    <>
      <PageHeader page="plans" />
      <Plans />
      <PlansComparison />
      <PlanAddOns />
      <PlanPolicy />
      <PaymentMethods />
      <FeesFaq />
      <BookingBand page="plans" />
    </>
  );
}
