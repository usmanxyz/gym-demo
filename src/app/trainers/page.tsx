import type { Metadata } from "next";
import { BookingBand } from "@/components/BookingBand";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/content/site";

const page = site.pages.trainers;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/trainers" },
  // `robots: noindex` and the og image are inherited from the root layout;
  // only the parts that differ per page are set here.
  openGraph: {
    title: `${page.title} — ${site.name}`,
    description: page.description,
    url: "/trainers",
  },
};

/**
 * The three coaches, each with their own booking link so a visitor can ask
 * for one of them by name.
 */
export default function TrainersPage() {
  return (
    <>
      <PageHeader page="trainers" />
      <BookingBand page="trainers" />
    </>
  );
}
