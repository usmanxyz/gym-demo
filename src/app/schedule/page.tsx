import type { Metadata } from "next";
import { BookingBand } from "@/components/BookingBand";
import { HoursTable } from "@/components/HoursTable";
import { PageHeader } from "@/components/PageHeader";
import { Schedule } from "@/components/Schedule";
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
 *
 * The board first, because a visitor who opened the timetable came for the
 * classes; the gym-floor hours sit under it for the people who train on their
 * own, and answer the second question rather than competing with the first.
 * `Schedule` is the one block that also appears on the homepage, at preview
 * depth — `HoursTable` exists here and on /visit.
 */
export default function SchedulePage() {
  return (
    <>
      <PageHeader page="schedule" />
      <Schedule />
      <HoursTable />
      <BookingBand page="schedule" />
    </>
  );
}
