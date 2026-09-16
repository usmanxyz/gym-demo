import type { Metadata } from "next";
import { BookingBand } from "@/components/BookingBand";
import { PageHeader } from "@/components/PageHeader";
import { Programmes } from "@/components/Programmes";
import { site } from "@/content/site";

const page = site.pages.programmes;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/programmes" },
  // `robots: noindex` and the og image are inherited from the root layout;
  // only the parts that differ per page are set here.
  openGraph: {
    title: `${page.title} — ${site.name}`,
    description: page.description,
    url: "/programmes",
  },
};

/**
 * Each programme in full: who it is for, how hard it is, what a session
 * looks like and which days it runs.
 *
 * One block, because a programme is one thing. The days under each are read
 * off the timetable by `daysForProgramme()` rather than written here, so this
 * page and /schedule cannot drift apart.
 */
export default function ProgrammesPage() {
  return (
    <>
      <PageHeader page="programmes" />
      <Programmes />
      <BookingBand page="programmes" />
    </>
  );
}
