export interface Virtue {
  title: string;
  body: string;
}

export const VIRTUES: readonly Virtue[] = [
  {
    title: "Precision cutting",
    body: "A short back and sides or a full restyle, built on classic technique, in a shape that holds as it grows.",
  },
  {
    title: "Colour that suits you",
    body: "Goldwell colour matched to your skin tone, with bond care built into the process.",
  },
  {
    title: "Time in the chair",
    body: "One client at a time, never rushed, and a straight answer about what will work.",
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
    blurb: "A full change of shape and direction, agreed at consultation.",
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

/**
 * A day in the salon's week. `opens` and `closes` are 24-hour `"HH:MM"`; both are
 * absent on days the salon is closed.
 */
export interface OpeningDay {
  /** JS `Date.prototype.getDay()` index — 0 is Sunday. */
  index: number;
  name: string;
  opens?: string;
  closes?: string;
}

/**
 * Opening hours in display order, Monday first. Single source of truth — the Visit
 * section, the structured data in the page head, and `/llms.txt` all read from here.
 */
export const OPENING_HOURS: readonly OpeningDay[] = [
  { index: 1, name: "Monday" },
  { index: 2, name: "Tuesday", opens: "10:00", closes: "17:00" },
  { index: 3, name: "Wednesday", opens: "10:00", closes: "17:00" },
  { index: 4, name: "Thursday", opens: "10:00", closes: "19:00" },
  { index: 5, name: "Friday", opens: "10:00", closes: "18:00" },
  { index: 6, name: "Saturday", opens: "09:30", closes: "16:00" },
  { index: 0, name: "Sunday" },
];
