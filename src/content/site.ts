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

export type Program = {
  slug: string;
  name: string;
  blurb: string;
  duration: string;
  audience: Audience;
  image: string;
  alt: string;
};

/** How hard a class is, for the three-bar meter on the schedule cards. */
export type Intensity = "easy" | "moderate" | "hard";

/** Groups a class with the programme it belongs to, so the board can filter. */
export type ClassType = "strength" | "hiit" | "boxing" | "yoga" | "open";

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

export type Plan = {
  slug: string;
  name: string;
  pricePKR: number;
  period: string;
  blurb: string;
  includes: string[];
  featured: boolean;
};

export type Trainer = {
  slug: string;
  name: string;
  role: string;
  credentials: string[];
  image: string;
  alt: string;
  waMessage: string;
};

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
    },
  ] as Program[],

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
    personalTraining: {
      pricePKR: 18000,
      period: "per month",
      blurb:
        "Twelve one-to-one sessions a month with the same coach, on top of any membership. Bookable in the morning or after 8 pm.",
    },
  },

  trainers: [
    {
      slug: "bilal-rana",
      name: "Bilal Rana",
      role: "Head strength coach",
      credentials: [
        "UKSCA-accredited strength and conditioning coach",
        "Nine years coaching lifters in Lahore",
        "Writes every member's first programme",
      ],
      image: "/images/trainer-male-1.jpg",
      alt: "Bilal lifting a 10 kg hex dumbbell off the rack by the window.",
      waMessage:
        "Assalam o alaikum! I'd like to train with Bilal. When is he free for a free session?",
    },
    {
      slug: "hamza-sheikh",
      name: "Hamza Sheikh",
      role: "Boxing and conditioning",
      credentials: [
        "Ten years amateur boxing, three of them working corners",
        "Runs the pad work, bag rounds and the HIIT intervals",
        "Beginners welcome — he provides the wraps",
      ],
      image: "/images/trainer-male-2.jpg",
      alt: "Hands taped in red boxing wraps, holding a gumshield.",
      waMessage:
        "Assalam o alaikum! I'd like to try the boxing class with Hamza. What's the next free session?",
    },
    {
      slug: "ayesha-tariq",
      name: "Ayesha Tariq",
      role: "Ladies' programme lead",
      credentials: [
        "Runs the full afternoon ladies' floor, every day it's open",
        "Certified in pre- and post-natal training",
        "Coaches and writes nutrition plans in Urdu and English",
      ],
      image: "/images/trainer-female-1.jpg",
      alt: "Ayesha kneeling beside a member, correcting her back position on the cable row.",
      waMessage:
        "Assalam o alaikum! I'd like to book a free session during ladies' hours with Ayesha.",
    },
  ] as Trainer[],

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
