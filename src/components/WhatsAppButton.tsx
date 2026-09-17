import { site } from "@/content/site";
import { waLink } from "@/lib/wa";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * The desktop shortcut to WhatsApp, which never scrolls away.
 *
 * `md` and up only. On a phone it had to park on top of something, and that
 * something was body copy; below `md` the MobileCtaBar carries this action
 * instead, alongside the free trial it was crowding out. Up here there is empty
 * margin either side of the content for it to sit in.
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
      className="group fixed bottom-5 right-5 z-40 hidden items-center gap-0 rounded-full bg-whatsapp p-4 text-ink shadow-lg shadow-black/40 transition-[gap,background-color] duration-300 hover:gap-3 hover:bg-whatsapp-hot md:bottom-7 md:right-7 md:flex"
    >
      <WhatsAppIcon className="size-7 shrink-0" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-[0.95rem] font-semibold transition-[max-width] duration-300 group-hover:max-w-40 md:inline-block">
        Chat with us
      </span>
    </a>
  );
}
