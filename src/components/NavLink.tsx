"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * A nav link that knows whether it is the page you are on.
 *
 * The navbar and the footer both list the same five routes and both need the
 * current one marked, so the comparison lives here once. It is the only reason
 * either list needs the client: `Footer` stays a server component and simply
 * renders these.
 *
 * `aria-current="page"` carries the state for a screen reader; the styling is
 * passed in, because the two lists sit on different backgrounds and want
 * different emphasis.
 */
export function NavLink({
  href,
  children,
  className = "",
  activeClassName = "",
  idleClassName = "",
  onNavigate,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  idleClassName?: string;
  /** Lets the navbar close its mobile sheet on the way out. */
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  // Exact match: these five are leaf routes with nothing nested under them.
  const active = pathname === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={`${className} ${active ? activeClassName : idleClassName}`}
    >
      {children}
    </Link>
  );
}
