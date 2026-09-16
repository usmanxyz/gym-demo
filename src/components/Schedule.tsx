"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  AUDIENCE_LABELS,
  CLASS_TYPES,
  DAY_LABELS,
  DAY_ORDER,
  INTENSITY_LABELS,
  site,
  type Audience,
  type ClassSlot,
  type ClassType,
  type DayKey,
  type Hours,
} from "@/content/site";
import { formatDuration, formatTime, toMinutes } from "@/lib/format";
import { todayKey } from "@/lib/day";
import { waLink } from "@/lib/wa";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";

type AudienceFilter = Audience | "any";
type TypeFilter = ClassType | "any";

/**
 * The day of the week according to the visitor's device, or null on the
 * server and during hydration.
 *
 * useSyncExternalStore is the tool for exactly this: it hands React a server
 * snapshot to hydrate against and the real client value immediately after, so
 * the markup React renders on the server and the markup it hydrates always
 * agree. A visit does not outlive a day boundary in any way worth handling, so
 * the store never emits.
 */
function useToday(): DayKey | null {
  return useSyncExternalStore(subscribeToNothing, getClientDay, getServerDay);
}

const subscribeToNothing = () => () => {};
const getClientDay = (): DayKey => todayKey();
const getServerDay = (): DayKey | null => null;

/**
 * The board, built for a thumb.
 *
 * Seven day tabs in a single row that never scrolls sideways, two rows of
 * filter chips, then a stack of full-width cards. Every control is at least
 * 44px tall and nothing is hover-only, so the whole section works one-handed
 * on a phone.
 *
 * The day it opens on comes from the visitor's own clock, read on the client
 * rather than guessed during render — the server has no idea what day it is
 * where the phone is, and disagreeing about it is a hydration mismatch. Until
 * the client value lands, Monday is shown: a real day with real classes, so
 * the first paint is never empty.
 */
