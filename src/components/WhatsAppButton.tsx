import { site } from "@/content/site";
import { waLink } from "@/lib/wa";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Always within reach, on every screen size — booking happens over WhatsApp,
 * so the shortcut to it never scrolls away.
 *
 * This is the one element allowed outside the two-accent rule: WhatsApp green
 * is recognised before it is read, which is worth more here than palette
 * discipline. Dark ink on the green keeps the label legible.
 */
export function WhatsAppButton() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message ${site.name} on WhatsApp`}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-whatsapp p-4 text-ink shadow-lg shadow-black/40 transition-colors hover:bg-whatsapp-hot md:bottom-7 md:right-7"
    >
      <WhatsAppIcon className="size-7 shrink-0" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-[0.95rem] font-semibold transition-[max-width] duration-300 group-hover:max-w-40 md:inline-block">
        Chat with us
      </span>
    </a>
  );
}
