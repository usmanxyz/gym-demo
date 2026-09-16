import { CLASS_TYPES, site, type ClassType, type Trainer } from "@/content/site";

/** One kind of class a coach runs, as the schedule's filters name it. */
export type CoachedClass = { type: ClassType; label: string };

/**
 * Which classes a coach actually runs, read out of the timetable rather than
 * typed on the trainer.
 *
 * Same rule as `daysForProgramme()`: the board is the one place a class is
 * written down, so a trainer says which name it wears there and the rest
 * falls out of that. Move a boxing class off Hamza and his page stops
 * claiming it, with nothing else to edit.
 *
 * Ordered by `CLASS_TYPES` — the same loudest-first order as the schedule's
 * filter chips — so a coach's classes read the same way on both pages.
 */
export function classesForTrainer(trainer: Trainer): CoachedClass[] {
  const types = new Set(
    site.schedule.filter((slot) => slot.coach === trainer.boardName).map((slot) => slot.type),
  );

  return CLASS_TYPES.filter(({ key }) => types.has(key)).map(({ key, label }) => ({
    type: key,
    label,
  }));
}

/** How many classes a week a coach is on the board for. */
export function weeklyClassCount(trainer: Trainer): number {
  return site.schedule.filter((slot) => slot.coach === trainer.boardName).length;
}
