import { DAY_ORDER, type DayKey } from "@/content/site";

/**
 * Which day of the week it is, as a DayKey.
 *
 * Deliberately not called during render on the server: the build machine and
 * the visitor's phone can sit on different sides of midnight, and a server
 * guess that disagrees with the browser is a hydration mismatch. Components
 * read this through useSyncExternalStore on the client, so the day always
 * comes from the device the visitor is holding.
 */
export function todayKey(now: Date = new Date()): DayKey {
  // JS weeks start on Sunday; ours start on Monday.
  return DAY_ORDER[(now.getDay() + 6) % 7];
}
