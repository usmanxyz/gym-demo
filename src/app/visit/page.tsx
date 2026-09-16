import type { Metadata } from "next";
import { BookingBand } from "@/components/BookingBand";
import { PageHeader } from "@/components/PageHeader";
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
 */
export default function VisitPage() {
  return (
    <>
      <PageHeader page="visit" />
      <BookingBand page="visit" />
    </>
  );
}
