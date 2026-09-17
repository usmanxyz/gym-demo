/**
 * Every piece of business content on this site lives here: name, prices,
 * timings, classes, trainers, phone, address, copy. Components read from this
 * file and never hardcode any of it.
 *
 * Iron Fitness is a fictional business — a concept demo by Solvira.
 */

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

/** A day's opening window in 24h "HH:MM", or null when the floor is closed. */
export type Hours = { open: string; close: string } | null;

/** Who a class or a stretch of the timetable is for. */
export type Audience = "gents" | "ladies" | "all";

export type NavItem = { label: string; href: string };

/** The five pages behind the navbar. Each one is the route at /<key>. */
export type PageKey = "programmes" | "schedule" | "plans" | "trainers" | "visit";

/**
 * Everything a page needs that is not its content: what the browser tab says,
 * what a link preview says, the header it opens with, the label on the
 * homepage preview that leads to it, and how the page names itself in a
 * booking message.
 */
export type PageMeta = {
  /** Fills %s in the root layout's title template. */
  title: string;
  description: string;
  header: { heading: string; intro: string };
  /** The label on the homepage preview's link through to this page. */
  viewAll: string;
  /** Fills {page} in bookingBand.waTemplate. */
  from: string;
};

/** How hard a class is, for the three-bar meter on the cards. */
export type Intensity = "easy" | "moderate" | "hard";

/** Groups a class with the programme it belongs to, so the board can filter. */
export type ClassType = "strength" | "hiit" | "boxing" | "yoga" | "open";

export type Program = {
  slug: string;
  name: string;
  blurb: string;
  duration: string;
  audience: Audience;
  image: string;
  alt: string;
  /** Who turns up to this one, in a sentence — the depth on /programmes. */
  forWho: string;
  intensity: Intensity;
  /** A session start to finish. A sequence, so it renders as an ordered list. */
  session: string[];
  /**
   * How this programme maps onto the timetable, so `daysForProgramme()` can
   * read the days it runs out of `schedule` instead of them being typed
   * twice and drifting. Most programmes are a class type; the ladies' floor
   * is an audience, because it is every class type during those hours.
   */
  classType?: ClassType;
  classAudience?: Audience;
};

export type ClassSlot = {
  day: DayKey;
  start: string;
  end: string;
  name: string;
  /** Which programme this class belongs to — drives the filter chips. */
  type: ClassType;
  coach: string;
  audience: Audience;
  intensity: Intensity;
  /** How many the floor takes for this slot, and how many are still free. */
  capacity: number;
  spotsLeft: number;
};

export type PlanSlug = "monthly" | "quarterly" | "annual";

export type Plan = {
  slug: PlanSlug;
  name: string;
  pricePKR: number;
  period: string;
  blurb: string;
  includes: string[];
  featured: boolean;
};

/**
 * One line of the comparison table. `true` is a tick and `false` a dash; a
 * string is the detail that makes the row worth reading, because "Every 6
 * weeks" says more than a tick ever could.
 *
 * Keyed by PlanSlug rather than by string, so a row can never quietly
 * describe a membership that no longer exists.
 */
export type CompareRow = { label: string; plans: Record<PlanSlug, boolean | string> };

/** Something you buy on top of a membership, never instead of one. */
export type AddOn = {
  slug: string;
  name: string;
  pricePKR: number;
  period: string;
  blurb: string;
};

export type PolicyGroup = { heading: string; points: string[] };

export type PaymentMethod = { method: string; detail: string };

export type Trainer = {
  slug: string;
  name: string;
  role: string;
  /** What they actually coach, in a sentence. */
  specialty: string;
  /** Years on the floor, written as a figure so it can wear the numeral face. */
  experience: string;
  certifications: string[];
  /** Which batches they are on the floor for, in the gym's own words. */
  batch: string;
  /**
   * The name as it is written against a class on the board, so the classes a
   * coach runs are read off `schedule` rather than listed here a second time.
   */
  boardName: string;
  image: string;
  alt: string;
  waMessage: string;
};

/**
 * A schematic of the streets around the gym, drawn as an inline SVG rather
 * than embedded from a map provider. The labels live here because they are
 * business content; the path geometry lives in the component because SVG
 * coordinates are design.
 *
 * `roads` and `landmarks` are paired with the component's geometry by index,
 * so they are written in the order the schematic draws them.
 */
export type AreaMap = {
  /** The honest note under the map: the marker is approximate. */
  caption: string;
  /** What the amber marker is called on the drawing. */
  markerLabel: string;
  roads: string[];
  landmarks: string[];
};

/** One thing worth putting in your bag before a first session. */
export type BringItem = { title: string; detail: string };

export type Review = {
  quote: string;
  name: string;
  area: string;
  program: string;
};

export type GalleryItem = {
  image: string;
  alt: string;
  caption: string;
  span: "wide" | "tall" | "square";
};

export type Faq = { q: string; a: string };

export type FirstVisitStep = { step: number; title: string; detail: string };

export const DAY_ORDER: readonly DayKey[] = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
] as const;

export const DAY_LABELS: Record<DayKey, { short: string; long: string }> = {
  mon: { short: "Mon", long: "Monday" },
  tue: { short: "Tue", long: "Tuesday" },
  wed: { short: "Wed", long: "Wednesday" },
  thu: { short: "Thu", long: "Thursday" },
  fri: { short: "Fri", long: "Friday" },
  sat: { short: "Sat", long: "Saturday" },
  sun: { short: "Sun", long: "Sunday" },
};

/** Chip labels for the audience filter on the schedule. */
export const AUDIENCE_LABELS: Record<Audience, string> = {
  all: "Everyone",
  ladies: "Ladies",
  gents: "Gents",
};

/**
 * Chip labels for the class-type filter, in the order they appear. Ordered
 * loudest-first: the lifts people come here for, then the calm one.
 */
export const CLASS_TYPES: readonly { key: ClassType; label: string }[] = [
  { key: "strength", label: "Strength" },
  { key: "hiit", label: "HIIT" },
  { key: "boxing", label: "Boxing" },
  { key: "yoga", label: "Yoga" },
  { key: "open", label: "Open floor" },
] as const;

