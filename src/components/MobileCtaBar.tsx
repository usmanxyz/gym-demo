"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { waLink } from "@/lib/wa";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * The phone's permanent way to book — the brief's "always within reach", built
 * as a bar rather than a floating bubble.
 *
 * A bubble in the corner kept the *secondary* action on screen: once the hero
 * scrolled away, the one thing always reachable was WhatsApp, while the red
 * free trial — the page's entire job — was gone. It also had to land on top of
 * something, and on a 400px-wide page that something was body copy.
 *
 * So the bar leads with the trial and keeps WhatsApp beside it, and it stays in
 * the page's own colours: an ink surface with a hairline, green only on the
 * glyph. A full-width green slab pinned to every screen would outshout the
 * board, which is supposed to be the loud thing here.
 *
 * Below `md` only. Above it the bubble has wide empty margins to sit in and
 * covers nothing, so it keeps that job — see WhatsAppButton.
 */
export function MobileCtaBar() {
  const pathname = usePathname();
  const [past, setPast] = useState(false);
  const [atForm, setAtForm] = useState(false);

  // The homepage opens on the hero, which carries this exact pair of buttons at
  // full size. Duplicating them 60px lower is noise, so on `/` the bar waits
  // until the hero is behind you. The other five pages open on a PageHeader
  // with no CTA in it, so there the bar comes in on the first scroll — the same
  // 24px the navbar uses to take on its background.
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setPast(window.scrollY > (onHome ? window.innerHeight * 0.6 : 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  // The bar must never cover the form's submit button: arriving at the booking
  // form is the one moment a shortcut to booking is worth nothing, and a strip
  // of chrome across the bottom is exactly where a thumb is heading. The form
  // only exists on the homepage, hence the null guard.
  useEffect(() => {
    const form = document.getElementById("book");
    if (!form || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver((entries) =>
      setAtForm(entries.some((entry) => entry.isIntersecting)),
    );
    observer.observe(form);
    // Leaving the homepage takes the form with it, so the flag has to come
    // down here — otherwise navigating away while the form is on screen would
    // strand the bar off-screen on a page that has no form to hide it.
    return () => {
      observer.disconnect();
      setAtForm(false);
    };
  }, [pathname]);

  const shown = past && !atForm;

  return (
    <div
      // Translated off-screen rather than unmounted, so it slides. `inert`
      // keeps it out of the tab order and the accessibility tree while it is
      // down there — nothing may be focusable and invisible at once.
      inert={!shown}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-iron-line bg-ink/95 backdrop-blur-sm transition-transform duration-300 motion-reduce:transition-none md:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      } [html[data-sheet-open]_&]:translate-y-full`}
    >
      {/* Padded past the home indicator on the phones that have one, and to a
          normal 12px on the ones that don't. */}
      <div className="flex items-center gap-3 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Link
          href="/#book"
          className="on-action flex-1 rounded-ui bg-wrap px-5 py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-wrap-deep"
        >
          {site.hero.primaryCtaShort}
        </Link>
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Message ${site.name} on WhatsApp`}
          className="flex size-[3.25rem] shrink-0 items-center justify-center rounded-ui border border-whatsapp/55 transition-colors hover:border-whatsapp hover:bg-whatsapp/10"
        >
          <WhatsAppIcon className="size-6 shrink-0 text-whatsapp" />
        </a>
      </div>
    </div>
  );
}
