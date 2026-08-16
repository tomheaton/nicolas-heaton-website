export interface Virtue {
  title: string;
  body: string;
}

export const VIRTUES: readonly Virtue[] = [
  {
    title: "Precision cutting",
    body: "Trained on classic technique, cut to a shape that holds as it grows.",
  },
  {
    title: "Colour, kept kind",
    body: "Tonal work matched to your skin, with bond care built into the process.",
  },
  {
    title: "An unhurried chair",
    body: "One client at a time, never rushed, and honest advice about what will work.",
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
    blurb: "A consultation-led cut, dried and finished so it sits right from day one.",
  },
  {
    name: "Restyle",
    price: "from £65",
    blurb: "A full change of shape and direction, planned together before we begin.",
  },
  {
    name: "Colour",
    price: "from £60",
    blurb: "Full colour, root work, and tonal refresh, matched carefully to your skin tone.",
  },
  {
    name: "Highlights & Balayage",
    price: "from £90",
    blurb: "Hand-painted lightening for depth and movement that grows out softly.",
  },
  {
    name: "Treatments",
    price: "from £28",
    blurb: "Bond-building and conditioning treatments to bring back strength and shine.",
  },
  {
    name: "Occasion Styling",
    price: "from £25",
    blurb: "Blow-dry, waves, or dressed hair for weddings, events, and portraits.",
  },
];

export interface Review {
  quote: string;
  name: string;
  service: string;
}

export const REVIEWS: readonly Review[] = [
  {
    quote:
      "Nicolas is fabulous — listens to what you want and produces the magic. Definitely my permanent hairdresser.",
    name: "Kerry J.",
    service: "Cut & Colour",
  },
  {
    quote:
      "I didn't really need to tell Nicolas what I wanted — he just knew what would work. He knows so much about hair and gives the best advice.",
    name: "Nicola H.",
    service: "Hairstyling",
  },
  {
    quote:
      "Nicolas knew exactly what would suit me and gave some useful haircare tips as well. Really happy with the results and made me feel at ease throughout.",
    name: "Hannah T.",
    service: "Cut & Finish",
  },
  {
    quote:
      "Nicolas styled my hair brilliantly. Very professional, and knew his stuff about hair. A great haircut in a friendly atmosphere.",
    name: "Diane N.",
    service: "Cut & Finish",
  },
  {
    quote:
      "Such a treat to be looked after by Nicolas. The conversation and hair cut were first class — really happy customer.",
    name: "Michelle S.",
    service: "Cut & Finish",
  },
  {
    quote:
      "Professional hairdresser who understands your needs just by watching you — I could even go to a photo shoot straight after!",
    name: "Vee V.",
    service: "Restyle",
  },
];

export interface Partner {
  name: string;
  image: string;
  url: string;
}

export const PARTNERS: readonly Partner[] = [
  {
    name: "KMS",
    image: "/partners/kms.png",
    url: "https://www.kmshair.com/en-UK/",
  },
  {
    name: "Goldwell",
    image: "/partners/goldwell.svg",
    url: "https://www.goldwell.com/en-gb/home/",
  },
  {
    name: "Rave Coffee",
    image: "/partners/rave.svg",
    url: "https://ravecoffee.co.uk/",
  },
];

/** Opening hours keyed by JS `Date.prototype.getDay()` — 0 is Sunday. `null` = closed. */
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