/** Three levels, so the meter on a card has something to fill. */
export const INTENSITY_LABELS: Record<Intensity, { label: string; level: 1 | 2 | 3 }> = {
  easy: { label: "Easy", level: 1 },
  moderate: { label: "Moderate", level: 2 },
  hard: { label: "Hard", level: 3 },
};

export const site = {
  name: "Iron Fitness",
  tagline: "A serious weight room in DHA Phase 5",
  shortDescription:
    "Coached strength, boxing and conditioning in DHA Phase 5, Lahore. Open 5 am to 11 pm, with the whole floor reserved for women every afternoon. First session free.",

  contact: {
    phone: "+923224007617",
    phoneDisplay: "0322 400 7617",
    // wa.me wants the number in international form with no punctuation.
    whatsapp: "923224007617",
    waBaseMessage:
      "Assalam o alaikum! I saw the Iron Fitness website and I'd like to book my free session.",
  },

  location: {
    line1: "112-B Main Boulevard",
    area: "DHA Phase 5",
    city: "Lahore",
    landmark: "Above the Y-Block pharmacy, opposite the Phase 5 park",
    parking: "Covered parking for 20 cars and 30 bikes, free for members",
    mapsUrl: "https://maps.google.com/?q=DHA+Phase+5+Main+Boulevard+Lahore",

    /**
     * How to get here said the way you would say it on the phone, which is
     * how anyone actually navigates DHA: by the turn, the landmark and the
     * side of the road, not by the house number.
     */
    directions: [
      "From Main Boulevard, keep the Phase 5 park on your right and slow down at the petrol pump — we are the next block after it.",
      "Coming down Khayaban-e-Firdousi, turn onto Main Boulevard at the park and we are 200 metres along on the left.",
      "The pharmacy sign is the one to look for. Our entrance is the glass door to its left, and the stairs go straight up to the floor.",
      "If you end up at the Y-Block market you have gone one block too far. Turn around at the mosque.",
    ],

    areaMap: {
      caption:
        "A schematic of the block, not a map. The marker sits on an approximate spot — Iron Fitness is a concept demo, so nothing here points at anybody's real premises.",
      markerLabel: "Iron Fitness",
      // Written in the order the schematic draws them.
      roads: ["Main Boulevard", "Khayaban-e-Firdousi", "Y-Block service road"],
      landmarks: ["Y-Block park", "Y-Block market", "Petrol pump", "Phase 5 mosque"],
    } as AreaMap,
  },

  hours: {
    gents: {
      mon: { open: "05:00", close: "23:00" },
      tue: { open: "05:00", close: "23:00" },
      wed: { open: "05:00", close: "23:00" },
      thu: { open: "05:00", close: "23:00" },
      fri: { open: "05:00", close: "23:00" },
      sat: { open: "06:00", close: "23:00" },
      sun: { open: "08:00", close: "20:00" },
    } as Record<DayKey, Hours>,
    ladies: {
      mon: { open: "13:00", close: "17:00" },
      tue: { open: "13:00", close: "17:00" },
      wed: { open: "13:00", close: "17:00" },
      thu: { open: "13:00", close: "17:00" },
      fri: { open: "15:00", close: "18:00" },
      sat: { open: "13:00", close: "17:00" },
      sun: null,
    } as Record<DayKey, Hours>,
    notes: [
      "The floor closes for Jummah on Friday, 12:30 to 2:30 pm.",
      "During ladies' hours the whole floor is women only, coached by female staff. No gents on the premises.",
      "Public holidays run on Sunday timings. We post changes on WhatsApp.",
    ],
    /**
     * Ramadan moves everything, so it is called out on its own rather than
     * buried as a fourth note: the timings on this page are the rest of the
     * year's, and a visitor reading them in Ramadan needs to know that before
     * they drive over.
     */
    ramadanNote:
      "In Ramadan the floor runs 10 am to 3 pm and 9 pm to 1 am for gents, with ladies' hours moving to 11 am to 2 pm. Classes drop to one evening batch after Taraweeh. We confirm the dates on WhatsApp a week before.",
  },

  nav: [
    { label: "Programmes", href: "/programmes" },
    { label: "Schedule", href: "/schedule" },
    { label: "Plans", href: "/plans" },
    { label: "Trainers", href: "/trainers" },
    { label: "Visit", href: "/visit" },
  ] as NavItem[],

  /**
   * The five pages the navbar links to. Each goes deeper than its homepage
   * preview, whose only job is to answer "is this for me?".
   */
  pages: {
    programmes: {
      title: "Programmes and classes",
      description:
        "Strength, HIIT, boxing, yoga and a ladies-only floor in DHA Phase 5, Lahore. What each programme involves, how hard it is, and which days it runs.",
      header: {
        heading: "Five ways to train",
        intro:
          "Every programme runs with a coach on the floor, and every one of them is open to a free first session. Here is what each actually involves before you turn up.",
      },
      viewAll: "View all five programmes",
      from: "programmes page",
    },
    schedule: {
      title: "Weekly schedule",
      description:
        "The full week of classes at Iron Fitness, with coaches, intensity and spots left, plus the gents' and ladies' gym-floor timings for every day.",
      header: {
        heading: "Every class, every day",
        intro:
          "The whole week in one place. Filter to your floor or your programme, then message us to hold a spot — classes are first come, first served once you have joined.",
      },
      viewAll: "View the full timetable",
      from: "weekly schedule page",
    },
    plans: {
      title: "Membership plans and fees",
      description:
        "Monthly, 3-month and 12-month memberships in PKR, the one-time admission fee, personal training and diet plans, the freeze and refund policy, and how to pay.",
      header: {
        heading: "What it costs to train here",
        intro:
          "Three memberships, one admission fee, and nothing after that. Everything we charge for is on this page, including the add-ons and what happens if you have to stop for a while.",
      },
      viewAll: "View all plans and fees",
      from: "membership plans page",
    },
    trainers: {
      title: "Trainers",
      description:
        "The three coaches at Iron Fitness: head strength coach Bilal Rana, boxing and conditioning coach Hamza Sheikh, and ladies' programme lead Ayesha Tariq.",
      header: {
        heading: "The coaches on the floor",
        intro:
          "Three coaches, and one of them is on the floor for every session we run. You can ask for any of them by name when you book your free trial.",
      },
      viewAll: "Meet all three coaches",
      from: "trainers page",
    },
    visit: {
      title: "Visit us in DHA Phase 5",
      description:
        "Where to find Iron Fitness in DHA Phase 5, Lahore: the address and landmark, gents' and ladies' hours, parking, and what to bring on your first visit.",
      header: {
        heading: "Come and find us",
        intro:
          "Everything you need to get here the first time: the address and the landmark to look for, both floors' hours, where to park, and the short list of things worth bringing.",
      },
      viewAll: "Plan your visit",
      from: "visit page",
    },
  } as Record<PageKey, PageMeta>,

  /**
   * The band that closes every page. Its prefilled message names the page it
   * was sent from, so an enquiry arrives saying what the visitor was reading —
   * about the closest a site with no backend gets to knowing what worked.
   */
  bookingBand: {
    heading: "Book your free trial",
    body: "One full session, a scan and a look round. No card details, and nobody follows you round trying to sell you a year.",
    cta: "Book on WhatsApp",
    callCta: "Or call",
    // {page} is filled from the `from` line of whichever page you are on.
    waTemplate:
      "Assalam o alaikum! I was reading the {page} on your website and I'd like to book my free trial session.",
  },

  hero: {
    headline: "Your first session is free",
    subhead:
      "Coached strength, boxing and conditioning in DHA Phase 5, Lahore — women only every afternoon.",
    primaryCta: "Claim your free trial",
    // The navbar and the mobile bar carry the same action in less space.
    primaryCtaShort: "Book free trial",
    secondaryCta: "Ask on WhatsApp",
    // Three figures, in the information colour: the numbers a visitor uses to
    // decide this place is real before they read anything else.
    stats: [
      { value: "600+", label: "members" },
      { value: "8", label: "certified trainers" },
      { value: "10", label: "years open" },
    ],
  },

  heroImage: {
    src: "/images/hero-gym-floor.jpg",
    alt: "The Iron Fitness main floor at night, racks and benches under the red LED strips.",
  },

  programmes: [
    {
      slug: "strength",
      name: "Strength & Conditioning",
      blurb:
        "Barbell work on a written programme: squat, press, deadlift, and the accessory lifts that hold them up. A coach is on the floor for every session.",
      duration: "60 min",
      audience: "all",
      image: "/images/program-strength.jpg",
      alt: "A lifter setting up over a loaded barbell on the rubber floor.",
      forWho:
        "Anyone who wants to get properly strong, from someone who has never held a barbell to a lifter chasing a number. Beginners spend their first month on technique with light bars, in the same class as everyone else.",
      intensity: "hard",
      session: [
        "Ten minutes of warm-up sets and the one technique cue your coach wants from you today.",
        "The main lift — squat, bench, press or deadlift — worked up in the sets written on your card.",
        "Two or three accessory lifts that hold the main one up: rows, chin-ups, hinges, carries.",
        "Loaded stretching, then your numbers go on the card before you leave.",
      ],
      classType: "strength",
    },
    {
      slug: "hiit",
      name: "HIIT & Functional",
      blurb:
        "Kettlebells, sled and intervals. Forty-five minutes with no standing around, scaled on the spot to whoever turns up.",
      duration: "45 min",
      audience: "all",
      image: "/images/program-hiit.jpg",
      alt: "Kettlebells and a medicine ball set out on the turf lane before a class.",
      forWho:
        "People with forty-five minutes and a heart rate to raise. Every station scales on the spot, so someone in their first week and someone who runs half marathons do the same class at different weights.",
      intensity: "hard",
      session: [
        "A joint-by-joint warm-up while the coach walks the room through every station.",
        "Three or four rounds of kettlebell, sled, rower and bodyweight work, on the clock.",
        "A short finisher — usually the part everybody complains about afterwards.",
        "Cool-down and breathing on the turf.",
      ],
      classType: "hiit",
    },
    {
      slug: "boxing",
      name: "Boxing & Kickboxing",
      blurb:
        "Pads, bag work and footwork with a coach who has worked corners. Wraps are provided for your first month, and nobody spars until they want to.",
      duration: "60 min",
      audience: "all",
      image: "/images/program-boxing.jpg",
      alt: "A boxer working the heavy bag under the gym's warm overhead lamps.",
      forWho:
        "Anyone who wants to learn to actually box rather than throw punches at the air for cardio. Sparring is optional, arranged in advance, and never something that happens to you by surprise.",
      intensity: "hard",
      session: [
        "Skipping and shadow work while Hamza wraps hands for anyone new.",
        "Pad work in pairs — one or two things per session, drilled until they hold under fatigue.",
        "Rounds on the heavy bag, three minutes on, one off.",
        "Core, conditioning and a stretch to finish.",
      ],
      classType: "boxing",
    },
    {
      slug: "yoga",
      name: "Yoga & Mobility",
      blurb:
        "A quiet studio upstairs for hips, shoulders and lower backs that spend the rest of the day at a desk. Mats and blocks are here, bring nothing.",
      duration: "50 min",
      audience: "all",
      image: "/images/program-yoga.jpg",
      alt: "The upstairs mobility studio, mats and blocks laid out along a mirrored wall.",
      forWho:
        "Desk backs, tight hips, and lifters who cannot sit in the bottom of a squat. No previous yoga and no flexibility required — that is what you are here to fix.",
      intensity: "easy",
      session: [
        "Ten minutes of breathing and spinal work to settle the room down.",
        "A slow flow through hips, shoulders and upper back — the three places a desk takes first.",
        "Long holds with blocks and straps, held properly rather than rushed through.",
        "Eight minutes flat on your back with the lights down.",
      ],
      classType: "yoga",
    },
    {
      slug: "ladies",
      name: "Ladies-Only Training",
      blurb:
        "The entire floor, staffed by female coaches, every afternoon. The same racks and the same machines as the rest of the day — not a side room with three treadmills.",
      duration: "Open floor + classes",
      audience: "ladies",
      image: "/images/program-ladies.jpg",
      alt: "Two women sitting back to back on a plyo box during the afternoon ladies' session.",
      forWho:
        "Women who want a real weight room rather than a side room with three treadmills. Complete beginners included — most of the afternoon floor started that way.",
      intensity: "moderate",
      session: [
        "The floor closes to men for the whole block and is staffed by female coaches throughout.",
        "Coached classes run through the afternoon: strength, HIIT, boxing and yoga on their own timetable.",
        "Between classes the entire floor is yours — the same racks, machines and cardio as any other hour.",
        "An InBody scan and a written programme from Ayesha whenever you want one.",
      ],
      classAudience: "ladies",
    },
  ] as Program[],

  /**
   * The copy around the five programmes. The programmes themselves are in
   * `programmes` above — this is only what the page says about them, and the
   * labels the cards hang their facts on.
   */
  programmesSection: {
    heading: "Five ways to train, one floor",
    subhead:
      "Strength, intervals, boxing, mobility, and a floor that turns women-only every afternoon. Every one of them is coached, and every one of them takes beginners.",
    forWhoHeading: "Who it's for",
    sessionHeading: "What a session looks like",
    durationLabel: "Session length",
    intensityLabel: "Intensity",
    daysLabel: "Runs on",
    everyDayLabel: "Every day",
    /** When a programme has no classes of its own on the board. */
    noDaysLabel: "Whenever the floor is open",
    ladiesLabel: "Ladies only",
  },

  // Capacity and spots left are a snapshot: a real gym would read these
  // from its booking system. They exist so the cards can show how full a
  // class is, and so "full" has something to render.
  schedule: [
    // Monday
    { day: "mon", start: "06:00", end: "07:00", name: "Strength", type: "strength", coach: "Bilal", audience: "gents", intensity: "hard", capacity: 16, spotsLeft: 5 },
    { day: "mon", start: "07:15", end: "08:00", name: "HIIT", type: "hiit", coach: "Hamza", audience: "gents", intensity: "hard", capacity: 20, spotsLeft: 9 },
    { day: "mon", start: "13:30", end: "14:30", name: "Ladies Strength", type: "strength", coach: "Ayesha", audience: "ladies", intensity: "moderate", capacity: 14, spotsLeft: 4 },
    { day: "mon", start: "15:30", end: "16:15", name: "Ladies HIIT", type: "hiit", coach: "Ayesha", audience: "ladies", intensity: "hard", capacity: 16, spotsLeft: 7 },
    { day: "mon", start: "19:00", end: "20:00", name: "Boxing", type: "boxing", coach: "Hamza", audience: "gents", intensity: "hard", capacity: 14, spotsLeft: 2 },
    { day: "mon", start: "20:30", end: "21:30", name: "Strength", type: "strength", coach: "Bilal", audience: "gents", intensity: "hard", capacity: 16, spotsLeft: 6 },
    // Tuesday
    { day: "tue", start: "06:00", end: "06:45", name: "HIIT", type: "hiit", coach: "Hamza", audience: "gents", intensity: "hard", capacity: 20, spotsLeft: 11 },
    { day: "tue", start: "07:15", end: "08:05", name: "Yoga & Mobility", type: "yoga", coach: "Ayesha", audience: "all", intensity: "easy", capacity: 18, spotsLeft: 8 },
    { day: "tue", start: "13:30", end: "14:20", name: "Ladies Yoga", type: "yoga", coach: "Ayesha", audience: "ladies", intensity: "easy", capacity: 18, spotsLeft: 10 },
    { day: "tue", start: "15:30", end: "16:30", name: "Ladies Strength", type: "strength", coach: "Ayesha", audience: "ladies", intensity: "moderate", capacity: 14, spotsLeft: 3 },
    { day: "tue", start: "19:00", end: "20:00", name: "Strength", type: "strength", coach: "Bilal", audience: "gents", intensity: "hard", capacity: 16, spotsLeft: 1 },
    { day: "tue", start: "20:30", end: "21:15", name: "HIIT", type: "hiit", coach: "Hamza", audience: "gents", intensity: "hard", capacity: 20, spotsLeft: 8 },
    // Wednesday
    { day: "wed", start: "06:00", end: "07:00", name: "Strength", type: "strength", coach: "Bilal", audience: "gents", intensity: "hard", capacity: 16, spotsLeft: 6 },
    { day: "wed", start: "07:15", end: "08:00", name: "HIIT", type: "hiit", coach: "Hamza", audience: "gents", intensity: "hard", capacity: 20, spotsLeft: 12 },
    { day: "wed", start: "13:30", end: "14:30", name: "Ladies Strength", type: "strength", coach: "Ayesha", audience: "ladies", intensity: "moderate", capacity: 14, spotsLeft: 5 },
    { day: "wed", start: "15:30", end: "16:30", name: "Ladies Boxing", type: "boxing", coach: "Ayesha", audience: "ladies", intensity: "moderate", capacity: 12, spotsLeft: 4 },
    { day: "wed", start: "19:00", end: "20:00", name: "Boxing", type: "boxing", coach: "Hamza", audience: "gents", intensity: "hard", capacity: 14, spotsLeft: 0 },
    { day: "wed", start: "20:30", end: "21:30", name: "Strength", type: "strength", coach: "Bilal", audience: "gents", intensity: "hard", capacity: 16, spotsLeft: 7 },
    // Thursday
    { day: "thu", start: "06:00", end: "06:45", name: "HIIT", type: "hiit", coach: "Hamza", audience: "gents", intensity: "hard", capacity: 20, spotsLeft: 10 },
    { day: "thu", start: "07:15", end: "08:05", name: "Yoga & Mobility", type: "yoga", coach: "Ayesha", audience: "all", intensity: "easy", capacity: 18, spotsLeft: 9 },
    { day: "thu", start: "13:30", end: "14:20", name: "Ladies Yoga", type: "yoga", coach: "Ayesha", audience: "ladies", intensity: "easy", capacity: 18, spotsLeft: 11 },
    { day: "thu", start: "15:30", end: "16:30", name: "Ladies Strength", type: "strength", coach: "Ayesha", audience: "ladies", intensity: "moderate", capacity: 14, spotsLeft: 2 },
    { day: "thu", start: "19:00", end: "20:00", name: "Strength", type: "strength", coach: "Bilal", audience: "gents", intensity: "hard", capacity: 16, spotsLeft: 3 },
    { day: "thu", start: "20:30", end: "21:15", name: "HIIT", type: "hiit", coach: "Hamza", audience: "gents", intensity: "hard", capacity: 20, spotsLeft: 9 },
    // Friday — the floor closes for Jummah, so nothing runs midday
    { day: "fri", start: "06:00", end: "07:00", name: "Strength", type: "strength", coach: "Bilal", audience: "gents", intensity: "hard", capacity: 16, spotsLeft: 8 },
    { day: "fri", start: "07:15", end: "08:00", name: "HIIT", type: "hiit", coach: "Hamza", audience: "gents", intensity: "hard", capacity: 20, spotsLeft: 13 },
    { day: "fri", start: "15:30", end: "16:30", name: "Ladies Strength", type: "strength", coach: "Ayesha", audience: "ladies", intensity: "moderate", capacity: 14, spotsLeft: 6 },
    { day: "fri", start: "19:00", end: "20:00", name: "Boxing", type: "boxing", coach: "Hamza", audience: "gents", intensity: "hard", capacity: 14, spotsLeft: 3 },
    { day: "fri", start: "20:30", end: "21:30", name: "Strength", type: "strength", coach: "Bilal", audience: "gents", intensity: "hard", capacity: 16, spotsLeft: 9 },
    // Saturday
    { day: "sat", start: "07:00", end: "08:00", name: "Strength", type: "strength", coach: "Bilal", audience: "gents", intensity: "hard", capacity: 16, spotsLeft: 10 },
    { day: "sat", start: "08:30", end: "09:15", name: "HIIT", type: "hiit", coach: "Hamza", audience: "gents", intensity: "hard", capacity: 20, spotsLeft: 14 },
    { day: "sat", start: "13:30", end: "15:00", name: "Ladies Open Floor", type: "open", coach: "Ayesha", audience: "ladies", intensity: "moderate", capacity: 25, spotsLeft: 16 },
    { day: "sat", start: "15:30", end: "16:30", name: "Ladies Boxing", type: "boxing", coach: "Ayesha", audience: "ladies", intensity: "moderate", capacity: 12, spotsLeft: 2 },
    { day: "sat", start: "18:00", end: "19:00", name: "Boxing", type: "boxing", coach: "Hamza", audience: "gents", intensity: "hard", capacity: 14, spotsLeft: 5 },
    { day: "sat", start: "19:30", end: "20:30", name: "Strength", type: "strength", coach: "Bilal", audience: "gents", intensity: "hard", capacity: 16, spotsLeft: 11 },
    // Sunday — short day, closes at 8 pm
    { day: "sun", start: "08:30", end: "09:20", name: "Yoga & Mobility", type: "yoga", coach: "Ayesha", audience: "all", intensity: "easy", capacity: 18, spotsLeft: 12 },
    { day: "sun", start: "10:00", end: "11:00", name: "Strength", type: "strength", coach: "Bilal", audience: "gents", intensity: "hard", capacity: 16, spotsLeft: 9 },
    { day: "sun", start: "17:30", end: "18:15", name: "HIIT", type: "hiit", coach: "Hamza", audience: "gents", intensity: "hard", capacity: 20, spotsLeft: 15 },
  ] as ClassSlot[],

  scheduleSection: {
    heading: "This week on the floor",
    subhead:
      "Every class runs with a coach on the floor. Pick a day, filter to your hours, and message us to hold a spot.",
    // {class}, {day} and {time} are filled in from the slot you tapped.
    waBookTemplate:
      "Assalam o alaikum! I'd like to book {class} on {day} at {time}. Is there a spot?",
    waWaitlistTemplate:
      "Assalam o alaikum! {class} on {day} at {time} shows as full — could you put me on the waitlist?",
  },

  /**
   * The copy around the two gym-floor timing tables. Shared by /schedule and
   * /visit, which is the whole reason it is here and not in either page.
   *
   * The timings themselves are in `hours` above — this is only what the page
   * says about them.
   */
  hoursSection: {
    heading: "When the floor is open",
    subhead:
      "Classes are the timetable above. These are the hours the gym itself is open, when you can walk in and train on your own.",
    dayColumn: "Day",
    closedLabel: "Closed",
    notesHeading: "Worth knowing before you come",
    ramadanHeading: "Ramadan timings",
  },

  /**
   * The copy around /visit. Next to `hoursSection` because the two answer the
   * same visitor's two questions — where is it, and when should I drive over
   * — and the page renders them one after the other.
   *
   * The address, the landmark, the parking and the map labels are all up in
   * `location`; this is only what the page says around them.
   */
  visitSection: {
    address: {
      heading: "Where we are",
      subhead:
        "On Main Boulevard in DHA Phase 5, a block past the petrol pump. Everyone finds it by the pharmacy sign.",
      landmarkLabel: "Look for",
      parkingLabel: "Parking",
      phoneLabel: "Phone",
      directionsCta: "Get directions",
      callCta: "Call the desk",
      waCta: "Ask on WhatsApp",
      /** The one message sent from this page that isn't the booking band's. */
      waMessage:
        "Assalam o alaikum! I'm heading over to Iron Fitness — could you send me the location?",

      /**
       * The same block at homepage depth. It gets its own heading because it
       * is answering a different question there: not "how do I get in?" —
       * that visitor has already decided to come — but "is this near me, and
       * is it open when I can train?". Which is also why the homepage puts
       * the timings where /visit puts the area map.
       */
      preview: {
        heading: "Where we are, and when we're open",
        subhead:
          "One floor on Main Boulevard in DHA Phase 5, open from five in the morning, with the afternoons given over to the ladies' floor.",
        hoursHeading: "Gym floor hours",
      },
    },

    directions: {
      heading: "Finding the door",
      subhead:
        "Four sentences, the way we'd say them on the phone. DHA is navigated by landmarks, not house numbers.",
    },

    bring: {
      heading: "What to bring",
      subhead:
        "Short list, because most of it is already here. Nothing on it costs anything and nothing needs buying first.",
    },
  },

  visit: {
    /**
     * For the first session specifically. What happens during it is
     * `firstVisit` above — this is only what goes in the bag.
     */
    bring: [
      {
        title: "Shoes you can lift in",
        detail:
          "Flat soles, changed at the door. Street shoes don't go on the floor and a soft running sole is no help under a bar. Boxing gloves and wraps we lend you.",
      },
      {
        title: "A water bottle",
        detail:
          "There's a cooler on each floor to refill from. We stopped selling bottled water when we worked out how much plastic a week it was.",
      },
      {
        title: "Your CNIC, if you're joining",
        detail:
          "Only needed the day you sign up, for the membership form. The free session needs nothing but your name.",
      },
      {
        title: "Nothing else",
        detail:
          "A towel, a locker and a lock are handed to you at the desk, and the changing rooms have showers and soap. Leave your bag in the locker, not on the floor.",
      },
    ] as BringItem[],
  },

  /**
   * The copy around the fees. The figures themselves live in `membership`
   * below — this is only what the page says about them.
   */
  plansSection: {
    heading: "Three ways to pay for the same gym",
    subhead:
      "Every membership opens the same floor, the same classes and the same coaches. A longer plan buys a lower monthly price and a little more room to stop — nothing else is held back.",
    // {plan} is the membership named on the card you tapped.
    waTemplate:
      "Assalam o alaikum! I'd like to join on the {plan} membership. What do I need to bring?",
    planCta: "Ask about this plan",
    featuredLabel: "Most members choose this",
    compare: {
      heading: "What each membership includes",
      subhead:
        "The same table the front desk reads from. Anything not on it is something we don't charge for.",
      rowHeading: "What you get",
      yes: "Included",
      no: "Not included",
    },
    addOns: {
      heading: "Add-ons",
      subhead:
        "Bought on top of a membership, never instead of one. Both stop at the end of any month.",
    },
    policy: {
      heading: "Freezing, stopping and refunds",
      subhead:
        "Written down because nobody should have to ask. The same rules apply whichever plan you are on.",
    },
    payment: {
      heading: "How to pay",
      subhead:
        "Paid at the front desk or sent before you arrive. We hold no card details and nothing renews on its own.",
    },
    faq: {
      heading: "Questions about the fees",
    },
  },

  membership: {
    admissionFeePKR: 3000,
    admissionNote:
      "One-time admission fee, charged when you sign up. It covers your access card, your first InBody scan and a locker for as long as you're a member.",
    plans: [
      {
        slug: "monthly",
        name: "Monthly",
        pricePKR: 6500,
        period: "per month",
        blurb: "Rolling month. Stop whenever you like, no notice period.",
        includes: [
          "Full floor, cardio and class access",
          "Locker, towel and showers",
          "One InBody scan each month",
          "Programme written by your coach",
        ],
        featured: false,
      },
      {
        slug: "quarterly",
        name: "3 months",
        pricePKR: 17000,
        period: "for 3 months",
        blurb: "Works out at Rs 5,667 a month — Rs 2,500 less than paying monthly.",
        includes: [
          "Everything in Monthly",
          "A programme review with Bilal every six weeks",
          "Two guest passes for a friend",
          "Freeze once for up to 14 days",
        ],
        featured: true,
      },
      {
        slug: "annual",
        name: "12 months",
        pricePKR: 55000,
        period: "for the year",
        blurb: "The cheapest way to train here, at Rs 4,583 a month.",
        includes: [
          "Everything in 3 months",
          "Admission fee waived",
          "Kit bag and two Iron Fitness shirts",
          "Freeze for up to 30 days across the year",
        ],
        featured: false,
      },
    ] as Plan[],
    /**
     * The comparison, line by line. Every row is checked against the plans
     * above: a row may not promise something a membership's `includes` list
     * does not.
     */
    compare: [
      {
        label: "Gym floor, cardio and every class",
        plans: { monthly: true, quarterly: true, annual: true },
      },
      {
        label: "Locker, towel and showers",
        plans: { monthly: true, quarterly: true, annual: true },
      },
      {
        label: "Programme written by your coach",
        plans: { monthly: true, quarterly: true, annual: true },
      },
      {
        label: "One InBody scan a month",
        plans: { monthly: true, quarterly: true, annual: true },
      },
      {
        label: "Programme review with Bilal",
        plans: { monthly: false, quarterly: "Every 6 weeks", annual: "Every 6 weeks" },
      },
      {
        label: "Guest passes for a friend",
        plans: { monthly: false, quarterly: "2", annual: "2" },
      },
      {
        label: "Freeze your membership",
        plans: { monthly: false, quarterly: "Up to 14 days", annual: "Up to 30 days" },
      },
      {
        label: "Kit bag and two Iron Fitness shirts",
        plans: { monthly: false, quarterly: false, annual: true },
      },
      {
        // Stated as a word rather than a figure so the fee lives in exactly
        // one place, `admissionFeePKR`, and this row can never contradict it.
        label: "One-time admission fee",
        plans: { monthly: "Payable", quarterly: "Payable", annual: "Waived" },
      },
    ] as CompareRow[],

    addOns: [
      {
        slug: "personal-training",
        name: "Personal training",
        pricePKR: 18000,
        period: "per month",
        blurb:
          "Twelve one-to-one sessions a month with the same coach, on top of any membership. Bookable in the morning or after 8 pm. Single sessions are Rs 2,000.",
      },
      {
        slug: "diet-plan",
        name: "Diet plan",
        pricePKR: 4500,
        period: "per month",
        blurb:
          "A month of meals written around what you already eat, in Urdu or English, reviewed with Ayesha every four weeks.",
      },
    ] as AddOn[],

    policy: [
      {
        heading: "Freezing",
        points: [
          "3-month members can freeze once for up to 14 days. 12-month members get up to 30 days across the year, in as many goes as they like.",
          "Tell us before the freeze starts, on WhatsApp or at the front desk. We can't backdate one.",
          "Frozen days are added to the end of your membership rather than refunded.",
        ],
      },
      {
        heading: "Stopping and refunds",
        points: [
          "Monthly memberships are rolling. Stop whenever you like — there is no notice period and nothing to cancel.",
          "3-month and 12-month memberships are refundable in the first 7 days, less the days you trained and the admission fee.",
          "After that we don't refund the remainder, but you can transfer what is left of it to someone else, once.",
        ],
      },
    ] as PolicyGroup[],

    payment: [
      {
        method: "Cash",
        detail: "At the front desk, any time the floor is open. We message you a receipt the same day.",
      },
      {
        method: "Bank transfer",
        detail:
          "Ask for the Iron Fitness account details on WhatsApp and send the screenshot back. Your card is ready the next morning.",
      },
      {
        method: "JazzCash or Easypaisa",
        detail:
          "To the same number you message us on. It lands in a minute and your access card works straight away.",
      },
    ] as PaymentMethod[],

    /**
     * Fee questions that the homepage FAQ does not already answer. The
     * admission fee and the personal-training price are deliberately absent:
     * both are in `site.faqs`, and saying them twice invites them to drift.
     */
    feesFaqs: [
      {
        q: "Can I move to a longer plan partway through?",
        a: "Yes. What you have already paid comes off the longer plan on the day you switch, and you keep your original join date. It doesn't work the other way round mid-term.",
      },
      {
        q: "Does my membership renew automatically?",
        a: "No. Nothing renews on its own and we hold no card details — your access card simply stops working on the last day, and you pay again whenever you are ready.",
      },
      {
        q: "Will the price go up while I'm a member?",
        a: "Not on a plan you have already paid for. If prices change you'd pay the new one at your next renewal, and we tell everyone a month before.",
      },
      {
        q: "Is there a discount for students, or for two people joining together?",
        a: "Students with a valid university card get Rs 1,000 off the monthly plan. Two people joining together on any plan pay one admission fee between them.",
      },
    ] as Faq[],
  },

  /**
   * The copy around the three coaches: what the section says about them and
   * the labels their facts hang on. The facts themselves are in `trainers`.
   */
  trainersSection: {
    heading: "Who is on the floor when you are",
    subhead:
      "What each of them coaches, how long they have been doing it, and what they are qualified in. The classes under each coach are read straight off this week's timetable.",
    specialtyLabel: "What they coach",
    experienceLabel: "Experience",
    certificationsLabel: "Certifications",
    batchLabel: "On the floor",
    boardLabel: "On the timetable",
    /** Filled with the coach's first name by `fillTemplate`. */
    askCta: "Ask for {name}",
    /** How a coach's classes are counted under `boardLabel`. */
    classCountLabel: "{count} classes a week",
    singleClassLabel: "1 class a week",
  },

  trainers: [
    {
      slug: "bilal-rana",
      name: "Bilal Rana",
      role: "Head strength coach",
      specialty:
        "The barbell lifts — squat, bench, deadlift, press. Technique before load, and he writes the first programme for every member who joins.",
      experience: "9 years coaching in Lahore",
      certifications: [
        "UKSCA-accredited strength and conditioning coach",
        "NASM Certified Personal Trainer",
        "Precision Nutrition Level 1",
      ],
      batch: "Morning and late-evening gents' batches",
      boardName: "Bilal",
      image: "/images/trainer-male-1.jpg",
      alt: "Bilal lifting a 10 kg hex dumbbell off the rack by the window.",
      waMessage:
        "Assalam o alaikum! I'd like to train with Bilal. When is he free for a free session?",
    },
    {
      slug: "hamza-sheikh",
      name: "Hamza Sheikh",
      role: "Boxing and conditioning",
      specialty:
        "Pad work, bag rounds and the HIIT intervals. Beginners are the point rather than the exception — he brings the wraps for a first session.",
      experience: "10 years boxing, 3 of them working corners",
      certifications: [
        "Pakistan Boxing Federation Level 2 coach",
        "ISSA Certified Conditioning Specialist",
        "Emergency first aid and CPR, St John Pakistan",
      ],
      batch: "Early mornings and evenings, gents' floor",
      boardName: "Hamza",
      image: "/images/trainer-male-2-boxing.jpg",
      alt: "A boxer in a black vest pressing his red boxing gloves together.",
      waMessage:
        "Assalam o alaikum! I'd like to try the boxing class with Hamza. What's the next free session?",
    },
    {
      slug: "ayesha-tariq",
      name: "Ayesha Tariq",
      role: "Ladies' programme lead",
      specialty:
        "Every class on the ladies' floor, from the strength sessions to the yoga. She coaches and writes nutrition plans in Urdu and English, and takes most of her members from having never trained at all.",
      experience: "7 years coaching women's groups",
      certifications: [
        "ACE Certified Personal Trainer",
        "Pre- and post-natal training, Girls Gone Strong",
        "200-hour yoga teacher training",
      ],
      batch: "The full afternoon ladies' floor, every day it is open",
      boardName: "Ayesha",
      image: "/images/trainer-female-1.jpg",
      alt: "Ayesha kneeling beside a member, correcting her back position on the cable row.",
      waMessage:
        "Assalam o alaikum! I'd like to book a free session during ladies' hours with Ayesha.",
    },
  ] as Trainer[],

  reviewsSection: {
    heading: "What members actually say",
    subhead:
      "Four members, four different reasons for joining. Each is named by first name and the part of Lahore they travel in from.",
    /** Sits under the quotes. The footer carries the same admission once more,
        for the whole page; this one is here because a testimonial is the single
        easiest thing on a demo to mistake for real. */
    note: "These quotes are written for the demo, not collected from members.",
  },

  reviews: [
    {
      quote:
        "I joined for the 6 am class because I could never make it after work. Six months in and I haven't missed a Monday.",
      name: "Usman S.",
      area: "Johar Town",
      program: "Strength & Conditioning",
    },
    {
      quote:
        "The ladies' hours are the whole reason I signed up. It's the same floor and the same racks as the men get, with women coaching.",
      name: "Hira M.",
      area: "DHA Phase 4",
      program: "Ladies-Only Training",
    },
    {
      quote:
        "Hamza fixed a jab I'd been throwing wrong for two years. Took him about ten minutes and I've been going ever since.",
      name: "Faizan A.",
      area: "Gulberg",
      program: "Boxing & Kickboxing",
    },
    {
      quote:
        "Admission fee once and then nothing hidden. I've been at gyms in this city that bill you extra for a locker.",
      name: "Adeel K.",
      area: "Model Town",
      program: "Monthly membership",
    },
  ] as Review[],

  gallery: [
    {
      image: "/images/hero-gym-floor.jpg",
      alt: "The main floor after the evening class, benches empty under the lights.",
      caption: "The main floor at closing",
      span: "wide",
    },
    {
      image: "/images/facility-weights.jpg",
      alt: "A row of loaded dumbbells racked under low light.",
      caption: "Dumbbells from 2.5 to 50 kg",
      span: "square",
    },
    {
      image: "/images/facility-cardio.jpg",
      alt: "Treadmills and a cross-trainer in the upstairs cardio room, screens lit.",
      caption: "Fourteen cardio machines upstairs",
      span: "tall",
    },
    {
      image: "/images/facility-lockers.jpg",
      alt: "Numbered black lockers against a reclaimed wood wall, shoes on top.",
      caption: "Twenty-eight lockers, towels included",
      span: "square",
    },
    {
      image: "/images/program-yoga.jpg",
      alt: "The mobility studio upstairs, quiet and lit from the ceiling cove.",
      caption: "The mobility studio",
      span: "wide",
    },
  ] as GalleryItem[],

  firstVisit: [
    {
      step: 1,
      title: "Message us",
      detail:
        "Send your name and the day you'd like on WhatsApp. We'll confirm a slot within an hour, during opening times.",
    },
    {
      step: 2,
      title: "Come in and get scanned",
      detail:
        "Arrive ten minutes early. A coach shows you round, runs an InBody scan and asks what you actually want out of it.",
    },
    {
      step: 3,
      title: "Train a full session",
      detail:
        "Not a tour — a real class or a coached floor session, with a locker, a towel and kit for the day.",
    },
  ] as FirstVisitStep[],

  faqs: [
    {
      q: "What does the free session include?",
      a: "A full session — a class or a coached hour on the floor, whichever you prefer — plus an InBody scan, a locker and a towel. No card details, and nobody follows you round trying to sell you a year.",
    },
    {
      q: "What is the admission fee for?",
      a: "It's a one-time Rs 3,000 charged when you join, covering your access card, your first scan and your locker. It's waived on the 12-month plan. There's nothing else on top of the membership price.",
    },
    {
      q: "When are the ladies' timings?",
      a: "1 pm to 5 pm Monday to Saturday, and 3 pm to 6 pm on Friday after Jummah. The whole floor is women only during those hours, coached by Ayesha and her staff. We're closed to ladies on Sunday.",
    },
    {
      q: "Do I need to book classes in advance?",
      a: "For the free session, yes — message us so a coach is free for you. After you join, classes are first come first served, and the floor is always open during timings.",
    },
    {
      q: "How much is personal training?",
      a: "Rs 18,000 a month for twelve one-to-one sessions, on top of any membership. Most people book these early morning or after 8 pm. You can also buy single sessions at Rs 2,000.",
    },
    {
      q: "Is there parking, and are there showers?",
      a: "Covered parking for 20 cars and 30 bikes, free for members. Four showers in each changing room, towels and soap provided.",
    },
  ] as Faq[],

  trialForm: {
    heading: "Book your free trial",
    subhead:
      "Four questions, no card details. Sending opens WhatsApp with your booking written out — nothing is stored on this site.",

    fields: {
      name: { label: "Your name", placeholder: "e.g. Ayesha Khan" },
      phone: {
        label: "Mobile number",
        placeholder: "0322 400 7617",
        hint: "A Pakistani mobile, so we can confirm your slot on WhatsApp.",
      },
      programme: { label: "What you'd like to try", placeholder: "Pick a programme" },
      floor: { label: "Which floor" },
      batch: { label: "Preferred batch" },
      plan: {
        label: "Plan you're considering",
        optional: "Optional",
        placeholder: "Not sure yet",
        hint: "No commitment either way — the trial session is free.",
      },
    },

    /**
     * Batches are listed per floor because the two floors don't run at the
     * same times: the gents' floor is open morning and evening, while the
     * whole floor is women only right through the afternoon. Offering a
     * morning ladies' batch would be booking someone into a closed gym.
     */
    batches: {
      ladies: [
        { key: "ladies-early", label: "Early afternoon", window: "1 – 3 pm" },
        { key: "ladies-late", label: "Late afternoon", window: "3 – 5 pm" },
      ],
      gents: [
        { key: "gents-morning", label: "Morning", window: "5 – 11 am" },
        { key: "gents-evening", label: "Evening", window: "6 – 11 pm" },
      ],
    },

    errors: {
      name: "Please tell us your name.",
      phone: "Enter a Pakistani mobile number, like 0322 400 7617.",
      programme: "Pick the programme you'd like to try.",
      floor: "Tell us which floor you'd train on.",
      batch: "Pick the batch that suits you.",
    },

    submit: "Send booking on WhatsApp",
    submitNote: "Opens WhatsApp in a new tab. No payment, no sign-up.",

    success: {
      heading: "Your booking is in WhatsApp",
      body: "Press send in the WhatsApp tab and a coach will confirm your slot within the hour, during opening times.",
      sentLabel: "What we filled in for you",
      retry: "WhatsApp didn't open? Open it again",
      reset: "Book another session",
    },

    /** How the composed WhatsApp message opens, labels itself, and closes. */
    message: {
      intro: "Assalam o alaikum! I'd like to book my free trial at Iron Fitness.",
      outro: "Could you confirm a slot? Sent from the website.",
      labels: {
        name: "Name",
        phone: "Phone",
        programme: "Programme",
        batch: "Preferred batch",
        plan: "Plan I'm considering",
      },
    },
  },

  footer: {
    credit: "Concept demo by Solvira",
    disclaimer:
      "Iron Fitness is a fictional business. The prices, timings, trainers and reviews on this page are illustrative and exist to demonstrate the design.",
  },
} as const;
