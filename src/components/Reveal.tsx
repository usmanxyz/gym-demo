"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Fades a block up a few pixels the first time it comes into view, then stops
 * having an opinion about it — no parallax, no re-triggering on the way back up.
 *
 * The hidden starting state lives in CSS behind `[data-js]`, an attribute set by
 * a blocking script at the top of <body>. That ordering matters in both
 * directions: with JS off the rule never matches and the page renders complete,
 * and with JS on the attribute is there before first paint, so nothing is ever
 * painted visible and then yanked back to transparent.
 *
 * Reduced motion is handled in the same stylesheet rather than here, because a
 * media query re-evaluates when the visitor changes the setting and a value read
 * once in an effect does not.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Milliseconds, for staggering two or three blocks in the same section. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => {
      el.dataset.revealed = "true";
    };

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        show();
        observer.disconnect();
      },
      // Held back from the very bottom edge so a block starts moving once it is
      // properly on screen rather than while it is still a sliver.
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    observer.observe(el);

    // Nothing may be focused and invisible at the same time. Tabbing into the
    // booking form, or following the "Book free trial" anchor into it, can put
    // the caret inside a block the observer has not got to yet — so focus wins
    // and the block appears at once rather than a beat later.
    const onFocusIn = () => {
      show();
      observer.disconnect();
    };
    el.addEventListener("focusin", onFocusIn, { once: true });

    return () => {
      observer.disconnect();
      el.removeEventListener("focusin", onFocusIn);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-reveal
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
