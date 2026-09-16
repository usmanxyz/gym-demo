/**
 * The absolute origin this build is served from.
 *
 * Only two things need it, and both break quietly without it: `metadataBase`,
 * which turns `/og.jpg` into the absolute URL every link unfurler demands, and
 * the JSON-LD `@id`. A relative og:image is the single most common reason a
 * WhatsApp preview comes back as a bare grey link.
 *
 * Set NEXT_PUBLIC_SITE_URL for a custom domain. On Vercel the project's
 * production domain is filled in automatically, so preview deployments unfurl
 * with the production card rather than a throwaway hash URL.
 */
export const siteUrl = normalise(
  process.env.NEXT_PUBLIC_SITE_URL ??
    prefixed(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    prefixed(process.env.VERCEL_URL) ??
    "http://localhost:3000",
);

function prefixed(host: string | undefined): string | undefined {
  // Vercel exposes these as bare hostnames, with no scheme.
  return host ? `https://${host}` : undefined;
}

function normalise(url: string): string {
  return url.replace(/\/+$/, "");
}

/** An absolute URL for a site-root path, for metadata that can't be relative. */
export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
