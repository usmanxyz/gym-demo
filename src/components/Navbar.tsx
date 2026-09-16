"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { site } from "@/content/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The bar sits transparent over the hero photo and only takes on a
  // background once you've moved past it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the sheet is open: lock the page behind it and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-iron-line bg-ink/95 backdrop-blur-sm"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:h-20 md:px-8">
        <a
          href="#top"
          className="display text-xl leading-none text-bone md:text-2xl"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Sections">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.95rem] font-medium text-smoke transition-colors hover:text-bone"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <a
            href={`tel:${site.contact.phone}`}
            className="hidden items-center gap-2 text-[0.95rem] font-medium text-smoke transition-colors hover:text-bone md:flex"
          >
            <Phone className="size-4" aria-hidden />
            {site.contact.phoneDisplay}
          </a>

          <a
            href="#book"
            className="on-action hidden rounded-ui bg-wrap px-5 py-3 text-[0.95rem] font-semibold text-white transition-colors hover:bg-wrap-deep sm:inline-block"
          >
            {site.hero.primaryCtaShort}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 grid size-11 place-items-center text-bone lg:hidden"
          >
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-iron-line bg-ink lg:hidden"
      >
        <nav className="mx-auto max-w-7xl px-5 py-4" aria-label="Sections">
          <ul>
            {site.nav.map((item) => (
              <li key={item.href} className="border-b border-iron-line last:border-0">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="display-tight block py-4 text-2xl text-bone"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 pb-2">
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="on-action rounded-ui bg-wrap px-5 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-wrap-deep"
            >
              {site.hero.primaryCtaShort}
            </a>
            <a
              href={`tel:${site.contact.phone}`}
              className="flex items-center justify-center gap-2 rounded-ui border border-iron-line px-5 py-4 text-base font-medium text-bone"
            >
              <Phone className="size-4" aria-hidden />
              {site.contact.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
