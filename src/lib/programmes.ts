import { DAY_ORDER, site, type DayKey, type Program } from "@/content/site";

/**
 * Which days of the week a programme actually runs, read out of the
 * timetable rather than typed on the programme.
 *
 * The days a class runs are already written down once, in `site.schedule` —
 * that is what the board renders. Listing them again on the programme would
 * be the same fact in two places, and the second copy is the one that goes
 * stale the first time a class moves. So a programme says which slice of the
 * board it *is*, by class type or by audience, and the days fall out of that.
 *
 * Returned in week order regardless of the order the slots happen to sit in,
 * because a programme that runs "Thu, Mon, Sat" reads like a mistake.
 */
export function daysForProgramme(programme: Program): DayKey[] {
  const { classType, classAudience } = programme;

  // Neither key set means the programme has no classes of its own — it runs
  // whenever the floor is open, and the page says so instead of listing days.
  if (!classType && !classAudience) return [];

  const days = new Set(
    site.schedule
      .filter((slot) => (classType ? slot.type === classType : true))
      .filter((slot) => (classAudience ? slot.audience === classAudience : true))
      .map((slot) => slot.day),
  );

  return DAY_ORDER.filter((day) => days.has(day));
}

