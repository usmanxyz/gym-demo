import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { waLink } from "@/lib/wa";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Footer() {
  return (
    <footer className="border-t border-iron-line bg-iron">
      {/* Extra bottom padding buys clearance for the fixed WhatsApp bubble,
          which otherwise parks on top of the last line of the disclaimer. */}
      <div className="mx-auto max-w-7xl px-5 pb-28 pt-14 md:px-8 md:pb-24 md:pt-20">
        <Reveal className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <p className="display text-2xl text-bone">{site.name}</p>
            <p className="mt-4 max-w-sm text-smoke">{site.shortDescription}</p>
          </div>

          <nav aria-label="Sections">
            <h2 className="text-sm font-semibold text-bone">Explore</h2>
            <ul className="mt-4 space-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-smoke transition-colors hover:text-bone">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-bone">Find us</h2>
            <address className="mt-4 not-italic text-smoke">
              {site.location.line1}
              <br />
              {site.location.area}, {site.location.city}
              <br />
              <span className="text-sm">{site.location.landmark}</span>
            </address>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href={`tel:${site.contact.phone}`}
                className="flex items-center gap-2 text-bone transition-colors hover:text-wrap-hot"
              >
                <Phone className="size-4 shrink-0" aria-hidden />
                {site.contact.phoneDisplay}
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-bone transition-colors hover:text-whatsapp"
              >
                <WhatsAppIcon className="size-4 shrink-0 text-whatsapp" />
                Message us on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 border-t border-iron-line pt-8">
          <p className="text-sm font-medium text-bone">{site.footer.credit}</p>
          <p className="mt-2 max-w-2xl pr-16 text-sm text-smoke sm:pr-0">
            {site.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
