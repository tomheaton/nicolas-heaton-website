export interface Point {
  title: string;
  body: string;
}

export const POINTS: readonly Point[] = [
  {
    title: "Cutting",
    body: "Classic technique, cut to a shape that holds as it grows out.",
  },
  {
    title: "Colour",
    body: "Goldwell colour matched to your skin tone, with bond care included.",
  },
  {
    title: "One client at a time",
    body: "Nothing is rushed, and you get a straight answer on what will suit you.",
  },
];

export interface Service {
  name: string;
  price: string;
  blurb: string;
}

export const SERVICES: readonly Service[] = [
  {
    name: "Cut & Finish",
    price: "from £56",
    blurb: "Consultation, cut and blow-dry.",
  },
  {
    name: "Restyle",
    price: "from £65",
    blurb: "A new shape or length, planned with you before cutting.",
  },
  {
    name: "Colour",
    price: "from £60",
    blurb: "Full head, roots or a tonal refresh, using Goldwell colour.",
  },
  {
    name: "Highlights & Balayage",
    price: "from £90",
    // TODO(tom): confirm whether foils, hand-painted, or both are offered
    blurb: "Highlights or hand-painted balayage.",
  },
  {
    name: "Treatments",
    price: "from £28",
    blurb: "Bond-repair and conditioning treatments.",
  },
  {
    name: "Occasion Styling",
    price: "from £25",
    blurb: "Blow-dry, waves or put-up hair for weddings and events.",
  },
];

export interface Review {
  quote: string;
  name: string;
  /** Where the review was left, e.g. "Google". Shown after the name when set. */
  source?: string;
}

// TODO(tom): confirm the source of these reviews and that the wording is verbatim
export const REVIEWS: readonly Review[] = [
  {
    quote:
      "Nicolas is fabulous — listens to what you want and produces the magic. Definitely my permanent hairdresser.",
    name: "Kerry J.",
  },
  {
    quote:
      "I didn't really need to tell Nicolas what I wanted — he just knew what would work. He knows so much about hair and gives the best advice.",
    name: "Nicola H.",
  },
  {
    quote:
      "Nicolas knew exactly what would suit me and gave some useful haircare tips as well. Really happy with the results and made me feel at ease throughout.",
    name: "Hannah T.",
  },
  {
    quote:
      "Nicolas styled my hair brilliantly. Very professional, and knew his stuff about hair. A great haircut in a friendly atmosphere.",
    name: "Diane N.",
  },
  {
    quote:
      "Such a treat to be looked after by Nicolas. The conversation and hair cut were first class — really happy customer.",
    name: "Michelle S.",
  },
  {
    quote:
      "Professional hairdresser who understands your needs just by watching you — I could even go to a photo shoot straight after!",
    name: "Vee V.",
  },
];

export interface Partner {
  name: string;
  image: string;
  url: string;
}

export const PARTNERS: readonly Partner[] = [
  {
    name: "Goldwell",
    image: "/partners/goldwell.svg",
    url: "https://www.goldwell.com/en-gb/home/",
  },
  {
    name: "KMS",
    image: "/partners/kms.png",
    url: "https://www.kmshair.com/en-UK/",
  },
  {
    name: "Rave Coffee",
    image: "/partners/rave.svg",
    url: "https://ravecoffee.co.uk/",
  },
];

/** Opening hours keyed by JS `Date.prototype.getDay()`, where 0 is Sunday. `null` = closed. */
export const HOURS: Readonly<Record<number, readonly [number, number] | null>> = {
  0: null,
  1: null,
  2: [10, 17],
  3: [10, 17],
  4: [10, 19],
  5: [10, 18],
  6: [9.5, 16],
};

export const DAY_NAMES: readonly string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/** Display order, Monday first, matching the reference schedule. */
export const HOURS_DISPLAY: readonly { day: number; name: string }[] = [
  { day: 1, name: DAY_NAMES[1] },
  { day: 2, name: DAY_NAMES[2] },
  { day: 3, name: DAY_NAMES[3] },
  { day: 4, name: DAY_NAMES[4] },
  { day: 5, name: DAY_NAMES[5] },
  { day: 6, name: DAY_NAMES[6] },
  { day: 0, name: DAY_NAMES[0] },
];
