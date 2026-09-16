import type { Metadata, Viewport } from "next";
import { Archivo, Barlow } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/content/site";
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

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.shortDescription,
  // Fictional business with illustrative reviews: keep it out of search.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#12131A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${barlow.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[60] focus:rounded-ui focus:bg-wrap focus:px-4 focus:py-3 focus:font-semibold focus:text-bone"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1 pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
