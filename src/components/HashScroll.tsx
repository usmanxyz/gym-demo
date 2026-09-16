"use client";

import { useEffect } from "react";

/**
 * Lands an arriving `/#book` link on the booking form.
 *
 * The navbar's booking button has to be `/#book` rather than `#book`, because
 * the form only exists on the homepage and a bare fragment did nothing at all
 * from the other five pages. But the browser's own hash scroll does not
 * survive the trip: `scroll-behavior: smooth` is set on <html>, so Chrome
 * starts animating down from the top, then abandons the animation when
 * hydration settles the layout underneath it — leaving the visitor a few dozen
 * pixels into a 3,600px page, having asked to be taken to the form.
 *
 * So the scroll happens here, and instantly rather than smoothly: animating
 * past the whole homepage to reach the form is disorienting even when it
 * works. `scroll-padding-top` keeps the heading clear of the fixed navbar.
 *
 * No requestAnimationFrame. A frame callback never fires while the tab is not
 * being rendered — a backgrounded tab, or one Chrome has throttled — and the
 * scroll would then be silently skipped for exactly the visitor who opened the
 * link in a new tab. Both branches below already run at a point where layout
 * is final, so there is nothing to wait for.
 *
 * Mounted on the homepage rather than in the root layout, which is what makes
 * it fire on a client-side navigation too: the layout persists across routes,
 * but arriving at `/#book` from another page mounts this.
 */
export function HashScroll() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    const jump = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
    };

    // Complete already — a client-side navigation, or a first load whose
    // images were cached — so the layout is settled and we can go now.
    if (document.readyState === "complete") {
      jump();
      return;
    }

    // Otherwise wait for the photographs to stop changing the page's height.
    window.addEventListener("load", jump, { once: true });
    return () => window.removeEventListener("load", jump);
  }, []);

  return null;
}
