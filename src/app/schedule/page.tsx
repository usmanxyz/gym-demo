import type { Metadata } from "next";
import { BookingBand } from "@/components/BookingBand";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/content/site";

const page = site.pages.schedule;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/schedule" },
  // `robots: noindex` and the og image are inherited from the root layout;
  // only the parts that differ per page are set here.
  openGraph: {
    title: `${page.title} — ${site.name}`,
    description: page.description,
    url: "/schedule",
  },
};

/**
 * The whole week, with the filters the homepage preview leaves out, plus
 * both floors' timings and the notes that qualify them.
 */
export default function SchedulePage() {
  return (
    <>
      <PageHeader page="schedule" />
      <BookingBand page="schedule" />
    </>
  );
}
