import { INTENSITY_LABELS, type Intensity } from "@/content/site";

/**
 * How hard a class is, as three bars and a word.
 *
 * The bars are decoration — the label next to them carries the meaning, so
 * the meter is hidden from assistive technology and the word is not. Shared
 * by the schedule's class cards and the programme cards so the two can never
 * disagree about what "Moderate" looks like.
 */
export function IntensityMeter({ intensity }: { intensity: Intensity }) {
  const { label, level } = INTENSITY_LABELS[intensity];

  return (
    <span className="flex items-center gap-2 text-smoke">
      <span aria-hidden className="flex items-end gap-0.5">
        {[1, 2, 3].map((bar) => (
          <span
            key={bar}
            className={`w-1 rounded-sm ${bar <= level ? "bg-amber" : "bg-iron-line"}`}
            style={{ height: `${bar * 4 + 2}px` }}
          />
        ))}
      </span>
      {label}
    </span>
  );
}
