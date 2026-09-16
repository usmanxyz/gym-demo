import { DAY_ORDER, type DayKey } from "@/content/site";

/**
 * Weekday keys as `Intl` spells them, so the lookup below is a table rather
 * than arithmetic on an offset nobody can check at a glance.
 */
const KEY_BY_WEEKDAY: Record<string, DayKey> = {
  Mon: "mon",
  Tue: "tue",
  Wed: "wed",
  Thu: "thu",
  Fri: "fri",
  Sat: "sat",
  Sun: "sun",
};

/**
 * Constructed once: a `DateTimeFormat` is expensive to build and this one
 * never varies.
 */
const lahoreWeekday = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Karachi",
  weekday: "short",
});

/**
 * Which day of the week it is **at the gym**, as a DayKey.
 *
 * Not the device's own weekday. The gym is in Lahore, and the timetable it
 * opens on is the one being run on the floor right now — a member in London
 * at 9pm Sunday wants Monday's board, because in Lahore it already is Monday.
 * Asia/Karachi keeps no DST, but reading the zone by name rather than by a
 * +05:00 offset means that stays a fact about Pakistan, not an assumption
 * baked into this file.
 *
 * Deliberately not called during render on the server: the build machine and
 * the visitor's phone can sit on different sides of midnight, and a server
 * guess that disagrees with the browser is a hydration mismatch. Components
 * read this through useSyncExternalStore on the client, so the day is always
 * resolved after mount.
 */
export function todayKey(now: Date = new Date()): DayKey {
  return KEY_BY_WEEKDAY[lahoreWeekday.format(now)] ?? DAY_ORDER[0];
}
