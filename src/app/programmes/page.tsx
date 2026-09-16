import type { Metadata } from "next";
import { BookingBand } from "@/components/BookingBand";
import { PageHeader } from "@/components/PageHeader";
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
 */
export default function ProgrammesPage() {
  return (
    <>
      <PageHeader page="programmes" />
      <BookingBand page="programmes" />
    </>
  );
}
