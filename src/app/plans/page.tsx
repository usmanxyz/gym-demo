import type { Metadata } from "next";
import { BookingBand } from "@/components/BookingBand";
import { PageHeader } from "@/components/PageHeader";
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
 */
export default function PlansPage() {
  return (
    <>
      <PageHeader page="plans" />
      <BookingBand page="plans" />
    </>
  );
}
