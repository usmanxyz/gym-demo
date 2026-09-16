import { DAY_LABELS, DAY_ORDER, site, type DayKey, type Hours } from "@/content/site";
import { formatPKR } from "@/lib/format";
import { absoluteUrl, siteUrl } from "@/lib/site-url";

/**
 * schema.org `ExerciseGym` for the business, built entirely out of `site.ts` so
 * a price or a timing can never drift between the page and the markup.
 *
 * The page is `noindex`, so this will not produce a rich result anywhere — it is
 * here because a gym owner being pitched this demo will run it through Google's
 * Rich Results test, and because dropping the noindex is then the only change
 * needed to make the listing real.
 *
 * The gym's business hours are the gents' floor hours: the ladies-only window
 * sits inside that span every day it runs, so the two together describe one
 * open-to-close period per day rather than two. Who the floor belongs to at a
 * given hour is a fact the timetable carries, and schema.org has no vocabulary
 * for it.
 */
export function StructuredData() {
  const prices = site.membership.plans.map((plan) => plan.pricePKR);

  const gym = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    "@id": `${siteUrl}/#gym`,
    name: site.name,
    description: site.shortDescription,
    slogan: site.tagline,
    url: siteUrl,
    image: [absoluteUrl("/og.jpg"), absoluteUrl(site.heroImage.src)],
    logo: absoluteUrl("/icon.svg"),
    telephone: site.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.location.line1}, ${site.location.area}`,
      addressLocality: site.location.city,
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    hasMap: site.location.mapsUrl,
    openingHoursSpecification: DAY_ORDER.map(openingHours).filter(Boolean),
    priceRange: `${formatPKR(Math.min(...prices))} – ${formatPKR(Math.max(...prices))}`,
    currenciesAccepted: "PKR",
    publicAccess: true,
    isAccessibleForFree: false,
    // The free trial is the whole point of the page, so it is the one offer
    // worth stating in the markup.
    makesOffer: {
      "@type": "Offer",
      name: site.hero.primaryCta,
      description: site.hero.subhead,
      price: 0,
      priceCurrency: "PKR",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/#book`,
    },
    amenityFeature: [
      amenity("Ladies-only hours", true),
      amenity("Showers", true),
      amenity("Lockers", true),
      amenity("Personal training", true),
      amenity("Parking", true),
    ],
  };

  return (
    <script
      type="application/ld+json"
      // The payload is our own typed data, not user input, and JSON.stringify
      // is the only thing that can produce it.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(gym) }}
    />
  );
}

function openingHours(day: DayKey) {
  const hours: Hours = site.hours.gents[day];
  if (!hours) return null;
  return {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${DAY_LABELS[day].long}`,
    opens: hours.open,
    closes: hours.close,
  };
}

function amenity(name: string, value: boolean) {
  return { "@type": "LocationFeatureSpecification", name, value };
}
