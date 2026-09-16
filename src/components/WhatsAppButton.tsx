import { site } from "@/content/site";
import { waLink } from "@/lib/wa";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Always within reach, on every screen size — booking happens over WhatsApp,
 * so the shortcut to it never scrolls away.
 *
 * It wears the action colour rather than WhatsApp green: on this palette red
 * means "this does something", and the glyph carries the recognition.
 */
export function WhatsAppButton() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message ${site.name} on WhatsApp`}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-wrap p-4 text-bone shadow-lg shadow-black/40 transition-colors hover:bg-wrap-hot md:bottom-7 md:right-7"
    >
      <WhatsAppIcon className="size-7 shrink-0" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-[0.95rem] font-semibold transition-[max-width] duration-300 group-hover:max-w-40 md:inline-block">
        Chat with us
      </span>
    </a>
  );
}
