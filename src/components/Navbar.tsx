"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { site } from "@/content/site";
import { NavLink } from "./NavLink";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // The sheet records the route it was opened on rather than a bare boolean,
  // which turns "a route change closes it" into a derivation instead of an
  // effect: following a link — or pressing the browser's back button, which no
  // handler of ours ever sees — moves the pathname, and the sheet is shut by
  // definition.
  const [sheetRoute, setSheetRoute] = useState<string | null>(null);
  const open = sheetRoute === pathname;
  const closeMenu = () => setSheetRoute(null);
  const toggleMenu = () =>
    setSheetRoute((current) => (current === pathname ? null : pathname));

  // Only the homepage puts a full-bleed photograph behind the bar. Everywhere
  // else a transparent bar has nothing to sit on and simply lands on top of
  // the page heading, so off the homepage it carries its background from the
  // first paint.
  const overHero = pathname === "/";

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
      if (e.key === "Escape") setSheetRoute(null);
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
        scrolled || open || !overHero
          ? "border-b border-iron-line bg-ink/95 backdrop-blur-sm"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:h-20 md:px-8">
        <Link
          href="/"
          className="display text-xl leading-none text-bone md:text-2xl"
          onClick={closeMenu}
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Pages">
          {site.nav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="text-[0.95rem] font-medium transition-colors"
              activeClassName="text-bone underline decoration-wrap decoration-2 underline-offset-[0.4rem]"
              idleClassName="text-smoke hover:text-bone"
            >
              {item.label}
            </NavLink>
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

          {/* The form lives on the homepage, so this has to be a route plus a
              hash rather than a bare anchor — as "#book" it did nothing at all
              on the other five pages. */}
          <Link
            href="/#book"
            className="on-action hidden rounded-ui bg-wrap px-5 py-3 text-[0.95rem] font-semibold text-white transition-colors hover:bg-wrap-deep sm:inline-block"
          >
            {site.hero.primaryCtaShort}
          </Link>

          <button
            type="button"
            onClick={toggleMenu}
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
        <nav className="mx-auto max-w-7xl px-5 py-4" aria-label="Pages">
          <ul>
            {site.nav.map((item) => (
              <li key={item.href} className="border-b border-iron-line last:border-0">
                <NavLink
                  href={item.href}
                  onNavigate={closeMenu}
                  className="group display-tight flex items-center justify-between gap-3 py-4 text-2xl"
                  activeClassName="text-bone"
                  idleClassName="text-bone/70"
                >
                  {item.label}
                  {/* The underline that marks the current page on the desktop
                      row would be lost under a 24px display face; a bar at the
                      end of the row reads at a glance instead. */}
                  <span
                    aria-hidden
                    className="h-6 w-1 shrink-0 rounded-sm bg-wrap opacity-0 group-aria-[current=page]:opacity-100"
                  />
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 pb-2">
            <Link
              href="/#book"
              onClick={closeMenu}
              className="on-action rounded-ui bg-wrap px-5 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-wrap-deep"
            >
              {site.hero.primaryCtaShort}
            </Link>
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
