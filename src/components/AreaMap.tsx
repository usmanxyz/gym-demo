import { site } from "@/content/site";

/**
 * The streets around the gym, drawn rather than embedded.
 *
 * A third-party map was ruled out for the homepage and the reasons hold
 * harder here: a request to a tile provider, a cookie banner, and a grey
 * Google surface dropped into the middle of a page that is otherwise all
 * ink and amber. A schematic in the house palette costs one component, loads
 * with the HTML, and shows the four things anybody actually navigates DHA by
 * — the boulevard, the park, the pump and the turn.
 *
 * The marker sits on an approximate spot. Iron Fitness is fictional, so
 * pinning a real building would be marking somebody else's premises; the
 * caption says so out loud.
 *
 * Labels come from `site.location.areaMap`, because road and landmark names
 * are business content. The coordinates stay here, because they are design.
 * The two are paired by index — site.ts lists them in the order drawn below.
 */

/** viewBox units. Deliberately small: the map is usually rendered wider than
 *  this, so 10-unit label type lands above 10px rather than below it. */
const W = 360;
const H = 280;

/**
 * Roads are the dark channels cut through the built-up ground, so they are
 * strokes in the page colour over an iron field rather than lines drawn on
 * top of it. Labels sit inside the channel, centred on the road's spine.
 */
const ROADS = [
  // Main Boulevard — the one you arrive on, so it is the widest.
  { d: `M0 178 H${W}`, width: 24, label: { x: 10, y: 178, size: 11, rotate: 0 } },
  // Khayaban-e-Firdousi, crossing it. Sits left of centre so the two blocks
  // east of it are wide enough to hold their own labels.
  { d: "M226 0 V280", width: 20, label: { x: 226, y: 158, size: 10, rotate: -90 } },
  // The service road behind, which dead-ends into Firdousi.
  { d: "M0 84 H226", width: 15, label: { x: 10, y: 84, size: 9.5, rotate: 0 } },
];

/** The four blocks you steer by, as plain patches of ground. */
const LANDMARKS = [
  { x: 240, y: 18, w: 116, h: 126 }, // the park, opposite the gym
  { x: 240, y: 202, w: 116, h: 60 }, // the market, one block too far
  { x: 24, y: 202, w: 84, h: 60 }, // the pump, where you slow down
  { x: 24, y: 18, w: 88, h: 48 }, // the mosque, where you turn around
];

/** The premises, its marker, and the leader line up to the name. */
const GYM = {
  block: { x: 150, y: 126, w: 58, h: 34 },
  marker: { x: 179, y: 143 },
  leader: { x: 179, y1: 126, y2: 112 },
  label: { x: 179, y: 104 },
};

export function AreaMap() {
  const map = site.location.areaMap;

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-labelledby="area-map-title area-map-desc"
        className="h-auto w-full rounded-ui border border-iron-line"
      >
        <title id="area-map-title">
          {`${map.markerLabel} in ${site.location.area}, ${site.location.city}`}
        </title>
        <desc id="area-map-desc">
          {`${site.location.landmark}. Roads on the drawing: ${listSentence(map.roads)}. Landmarks: ${listSentence(map.landmarks)}.`}
        </desc>

        {/* Built-up ground. Everything below is cut out of it. */}
        <rect width={W} height={H} className="fill-iron" />

        {ROADS.map((road, i) => (
          <path
            key={map.roads[i]}
            d={road.d}
            strokeWidth={road.width}
            className="stroke-ink"
            fill="none"
          />
        ))}

        {LANDMARKS.map((block, i) => (
          <rect
            key={map.landmarks[i]}
            x={block.x}
            y={block.y}
            width={block.w}
            height={block.h}
            rx={2}
            className="fill-bone/8 stroke-iron-line"
          />
        ))}

        {/* The premises. Amber, because on this page it is the one piece of
            information the drawing exists to carry. */}
        <rect
          x={GYM.block.x}
          y={GYM.block.y}
          width={GYM.block.w}
          height={GYM.block.h}
          rx={2}
          className="fill-amber/15 stroke-amber/50"
        />
        <circle
          cx={GYM.marker.x}
          cy={GYM.marker.y}
          r={11}
          fill="none"
          className="stroke-amber/35"
        />
        <circle cx={GYM.marker.x} cy={GYM.marker.y} r={4.5} className="fill-amber" />
        <path
          d={`M${GYM.leader.x} ${GYM.leader.y1} V${GYM.leader.y2}`}
          className="stroke-amber/50"
          strokeWidth={1}
        />

        {/* Type last, so nothing is drawn over a label. */}
        {ROADS.map((road, i) => (
          <text
            key={map.roads[i]}
            x={road.label.x}
            y={road.label.y}
            fontSize={road.label.size}
            textAnchor="start"
            dominantBaseline="middle"
            transform={
              road.label.rotate
                ? `rotate(${road.label.rotate} ${road.label.x} ${road.label.y})`
                : undefined
            }
            className="fill-bone/70"
          >
            {map.roads[i]}
          </text>
        ))}

        {LANDMARKS.map((block, i) => (
          <text
            key={map.landmarks[i]}
            x={block.x + block.w / 2}
            y={block.y + block.h / 2}
            fontSize={9.5}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-smoke"
          >
            {map.landmarks[i]}
          </text>
        ))}

        <text
          x={GYM.label.x}
          y={GYM.label.y}
          fontSize={12}
          fontWeight={600}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-amber"
        >
          {map.markerLabel}
        </text>
      </svg>

      <figcaption className="mt-3 text-sm leading-relaxed text-smoke">{map.caption}</figcaption>
    </figure>
  );
}

/** "a, b and c" — for the <desc> a screen reader reads instead of the drawing. */
function listSentence(items: readonly string[]): string {
  if (items.length < 2) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}
