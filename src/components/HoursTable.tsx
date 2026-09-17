import {
  AUDIENCE_LABELS,
  DAY_LABELS,
  DAY_ORDER,
  site,
  type DayKey,
  type Hours,
} from "@/content/site";
import { formatWindow } from "@/lib/format";
import { Reveal } from "./Reveal";

const FLOORS = [
  { key: "gents" as const, hours: site.hours.gents },
  { key: "ladies" as const, hours: site.hours.ladies },
];

/**
 * The gym-floor hours: both weeks side by side, then the notes that qualify
 * them. Shared by /schedule and /visit, which ask the same question from two
 * directions — "when can I train?" and "when should I drive over?".
 *
 * Two tables rather than one three-column grid. A Day/Gents/Ladies table puts
 * two time ranges on a 375px row and breaks both of them over two lines; a
 * table per floor stacks on a phone, sits side by side from md, and lets a
 * woman reading the ladies' week read only the ladies' week.
 *
 * A server component on purpose. Nothing here depends on the clock — today is
 * marked on the board above, which is client-side for exactly that reason,
 * and highlighting a row here would drag the whole table into hydration.
 */
export function HoursTable() {
  const copy = site.hoursSection;

  return (
    <section id="hours" className="border-t border-iron-line py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="display max-w-[20ch] text-2xl text-bone md:text-4xl">
            {copy.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-smoke md:text-lg">{copy.subhead}</p>
        </Reveal>

        <Reveal delay={90}>
          <FloorTables className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2" />

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-ui border border-iron-line p-5 md:p-6">
              <h3 className="display-tight text-lg text-bone">
                {copy.notesHeading}
              </h3>
              <ul className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-bone/85">
                {site.hours.notes.map((note) => (
                  <li key={note} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-amber"
                    />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ramadan gets its own box, not a fourth bullet. For a month of
                the year it replaces the tables above rather than qualifying
                them, and a visitor who misses that line drives to a closed
                gym. */}
            <div className="rounded-ui border border-amber/30 bg-iron p-5 md:p-6">
              <h3 className="display-tight text-lg text-amber">
                {copy.ramadanHeading}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-bone/85">
                {site.hours.ramadanNote}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Both floors' weeks and nothing else — no heading, no notes.
 *
 * Exported because the homepage renders the two tables inside its location
 * section, where the section already has a heading of its own and the notes
 * are set as plain lines rather than a box. The caller supplies the layout:
 * two columns under the full section, one column beside the address.
 */
export function FloorTables({ className }: { className?: string }) {
  return (
    <div className={className}>
      {FLOORS.map((floor) => (
        <FloorTable
          key={floor.key}
          label={AUDIENCE_LABELS[floor.key]}
          hours={floor.hours}
        />
      ))}
    </div>
  );
}

/**
 * One floor's week. The day is the row header, so a screen reader reading a
 * cell says which day it belongs to; the times wear the numeral face in the
 * information colour, like every other real number on the site.
 */
function FloorTable({
  label,
  hours,
}: {
  label: string;
  hours: Record<DayKey, Hours>;
}) {
  const copy = site.hoursSection;

  return (
    <div className="overflow-hidden rounded-ui border border-iron-line">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="bg-iron px-4 py-3.5 text-left md:px-5">
          <span className="display-tight text-lg text-bone md:text-xl">
            {label}
          </span>
        </caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">{copy.dayColumn}</th>
            <th scope="col">{label}</th>
          </tr>
        </thead>
        <tbody>
          {DAY_ORDER.map((day) => {
            const window = hours[day];
            return (
              <tr key={day} className="border-t border-iron-line">
                <th
                  scope="row"
                  className="px-4 py-3 font-normal text-bone/85 md:px-5"
                >
                  {DAY_LABELS[day].long}
                </th>
                <td
                  className={`px-4 py-3 text-right md:px-5 ${
                    window
                      ? "numeral text-[0.9375rem] text-amber"
                      : "text-smoke"
                  }`}
                >
                  {formatWindow(window, copy.closedLabel)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
