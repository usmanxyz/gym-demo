import type { Metadata } from "next";
import { BookingBand } from "@/components/BookingBand";
import { HoursTable } from "@/components/HoursTable";
import { PageHeader } from "@/components/PageHeader";
import { VisitAddress } from "@/components/VisitAddress";
import { VisitBring } from "@/components/VisitBring";
import { VisitDirections } from "@/components/VisitDirections";
import { site } from "@/content/site";

const page = site.pages.visit;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/visit" },
  // `robots: noindex` and the og image are inherited from the root layout;
  // only the parts that differ per page are set here.
  openGraph: {
    title: `${page.title} — ${site.name}`,
    description: page.description,
    url: "/visit",
  },
};

/**
 * How to actually get here: the address and landmark, a map of the area,
 * the hours, the parking and what to bring.
 *
 * Ordered as the journey happens. Where it is and how to get in come first,
 * then when to set off, then what to put in the bag — a visitor who has not
 * decided to come yet is on another page. `HoursTable` is the one block here
 * that is not page-only; it also sits under the board on /schedule, which is
 * why it lives in its own component rather than inside either route.
 */
export default function VisitPage() {
  return (
    <>
      <PageHeader page="visit" />
      <VisitAddress />
      <VisitDirections />
      <HoursTable />
      <VisitBring />
      <BookingBand page="visit" />
    </>
  );
}
