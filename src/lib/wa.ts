import { site } from "@/content/site";

/**
 * Every WhatsApp entry point on the site goes through here, so the number
 * lives in exactly one place and messages are always encoded correctly.
 */
export function waLink(message: string = site.contact.waBaseMessage): string {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