export function Schedule() {
  const today = useToday();
  const [picked, setPicked] = useState<DayKey | null>(null);
  const [audience, setAudience] = useState<AudienceFilter>("any");
  const [classType, setClassType] = useState<TypeFilter>("any");

  const activeDay = picked ?? today ?? DAY_ORDER[0];

  const classes = useMemo(
    () =>
      site.schedule
        .filter((slot) => slot.day === activeDay)
        .filter((slot) => matchesAudience(slot, audience))
        .filter((slot) => classType === "any" || slot.type === classType)
        .sort((a, b) => toMinutes(a.start) - toMinutes(b.start)),
    [activeDay, audience, classType],
  );

  const filtered = audience !== "any" || classType !== "any";
  const gentsHours = site.hours.gents[activeDay];
  const ladiesHours = site.hours.ladies[activeDay];

  return (
    <section id="schedule" className="border-t border-iron-line py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="display max-w-[20ch] text-3xl text-bone md:text-5xl">
            {site.scheduleSection.heading}
          </h2>
          <p className="mt-4 max-w-xl text-smoke md:text-lg">{site.scheduleSection.subhead}</p>
        </Reveal>

        {/* The board arrives just behind its own heading. One block, not one
            per card — a timetable that assembles row by row is a timetable you
            can't read yet. */}
        <Reveal delay={90}>
          <DayTabs active={activeDay} today={today} onPick={setPicked} />

          <div className="mt-4 flex flex-col gap-3">
            <ChipRow
              label="Filter by hours"
              options={[
                { key: "any" as AudienceFilter, label: "All" },
                { key: "ladies" as AudienceFilter, label: AUDIENCE_LABELS.ladies },
                { key: "gents" as AudienceFilter, label: AUDIENCE_LABELS.gents },
              ]}
              active={audience}
              onPick={setAudience}
            />
            <ChipRow
              label="Filter by class"
              options={[
                { key: "any" as TypeFilter, label: "All classes" },
                ...CLASS_TYPES.map((t) => ({ key: t.key as TypeFilter, label: t.label })),
              ]}
              active={classType}
              onPick={setClassType}
            />
          </div>

          {/* Whose floor it is that day, so a filtered list has context. */}
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-iron-line pt-5 text-sm">
            <div>
              <dt className="text-smoke">{AUDIENCE_LABELS.gents} floor</dt>
              <dd className="numeral mt-1 text-base text-amber">{formatWindow(gentsHours)}</dd>
            </div>
            <div>
              <dt className="text-smoke">{AUDIENCE_LABELS.ladies} floor</dt>
              <dd className="numeral mt-1 text-base text-amber">{formatWindow(ladiesHours)}</dd>
            </div>
          </dl>

          <div
            role="tabpanel"
            id={`schedule-panel-${activeDay}`}
            aria-labelledby={`schedule-tab-${activeDay}`}
            className="mt-8"
          >
            <p aria-live="polite" className="text-sm text-smoke">
              {countLabel(classes.length, activeDay)}
            </p>

            {classes.length === 0 ? (
              <div className="mt-4 rounded-ui border border-iron-line bg-iron p-6">
                <p className="text-bone">
                  Nothing on {DAY_LABELS[activeDay].long} matches those filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setAudience("any");
                    setClassType("any");
                  }}
                  className="mt-4 min-h-11 rounded-ui border border-iron-line px-5 font-medium text-bone transition-colors hover:border-bone/40"
                >
                  Show every class
                </button>
              </div>
            ) : (
              <ul className="mt-4 grid gap-3 lg:grid-cols-2">
                {classes.map((slot) => (
                  <ClassCard key={`${slot.day}-${slot.start}-${slot.name}`} slot={slot} />
                ))}
              </ul>
            )}
          </div>

          {filtered && classes.length > 0 ? (
            <button
              type="button"
              onClick={() => {
                setAudience("any");
                setClassType("any");
              }}
              className="mt-5 min-h-11 text-sm font-medium text-smoke underline decoration-iron-line underline-offset-4 transition-colors hover:text-bone"
            >
              Clear filters
            </button>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Seven tabs on one row at 375px — a grid rather than a scroller, because a
 * sideways-scrolling strip hides half the week behind a gesture.
 */
function DayTabs({
  active,
  today,
  onPick,
}: {
  active: DayKey;
  today: DayKey | null;
  onPick: (day: DayKey) => void;
}) {
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys walk the week, as a tablist is expected to.
  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const offset =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    let next = index;
    if (offset !== 0) next = (index + offset + DAY_ORDER.length) % DAY_ORDER.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = DAY_ORDER.length - 1;
    else return;

    event.preventDefault();
    onPick(DAY_ORDER[next]);
    tabs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Day of the week"
      className="mt-8 grid grid-cols-7 gap-0.5 md:gap-2"
    >
      {DAY_ORDER.map((day, index) => {
        const selected = day === active;
        return (
          <button
            key={day}
            ref={(node) => {
              tabs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`schedule-tab-${day}`}
            aria-selected={selected}
            aria-controls={`schedule-panel-${day}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onPick(day)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={`flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-ui border text-[0.9375rem] font-semibold transition-colors ${
              selected
                ? "border-bone bg-bone text-ink"
                : "border-bone/25 bg-iron text-bone/80 hover:border-bone/50 hover:text-bone"
            }`}
          >
            <span className="md:hidden">{DAY_LABELS[day].short}</span>
            <span className="hidden md:inline">{DAY_LABELS[day].long}</span>
            {/* The badge line is reserved on all seven tabs, not just today's.
                Rendering it only on today made that one tab two lines tall and
                pushed its day name 9px off the row the other six sit on — and
                since `today` is null until the client reports in, it also moved
                the whole row the moment it mounted. An always-present line
                costs nothing and holds the baseline steady. */}
            <span
              aria-hidden={day !== today}
              className={`text-[0.625rem] font-medium uppercase tracking-wide ${
                day !== today
                  ? "invisible"
                  : selected
                    ? "text-ink/75"
                    : "text-bone/70"
              }`}
            >
              Today
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ChipRow<T extends string>({
  label,
  options,
  active,
  onPick,
}: {
  label: string;
  options: { key: T; label: string }[];
  active: T;
  onPick: (key: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const on = option.key === active;
        return (
          <button
            key={option.key}
            type="button"
            aria-pressed={on}
            onClick={() => onPick(option.key)}
            className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors ${
              on
                ? "border-bone bg-bone text-ink"
                : "border-bone/25 bg-iron text-bone/80 hover:border-bone/50 hover:text-bone"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

/**
 * One class. Time on a left rail in the information colour, the class and its
 * coach as the headline, and the three facts you decide on underneath:
 * who it's for, how hard it is, and whether there's room.
 *
 * The whole card is the link, not a small button inside it. On a phone that
 * means a target you can hit without aiming — and it keeps the floating
 * WhatsApp bubble, which is pinned to the same bottom-right corner a button
 * would sit in, from ever covering the way to book.
 */
function ClassCard({ slot }: { slot: ClassSlot }) {
  const full = slot.spotsLeft === 0;
  const intensity = INTENSITY_LABELS[slot.intensity];
  const dayLabel = DAY_LABELS[slot.day].long;
  const message = fill(
    full ? site.scheduleSection.waWaitlistTemplate : site.scheduleSection.waBookTemplate,
    { class: slot.name, day: dayLabel, time: formatTime(slot.start) },
  );

  return (
    <li>
      <a
        href={waLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${full ? "Ask about the waitlist for" : "Book"} ${slot.name} on ${dayLabel} at ${formatTime(slot.start)}, ${slot.coach} coaching`}
        className="group block rounded-ui border border-iron-line bg-iron p-4 transition-colors hover:border-bone/40"
      >
        <div className="flex items-start gap-3 md:gap-4">
          <div className="w-[4.75rem] shrink-0">
            <p className="numeral whitespace-nowrap text-[1.0625rem] leading-tight text-amber md:text-lg">
              {formatTime(slot.start)}
            </p>
            <p className="mt-1 text-xs text-smoke">{formatDuration(slot.start, slot.end)}</p>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="display-tight text-base text-bone md:text-lg">{slot.name}</h3>
            <p className="mt-0.5 text-sm text-smoke">with {slot.coach}</p>
          </div>

          {/* The affordance, not a second target: the card itself is the link.
              Filled solid it was indistinguishable from a real WhatsApp button
              and invited a tap at its own edges, so it is tinted rather than
              filled. A full class goes neutral — sending the same go-ahead
              green for "join the waitlist" as for "book this" was a promise
              the card could not keep. */}
          <span
            aria-hidden
            className={`grid size-11 shrink-0 place-items-center rounded-ui transition-colors ${
              full
                ? "bg-bone/10 text-smoke"
                : "bg-whatsapp/15 text-whatsapp group-hover:bg-whatsapp/25"
            }`}
          >
            <WhatsAppIcon className="size-5" />
          </span>
        </div>

        <div className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-iron-line pt-3 text-xs md:mt-4 md:gap-x-4 md:text-sm">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
              slot.audience === "ladies"
                ? "bg-amber/15 text-amber"
                : "bg-bone/10 text-bone/80"
            }`}
          >
            {slot.audience === "ladies" ? "Ladies only" : AUDIENCE_LABELS[slot.audience]}
          </span>

          <span className="flex items-center gap-2 text-smoke">
            <span aria-hidden className="flex items-end gap-0.5">
              {[1, 2, 3].map((bar) => (
                <span
                  key={bar}
                  className={`w-1 rounded-sm ${
                    bar <= intensity.level ? "bg-amber" : "bg-iron-line"
                  }`}
                  style={{ height: `${bar * 4 + 2}px` }}
                />
              ))}
            </span>
            {intensity.label}
          </span>

          {full ? (
            <span className="font-medium text-smoke">Full — join the waitlist</span>
          ) : (
            <span className={slot.spotsLeft <= 3 ? "text-amber" : "text-smoke"}>
              <span className="numeral">{slot.spotsLeft}</span> of{" "}
              <span className="numeral">{slot.capacity}</span> spots left
            </span>
          )}
        </div>
      </a>
    </li>
  );
}

/** A class open to everyone belongs in both the ladies' and the gents' lists. */
function matchesAudience(slot: ClassSlot, filter: AudienceFilter): boolean {
  if (filter === "any") return true;
  return slot.audience === filter || slot.audience === "all";
}

function formatWindow(hours: Hours): string {
  if (!hours) return "Closed";
  return `${formatTime(hours.open)} – ${formatTime(hours.close)}`;
}

function countLabel(count: number, day: DayKey): string {
  const long = DAY_LABELS[day].long;
  if (count === 0) return `No classes on ${long}`;
  return `${count} ${count === 1 ? "class" : "classes"} on ${long}`;
}

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? `{${key}}`);
}
