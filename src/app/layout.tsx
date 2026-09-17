import type { Metadata, Viewport } from "next";
import { Archivo, Barlow } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

// Display: Archivo carries a width axis, which is what makes the headlines
// wide and blocky like a scoreboard rather than a condensed fight poster.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-barlow",
});

/**
 * Two audiences, two different jobs.
 *
 * The <title> is a browser-tab label — the page is noindex, so it is never a
 * search result. Short, and it says where the gym is.
 *
 * og:* is the one that matters. This link gets sent on WhatsApp, where the
 * preview is a card with a big image, one bold line and two lines of grey: so
 * the social title leads with the offer rather than the business name, and the
 * image is a real 1200x630 JPEG (see scripts/generate-assets.mjs) rather than a
 * crop of the page.
 */
const socialTitle = `${site.hero.headline} — ${site.name}, ${site.location.city}`;

export const metadata: Metadata = {
  // Without this, og:image stays relative and most unfurlers — WhatsApp
  // included — silently show no preview at all.
  metadataBase: new URL(siteUrl),
  // Each page supplies its own `title` and lands in the template; the
  // homepage, which has nothing to add, uses the default as written.
  title: {
    default: `${site.name} — ${site.tagline}, ${site.location.city}`,
    template: `%s — ${site.name}`,
  },
  description: site.shortDescription,
  applicationName: site.name,
  alternates: { canonical: "/" },
  // Fictional business with illustrative reviews: keep it out of search.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: socialTitle,
    description: site.shortDescription,
    url: "/",
    locale: "en_PK",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: `${site.name} — ${site.hero.headline}. ${site.tagline}, ${site.location.city}.`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: site.shortDescription,
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#12131A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${barlow.variable} h-full`}
      // The inline script below adds data-js to this element before React
      // hydrates, so the client tree never matches the server HTML here.
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        {/* Marks the document as scripted before anything is painted, which is
            what lets the scroll-in animations start hidden without a flash and
            stay visible when scripting is off. Blocking and one statement long
            on purpose — see the [data-js] rules in globals.css. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute("data-js","")`,
          }}
        />
        <a
          href="#main"
          className="on-action sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[60] focus:rounded-ui focus:bg-wrap focus:px-4 focus:py-3 focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1 pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <StructuredData />
      </body>
    </html>
  );
}
